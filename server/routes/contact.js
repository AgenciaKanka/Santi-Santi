import express from 'express';
import { sendMail } from '../utils/mailer.js';

const router = express.Router();

const CONTACT_TO = process.env.CONTACT_TO || 'sergio@kanka.com.br';

const MAX = {
  nome: 200,
  email: 320,
  telefone: 60,
  mensagem: 8000,
  quantidade: 80,
  vinhoNome: 200,
  vinhoSlug: 120,
  pageUrl: 2000,
};

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isConfigured() {
  return Boolean(
    process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS,
  );
}

router.post('/', async (req, res) => {
  if (!isConfigured()) {
    return res.status(503).json({
      ok: false,
      message:
        'E-mail do servidor não configurado. Defina EMAIL_HOST, EMAIL_USER e EMAIL_PASS no ficheiro .env do servidor.',
    });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const tipo =
    body.tipo === 'solicitacao-vinho' ? 'solicitacao-vinho' : 'contato';

  const nome = typeof body.nome === 'string' ? body.nome.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const telefone =
    typeof body.telefone === 'string' ? body.telefone.trim() : '';

  if (!nome || nome.length > MAX.nome) {
    return res.status(400).json({ ok: false, message: 'Indique um nome válido.' });
  }
  if (!email || email.length > MAX.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, message: 'Indique um e-mail válido.' });
  }
  if (telefone.length > MAX.telefone) {
    return res.status(400).json({ ok: false, message: 'Telefone demasiado longo.' });
  }

  if (tipo === 'solicitacao-vinho') {
    const quantidade =
      typeof body.quantidade === 'string' ? body.quantidade.trim() : '';
    const vinhoNome =
      typeof body.vinhoNome === 'string' ? body.vinhoNome.trim() : '';
    const vinhoSlug =
      typeof body.vinhoSlug === 'string' ? body.vinhoSlug.trim() : '';
    const pageUrl =
      typeof body.pageUrl === 'string' ? body.pageUrl.trim().slice(0, MAX.pageUrl) : '';

    if (!telefone) {
      return res.status(400).json({ ok: false, message: 'Indique o telefone.' });
    }
    if (!quantidade || quantidade.length > MAX.quantidade) {
      return res.status(400).json({
        ok: false,
        message: 'Indique a quantidade pretendida.',
      });
    }
    if (!vinhoNome || vinhoNome.length > MAX.vinhoNome) {
      return res.status(400).json({ ok: false, message: 'Dados do vinho em falta.' });
    }
    if (!vinhoSlug || vinhoSlug.length > MAX.vinhoSlug) {
      return res.status(400).json({ ok: false, message: 'Identificação do vinho em falta.' });
    }

    const safeVinho = escapeHtml(vinhoNome);
    const safeSlug = escapeHtml(vinhoSlug);
    const safeQ = escapeHtml(quantidade);
    const safeNome = escapeHtml(nome);
    const safeEmail = escapeHtml(email);
    const safeTel = escapeHtml(telefone);

    let pageBlock = '';
    if (pageUrl) {
      try {
        const u = new URL(pageUrl);
        if (u.protocol === 'http:' || u.protocol === 'https:') {
          const href = u.href.replace(/"/g, '&quot;');
          pageBlock = `<p><strong>Página:</strong> <a href="${href}">${escapeHtml(pageUrl)}</a></p>`;
        }
      } catch {
        /* ignora URL inválida */
      }
    }

    const subject = `[Site Santi & Santi] Solicitação — ${vinhoNome.slice(0, 70)}`;
    const html = `
      <p><strong>Tipo:</strong> Solicitação de vinho (ficha do site)</p>
      <p><strong>Vinho:</strong> ${safeVinho}</p>
      <p><strong>Slug / URL:</strong> <code>${safeSlug}</code></p>
      ${pageBlock}
      <p><strong>Quantidade:</strong> ${safeQ}</p>
      <hr style="border:none;border-top:1px solid #ccc;margin:16px 0" />
      <p><strong>Nome:</strong> ${safeNome}</p>
      <p><strong>E-mail:</strong> <a href="mailto:${encodeURIComponent(email)}">${safeEmail}</a></p>
      <p><strong>Telefone:</strong> ${safeTel}</p>
    `;
    const text = [
      'Solicitação de vinho (ficha do site)',
      `Vinho: ${vinhoNome}`,
      `Slug: ${vinhoSlug}`,
      pageUrl ? `Página: ${pageUrl}` : null,
      `Quantidade: ${quantidade}`,
      '',
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      `Telefone: ${telefone}`,
    ]
      .filter(Boolean)
      .join('\n');

    const result = await sendMail({
      to: CONTACT_TO,
      subject,
      text,
      html,
    });

    if (!result.success) {
      console.error(result.error);
      return res.status(502).json({
        ok: false,
        message: 'Não foi possível enviar a mensagem. Tente novamente mais tarde.',
      });
    }

    return res.status(200).json({ ok: true, message: 'Solicitação enviada com sucesso.' });
  }

  const mensagem =
    typeof body.mensagem === 'string' ? body.mensagem.trim() : '';

  if (!mensagem || mensagem.length > MAX.mensagem) {
    return res
      .status(400)
      .json({ ok: false, message: 'Escreva uma mensagem (até 8000 caracteres).' });
  }

  const safeNome = escapeHtml(nome);
  const safeEmail = escapeHtml(email);
  const safeTel = escapeHtml(telefone || '—');
  const safeMsg = escapeHtml(mensagem).replace(/\r?\n/g, '<br/>');

  const subject = `[Site Santi & Santi] Contato — ${nome.slice(0, 60)}`;
  const html = `
    <p><strong>Nome:</strong> ${safeNome}</p>
    <p><strong>E-mail:</strong> <a href="mailto:${encodeURIComponent(email)}">${safeEmail}</a></p>
    <p><strong>Telefone:</strong> ${safeTel}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${safeMsg}</p>
  `;
  const text = `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone || '—'}\n\n${mensagem}`;

  const result = await sendMail({
    to: CONTACT_TO,
    subject,
    text,
    html,
  });

  if (!result.success) {
    console.error(result.error);
    return res.status(502).json({
      ok: false,
      message: 'Não foi possível enviar a mensagem. Tente novamente mais tarde.',
    });
  }

  return res.status(200).json({ ok: true, message: 'Mensagem enviada com sucesso.' });
});

export default router;

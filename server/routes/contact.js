import express from 'express';
import { sendMail } from '../utils/mailer.js';

const router = express.Router();

const CONTACT_TO = process.env.CONTACT_TO || 'sergio@kanka.com.br';

const MAX = { nome: 200, email: 320, telefone: 60, mensagem: 8000 };

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
  const nome = typeof body.nome === 'string' ? body.nome.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const telefone =
    typeof body.telefone === 'string' ? body.telefone.trim() : '';
  const mensagem =
    typeof body.mensagem === 'string' ? body.mensagem.trim() : '';

  if (!nome || nome.length > MAX.nome) {
    return res.status(400).json({ ok: false, message: 'Indique um nome válido.' });
  }
  if (!email || email.length > MAX.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, message: 'Indique um e-mail válido.' });
  }
  if (telefone.length > MAX.telefone) {
    return res.status(400).json({ ok: false, message: 'Telefone demasiado longo.' });
  }
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

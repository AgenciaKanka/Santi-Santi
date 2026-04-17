import {
  Fragment,
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FooterKankaLogo } from '../components/FooterKanka';
import { FooterSocial } from '../components/FooterSocial';
import { getWineByRouteParam, winePublicImageSrc } from '../data/wines';
import { getContactApiUrl } from '../lib/contactApi';
import './santi-home.css';

const WineDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const wine = useMemo(() => getWineByRouteParam(slug), [slug]);

  const [requestOpen, setRequestOpen] = useState(false);
  const [requestSubmit, setRequestSubmit] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [requestFeedback, setRequestFeedback] = useState('');

  useEffect(() => {
    document.title = wine
      ? `${wine.name} — Santi & Santi`
      : 'Santi & Santi';
  }, [wine]);

  useEffect(() => {
    if (!requestOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [requestOpen]);

  useEffect(() => {
    if (!requestOpen) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setRequestOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [requestOpen]);

  const handleWineRequestSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!wine) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const nome = String(fd.get('nome') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const telefone = String(fd.get('telefone') ?? '').trim();
    const quantidade = String(fd.get('quantidade') ?? '').trim();

    setRequestSubmit('loading');
    setRequestFeedback('');

    try {
      const res = await fetch(getContactApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'solicitacao-vinho',
          nome,
          email,
          telefone,
          quantidade,
          vinhoNome: wine.name,
        }),
      });
      let data: { ok?: boolean; message?: string } = {};
      try {
        data = await res.json();
      } catch {
        /* resposta não JSON */
      }
      if (!res.ok) {
        setRequestSubmit('error');
        setRequestFeedback(
          typeof data.message === 'string'
            ? data.message
            : 'Não foi possível enviar a solicitação.',
        );
        return;
      }
      setRequestSubmit('success');
      setRequestFeedback(
        typeof data.message === 'string'
          ? data.message
          : 'Solicitação enviada.',
      );
      form.reset();
    } catch {
      setRequestSubmit('error');
      setRequestFeedback(
        'Não foi possível contactar o servidor. Tente mais tarde.',
      );
    }
  };

  const closeModal = () => {
    setRequestOpen(false);
    setRequestSubmit('idle');
    setRequestFeedback('');
  };

  if (slug && /^\d+$/.test(slug) && wine) {
    return <Navigate to={`/vinho/${wine.slug}`} replace />;
  }

  if (!wine) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="santi-home santi-wine-page">
      <main className="santi-wine-main">
        <div className="santi-wine-back">
          <Link to="/#produtos" className="santi-wine-back__link">
            <span aria-hidden>←</span> Voltar ao catálogo
          </Link>
        </div>
        <p className="santi-wine-breadcrumb">
          <Link to="/">Início</Link>
          <span className="santi-wine-breadcrumb__sep" aria-hidden>
            /
          </span>
          <Link to="/#produtos">Produtos</Link>
          <span className="santi-wine-breadcrumb__sep" aria-hidden>
            /
          </span>
          <span className="santi-wine-breadcrumb__current">{wine.name}</span>
        </p>

        <div className="santi-wine-head">
          <div className="santi-wine-head__tags">
            <span className="santi-card__tag">{wine.tag}</span>
            {wine.star ? (
              <span className="santi-card__badge" aria-label="Reserva">
                ★
              </span>
            ) : null}
          </div>
          <h1 className="santi-title santi-wine-title">{wine.name}</h1>
          <p className="santi-card__var santi-wine-var">{wine.varietal}</p>
          {wine.headline ? (
            <p className="santi-wine-headline">{wine.headline}</p>
          ) : null}
          {wine.awards ? (
            <p className="santi-wine-awards">{wine.awards}</p>
          ) : null}
        </div>

        {wine.image ? (
          <div className="santi-card__visual santi-wine-hero">
            <img
              className="santi-wine-hero__img"
              src={winePublicImageSrc(wine.image)}
              alt={wine.name}
              decoding="async"
            />
          </div>
        ) : (
          <div className="santi-card__visual santi-wine-placeholder" aria-hidden />
        )}

        <div className="santi-wine-grid">
          <section className="santi-wine-panel">
            <h2 className="santi-eyebrow">Ficha técnica</h2>
            <dl className="santi-wine-dl">
              {wine.rows.map(([label, value]) => (
                <Fragment key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </Fragment>
              ))}
            </dl>
          </section>
          <section className="santi-wine-panel">
            {wine.elaboration ? (
              <>
                <h2 className="santi-eyebrow">Vinificação e estágio</h2>
                <p className="santi-wine-copy">{wine.elaboration}</p>
              </>
            ) : null}
            {wine.tastingNotes ? (
              <>
                <h2 className="santi-eyebrow">Perfil sensorial</h2>
                <p className="santi-wine-copy">{wine.tastingNotes}</p>
              </>
            ) : null}
            {wine.pairing ? (
              <>
                <h2 className="santi-eyebrow">Harmonização</h2>
                <p className="santi-wine-copy">{wine.pairing}</p>
              </>
            ) : null}
            <h2 className="santi-eyebrow">Comercialização</h2>
            <p className="santi-wine-copy">
              Rótulo do portfólio Santi &amp; Santi. Disponibilidade, condições
              e logística são tratadas com nossa equipe conforme sua operação.
            </p>
            <button
              type="button"
              className="santi-btn santi-btn--primary"
              onClick={() => {
                setRequestOpen(true);
                setRequestSubmit('idle');
                setRequestFeedback('');
              }}
            >
              Solicitar este vinho
            </button>
          </section>
        </div>
      </main>

      {requestOpen ? (
        <div
          className="santi-modal-overlay"
          role="presentation"
          onClick={(ev) => {
            if (ev.target === ev.currentTarget) closeModal();
          }}
        >
          <div
            className="santi-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="santi-wine-request-title"
          >
            <button
              type="button"
              className="santi-modal__close"
              onClick={closeModal}
              aria-label="Fechar"
            >
              ×
            </button>
            <h2 id="santi-wine-request-title" className="santi-modal__title">
              Solicitar vinho
            </h2>
            <p className="santi-modal__wine-name">{wine.name}</p>
            <form
              className="santi-form santi-modal__form"
              onSubmit={handleWineRequestSubmit}
              noValidate
            >
              <div className="santi-form__grid">
                <div className="santi-form__span2">
                  <label htmlFor="soli-nome">Nome</label>
                  <input
                    id="soli-nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    placeholder="Nome completo"
                    required
                    maxLength={200}
                    disabled={requestSubmit === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="soli-email">E-mail</label>
                  <input
                    id="soli-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="nome@empresa.com.br"
                    required
                    maxLength={320}
                    disabled={requestSubmit === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="soli-tel">Telefone</label>
                  <input
                    id="soli-tel"
                    name="telefone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(00) 00000-0000"
                    required
                    maxLength={60}
                    disabled={requestSubmit === 'loading'}
                  />
                </div>
                <div className="santi-form__span2">
                  <label htmlFor="soli-qtd">Quantidade</label>
                  <input
                    id="soli-qtd"
                    name="quantidade"
                    type="text"
                    placeholder="Ex.: 24 garrafas, 5 caixas…"
                    required
                    maxLength={80}
                    disabled={requestSubmit === 'loading'}
                  />
                </div>
              </div>
              {requestFeedback ? (
                <p
                  className={`santi-form__feedback${requestSubmit === 'success' ? ' santi-form__feedback--success' : ''}${requestSubmit === 'error' ? ' santi-form__feedback--error' : ''}`}
                  role="status"
                  aria-live="polite"
                >
                  {requestFeedback}
                </p>
              ) : null}
              <div className="santi-modal__actions">
                <button
                  type="button"
                  className="santi-btn santi-btn--ghost santi-modal__btn-secondary"
                  onClick={closeModal}
                  disabled={requestSubmit === 'loading'}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={requestSubmit === 'loading'}
                >
                  {requestSubmit === 'loading' ? 'Enviando…' : 'Enviar solicitação'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <footer className="santi-footer">
        <div className="santi-footer__row">
          <span>
            © {new Date().getFullYear()} Santi &amp; Santi Importadora e
            Distribuidora
          </span>
          <div className="santi-footer__links">
            <Link to="/privacidade">Privacidade</Link>
          </div>
          <FooterSocial />
        </div>
        <FooterKankaLogo />
      </footer>
    </div>
  );
};

export default WineDetail;

import { Fragment, useEffect, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FooterSocial } from '../components/FooterSocial';
import { getWineByRouteParam } from '../data/wines';
import './santi-home.css';

const WineDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const wine = useMemo(() => getWineByRouteParam(slug), [slug]);

  useEffect(() => {
    document.title = wine
      ? `${wine.name} — Santi & Santi`
      : 'Santi & Santi';
  }, [wine]);

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
          {wine.awards ? (
            <p className="santi-wine-awards">{wine.awards}</p>
          ) : null}
        </div>

        <div className="santi-card__visual santi-wine-placeholder" aria-hidden />

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
                <h2 className="santi-eyebrow">Elaboração</h2>
                <p className="santi-wine-copy">{wine.elaboration}</p>
              </>
            ) : null}
            {wine.tastingNotes ? (
              <>
                <h2 className="santi-eyebrow">Notas de degustação</h2>
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
            <Link className="santi-btn santi-btn--primary" to="/#contato">
              Solicitar este vinho
            </Link>
          </section>
        </div>
      </main>

      <footer className="santi-footer">
        <span>
          © {new Date().getFullYear()} Santi &amp; Santi Importadora e
          Distribuidora
        </span>
        <div className="santi-footer__links">
          <Link to="/#top">Privacidade</Link>
          <Link to="/#top">Termos</Link>
          <Link to="/#contato">Contato</Link>
        </div>
        <FooterSocial />
      </footer>
    </div>
  );
};

export default WineDetail;

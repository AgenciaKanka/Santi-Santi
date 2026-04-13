import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FILTERS, WINES } from '../data/wines';
import './santi-home.css';

const Home = () => {
  const [navScrolled, setNavScrolled] = useState(false);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('todos');

  const onScroll = useCallback(() => {
    setNavScrolled(window.scrollY > 80);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const visibleIds = useMemo(() => {
    if (filter === 'todos') return null;
    return new Set(
      WINES.filter((p) => p.cats.includes(filter)).map((p) => p.id),
    );
  }, [filter]);

  return (
    <div className="santi-home">
      <header
        className={`santi-nav${navScrolled ? ' is-scrolled' : ''}`}
        id="top"
      >
        <a href="#top" className="santi-nav__brand">
          <img
            className="santi-nav__logo-img"
            src="https://ambienteprovisorio.com.br/santiesanti/logo-sem-fundo.svg"
            alt="Santi &amp; Santi"
            width="109"
            height="109"
            decoding="async"
          />
          <span className="santi-nav__name">
            Santi &amp; Santi Importadora
          </span>
        </a>
        <nav className="santi-nav__links" aria-label="Principal">
          <a href="#sobre">Sobre</a>
          <a href="#produtos">Produtos</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="santi-nav__cta" href="#contato">
          Solicitar Catálogo
        </a>
      </header>

      <section className="santi-section santi-section--tight-top" id="hero">
        <div className="santi-hero">
          <div className="santi-hero__left">
            <p className="santi-eyebrow">Importadora &amp; Distribuidora</p>
            <h1 className="santi-title">
              Vinhos selecionados com <em>alma</em> e precisão.
            </h1>
            <p className="santi-hero__desc">
              Curadoria entre Mendoza e Portugal, logística impecável e
              parceria próxima com quem valoriza o detalhe — do portfólio ao
              copo.
            </p>
            <div className="santi-hero__actions">
              <a className="santi-btn santi-btn--primary" href="#contato">
                Fale conosco
              </a>
              <a className="santi-btn santi-btn--ghost" href="#produtos">
                Ver linhas <span aria-hidden>→</span>
              </a>
            </div>
          </div>
          <div className="santi-hero__right">
            <div className="santi-hero__figure">
              <img
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80"
                alt=""
                loading="eager"
              />
            </div>
            <div className="santi-hero__float">
              <p className="santi-hero__float-title">Seleção 2026</p>
              <p>PeRo · Pato Criollo · Dons da Terra</p>
            </div>
            <p className="santi-hero__scroll">Scroll</p>
          </div>
        </div>
      </section>

      <section className="santi-section" id="sobre">
        <div className="santi-about">
          <div className="santi-about__visual">
            <div className="santi-about__img santi-about__img--a">
              <img
                src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=700&q=80"
                alt=""
              />
            </div>
            <div className="santi-about__img santi-about__img--b">
              <img
                src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=700&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="santi-about__text">
            <p className="santi-eyebrow">Sobre nós</p>
            <h2 className="santi-title">
              Importação com <em>disciplina</em> e sensibilidade.
            </h2>
            <p>
              A Santi &amp; Santi nasceu da vontade de aproximar rótulos
              autênticos do mercado brasileiro, com transparência na cadeia e
              respeito ao produtor.
            </p>
            <p>
              Trabalhamos com marcas que traduzem terroir e consistência —
              desde labels icônicos até edições que merecem destaque em carta e
              adega.
            </p>
            <div className="santi-stats">
              <div>
                <div className="santi-stat__num">13+</div>
                <div className="santi-stat__lbl">Rótulos ativos</div>
              </div>
              <div>
                <div className="santi-stat__num">2</div>
                <div className="santi-stat__lbl">Países de origem</div>
              </div>
              <div>
                <div className="santi-stat__num">100%</div>
                <div className="santi-stat__lbl">Curadoria própria</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="santi-section" id="produtos">
        <div className="santi-products">
          <div className="santi-products__head">
            <p className="santi-eyebrow">Portfólio</p>
            <h2 className="santi-title">Produtos</h2>
          </div>
          <div className="santi-filters" role="group" aria-label="Filtrar por categoria">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`santi-filter-btn${filter === f.id ? ' active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="santi-grid">
            {WINES.map((p) => {
              const hidden =
                visibleIds !== null && !visibleIds.has(p.id);
              return (
                <Link
                  key={p.id}
                  to={`/vinho/${p.slug}`}
                  className={`santi-card santi-card--link${hidden ? ' hidden' : ''}`}
                  data-cat={p.cats.join(' ')}
                >
                  <div className="santi-card__top">
                    <span className="santi-card__tag">{p.tag}</span>
                    <span className="santi-card__badge" aria-hidden={!p.star}>
                      {p.star ? '★' : ''}
                    </span>
                  </div>
                  <div className="santi-card__visual" aria-hidden />
                  <h3 className="santi-card__name">{p.name}</h3>
                  <p className="santi-card__var">{p.varietal}</p>
                  <div className="santi-card__rows">
                    {p.rows.map(([k, v]) => (
                      <div key={k} className="santi-card__row">
                        <span>{k}</span>
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="santi-card__foot">
                    <span className="santi-card__link">
                      Ver ficha <span aria-hidden>→</span>
                    </span>
                    <div className="santi-rating" aria-label="Avaliação">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <span key={i} />
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="santi-section santi-contact" id="contato">
        <div className="santi-contact__inner">
          <div className="santi-contact__text">
            <p className="santi-eyebrow">Contato</p>
            <h2 className="santi-title">
              Solicite o <em>catálogo</em> ou uma conversa.
            </h2>
            <p>
              Equipe comercial pronta para atender importadores, distribuidores
              e canais HORECA com propostas sob medida.
            </p>
            <div className="santi-info-list">
              <div className="santi-info-item">
                <span className="santi-info-item__icon" aria-hidden>
                  ✉
                </span>
                <div>
                  <strong>E-mail</strong>
                  <span>contato@santiesanti.com.br</span>
                </div>
              </div>
              <div className="santi-info-item">
                <span className="santi-info-item__icon" aria-hidden>
                  ◎
                </span>
                <div>
                  <strong>Atendimento</strong>
                  <span>Segunda a sexta, 9h–18h</span>
                </div>
              </div>
              <div className="santi-info-item">
                <span className="santi-info-item__icon" aria-hidden>
                  ◈
                </span>
                <div>
                  <strong>Logística</strong>
                  <span>Entregas em todo o território nacional</span>
                </div>
              </div>
            </div>
          </div>
          <form
            className="santi-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="santi-form__grid">
              <div className="santi-form__span2">
                <label htmlFor="nome">Nome</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nome@empresa.com.br"
                />
              </div>
              <div>
                <label htmlFor="telefone">Telefone</label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
            <div className="santi-form__full">
              <label htmlFor="mensagem">Mensagem</label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={5}
                placeholder="Linhas de interesse, volumes, prazo para retorno…"
              />
            </div>
            <p className="santi-form__note">
              Ao enviar, você concorda com o uso dos dados apenas para retorno
              comercial, conforme nossa política de privacidade.
            </p>
            <button type="submit">Enviar mensagem</button>
          </form>
        </div>
      </section>

      <footer className="santi-footer">
        <span>
          © {new Date().getFullYear()} Santi &amp; Santi Importadora e
          Distribuidora
        </span>
        <div className="santi-footer__links">
          <a href="#top">Privacidade</a>
          <a href="#top">Termos</a>
          <a href="#contato">Contato</a>
        </div>
        <div className="santi-footer__social">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            in
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            IG
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;

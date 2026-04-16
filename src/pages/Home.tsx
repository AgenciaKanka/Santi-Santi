import type { CSSProperties, FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FooterKankaLogo } from '../components/FooterKanka';
import { FooterSocial } from '../components/FooterSocial';
import {
  FILTERS,
  WINES,
  wineCountryFromRows,
  wineFlagImageSrc,
  winePublicImageSrc,
} from '../data/wines';
import './santi-home.css';

const base = import.meta.env.BASE_URL || '/';

/** Catálogo em `public/` — 2026 (nome do ficheiro no disco). */
const CATALOG_PDF_FILE = 'Catálogo Santi Santi - 2026 - FINAL Alta.pdf';

/** POST do formulário de contacto (respeita `base` do Vite em produção). */
const CONTACT_API_URL = `${(import.meta.env.BASE_URL || '/').replace(/\/?$/, '')}/api/contact`.replace(
  /([^:])\/{2,}/g,
  '$1/',
);

/** Arquivos em /public — ordem de exibição no carrossel */
const CAROUSEL_FILES = [
  'alp0h3e (1).jpeg',
  'cpywczg (1).jpeg',
  'fq2dweh (1).jpeg',
  'gx5nrvq (1).jpeg',
  'kcesn0u (1).jpeg',
  'mimfbcq.jpeg',
  'o8q8ozg (1).jpeg',
  'u12ec77 (1).jpeg',
] as const;

const CAROUSEL_SLIDES = CAROUSEL_FILES.map((file, i) => ({
  src: `${base}${encodeURIComponent(file)}`,
  alt: `Destaque do portfólio — imagem ${i + 1} de ${CAROUSEL_FILES.length}`,
}));

/** Quantas miniaturas aparecem ao mesmo tempo no carrossel */
const CAROUSEL_VISIBLE = 3;

const Home = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('todos');
  const [contactSubmit, setContactSubmit] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [contactFeedback, setContactFeedback] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselLen = CAROUSEL_SLIDES.length;
  const carouselMaxIndex = Math.max(0, carouselLen - CAROUSEL_VISIBLE);
  const carouselPageCount = carouselMaxIndex + 1;

  useEffect(() => {
    if (carouselMaxIndex <= 0) return undefined;
    const id = window.setInterval(() => {
      setCarouselIndex((i) => (i >= carouselMaxIndex ? 0 : i + 1));
    }, 6000);
    return () => window.clearInterval(id);
  }, [carouselMaxIndex]);

  const goPrev = () =>
    setCarouselIndex((i) => (i <= 0 ? carouselMaxIndex : i - 1));
  const goNext = () =>
    setCarouselIndex((i) => (i >= carouselMaxIndex ? 0 : i + 1));

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const nome = String(fd.get('nome') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const telefone = String(fd.get('telefone') ?? '').trim();
    const mensagem = String(fd.get('mensagem') ?? '').trim();

    setContactSubmit('loading');
    setContactFeedback('');

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, telefone, mensagem }),
      });
      let data: { ok?: boolean; message?: string } = {};
      try {
        data = await res.json();
      } catch {
        /* resposta não JSON */
      }
      if (!res.ok) {
        setContactSubmit('error');
        setContactFeedback(
          typeof data.message === 'string'
            ? data.message
            : 'Não foi possível enviar a mensagem.',
        );
        return;
      }
      setContactSubmit('success');
      setContactFeedback(
        typeof data.message === 'string' ? data.message : 'Mensagem enviada.',
      );
      form.reset();
    } catch {
      setContactSubmit('error');
      setContactFeedback(
        'Não foi possível contactar o servidor. Inicie a API na pasta server (porta 3001) ou tente mais tarde.',
      );
    }
  };

  const visibleIds = useMemo(() => {
    if (filter === 'todos') return null;
    return new Set(
      WINES.filter((p) => p.cats.includes(filter)).map((p) => p.id),
    );
  }, [filter]);

  return (
    <div className="santi-home">
      <section className="santi-section" id="top">
        <div className="santi-hero">
          <div className="santi-hero__left">
            <a href="#top" className="santi-hero__brand">
              <img
                className="santi-hero__logo"
                src={`${base}logo-sem-fundo.svg`}
                alt="Santi &amp; Santi"
                width="109"
                height="109"
                decoding="async"
              />
              <span className="santi-hero__brand-name">
                Santi &amp; Santi Importadora
              </span>
            </a>
            <p className="santi-eyebrow">Importadora &amp; Distribuidora</p>
            <h1 className="santi-title">
              Vinhos selecionados com <em>alma</em> e precisão.
            </h1>
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
              <p>Potre · Pato Criollo · Dons da Terra</p>
            </div>
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
              Uma família entre dois <em>mundos</em>.
            </h2>
            <p>
              Curadoria entre o Novo e o Velho Mundo, logística impecável e
              parceria próxima com quem valoriza o detalhe. Do portfólio à taça.
            </p>
            <p>
              A Santi &amp; Santi Importadora nasceu do sonho de uma família de
              origem italiana no sul do Brasil. Carregando a essência do
              encontro entre o Velho e o Novo Mundo. Valorizando tradições
              enquanto busca constante evolução e excelência.
            </p>
            <p>
              Cruzando fronteiras em busca de experiências únicas. Levando à
              mesa dos brasileiros vinhos que entregam qualidade, histórias e
              celebração da vida.
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

          <div
            className="santi-carousel"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Destaques do portfólio"
            style={
              {
                '--carousel-n': carouselLen,
                '--carousel-visible': CAROUSEL_VISIBLE,
              } as CSSProperties
            }
          >
            <div className="santi-carousel__viewport">
              <div
                className="santi-carousel__track"
                style={{
                  transform: `translateX(calc(-1 * ${carouselIndex} * 100% / var(--carousel-n)))`,
                }}
              >
                {CAROUSEL_SLIDES.map((slide, i) => {
                  const inView =
                    i >= carouselIndex &&
                    i < carouselIndex + CAROUSEL_VISIBLE;
                  return (
                    <div
                      key={slide.src}
                      className="santi-carousel__slide"
                      aria-hidden={!inView}
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        loading={i < CAROUSEL_VISIBLE ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              className="santi-carousel__nav santi-carousel__nav--prev"
              onClick={goPrev}
              aria-label="Grupo anterior de imagens"
            >
              <span aria-hidden>‹</span>
            </button>
            <button
              type="button"
              className="santi-carousel__nav santi-carousel__nav--next"
              onClick={goNext}
              aria-label="Próximo grupo de imagens"
            >
              <span aria-hidden>›</span>
            </button>
            <div
              className="santi-carousel__dots"
              role="tablist"
              aria-label="Selecionar grupo de imagens"
            >
              {Array.from({ length: carouselPageCount }, (_, page) => (
                <button
                  key={page}
                  type="button"
                  role="tab"
                  aria-selected={page === carouselIndex}
                  aria-label={`Grupo ${page + 1} de ${carouselPageCount}`}
                  className={`santi-carousel__dot${page === carouselIndex ? ' active' : ''}`}
                  onClick={() => setCarouselIndex(page)}
                />
              ))}
            </div>
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
              const origin = wineCountryFromRows(p);
              return (
                <Link
                  key={p.id}
                  to={`/vinho/${p.slug}`}
                  className={`santi-card santi-card--link${hidden ? ' hidden' : ''}`}
                  data-cat={p.cats.join(' ')}
                >
                  <div className="santi-card__top">
                    <span className="santi-card__tag">{p.tag}</span>
                    <div className="santi-card__rating">
                      <div
                        className="santi-card__stars"
                        role="img"
                        aria-label="Avaliação: 5 de 5 estrelas"
                      >
                        {[0, 1, 2, 3, 4].map((i) => (
                          <span key={i} className="santi-card__star" aria-hidden>
                            ★
                          </span>
                        ))}
                      </div>
                      {origin ? (
                        <img
                          className="santi-card__flag"
                          src={wineFlagImageSrc(origin.iso)}
                          alt=""
                          title={`Origem: ${origin.name}`}
                          width={22}
                          height={16}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
                    </div>
                  </div>
                  <div
                    className={`santi-card__visual${p.image ? ' santi-card__visual--bottle' : ''}`}
                    aria-hidden
                  >
                    {p.image ? (
                      <img
                        className="santi-card__bottle-img"
                        src={winePublicImageSrc(p.image)}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                  </div>
                  <h3 className="santi-card__name">{p.name}</h3>
                  <p className="santi-card__var">{p.varietal}</p>
                  <div className="santi-card__rows">
                    {p.cardRows.map(([k, v]) => (
                      <div key={`${p.id}-${k}`} className="santi-card__row">
                        <span>{k}</span>
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="santi-card__foot">
                    <span className="santi-card__link">
                      Ver ficha <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="santi-products__cta-row">
            <a className="santi-btn-pill" href="#contato">
              Seja um revendedor
            </a>
            <a
              className="santi-btn-pill"
              href={`${base}${encodeURIComponent(CATALOG_PDF_FILE)}`}
              download="Santi-Santi-Catalogo-2026.pdf"
            >
              Baixar catálogo
            </a>
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
              e canais de hotéis, restaurantes e cafés com propostas sob medida.
            </p>
            <div className="santi-info-list">
              <div className="santi-info-item">
                <span className="santi-info-item__icon" aria-hidden>
                  ✉
                </span>
                <div>
                  <strong>E-mail</strong>
                  <a href="mailto:andre@santiesantiimportadora.com.br">
                    andre@santiesantiimportadora.com.br
                  </a>
                </div>
              </div>
              <div className="santi-info-item">
                <span className="santi-info-item__icon" aria-hidden>
                  <svg
                    className="santi-info-item__svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3.5 2" />
                  </svg>
                </span>
                <div>
                  <strong>Atendimento</strong>
                  <span>Segunda a sexta, 9h–18h</span>
                </div>
              </div>
              <div className="santi-info-item">
                <span className="santi-info-item__icon" aria-hidden>
                  <svg
                    className="santi-info-item__svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 8h11v9H2V8z" />
                    <path d="M13 12h4l3 3v2h-7" />
                    <circle cx="6.5" cy="19" r="2" />
                    <circle cx="17" cy="19" r="2" />
                  </svg>
                </span>
                <div>
                  <strong>Logística</strong>
                  <span>Entregas em todo o território nacional</span>
                </div>
              </div>
            </div>
          </div>
          <form className="santi-form" onSubmit={handleContactSubmit} noValidate>
            <div className="santi-form__grid">
              <div className="santi-form__span2">
                <label htmlFor="nome">Nome</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="Nome completo"
                  required
                  maxLength={200}
                  disabled={contactSubmit === 'loading'}
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
                  required
                  maxLength={320}
                  disabled={contactSubmit === 'loading'}
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
                  maxLength={60}
                  disabled={contactSubmit === 'loading'}
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
                required
                maxLength={8000}
                disabled={contactSubmit === 'loading'}
              />
            </div>
            <p className="santi-form__note">
              Ao enviar, você concorda com o uso dos dados apenas para retorno
              comercial, conforme nossa{' '}
              <Link to="/privacidade">política de privacidade</Link>.
            </p>
            {contactFeedback ? (
              <p
                className={`santi-form__feedback${contactSubmit === 'success' ? ' santi-form__feedback--success' : ''}${contactSubmit === 'error' ? ' santi-form__feedback--error' : ''}`}
                role="status"
                aria-live="polite"
              >
                {contactFeedback}
              </p>
            ) : null}
            <button type="submit" disabled={contactSubmit === 'loading'}>
              {contactSubmit === 'loading' ? 'Enviando…' : 'Enviar mensagem'}
            </button>
          </form>
        </div>
      </section>

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

export default Home;

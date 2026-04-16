const base = import.meta.env.BASE_URL || '/';
const prefix = base.endsWith('/') ? base : `${base}/`;
const KANKA_LOGO_CLARA = `${prefix}assinatura-projetos-kanka-branca.svg`;

/** Assinatura Kanka (logo clara) — `public/assinatura-projetos-kanka-branca.svg` */
export function FooterKankaLogo() {
  return (
    <div className="santi-footer__kanka">
      <a
        href="https://www.kanka.com.br"
        target="_blank"
        rel="noopener noreferrer"
        className="santi-footer__kanka-link"
        aria-label="Kanka — projetos digitais (abre em nova aba)"
      >
        <img
          src={KANKA_LOGO_CLARA}
          alt=""
          width={176}
          height={18}
          decoding="async"
        />
      </a>
    </div>
  );
}

/** POST do formulário de contacto / solicitação (respeita `base` do Vite em produção). */
export function getContactApiUrl(): string {
  return `${(import.meta.env.BASE_URL || '/').replace(/\/?$/, '')}/api/contact`.replace(
    /([^:])\/{2,}/g,
    '$1/',
  );
}

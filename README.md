# Limboto Tower visitor guide

Independent Indonesian and English visitor information for Menara Keagungan Limboto / Pakaya Tower. This is not an operator or government website.

## Local development and deployment

Use the pinned pnpm version and Node.js. `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm test`, then `pnpm build`. The build creates eight pre-rendered language/topic pages, a noindex error page, robots and sitemap under `dist/public`; generated output is ignored by this repository. `pnpm deploy` builds and invokes Wrangler. The Worker uses an ASSETS binding, canonical HTTP/www redirects preserving paths and queries, and 404 asset handling. The verified Cloudflare project is `limbototower`.

## Sources and scope

See [research notes](research_notes.md). Dated map hours describe a place listing, not permission to enter the tower or use a lift/observation level. Admission, upper-level access, facilities and transport availability require separate confirmation. Nearby places are candidates requiring their own checks.

## Images

The existing location JPEG is byte-identical to [Menara Keagungan Limboto.jpg](https://commons.wikimedia.org/wiki/File:Menara_Keagungan_Limboto.jpg), attributed there to **Hendrik Saleh**, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The former repository attribution to Muh. Irfan Fikry was incorrect. The hero and social preview use an aspect-preserving 1920-pixel WebP derivative, resized/re-encoded from that source, with CSS crop/colour treatment under the same licence. The large source JPEG is not included in public build assets. Current conditions may differ. The Commons description displayed a deletion nomination on 19 October 2026; this check does not resolve that nomination or independently establish ownership.

The baseline README described the remaining PNG designs as generated custom illustrations. They remain decorative/reference design assets; they are not evidence of current tower access or facilities. No additional licence or author claim is made for those assets.

## Privacy implementation

No account, booking or contact form is provided. Google Maps and Google Fonts are external resources. Google Analytics remains disabled until consent. Cookie Settings applies refusal immediately; restricted browser storage is reported without claiming persistence in new tabs/browsers. Obsolete debugging collectors and unused template proxy/auth code have been removed.

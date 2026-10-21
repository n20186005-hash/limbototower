type Env = { ASSETS: { fetch: (request: Request) => Promise<Response> } };
const routes = new Set(['/', '/en/', '/privacy/', '/terms/', '/cookies/', '/en/privacy/', '/en/terms/', '/en/cookies/']);
export default { async fetch(request: Request, env: Env): Promise<Response> {
 const url = new URL(request.url);
 if ((url.hostname === 'limbototower.com' || url.hostname === 'www.limbototower.com') && (url.protocol !== 'https:' || url.hostname !== 'limbototower.com')) { url.protocol = 'https:'; url.hostname = 'limbototower.com'; return Response.redirect(url.toString(),301); }
 if (url.pathname !== '/' && routes.has(url.pathname + '/')) { url.pathname += '/'; return Response.redirect(url.toString(),301); }
 const explicitError = /^\/404(?:\.html)?\/?$/.test(url.pathname);
 const assetRequest = explicitError ? new Request(new URL('/404', url), request) : request;
 const response = await env.ASSETS.fetch(assetRequest);
 if (explicitError || response.status === 404) { const headers = new Headers(response.headers); headers.set('X-Robots-Tag','noindex, follow'); return new Response(request.method === 'HEAD' ? null : response.body,{status:404,headers}); }
 return response;
} };

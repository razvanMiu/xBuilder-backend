/**
 * Url helper.
 * @module helpers/url/url
 */

export function getUrl(req, withApiPath = false): string {
  return `${
    withApiPath ? getApiUrl(req) : getRootUrl(req)
  }${removeTrailingSlash(req.url)}`;
}

export function getApiUrl(req): string {
  const seamlessModePath = req.headers['seamless-mode-path'];
  return `${getRootUrl(req)}${seamlessModePath || ''}`;
}

export function getRootUrl(req): string {
  const seamlessModePath = req.headers['seamless-mode-path'];
  if (!seamlessModePath) return `${req.protocol}://${req.headers.host}`;
  const protocol = req.headers['x-forwarded-proto'];
  const host = req.headers['x-forwarded-host'];
  return `${protocol}://${host}`;
}

export function removeTrailingSlash(str: string): string {
  return str.replace(/\/+$/, '');
}

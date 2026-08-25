import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - api routes (e.g. /api/...)
  // - _next internals (e.g. /_next/...)
  // - static file names with dots (e.g. favicon.ico, cv.pdf)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

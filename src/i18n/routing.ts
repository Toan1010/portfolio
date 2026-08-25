import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import locales from '../../messages/locales.json';

export const routing = defineRouting({
  locales: locales,
  defaultLocale: 'vi'
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);

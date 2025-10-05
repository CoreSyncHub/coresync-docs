// sidebar-utils.ts
import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import { CATEGORY_CONFIG, LIBRARIES } from './categories';

export interface Category {
  id: string;
  title: string;
  items: PropSidebarItem[];
}

/**
 * Renvoie la "section racine" après les bases et /category.
 * Ex:
 *  /ngx-query/overview                  → overview
 *  /ngx-query/guides/setup              → guides
 *  /ngx-query/api/classes/QueryClient   → api
 *  /docs/category/guides                → guides
 */
export const getRootSection = (href: string): string => {
  const segments = href
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean);

  if (segments.length === 0) return '';

  // retire les bases de route connues
  while (segments.length > 0 && LIBRARIES.has(segments[0])) {
    segments.shift();
  }

  // retire le segment "category" de Docusaurus
  if (segments[0] === 'category') segments.shift();

  return segments[0] ?? '';
};

/**
 * Détermine la section racine d’un item.
 */
export const getPrimaryDirectory = (item: PropSidebarItem): string => {
  if (item.type === 'link') {
    const href = (item as any).href as string | undefined;
    return href ? getRootSection(href) : '';
  }

  if (item.type === 'category') {
    const href = (item as any).href as string | undefined;
    if (href) return getRootSection(href);

    const children = (item as any).items as PropSidebarItem[] | undefined;
    return children?.length ? getPrimaryDirectory(children[0]) : '';
  }

  return '';
};

/**
 * Indique si un item appartient à un ensemble de sections.
 * On compare la section racine (égalité stricte).
 */
export const itemMatchesPattern = (
  item: PropSidebarItem,
  patterns: readonly string[],
  exactMatch: boolean = true
): boolean => {
  const section = getPrimaryDirectory(item);
  if (!section) return false;

  if (exactMatch) return patterns.includes(section);
  // fallback "contains" si jamais tu repasses à des patterns partiels
  return patterns.some((p) => section.includes(p));
};

/**
 * Trie récursivement les items selon l’ordre de sections donné.
 */
export const sortItemsByDirectoryOrder = (
  items: PropSidebarItem[],
  directoryOrder: readonly string[],
  exactMatch: boolean = true
): PropSidebarItem[] => {
  const withSortedChildren = items.map((item) => {
    if (item.type === 'category') {
      const childItems = (item as any).items as PropSidebarItem[] | undefined;
      if (Array.isArray(childItems)) {
        return {
          ...item,
          items: sortItemsByDirectoryOrder(childItems, directoryOrder, exactMatch),
        } as PropSidebarItem;
      }
    }
    return item;
  });

  return withSortedChildren.sort((a, b) => {
    const aKey = getPrimaryDirectory(a);
    const bKey = getPrimaryDirectory(b);

    const aIndex = exactMatch
      ? directoryOrder.indexOf(aKey)
      : directoryOrder.findIndex((dir) => aKey.includes(dir));
    const bIndex = exactMatch
      ? directoryOrder.indexOf(bKey)
      : directoryOrder.findIndex((dir) => bKey.includes(dir));

    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
};

/**
 * Filtre les items d’une sidebar pour une catégorie donnée.
 */
export const getItemsForCategory = (
  sidebar: PropSidebarItem[],
  categoryDirectories: readonly string[],
  exactMatch: boolean = true
): PropSidebarItem[] => {
  if (!Array.isArray(sidebar)) return [];
  return sidebar.filter((item) => itemMatchesPattern(item, categoryDirectories, exactMatch));
};

/**
 * Construit les catégories prêtes à afficher.
 */
export const buildCategories = (sidebar: PropSidebarItem[]): Category[] => {
  return Object.entries(CATEGORY_CONFIG).map(([id, config]) => {
    const matched = getItemsForCategory(sidebar, config.directories, config.exactMatch);
    const sorted = sortItemsByDirectoryOrder(matched, config.directories, config.exactMatch);
    return { id, title: config.title, items: sorted };
  });
};

/**
 * Lien actif si pathname est égal ou préfixe profond.
 */
export const isActiveLink = (href: string, currentPathname: string): boolean => {
  return currentPathname === href || currentPathname.startsWith(href + '/');
};

/**
 * Indique si une catégorie a un enfant actif.
 */
export const hasActiveChild = (items: PropSidebarItem[], pathname: string): boolean => {
  return items.some((item) => {
    if (item.type === 'link') {
      const href = (item as any).href as string | undefined;
      return !!href && pathname.startsWith(href);
    }
    if (item.type === 'category') {
      const children = (item as any).items as PropSidebarItem[] | undefined;
      return Array.isArray(children) && hasActiveChild(children, pathname);
    }
    return false;
  });
};

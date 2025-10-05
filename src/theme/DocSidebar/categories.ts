type CategoryConfig = {
  title: string;
  directories: string[];
  exactMatch: boolean;
};

export const LIBRARIES = new Set<string>(['ngx-query']);

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  gettingStarted: {
    title: 'Getting Started',
    directories: ['overview', 'installation', 'quickstart'],
    exactMatch: true,
  },
  guides: {
    title: 'Guides & Concepts',
    directories: ['guides'],
    exactMatch: true,
  },
  apiReference: {
    title: 'API Reference',
    directories: ['api'],
    exactMatch: false,
  },
} as const;

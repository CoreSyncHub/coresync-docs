import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'CoreSync Docs',
  tagline: 'Documentation for CoreSync libraries and tools',
  favicon: 'img/favicon.ico',

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'CoreSync',
  projectName: 'coresync-docs',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },

  future: {
    v4: true,
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ngx-query',
        path: 'libs/ngx-query',
        routeBasePath: 'ngx-query',
        sidebarPath: './sidebars.ts',
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    docs: {},
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '',
      logo: {
        alt: 'CoreSync Logo',
        src: 'img/CoreSync-Docs-Light.svg',
        srcDark: '/img/CoreSync-Docs-Dark.svg',
      },
      items: [{ to: '/ngx-query/overview', label: 'NGX Query', position: 'left' }],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['powershell', 'bash', 'json', 'yaml', 'typescript', 'tsx'],
    },
  } satisfies Preset.ThemeConfig,

  onBrokenLinks: 'throw',
};

export default config;

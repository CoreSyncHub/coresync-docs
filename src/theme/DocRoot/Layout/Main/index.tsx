// DocRootLayoutMain.tsx (sans module CSS)
import React from 'react';
import clsx from 'clsx';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import './index.scss';
import Logo from '@site/static/img/logo.svg';
import GithubIcon from '@site/static/icons/github.svg';

export default function DocRootLayoutMain({ hiddenSidebarContainer, children }) {
  const sidebar = useDocsSidebar();
  return (
    <main
      className={clsx(
        'docMainContainer',
        (hiddenSidebarContainer || !sidebar) && 'docMainContainerEnhanced'
      )}
    >
      <div
        className={clsx(
          'container padding-top--md padding-bottom--lg',
          'docItemWrapper',
          hiddenSidebarContainer && 'docItemWrapperEnhanced'
        )}
      >
        {children}
        <div id="coresync-footer" className="footer">
          <div className="footerContent">
            <div className="footerLogo">
              <Logo />
            </div>
            <div className="footerCopyright">
              © {new Date().getFullYear()} CoreSync. All rights reserved
            </div>
            <div className="footerSocial">
              <a href="https://github.com/CoreSyncHub" target="_blank" rel="noopener noreferrer">
                <GithubIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

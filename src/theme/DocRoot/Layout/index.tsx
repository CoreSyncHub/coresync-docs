import { useState } from 'react';
import DocRootLayoutMain from './Main';
import DocRootLayoutSidebar from './Sidebar';
import { useDocsSidebar } from '@docusaurus/plugin-content-docs/client';
import './index.scss';

export default function DocRootLayout({ children }) {
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const sidebar = useDocsSidebar();

  return (
    <div className="docsWrapper">
      {/* <BackToTopButton /> */}
      <div className="docRoot">
        {sidebar && (
          <DocRootLayoutSidebar
            sidebar={sidebar.items}
            hiddenSidebarContainer={hiddenSidebarContainer}
            setHiddenSidebarContainer={setHiddenSidebarContainer}
          />
        )}
        <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocRootLayoutMain>
      </div>
    </div>
  );
}

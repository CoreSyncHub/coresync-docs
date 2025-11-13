import NavbarItem, { type Props as NavbarItemConfig } from '@theme/NavbarItem';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import { ReactNode } from 'react';
import { splitNavbarItems, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import GithubIcon from '@site/static/icons/github.svg';
import DiscordIcon from '@site/static/icons/discord.svg';
import './index.scss';

function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({ items }: { items: NavbarItemConfig[] }): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
               Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
               ${JSON.stringify(item, null, 2)}`,
              { cause: error }
            )
          }
        >
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({ left, right }: { left: ReactNode; right: ReactNode }): ReactNode {
  return (
    <div className="navbar navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

export default function NavbarContent(): ReactNode {
  const mobile = useNavbarMobileSidebar();

  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobile.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        <>
          <NavbarItems items={rightItems} />
          <div className="buttons">
            <a href="https://github.com/CoreSyncHub" target="_blank" rel="noopener noreferrer">
              <GithubIcon />
            </a>
            { /** <a href="https://discord.gg/coresync" target="_blank" rel="noopener noreferrer">
              <DiscordIcon />
            </a> */ }
            <NavbarColorModeToggle />
          </div>
        </>
      }
    />
  );
}

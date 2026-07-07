'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/support', label: 'Support' },
] as const;

// App deep-link landing pages are a focused, dark interstitial — the site
// header clashes there. Their card's Valoré brand row links home instead.
const DEEP_LINK_PREFIXES = ['/hotel/', '/review/', '/user/', '/collection/'];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  if (DEEP_LINK_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return null;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(previousState => !previousState);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="header-logo">
            Valoré
          </Link>
          <nav className="header-nav">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map(link => (
          <Link key={link.href} href={link.href} onClick={closeMobileMenu}>
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}

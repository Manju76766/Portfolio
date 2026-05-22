import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { SparklesText } from './ui/sparkles-text';
import { Globe } from './ui/globe';
import { SlideButton } from './ui/slide-button';

// Pure CSS roll animation — butter smooth, zero JS during hover
const footerRollCSS = `
  .footer-roll {
    display: block;
    overflow: hidden;
    height: 18px;
    text-decoration: none;
    cursor: pointer;
  }
  .footer-roll-inner {
    display: flex;
    flex-direction: column;
    transform: translateY(0);
    transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .footer-roll:hover .footer-roll-inner {
    transform: translateY(-18px);
  }
  .footer-roll-span {
    display: block;
    height: 18px;
    line-height: 18px;
    white-space: nowrap;
  }

  /* Mobile footer premium contact icon ring */
  .mobile-contact-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid #D1D5DB;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    transition: border-color 0.2s ease, background 0.2s ease;
  }
  .mobile-contact-icon:hover {
    border-color: #9CA3AF;
    background: #F9FAFB;
  }

  /* Social pill button */
  .mobile-social-pill {
    padding: 9px 22px;
    border-radius: 999px;
    border: 1px solid #E5E7EB;
    font-size: 13px;
    font-family: 'Sora', sans-serif;
    font-weight: 500;
    color: #374151;
    background: transparent;
    text-decoration: none;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }
  .mobile-social-pill:hover {
    border-color: #9CA3AF;
    color: #111;
    background: #F9FAFB;
  }
`;

function FooterRollLink({ label, href = '#', isRoute = false, onClick, className = '' }) {
  const inner = (
    <span className="footer-roll-inner">
      <span className="footer-roll-span">{label}</span>
      <span className="footer-roll-span" style={{ color: '#9CA3AF' }}>{label}</span>
    </span>
  );

  if (isRoute) {
    return (
      <Link
        to={href}
        className={`footer-roll ${className}`}
        onClick={onClick}
      >
        {inner}
      </Link>
    );
  }

  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      className={`footer-roll ${className}`}
      onClick={onClick}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {inner}
    </a>
  );
}

const Footer = () => {
  useEffect(() => {
    if (!document.getElementById('footer-roll-styles')) {
      const style = document.createElement('style');
      style.id = 'footer-roll-styles';
      style.textContent = footerRollCSS;
      document.head.appendChild(style);
    }
  }, []);

  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const quickLinks = [
    { label: 'Home', href: '/', isRoute: true, onClick: scrollToTop },
    { label: 'About', href: '#about', isRoute: false, onClick: (e) => scrollToSection('about', e) },
    { label: 'Services', href: '#services', isRoute: false, onClick: (e) => scrollToSection('services', e) },
    { label: 'Projects', href: '#projects', isRoute: false, onClick: (e) => scrollToSection('projects', e) },
    { label: 'Creative Edge', href: '#creative-edge', isRoute: false, onClick: (e) => scrollToSection('creative-edge', e) },
    { label: 'Contact', href: '/contact', isRoute: true, onClick: null },
  ];

  const contactItems = [
    {
      icon: <Phone size={19} strokeWidth={1.4} color="#374151" />,
      label: 'Call Today',
      value: '+91 767660 7330',
      href: 'tel:+917676607330',
    },
    {
      icon: <Mail size={19} strokeWidth={1.4} color="#374151" />,
      label: 'Email me',
      value: 'naikmanju716@gmail.com',
      href: 'mailto:naikmanju716@gmail.com',
    },
  ];

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/Manju76766' },
    { label: 'Twitter "X"', href: 'https://x.com/manju_naik46' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/manju-naik-b4a1333b1/' },
    { label: 'Instagram', href: 'https://www.instagram.com/_mr_bloody_sweet_/' },
  ];

  return (
    <footer className="w-full bg-white bg-opacity-80 py-20 px-4 md:px-10 border-t border-gray/10">
      <div className="max-w-7xl mx-auto">
        {/* CTA SECTION */}
        <div className="footer-cta flex flex-col md:flex-row items-center justify-between gap-10 mb-20 text-center md:text-left">
          <div className="max-w-2xl">
            <SparklesText
              text="READY TO TAKE YOUR IDEA TO THE NEXT LEVEL?"
              colors={{ first: '#C4F038', second: '#BF5AF2' }}
              sparklesCount={14}
              className="text-4xl md:text-6xl font-sora font-extrabold tracking-tight text-text leading-tight mb-4"
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-[300px] h-[300px] flex-shrink-0">
              <Globe
                markerColor={[0.2, 0.8, 0.2]}
                baseColor={[0.9, 0.9, 0.9]}
                arcColor={[0.2, 0.8, 0.2]}
                glowColor={[0.8, 1, 0.2]}
                dark={0}
                mapBrightness={8}
                markerSize={0.03}
                markerElevation={0.02}
                speed={0.004}
              />
            </div>
            <SlideButton text="Contact me" />
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', margin: '48px 0' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#111', transform: 'rotate(45deg)', flexShrink: 0 }} />
          <div style={{ flex: 1, height: '2px', backgroundColor: '#111' }} />
          <div style={{ width: '10px', height: '10px', backgroundColor: '#111', transform: 'rotate(45deg)', flexShrink: 0 }} />
        </div>

        {/* DESKTOP BOTTOM LINKS */}
        <div className="footer-links-grid hidden md:grid grid-cols-1 md:grid-cols-4 gap-12 mt-12 pb-10">
          <div className="hidden md:flex flex-col gap-4">
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2 font-sora">Quick Links</h4>
            {quickLinks.map((link) => (
              <FooterRollLink
                key={link.label}
                label={link.label}
                href={link.href}
                isRoute={link.isRoute}
                onClick={link.onClick}
                className="text-sm font-sora font-medium text-text"
              />
            ))}
          </div>

          <div className="hidden md:flex flex-col gap-4">
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2 font-sora">Portfolio</h4>
            {[
              { label: 'CONTRA', href: '#' },
              { label: 'GITHUB', href: 'https://github.com/Manju76766' },
              { label: 'CODEPEN', href: '#' },
            ].map((link) => (
              <FooterRollLink key={link.label} label={link.label} href={link.href} className="text-sm font-sora font-medium text-text uppercase" />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2 font-sora">Social Link</h4>
            <div className="flex flex-col gap-4">
              {[
                { label: 'GITHUB', href: 'https://github.com/Manju76766' },
                { label: 'TWITTER "X"', href: 'https://x.com/manju_naik46' },
                { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/manju-naik-b4a1333b1/' },
                { label: 'INSTAGRAM', href: 'https://www.instagram.com/_mr_bloody_sweet_/' },
              ].map((link) => (
                <FooterRollLink key={link.label} label={link.label} href={link.href} className="text-sm font-sora font-medium text-text" />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2 font-sora">Get in Touch</h4>
            <a href="mailto:naikmanju716@gmail.com" className="text-lg font-sora font-bold text-text hover:text-[#9CA3AF] transition-colors">
              naikmanju716@gmail.com
            </a>
            <span className="text-sm font-sora text-muted font-medium">+91 767660 7330</span>
          </div>
        </div>

        {/* DESKTOP FOOTER BAR */}
        <div className="footer-bottom-bar hidden md:flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray/10 text-[10px] uppercase font-bold tracking-widest text-muted mt-10">
          <div className="mb-4 md:mb-0">© 2024 MANJUNATH — ALL RIGHTS RESERVED</div>
          <div className="flex gap-8">
            <Link to="/404" className="hover:text-text transition-colors">404</Link>
            <Link to="/privacy" className="hover:text-text transition-colors">PRIVACY POLICY</Link>
            <Link to="/terms" className="hover:text-text transition-colors">TERM &amp; CONDITION</Link>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            MOBILE ONLY FOOTER — premium refined design
        ───────────────────────────────────────────── */}
        <div className="flex flex-col md:hidden w-full pt-6 pb-6">

          {/* Contact Items */}
          <div className="flex flex-col gap-5 mb-10">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}
              >
                <div className="mobile-contact-icon">
                  {item.icon}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{
                    fontSize: '15px',
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 600,
                    color: '#111827',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.label}
                  </span>
                  <span style={{
                    fontSize: '13.5px',
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 400,
                    color: '#6B7280',
                    letterSpacing: '0',
                  }}>
                    {item.value}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Social Pill Grid — 2 columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginBottom: '32px',
          }}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="mobile-social-pill"
                style={{ textAlign: 'center' }}
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <hr style={{
            border: 'none',
            borderTop: '1px solid #E5E7EB',
            width: '100%',
            margin: '0 0 24px 0',
          }} />

          {/* Bottom Links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}>
            {[
              { label: '404', to: '/404' },
              { label: 'Privacy Policy', to: '/privacy' },
              { label: 'Term & Condition', to: '/terms' },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                style={{
                  fontSize: '12px',
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 500,
                  color: '#9CA3AF',
                  textDecoration: 'none',
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div style={{
            textAlign: 'center',
            fontSize: '11px',
            fontFamily: "'Sora', sans-serif",
            fontWeight: 500,
            color: '#D1D5DB',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            © 2024 MANJUNATH — ALL RIGHTS RESERVED
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
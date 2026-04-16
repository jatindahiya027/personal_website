"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { NAV_ITEMS, PERSONAL } from "../data/portfolio";

function ResumeBtn() {
  const download = () => {
    const a = document.createElement("a");
    a.href = PERSONAL.resume;
    a.download = `${PERSONAL.name.replace(" ", "_")}_Resume.pdf`;
    a.click();
  };
  return (
    <button className="nav-resume-btn" onClick={download}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7,10 12,15 17,10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Resume
    </button>
  );
}

export default function Navbar({ isMobile, scrollTo, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar-outer">
    <nav className="navbar">
      <div className="nav-logo">{PERSONAL.name}</div>

      {/* Desktop */}
      {!isMobile && (
        <div className="nav-links">
          {NAV_ITEMS.map((item, i) => (
            <motion.div key={item.key}
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              style={{ position: "relative" }}>
              <div className="navbar-button" onClick={() => scrollTo(item.key)}>
                {item.label}
                {activeSection === item.key && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="nav-indicator"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </div>
            </motion.div>
          ))}
          {/* Blog — opens /blog page */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: NAV_ITEMS.length * 0.07, duration: 0.35 }}>
            <Link href="/blog" className="navbar-button" style={{ textDecoration: "none" }}>
              Blog
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.35 }}>
            <ResumeBtn />
          </motion.div>
        </div>
      )}

      {/* Mobile */}
      {isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ResumeBtn />
          <button className="hamburger" aria-label="Menu"
            onClick={e => { e.stopPropagation(); setMenuOpen(v => !v); }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#1A1916" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}
            </svg>
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div className="mobileham"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.16 }}
                onClick={e => e.stopPropagation()}>
                {NAV_ITEMS.map(item => (
                  <div key={item.key} className="menu-item"
                    onClick={() => { scrollTo(item.key); setMenuOpen(false); }}>
                    {item.label}
                  </div>
                ))}
                <Link href="/blog" className="menu-item"
                  style={{ display: "block", textDecoration: "none" }}
                  onClick={() => setMenuOpen(false)}>
                  Blog
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </nav>
    </div>
  );
}

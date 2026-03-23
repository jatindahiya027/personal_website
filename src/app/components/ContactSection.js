"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp } from "./animations";
import { TypeOnce } from "./TypeWriter";
import { PERSONAL } from "../data/portfolio";

/**
 * Detects whether the user is on a touch/mobile device.
 * On mobile: use mailto: (opens default mail app — usually Gmail on Android/iOS).
 * On desktop: open Gmail compose in a new tab.
 */
function openEmail({ name, email, message }) {
  const to      = PERSONAL.email;
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  const isTouchDevice =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  if (isTouchDevice) {
    // Mobile/tablet — open default mail app (Gmail, Apple Mail, etc.)
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  } else {
    // Desktop — open Gmail web compose in new tab
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
}

function ContactForm() {
  const [form,    setForm]    = useState({ name: "", email: "", message: "" });
  const [status,  setStatus]  = useState("idle");
  const [touched, setTouched] = useState({});

  const change = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const blur   = (e) => setTouched(t => ({ ...t, [e.target.name]: true }));
  const err    = (f) => touched[f] && !form[f].trim();
  const valid  = form.name.trim() && form.email.trim() && form.message.trim();

  const submit = (e) => {
    e.preventDefault();
    if (!valid) { setTouched({ name: true, email: true, message: true }); return; }
    openEmail(form);
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTouched({});
  };

  if (status === "sent") {
    return (
      <motion.div className="contact-success"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22,4 12,14.01 9,11.01"/>
        </svg>
        <div>
          <p style={{ fontWeight: 500, color: "var(--ink)", marginBottom: 4 }}>
            Your mail app should have opened!
          </p>
          <p style={{ fontSize: "0.88rem", color: "var(--ink2)" }}>
            Or email directly:{" "}
            <a href={`mailto:${PERSONAL.email}`}
              style={{ color: "var(--ink)", textDecoration: "underline" }}>
              {PERSONAL.email}
            </a>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="cf-row">
        <div className={`cf-field${err("name") ? " cf-error" : ""}`}>
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" placeholder="Your name"
            value={form.name} onChange={change} onBlur={blur} autoComplete="name" />
          {err("name") && <span className="cf-err-msg">Please enter your name</span>}
        </div>
        <div className={`cf-field${err("email") ? " cf-error" : ""}`}>
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" placeholder="your@email.com"
            value={form.email} onChange={change} onBlur={blur} autoComplete="email" />
          {err("email") && <span className="cf-err-msg">Please enter your email</span>}
        </div>
      </div>
      <div className={`cf-field${err("message") ? " cf-error" : ""}`}>
        <label htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" name="message" rows={6}
          placeholder="Tell me about your project…"
          value={form.message} onChange={change} onBlur={blur} />
        {err("message") && <span className="cf-err-msg">Please write a message</span>}
      </div>
      <div className="cf-footer">
        <button type="submit" className="cf-submit">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22,2 15,22 11,13 2,9"/>
          </svg>
          Send message
        </button>
        <p className="cf-note">
          Desktop opens Gmail · Mobile opens your mail app · No data sent to any server.
        </p>
      </div>
    </form>
  );
}

export default function ContactSection({ sectionRef }) {
  return (
    <div ref={sectionRef} className="contacts">
      <FadeUp className="contacts-header">
        <div className="section-label">Get in touch</div>
        <h1 className="h1heading">
          <TypeOnce text="Let's Work Together" speed={55} />
        </h1>
      </FadeUp>
      <div className="contact-form-wrap">
        <ContactForm />
      </div>
    </div>
  );
}

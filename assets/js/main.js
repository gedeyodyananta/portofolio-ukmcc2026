/* ============================================================
   main.js — Portfolio JS
   Handles: dark mode · navbar scroll · mobile menu ·
            scroll-spy · entrance animations · contact form ·
            focus trap · dynamic year · scroll progress bar
   ============================================================ */

(() => {
  'use strict';

  /* ──────────────────────────────────────────────────────────
     1. DARK MODE
  ────────────────────────────────────────────────────────── */
  const html     = document.documentElement;
  const toggle   = document.getElementById('theme-toggle');
  const iconSun  = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');

  function applyTheme(dark) {
    html.classList.toggle('dark', dark);
    if (iconSun)  iconSun.classList.toggle('hidden', !dark);
    if (iconMoon) iconMoon.classList.toggle('hidden',  dark);
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); }
    catch (_) {}
  }

  const isDark = html.classList.contains('dark');
  if (iconSun)  iconSun.classList.toggle('hidden', !isDark);
  if (iconMoon) iconMoon.classList.toggle('hidden',  isDark);

  if (toggle) {
    toggle.addEventListener('click', () => {
      applyTheme(!html.classList.contains('dark'));
    });
  }

  /* ──────────────────────────────────────────────────────────
     2. NAVBAR — transparent → glass on scroll
  ────────────────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }

  if (navbar) {
    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
  }

  /* ──────────────────────────────────────────────────────────
     3. SCROLL PROGRESS BAR
     Thin 2px line at the top of the viewport tracking
     how far the user has scrolled.
  ────────────────────────────────────────────────────────── */
  const progressBar = document.createElement('div');
  progressBar.setAttribute('aria-hidden', 'true');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = [
    'position:fixed',
    'top:0',
    'left:0',
    'height:2px',
    'width:0%',
    'z-index:9999',
    'pointer-events:none',
    'background:linear-gradient(to right, rgba(255,255,255,0.55), rgba(255,255,255,0.20))',
    'transition:width 80ms linear',
    'transform-origin:left center',
  ].join(';');
  document.body.appendChild(progressBar);

  /* Light-mode override injected via a style tag */
  const progressStyle = document.createElement('style');
  progressStyle.textContent = ':root:not(.dark) #scroll-progress { background: linear-gradient(to right,rgba(0,0,0,0.35),rgba(0,0,0,0.12)); }';
  document.head.appendChild(progressStyle);

  function updateProgress() {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ──────────────────────────────────────────────────────────
     4. MOBILE MENU + FOCUS TRAP
  ────────────────────────────────────────────────────────── */
  const menuBtn       = document.getElementById('menu-btn');
  const mobileMenu    = document.getElementById('mobile-menu');
  const menuLinks     = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  const iconHamburger = document.getElementById('icon-hamburger');
  const iconClose     = document.getElementById('icon-close');

  function getFocusable() {
    if (!mobileMenu) return [];
    return Array.from(
      mobileMenu.querySelectorAll('a[href], button:not([disabled])')
    );
  }

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (iconHamburger) iconHamburger.classList.add('hidden');
    if (iconClose)     iconClose.classList.remove('hidden');
    if (menuBtn)       menuBtn.setAttribute('aria-expanded', 'true');
    if (navbar)        navbar.classList.add('scrolled');
    /* Move focus into menu */
    const first = getFocusable()[0];
    if (first) requestAnimationFrame(() => first.focus());
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    if (iconHamburger) iconHamburger.classList.remove('hidden');
    if (iconClose)     iconClose.classList.add('hidden');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
    updateNavbar();
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMenu();
      return;
    }
    /* Focus trap */
    if (e.key === 'Tab' && mobileMenu && mobileMenu.classList.contains('open')) {
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ──────────────────────────────────────────────────────────
     5. SCROLL-SPY — precise position-based active link
     Replaces the IntersectionObserver approach that had a
     "last-wins" race condition on fast scrolls.
  ────────────────────────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function setActiveLink(id) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + id);
    });
  }

  function updateActiveFromScroll() {
    if (!sections.length) return;
    const scrollY = window.scrollY + 120; /* offset = navbar height + buffer */
    let active = sections[0];
    sections.forEach(section => {
      if (section.offsetTop <= scrollY) active = section;
    });
    setActiveLink(active.id);
  }

  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
    updateActiveFromScroll();
  }

  /* ──────────────────────────────────────────────────────────
     6. ENTRANCE ANIMATIONS
     Hero fires immediately. All others use IntersectionObserver.
  ────────────────────────────────────────────────────────── */
  const heroAnimEls = document.querySelectorAll(
    '#hero .anim-fade, #hero .anim-reveal, #hero .anim-lift, #hero .anim-scale'
  );

  const allAnimEls   = Array.from(document.querySelectorAll(
    '.anim-fade, .anim-reveal, .anim-lift, .anim-scale'
  ));
  const heroSet      = new Set(heroAnimEls);
  const otherAnimEls = allAnimEls.filter(el => !heroSet.has(el));

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      heroAnimEls.forEach(el => el.classList.add('is-visible'));
    });
  });

  if (otherAnimEls.length) {
    const animObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          animObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });

    otherAnimEls.forEach(el => animObserver.observe(el));
  }

  /* ──────────────────────────────────────────────────────────
     7. CONTACT FORM — validation + async submit
  ────────────────────────────────────────────────────────── */
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    const submitBtn = contactForm.querySelector('.form-submit');

    contactForm.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('blur',  () => validateField(field));
      field.addEventListener('input', () => {
        if (field.dataset.touched) validateField(field);
      });
    });

    function validateField(field) {
      field.dataset.touched = '1';
      const valid = field.checkValidity();
      field.style.borderColor = valid ? '' : 'rgba(239,68,68,0.55)';
      field.style.boxShadow   = valid ? '' : '0 0 0 3px rgba(239,68,68,0.12)';
    }

    function setStatus(msg, isError) {
      let status = contactForm.querySelector('.form-status');
      if (!status) {
        status = document.createElement('p');
        status.className = 'form-status';
        contactForm.appendChild(status);
      }
      status.textContent = msg;
      status.style.cssText = [
        'margin-top:0.875rem',
        'font-size:var(--text-xs)',
        'font-weight:600',
        'letter-spacing:0.04em',
        'text-align:center',
        isError ? 'color:rgba(239,68,68,0.80)' : 'color:#4ade80',
      ].join(';');
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
    }

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let allValid = true;
      contactForm.querySelectorAll('[required]').forEach(field => {
        validateField(field);
        if (!field.checkValidity()) allValid = false;
      });
      if (!allValid) {
        setStatus('Please fill in all required fields.', true);
        return;
      }

      if (submitBtn) {
        submitBtn.disabled    = true;
        submitBtn.textContent = 'Sending…';
      }

      try {
        const response = await fetch(contactForm.getAttribute('action'), {
          method : 'POST',
          body   : new FormData(contactForm),
          headers: { 'Accept': 'application/json' },
        });

        if (response.ok) {
          setStatus('Message sent — I\'ll get back to you within 24 hours.', false);
          contactForm.reset();
          contactForm.querySelectorAll('[required]').forEach(f => {
            f.style.borderColor = '';
            f.style.boxShadow   = '';
            delete f.dataset.touched;
          });
        } else {
          throw new Error('Server error');
        }
      } catch (_) {
        setStatus('Something went wrong. Please email me directly.', true);
      } finally {
        if (submitBtn) {
          submitBtn.disabled    = false;
          submitBtn.textContent = 'Send Message';
        }
      }
    });
  }

  /* ──────────────────────────────────────────────────────────
     8. DYNAMIC COPYRIGHT YEAR
  ────────────────────────────────────────────────────────── */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ──────────────────────────────────────────────────────────
     9. LAZY IMAGE FADE-IN
     Adds .loaded class once each lazy image finishes loading
     so the CSS opacity transition fires cleanly.
  ────────────────────────────────────────────────────────── */
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load',  () => img.classList.add('loaded'), { once: true });
      img.addEventListener('error', () => img.classList.add('loaded'), { once: true });
    }
  });

  /* ──────────────────────────────────────────────────────────
     10. HERO CODE EDITOR — Typing animation + line numbers
     Runs once on page load. Natural typing speed ~3–5 seconds.
     After finishing, blinking cursor remains visible.
  ────────────────────────────────────────────────────────── */
  (function initCodeEditor() {
    const outputEl  = document.getElementById('editor-typed-code');
    const cursorEl  = document.getElementById('editor-cursor');
    const lineNumEl = document.getElementById('editor-line-nums');

    if (!outputEl || !cursorEl || !lineNumEl) return;

    /* ── Syntax-highlighted code tokens ──
       Each entry: [text, cssColor]
       null color = default text color (inherited).
       We build the visible plain text from tokens to drive typing.
    ── */
    const KW   = '#569cd6'; /* blue     — keywords  */
    const STR  = '#6a9955'; /* green    — strings   */
    const PROP = '#9cdcfe'; /* lt-blue  — properties */
    const PUNC = '#808080'; /* gray     — punctuation / brackets */
    const DEF  = null;      /* white (dark) / near-black (light) */

    /* Light-mode overrides injected once */
    const lightStyle = document.createElement('style');
    lightStyle.textContent = [
      ':root:not(.dark) .ec-kw   { color:#0000ff; }',
      ':root:not(.dark) .ec-str  { color:#267f00; }',
      ':root:not(.dark) .ec-prop { color:#001080; }',
      ':root:not(.dark) .ec-punc { color:#555555; }',
    ].join('\n');
    document.head.appendChild(lightStyle);

    /* Token list — (plainText, colorClass) pairs */
    const tokens = [
      ['const',           'ec-kw'],
      [' developer = {',  'ec-punc'],
      ['\n  name',        'ec-prop'],
      [': ',              'ec-punc'],
      ['"Gede Yodyananta"', 'ec-str'],
      [',',               'ec-punc'],
      ['\n  role',        'ec-prop'],
      [': ',              'ec-punc'],
      ['"Software Engineering Student"', 'ec-str'],
      [',',               'ec-punc'],
      ['\n  learning',    'ec-prop'],
      [': [',             'ec-punc'],
      ['\n    "Frontend Development"', 'ec-str'],
      [',',               'ec-punc'],
      ['\n    "Artificial Intelligence"', 'ec-str'],
      [',',               'ec-punc'],
      ['\n    "Backend Fundamentals"', 'ec-str'],
      ['\n  ]',           'ec-punc'],
      [',',               'ec-punc'],
      ['\n  currentProjects', 'ec-prop'],
      [': [',             'ec-punc'],
      ['\n    "Personal Portfolio"', 'ec-str'],
      [',',               'ec-punc'],
      ['\n    "E-Commerce Website"', 'ec-str'],
      ['\n  ]',           'ec-punc'],
      [',',               'ec-punc'],
      ['\n  philosophy',  'ec-prop'],
      [': ',              'ec-punc'],
      ['"Keep learning. Keep building."', 'ec-str'],
      ['\n}',             'ec-punc'],
      ['\n\nexport',      'ec-kw'],
      [' ',               null],
      ['default',         'ec-kw'],
      [' developer',      'ec-prop'],
      [';',               'ec-punc'],
    ];

    /* Build full plain text */
    const plainText = tokens.map(t => t[0]).join('');
    const totalChars = plainText.length;

    /* Target total duration ~4 seconds.
       Use a small random jitter per character for naturalism. */
    const BASE_DELAY_MS = 4000 / totalChars; /* avg ms per char */

    /* Map character position → span info */
    /* We'll type by building <span class="ec-xxx">...</span> nodes
       character by character.  We pre-build the token boundaries. */

    let tokenIndex = 0;
    let charInToken = 0;
    let charCount   = 0;

    /* DOM spans, one per token (created lazily as we type) */
    const spans = [];

    function getOrCreateSpan(ti) {
      if (!spans[ti]) {
        const span = document.createElement('span');
        if (tokens[ti][1]) span.className = tokens[ti][1];
        outputEl.appendChild(span);
        spans[ti] = span;
      }
      return spans[ti];
    }

    function updateLineNumbers() {
      const typed = plainText.slice(0, charCount);
      const lines  = (typed.match(/\n/g) || []).length + 1;
      let html = '';
      for (let i = 1; i <= lines; i++) html += i + '\n';
      lineNumEl.textContent = html;
    }

    function typeNextChar() {
      if (tokenIndex >= tokens.length) {
        /* Done — show blinking cursor */
        cursorEl.style.opacity = '1';
        return;
      }

      const [tokenText, tokenClass] = tokens[tokenIndex];

      /* Type one character into the current span */
      const span = getOrCreateSpan(tokenIndex);
      span.textContent += tokenText[charInToken];
      charCount++;
      charInToken++;

      updateLineNumbers();

      if (charInToken >= tokenText.length) {
        tokenIndex++;
        charInToken = 0;
      }

      /* Natural jitter: spaces/newlines slightly faster */
      const ch    = tokenText[charInToken - 1] || '';
      const isWs  = ch === ' ' || ch === '\n';
      const jitter = (Math.random() - 0.5) * BASE_DELAY_MS * 0.6;
      const delay  = Math.max(8, BASE_DELAY_MS * (isWs ? 0.4 : 1) + jitter);

      setTimeout(typeNextChar, delay);
    }

    /* Start after hero entrance animations settle (~700ms) */
    updateLineNumbers();
    setTimeout(typeNextChar, 700);
  })();

})();

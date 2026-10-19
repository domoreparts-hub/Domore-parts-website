// DOMORE PARTS — app.js v4

// ── Product link → form pre-select ──────────────────────────────────────
document.querySelectorAll('[data-product]').forEach(a => {
  a.addEventListener('click', () => {
    const sel = document.querySelector('select[name="product"]');
    if (sel) sel.value = a.dataset.product;
  });
});

// ── Form → mailto ────────────────────────────────────────────────────────
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const company = f.get('company') ? `\nCompany: ${f.get('company')}` : '';
    const body =
      `Name: ${f.get('name')}` +
      `\nEmail: ${f.get('email')}` +
      company +
      `\nProduct: ${f.get('product')}` +
      `\n\n${f.get('message')}` +
      `\n\n---\nPlease attach any relevant drawings or photos before sending.`;
    const subject = encodeURIComponent(`[DOMORE Inquiry] ${f.get('product')}`);
    location.href = `mailto:domore.parts@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
  });
}

// ── Copy email ───────────────────────────────────────────────────────────
const copyBtn = document.querySelector('.copy');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const email = 'domore.parts@gmail.com';
    const statusEl = document.getElementById('status');
    const done = copyBtn.dataset.done || 'Copied!';
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = done;
      if (statusEl) statusEl.textContent = done;
      setTimeout(() => {
        copyBtn.textContent = copyBtn.dataset.originalText || 'Copy email address';
        if (statusEl) statusEl.textContent = '';
      }, 2500);
    } catch {
      if (statusEl) statusEl.textContent = email;
    }
  });
  // Store original text
  copyBtn.dataset.originalText = copyBtn.textContent.trim();
}

// ── Mobile nav toggle ────────────────────────────────────────────────────
const toggle = document.getElementById('navToggle');
const nav    = document.getElementById('mainNav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.textContent = isOpen ? '✕' : '☰';
  });

  // Close on nav link click
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      toggle.textContent = '☰';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      toggle.textContent = '☰';
    }
  });
}

// ── Smooth scroll offset fix for sticky header ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerH = document.querySelector('header')?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

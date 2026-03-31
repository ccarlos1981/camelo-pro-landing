// =============================================
// Camelô Pro Landing Page — Interactions
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav scroll glass effect ---
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // --- Fade-in on scroll (Intersection Observer) ---
  const fadeTargets = document.querySelectorAll(
    '.feature-card, .persona-card, .testimonial-card, .pain-item, .pricing-card'
  );
  fadeTargets.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80 * (Array.from(fadeTargets).indexOf(entry.target) % 4));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeTargets.forEach(el => observer.observe(el));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- App UI: animate number counter in hero ---
  function animateCount(el, target, prefix = '', suffix = '') {
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = prefix + Math.floor(current).toLocaleString('pt-BR') + suffix;
      if (current >= target) clearInterval(timer);
    }, 30);
  }

  // Trigger on hero visible
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const valueEl = document.querySelector('.app-card.green .app-card-value');
      if (valueEl) animateCount(valueEl, 1850, 'R$ ');
      heroObserver.disconnect();
    }
  }, { threshold: 0.5 });
  const heroSection = document.getElementById('hero');
  if (heroSection) heroObserver.observe(heroSection);

  // --- CTA buttons: track clicks (Google Analytics stub) ---
  const ctaIds = ['btn-hero-primary', 'btn-hero-secondary', 'btn-trial', 'btn-pro', 'btn-appstore', 'btn-playstore', 'btn-nav'];
  ctaIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        // gtag('event', 'cta_click', { button_id: id });
        console.log('[CTA]', id, 'clicked');
      });
    }
  });

});

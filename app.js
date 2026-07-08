/* =====================================================
   SCS Digital Marketing – app.js
   ===================================================== */

// ── 1. NAVBAR: Scroll state + active link ──────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled shadow
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Active link highlight (only on home/index page)
  const isSubpage = window.location.pathname.includes('contact.html') || window.location.pathname.includes('crm.html');
  if (!isSubpage && sections.length > 0) {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
});

// ── 2. HAMBURGER MENU ──────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinksList.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu on link click
navLinksList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksList.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── 3. COUNTER ANIMATION ───────────────────────────
const counters = document.querySelectorAll('.stat-num');
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  const rect = heroSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    countersStarted = true;
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    });
  }
}

window.addEventListener('scroll', animateCounters);
animateCounters(); // trigger immediately if already in view

// ── 4. SCROLL ANIMATIONS – PER-SECTION ────────────

// Generic IntersectionObserver factory
function makeObserver(threshold = 0.1) {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target._obs && entry.target._obs.unobserve(entry.target);
      }
    });
  }, { threshold });
}

function animateEl(el, animClass, delayClass, obs) {
  el.classList.add(animClass);
  if (delayClass) el.classList.add(delayClass);
  el._obs = obs;
  obs.observe(el);
}

const obs = makeObserver(0.10);

// ── HERO section ──────────────────────────────────
// Hero content already visible on load — just add a one-time entrance
const heroContent = document.querySelector('.hero-content');
if (heroContent) {
  heroContent.style.animation = 'heroEntrance 0.9s cubic-bezier(0.4,0,0.2,1) both';
}

// ── SERVICES section ─────────────────────────────
const servicesObs = makeObserver(0.08);
const svcHeader = document.querySelector('.services .section-header, .services .section-tag, .services > .container > *:first-child');
if (svcHeader) animateEl(svcHeader, 'slide-down', null, servicesObs);
document.querySelectorAll('.service-card').forEach((el, i) => {
  animateEl(el, 'fade-up', `anim-delay-${Math.min(i + 1, 6)}`, servicesObs);
});

// ── WHY CHOOSE US section ────────────────────────
const whyObs = makeObserver(0.08);
const whyHeader = document.querySelector('.why-choose-us .why-header');
if (whyHeader) animateEl(whyHeader, 'slide-down', null, whyObs);
document.querySelectorAll('.why-column-left .why-card').forEach((el, i) => {
  animateEl(el, 'fade-left', `anim-delay-${Math.min(i + 1, 6)}`, whyObs);
});
document.querySelectorAll('.why-column-right .why-card, .why-column:not(.why-column-left) .why-card').forEach((el, i) => {
  animateEl(el, 'fade-right', `anim-delay-${Math.min(i + 1, 6)}`, whyObs);
});
const whyImageCol = document.querySelector('.why-image-col, .why-visual');
if (whyImageCol) animateEl(whyImageCol, 'scale-in', null, whyObs);

// ── TESTIMONIALS section ─────────────────────────
const testObs = makeObserver(0.08);
const testHeader = document.querySelector('.t-page .section-header, .t-page .t-header');
if (testHeader) animateEl(testHeader, 'slide-down', null, testObs);
document.querySelectorAll('.what-card, .feature-item, .about-floating-card').forEach((el, i) => {
  animateEl(el, 'fade-up', `anim-delay-${Math.min(i + 1, 6)}`, testObs);
});

// ── FAQ section ──────────────────────────────────
const faqObs = makeObserver(0.08);
const faqHeader = document.querySelector('.faq-section .section-header, .faq-header');
if (faqHeader) animateEl(faqHeader, 'slide-down', null, faqObs);
document.querySelectorAll('.faq-item').forEach((el, i) => {
  animateEl(el, 'fade-left', `anim-delay-${Math.min(i + 1, 6)}`, faqObs);
});
const faqAnswerBox = document.querySelector('.faq-answer-box');
if (faqAnswerBox) animateEl(faqAnswerBox, 'fade-right', null, faqObs);

// ── CTA / RESULTS section ────────────────────────
const ctaObs = makeObserver(0.12);
const ctaBox = document.querySelector('.cta-card-box');
if (ctaBox) animateEl(ctaBox, 'scale-in', null, ctaObs);
document.querySelectorAll('.result-metrics .metric-item, .stat-item').forEach((el, i) => {
  animateEl(el, 'fade-up', `anim-delay-${Math.min(i + 1, 6)}`, ctaObs);
});

// ── FOOTER brand ─────────────────────────────────
const footerObs = makeObserver(0.05);
const footerBrand = document.querySelector('.footer-brand');
if (footerBrand) animateEl(footerBrand, 'fade-left', null, footerObs);
document.querySelectorAll('.footer-col').forEach((el, i) => {
  animateEl(el, 'fade-up', `anim-delay-${Math.min(i + 1, 6)}`, footerObs);
});


// ── 7. SMOOTH SCROLL POLYFILL ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── 8. SERVICE CARDS TILT EFFECT ──────────────────
document.querySelectorAll('.what-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    card.style.transform = `translateY(-5px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── 9. FAQ INTERACTION ─────────────────────────────
const faqItems = document.querySelectorAll('.faq-item');
const faqAnswerText = document.getElementById('faq-answer-text');

let faqAnswers = [];
if (window.location.pathname.includes('crm.html')) {
  faqAnswers = [
    "A Laundry CRM is custom-built for dry cleaning and laundry operations. Unlike generic sales CRMs, it integrates order intake ticketing, dynamic status tags (e.g. Wash, Dry, Fold, Ready), automated WhatsApp notification alerts, and customer wash/delivery preferences directly into a unified dashboard.",
    "Yes, absolutely. The system connects to SMS and WhatsApp gateways to automatically notify your clients when their clothes are sorted, washed, or ready for store pickup or delivery route driver assignment.",
    "The ROI calculator estimates savings by calculating labor time saved during ticket intake and counter check-ins (e.g., 10 mins saved per order at $20/hr) added to an estimated 20% return-rate revenue boost generated through automated retention campaigns and dry cleaning reminder schedules.",
    "Yes. The laundry CRM supports barcode scanning for automated garment tag reading and tracking, and connects with standard retail point-of-sale receipt printers, barcode label makers, and cash drawers.",
    "Yes. You can monitor and sync orders, revenue reports, customer preference profiles, and inventory statuses across multiple store locations or drop-off hubs from a centralized supervisor dashboard.",
    "Yes. The system has a built-in Route Manager that lets drivers view scheduled pickup and delivery requests, optimize routes on maps, and update order statuses in real time from mobile browsers."
  ];
} else {
  faqAnswers = [
    "Digital marketing is the promotion of products or services using digital channels, such as search engines, social media, email, and websites. Its primary goal is to connect brands with target audiences exactly where they spend their time, building awareness, driving traffic, and boosting conversions.",
    "SEO (Search Engine Optimization) optimizes your website to rank higher in search engine results. This increases your business's online visibility, drives more organic (free) traffic to your website, and helps attract high-quality leads who are actively searching for your services.",
    "Google Ads captures active search intent (users searching for specific keywords), making it great for direct sales and leads. Meta Ads (Facebook/Instagram) targets users based on demographics, interests, and behavior, which is perfect for building brand awareness and visual storytelling.",
    "While paid advertising campaigns (like Google or Meta Ads) can drive traffic and leads almost instantly, organic strategies like SEO and content marketing typically take 3 to 6 months to show significant, sustainable results as search engines index and trust your site.",
    "Social media marketing allows you to humanize your brand, build a community, and engage directly with your target audience. It is an essential channel for customer support, brand loyalty, and driving referral traffic to your website.",
    "We use advanced analytics tools (like Google Analytics 4, heatmaps, and platform pixel tracking) to monitor key performance indicators (KPIs) such as click-through rates, conversion rates, cost per acquisition, and overall return on investment (ROI).",
    "We recommend starting with a modest budget that allows you to test different audiences and creative assets. Once we identify high-converting campaigns, we scale the budget efficiently to maximize your return on ad spend (ROAS) and scale profitability."
  ];
}

faqItems.forEach(item => {
  item.addEventListener('click', () => {
    if (item.classList.contains('active')) return;

    // Remove active class from all items
    faqItems.forEach(i => {
      i.classList.remove('active');
      // Clear icon container
      const iconWrap = i.querySelector('.faq-icon-wrapper');
      if (iconWrap) iconWrap.innerHTML = '';
    });

    // Add active class to clicked item
    item.classList.add('active');

    // Add star icon to active item's icon wrapper
    const iconWrap = item.querySelector('.faq-icon-wrapper');
    if (iconWrap) {
      iconWrap.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor" class="faq-star-icon">
          <path d="M12 2l2 6.5 6.5 2-6.5 2-2 6.5-2-6.5-6.5-2 6.5-2z"/>
          <path d="M12 2l2 6.5 6.5 2-6.5 2-2 6.5-2-6.5-6.5-2 6.5-2z" transform="rotate(45 12 12)"/>
        </svg>
      `;
    }

    // Get index and update answer text with a smooth transition
    const index = parseInt(item.getAttribute('data-index'));
    if (faqAnswerText) {
      faqAnswerText.style.opacity = 0;
      faqAnswerText.style.transform = 'translateY(12px)';
      setTimeout(() => {
        faqAnswerText.textContent = faqAnswers[index];
        faqAnswerText.style.opacity = 1;
        faqAnswerText.style.transform = 'translateY(0)';
      }, 220);
    }
  });
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ===========================
// HAMBURGER MENU (MOBILE)
// ===========================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Tutup mobile menu saat link diklik
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});


// ===========================
// SMOOTH ACTIVE NAV LINKS
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.style.color = 'var(--accent)';
    }
  });
});


// ===========================
// SCROLL REVEAL
// ===========================
const revealElements = document.querySelectorAll(
  '.about-grid, .edu-card, .contact-grid, footer, .section-title, .section-desc'
);

revealElements.forEach(el => {
  el.classList.add('reveal');
});

function checkReveal() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkReveal);
checkReveal(); // cek saat pertama kali load


// ===========================
// SKILL CARDS ANIMATION
// ===========================
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const delay = card.getAttribute('data-delay') || 0;

      setTimeout(() => {
        card.classList.add('visible');

        // Animasi skill bar
        const fill = card.querySelector('.skill-fill');
        if (fill) {
          const targetWidth = fill.getAttribute('data-width');
          fill.style.width = targetWidth + '%';
        }
      }, parseInt(delay));

      skillObserver.unobserve(card);
    }
  });
}, { threshold: 0.15 });

skillCards.forEach(card => skillObserver.observe(card));


// ===========================
// PROJECT CARDS ANIMATION
// ===========================
const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 120);
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

projectCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s, border-color 0.25s';
  projectObserver.observe(card);
});


// ===========================
// EDUCATION ITEMS ANIMATION
// ===========================
const eduItems = document.querySelectorAll('.edu-item');

const eduObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }, i * 150);
      eduObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

eduItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  eduObserver.observe(item);
});


// ===========================
// CONTACT FORM
// ===========================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Mengirim...';
  btn.disabled = true;

  // Simulasi pengiriman
  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';
    btn.disabled = false;

    // Sembunyikan notif setelah 4 detik
    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 4000);
  }, 1200);
});


// ===========================
// TYPING EFFECT HERO SUB
// ===========================
const heroSub = document.querySelector('.hero-sub');

if (heroSub) {
  const texts = [
    'Siswa RPL · Web Developer Pemula · Penggemar Kode',
    'Kelas 10 · SMKN 2 Kota Mojokerto',
    'HTML · CSS · JS · Bootstrap · Python'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      heroSub.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2400);
        return;
      }
    } else {
      heroSub.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    const speed = isDeleting ? 40 : 60;
    setTimeout(typeEffect, speed);
  }

  // Mulai typing setelah hero muncul
  setTimeout(typeEffect, 1200);
}


// ===========================
// STAT NUMBER COUNT UP
// ===========================
const statNums = document.querySelectorAll('.stat-num');

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.textContent);
      const suffix = el.textContent.replace(/[0-9]/g, '');
      let count = 0;
      const step = Math.ceil(target / 30);

      const counter = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(counter);
        }
        el.textContent = count + suffix;
      }, 40);

      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(num => statObserver.observe(num));
```javascript
/* =========================
   MOBILE NAVIGATION
========================= */

const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu-btn');

menu?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open');

  menu?.setAttribute(
    'aria-expanded',
    String(!!open)
  );
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  });
});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});


/* =========================
   SMOOTH CURSOR GLOW
========================= */

const glow = document.querySelector('.cursor-glow');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let glowX = mouseX;
let glowY = mouseY;

let glowActive = false;

const supportsHover =
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (glow && supportsHover) {

  window.addEventListener('pointermove', event => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    glowActive = true;
  });

  window.addEventListener('pointerleave', () => {
    glowActive = false;
    glow.style.opacity = '0';
  });

  window.addEventListener('pointerenter', () => {
    glow.style.opacity = '.8';
  });

  const animateGlow = () => {

    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;

    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;

    if (glowActive) {
      glow.style.opacity = '.8';
    }

    requestAnimationFrame(animateGlow);
  };

  animateGlow();

} else if (glow) {

  glow.style.display = 'none';

}


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = [
  ...document.querySelectorAll('main section[id]')
];

const links = [
  ...document.querySelectorAll('.nav-links a')
];

const updateActiveLink = id => {

  links.forEach(link => {

    const target = link.getAttribute('href');

    link.classList.toggle(
      'active',
      target === `#${id}`
    );

  });

};

const activeObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        updateActiveLink(entry.target.id);
      }

    });

  },
  {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0
  }
);

sections.forEach(section => {
  activeObserver.observe(section);
});


/* =========================
   CLOSE MOBILE MENU ON RESIZE
========================= */

window.addEventListener('resize', () => {

  if (window.innerWidth > 900) {

    nav?.classList.remove('open');

    menu?.setAttribute(
      'aria-expanded',
      'false'
    );

  }

});


/* =========================
   PREVENT ANIMATION FLASH
========================= */

window.addEventListener('load', () => {

  document.body.classList.add('page-loaded');

});
```

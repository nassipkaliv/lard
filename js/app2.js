document.addEventListener('DOMContentLoaded', () => {
  // ---------- helpers ----------
  const safeInit = (fn, label='init') => {
    try { return fn(); } catch (e) { console.error(`[${label}]`, e); return null; }
  };

  function verticalTicker(selector, {
    slidesPerView = 3, space = 70, speed = 9000, reverse = false
  } = {}) {
    const el = document.querySelector(selector);
    if (!el) return null;

    const count = el.querySelectorAll('.swiper-slide').length || 1;

    return new Swiper(selector, {
      direction: 'vertical',
      slidesPerView,
      spaceBetween: space,
      loop: true,
      loopedSlides: count,
      loopAdditionalSlides: Math.max(24, count * 3),
      freeMode: { enabled: true, momentum: false },
      speed,
      autoplay: { delay: 0, disableOnInteraction: false, reverseDirection: reverse },
      allowTouchMove: false,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      breakpoints: {
        0:   { spaceBetween: 16 },
        769: { spaceBetween: space }
      },
      on: {
        init(s){ s.wrapperEl.style.transitionTimingFunction = 'linear'; },
        resize(s){ s.wrapperEl.style.transitionTimingFunction = 'linear'; }
      }
    });
  }

  function makeTicker(selector, { speed = 6000, space = 20, reverse = false } = {}) {
    const el = document.querySelector(selector);
    if (!el) return null;

    const slidesCount = el.querySelectorAll('.swiper-slide').length || 1;

    return new Swiper(selector, {
      slidesPerView: 'auto',
      spaceBetween: space,
      loop: true,
      loopedSlides: slidesCount,
      loopAdditionalSlides: Math.min(20, slidesCount * 2),
      speed,
      freeMode: { enabled: true, momentum: false },
      watchSlidesProgress: true,
      allowTouchMove: true,
      autoplay: { delay: 0, disableOnInteraction: false, reverseDirection: reverse },
      breakpoints: {
        0:   { spaceBetween: 14 },
        768: { spaceBetween: space }
      },
      on: {
        init(s){ s.wrapperEl.style.transitionTimingFunction = 'linear'; },
        resize(s){ s.wrapperEl.style.transitionTimingFunction = 'linear'; }
      }
    });
  }

  // ---------- init swipers (безопасно) ----------
  safeInit(() => verticalTicker('.vpartners--left',  { slidesPerView: 3, space: 70, speed: 9000, reverse: false }), 'vpartners--left');
  safeInit(() => verticalTicker('.vpartners--right', { slidesPerView: 4, space: 70, speed: 9000, reverse: true  }), 'vpartners--right');

  safeInit(() => makeTicker('.partners-swiper--top',    { speed: 7000, space: 20 }), 'partners-swiper--top');
  safeInit(() => makeTicker('.partners-swiper--bottom', { speed: 7000, space: 20, reverse: true }), 'partners-swiper--bottom');

  safeInit(() => {
    const el = document.querySelector('.expert-swiper');
    if (!el) return null;
    return new Swiper(el, {
      spaceBetween: 10,
      slidesPerView: 1.2,
      breakpoints: {
        576:  { slidesPerView: 1.6 },
        768:  { slidesPerView: 1.6 },
        1024: { slidesPerView: 4.6 },
        1280: { slidesPerView: 4.6 },
      },
    });
  }, 'expert-swiper');

  safeInit(() => {
    const el = document.querySelector('.team-swiper');
    if (!el) return null;
    return new Swiper(el, {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 1,
      pagination: { el: '.lard-swiper-progressbar', type: 'progressbar' },
      breakpoints: {
        768:  { slidesPerView: 2, pagination: false },
        1024: { slidesPerView: 2.6 }
      }
    });
  }, 'team-swiper');

  // ---------- nav active (только если навбар есть) ----------
  safeInit(() => {
    const nav = document.getElementById('aboutNav');
    if (!nav) return;

    const links = Array.from(nav.querySelectorAll('.about-nav-link'));
    if (!links.length) return;

    let lastClicked = nav.querySelector('.about-nav-link.active') || links[0];
    lastClicked.classList.add('active');

    links.forEach(link => {
      link.addEventListener('click', () => {
        lastClicked?.classList.remove('active');
        link.classList.add('active');
        lastClicked = link;
      });

      link.addEventListener('mouseenter', () => {
        lastClicked?.classList.remove('active');
        link.classList.add('active');
      });

      link.addEventListener('mouseleave', () => {
        links.forEach(l => l.classList.remove('active'));
        lastClicked?.classList.add('active');
      });
    });
  }, 'aboutNav');
});

  document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.header-logo');
    if (!logo) return;

    logo.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  });

  (function () {
  const btn = document.getElementById('backToTop');
  const SHOW_AFTER = 750;
  const prefersNoMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  const onScroll = () => {
    if (window.scrollY > SHOW_AFTER) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  };

 
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

 
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersNoMotion ? 'auto' : 'smooth' });
  });


  onScroll();
})();

    (function () {
    const toggleBtn = document.getElementById('menuToggle');
    const dropdown  = document.getElementById('megaMenu');

    const open = () => {
      dropdown.classList.add('is-open');
      dropdown.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      // ловим клик вне
      setTimeout(() => document.addEventListener('click', onDocClick), 0);
      document.addEventListener('keydown', onKey);
    };
    const close = () => {
      dropdown.classList.remove('is-open');
      dropdown.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
    const toggle = () => dropdown.classList.contains('is-open') ? close() : open();

    function onDocClick(e) {
      const clickInside = dropdown.contains(e.target) || toggleBtn.contains(e.target);
      if (!clickInside) close();
    }
    function onKey(e) {
      if (e.key === 'Escape') close();
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
  })();
  

  (function fitIntroTitle(){
  const el = document.getElementById('introTitle');
  if (!el) return;

  const MIN_FS = 24;  
  const MAX_FS = 160; 

  const measure = () => {
    el.style.fontSize = MAX_FS + 'px';

    const clone = el.cloneNode(true);
    clone.style.visibility = 'hidden';
    clone.style.position = 'absolute';
    clone.style.whiteSpace = 'nowrap';
    clone.style.width = 'auto';
    clone.style.fontSize = MAX_FS + 'px';
    document.body.appendChild(clone);

    const container = el.parentElement; 
    const containerWidth = container.clientWidth || window.innerWidth;
    const textWidth      = clone.scrollWidth;

    document.body.removeChild(clone);

    const ratio = containerWidth / textWidth;
    const newFs = Math.max(MIN_FS, Math.min(MAX_FS, MAX_FS * ratio));

    el.style.fontSize = newFs + 'px';
  };

  measure();
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('load', measure);
})();

  
  
  const newsSwiper = new Swiper('.news-swiper', {
    loop: false,
    speed: 500,
    spaceBetween: 16,
    slidesPerView: 1.2,
    breakpoints: {
      576:  { slidesPerView: 1.6 },
      768:  { slidesPerView: 2.2 },
      1024: { slidesPerView: 3.9 },
      1280: { slidesPerView: 3.9 },
    },
    navigation: {
      nextEl: '.news-next',
      prevEl: '.news-prev'
    },
  });

  const lard_swiper = new Swiper('.lard-swiper', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 1.2,
    pagination: {
      el: '.lard-swiper-progressbar',
      type: 'progressbar',
    },
    breakpoints: {
      768: { 
        slidesPerView: 2,
        pagination: false 
      },
      1024: { slidesPerView: 2.6 }
    }
  });

  const case_swiper = new Swiper('.case-swiper', {
    spaceBetween: 10,
    slidesPerView: 1.2
  });

  const cases_swiper_mob = new Swiper('.cases-swiper-mob', {
    spaceBetween: 12,
    slidesPerView: 1.2
  });

const CASE_DELAY = 8000;

document.querySelectorAll('.cases').forEach(section => {
  const swiperEl   = section.querySelector('.cases-swiper');
  const prevBtn    = section.querySelector('.cases-arrow.prev');
  const nextBtn    = section.querySelector('.cases-arrow.next');
  const indicators = Array.from(section.querySelectorAll('.cases-track .indicator'));

  if (!swiperEl) return;

  const swiper = new Swiper(swiperEl, {
    loop: true,
    autoplay: { delay: CASE_DELAY, disableOnInteraction: false },
    speed: 500,
    allowTouchMove: true,
    spaceBetween: 20,
  });



  const setActive = (i) => {
    indicators.forEach((el, idx) => {
      if (idx === i) {
        el.classList.remove('is-active');
        void el.offsetWidth; // перезапуск анимации
        el.classList.add('is-active');
      } else {
        el.classList.remove('is-active');
      }
    });
  };

  setActive(swiper.realIndex % indicators.length);

  swiper.on('slideChange', () => {
    setActive(swiper.realIndex % indicators.length);
  });

  prevBtn?.addEventListener('click', () => {
    swiper.slidePrev();
    swiper.autoplay.start();
  });

  nextBtn?.addEventListener('click', () => {
    swiper.slideNext();
    swiper.autoplay.start();
  });

  swiper.on('touchEnd', () => {
    swiper.autoplay.start();
    setActive(swiper.realIndex % indicators.length);
  });
});



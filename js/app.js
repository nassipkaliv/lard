
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



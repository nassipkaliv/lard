
  const newsSwiper = new Swiper('.news-swiper', {
    loop: false,
    speed: 500,
    spaceBetween: 16,
    slidesPerView: 1.1,
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

  const cases_swiper = new Swiper('.cases-swiper', {
    loop: true,
    autoplay: { delay: CASE_DELAY, disableOnInteraction: false },
    speed: 500,
    allowTouchMove: true,
  });

  const indicators = Array.from(document.querySelectorAll('#casesTrack .indicator'));
  const prevBtn = document.querySelector('.cases-arrow.prev');
  const nextBtn = document.querySelector('.cases-arrow.next');

  function setActiveIndicator(i){
    indicators.forEach((el, idx) => {
      el.classList.toggle('is-active', idx === i);
      if (idx === i) {
        el.classList.remove('is-active'); 
        void el.offsetWidth;
        el.classList.add('is-active');
      }
    });
  }

  setActiveIndicator(cases_swiper.realIndex % indicators.length);

  cases_swiper.on('slideChange', () => {
    setActiveIndicator(cases_swiper.realIndex % indicators.length);
  });

  prevBtn.addEventListener('click', () => {
    cases_swiper.slidePrev();
    cases_swiper.autoplay.start();
  });

  nextBtn.addEventListener('click', () => {
    cases_swiper.slideNext();
    cases_swiper.autoplay.start();
  });

  cases_swiper.on('touchEnd', () => {
    cases_swiper.autoplay.start();
    setActiveIndicator(cases_swiper.realIndex % indicators.length);
  });

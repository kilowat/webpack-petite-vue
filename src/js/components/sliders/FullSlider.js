
export default (props)=>{
  return {
    async initSlider($el) {
      const {Swiper, Navigation, Pagination} = await import('swiper');
      const swiper = new Swiper($el, {
        modules: [Navigation, Pagination],
        pagination: {
          el: $el.querySelector(".swiper-pagination"),
        },
        navigation: {
          nextEl: $el.querySelector(".swiper-button-next"),
          prevEl: $el.querySelector(".swiper-button-prev"),
        },   
        on: {
          init: function () {
            $el.classList.remove('not-ready');
          },
        },   
      });
    },
  }
}
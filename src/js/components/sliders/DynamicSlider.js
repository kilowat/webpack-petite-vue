import template from './dynamicSlider.tpl.html'

export default (props)=>{
  return {
    $template: template,
    async initSlider($el) {
      import ('swiper/css');
      import ('swiper/css/navigation');
      import ('swiper/css/pagination');

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
      });
    },
  }
}
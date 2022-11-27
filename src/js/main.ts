
import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('swiper-slider')
export class SwiperSlider extends LitElement {

  constructor(){
    super();
    this.initSLider();
  }

  private async initSLider(){
      import('swiper/css');
      import('swiper/css/navigation');
      import('swiper/css/pagination');
      // core version + navigation, pagination modules:
      const {Swiper, Navigation, Pagination} = await import('swiper');

     new Swiper('.swiper', {

      modules: [Navigation, Pagination],
    
    });  
  }

  // Render the UI as a function of component state
  override render() {
    return html`
      <slot></slot>
    `;
  }
}


import { reactive, nextTick  } from 'petite-vue'

const state = reactive({
  items:{},
  init(id, data) {
    const $el = document.querySelector('#'+id);
    if (!this.items[id]) this.items[id] = {};
    this.items[id].$el = $el;
    this.items[id].data = data;
  },
  getEl(id) {
    return state.items[id].$el;
  }
})

export default {
  /**
   * 
   * @param {Object} param
   * @param {string} param.id
   * @param {number} param.width = 640
   * @param {Object} data = {}
   * @returns 
   */
  create({ id, width = 640 }, data = {}){
    state.init(id, data);
    const $el = state.getEl(id);
    $el.setAttribute('aria-hidden', false);
    $el.classList.add('m-close');
    const template = `
    <div v-scope class="modal-root" @click="Modal.close('${id}')">
      <svg class="svg-icon modal-close-icon" v-scope="SvgIcon('close')"></svg>
      <div class="modal-bg">
        <div class="modal-window" @click.stop="" :style="'--modal__max-width:' + width + 'px'">
          ${$el.innerHTML}
        </div>
      </div>
    </div>`

    return {
      $template: template,
      get data() {return state.items[id].data},
      show: false,
      width,
      mounted() {
        $el.remove();
      },
    }
  },
  /**
   * 
   * @param {string} id 
   * @param {Object} data 
   */
  show(id, data = {}) {
    this.closeAll(id);
    const $el = state.getEl(id);

    if (!state.items[id]) throw Error(`Modal with id ${id} not found`);
    if (data) state.items[id].data = data;
    
    $el.classList.remove('m-close');
    $el.classList.add('m-open');
    
    if (!document.querySelector('#'+id)) document.querySelector('body').appendChild($el);
    
    document.querySelector('body').style.overflow = 'hidden';
  },
  /**
   * 
   * @param {string} id 
   */
  close(id) {
    if (!state.items[id]) throw Error(`Modal with id ${id} not found`);
    const $el = state.getEl(id);
    
    if  ($el.classList.contains('m-open')) {
      $el.classList.remove('m-open');
      $el.classList.add('m-close');
      document.querySelector('body').style.overflow = 'auto';
    }
  },
  closeAll(exeptId) {
    for(const i in state.items) {
      if(exeptId === i) continue;
      this.close(i);
    }
  }
};
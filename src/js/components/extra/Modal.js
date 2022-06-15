import { reactive, nextTick  } from 'petite-vue'

const state = reactive({
  items:{},
  init(id, data) {
    const $el = document.querySelector('#'+id);
    if (!this.items[id]) this.items[id] = {};
    this.items[id].$el = $el;
    this.items[id].data = data || {};
  },
  getEl(id) {
    return state.items[id].$el;
  }
})


export default {
  create(props, data){
    state.init(props.id, data);
    const width = props.width || 640;
    const $el = state.getEl(props.id);
    $el.setAttribute('aria-hidden', false);
    $el.classList.add('m-close');
    const template = `
    <div v-scope class="modal-root" @click="Modal.close('${props.id}')">
      <div class="modal-bg">
        <div class="modal-window" @click.stop="" :style="{maxWidth: width + 'px'}">
          ${$el.innerHTML}
          {{width}}
        </div>
      </div>
    </div>`

    return {
      $template: template,
      get data() {return state.items[props.id].data},
      show: false,
      width,
      mounted() {
        $el.remove();
      },
    }
  },
  show(id, data) {
    console.log('show');
    this.closeAll(id);
    const $el = state.getEl(id);

    if (!state.items[id]) throw Error(`Modal with id ${id} not found`);
    if (data) state.items[id].data = data;
    if (!document.querySelector('#'+id)) document.querySelector('body').appendChild($el);
    
    $el.classList.remove('m-close');
    $el.classList.add('m-open');
    document.querySelector('body').style.overflow = 'hidden';
  },
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
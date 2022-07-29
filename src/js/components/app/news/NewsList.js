import EventEmitter from "../../../utils/EventEmitter";

/**
 * @param {Object} param
 * @param {EventEmitter} param.eventBus
 */
export default ({ eventBus }) => {
  let $root;
  
  return {
    loaded: false,
    init($el) {
      $root = $el;
    },
    async loadMore() {
      this.loaded = true;
      const res = await fetch('/ajax.html');
      const htmlRes = await res.text();
      const html = new DOMParser().parseFromString(htmlRes, "text/html").body;
      const newsItems = html.querySelectorAll('.news  .news__item');
      const container = $root.querySelector('.news__list');
      
      for (let i = 0; i < newsItems.length; i++) {
        container.appendChild(newsItems[i])
      }
      
      eventBus.emit('remount');
    }
  }
}


export default () => {
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
      const container = document.querySelector('.news .news__list');
      for (let i = 0; i < newsItems.length; i++) {
        container.appendChild(newsItems[i])
      }
      window?.eventBus?.emit('remount');
    }
  }
}

export default () => {
  let $root;
  
  return {
    init($el) {
      $root = $el;
    },
    async loadMore() {
      const res = await fetch('/ajax.html');
      const htmlRes = await res.text();
      const html = new DOMParser().parseFromString(htmlRes, "text/html").body;
      const newsItems = html.querySelectorAll('.news  .news__item');
      const container = document.querySelector('.news .news__list');
      for (let i = 0; i < newsItems.length; i++) {
        container.appendChild(newsItems[i])
      }
      window?.eventBus.emit('remount');
    }
  }
}
let content = document.querySelector('.content');

function trackScrollPosition(elements) {
  elements.forEach((element) => {
    if (!element) return;
    let scrollPosition = localStorage.getItem(`scrollPosition-${element.id}`);

    if (scrollPosition) {
      scrollPosition = JSON.parse(scrollPosition);
      element.scrollTo(
        scrollPosition.elementScrollX,
        scrollPosition.elementScrollY
      );
    }

    element.addEventListener('scroll', (e) => {
      let elementScrollX = e.target.scrollLeft;
      let elementScrollY = e.target.scrollTop;

      localStorage.setItem(
        `scrollPosition-${element.id}`,
        JSON.stringify({ elementScrollX, elementScrollY })
      );
    });
  });

  // if page is changed, remove scroll position from local storage
  window.addEventListener('beforeunload', () => {
    localStorage.removeItem(`scrollPosition-${content.id}`);
  }
  );
  
}

// Example usage
let elements = [content];

trackScrollPosition(elements);

let options = {
    root: document.querySelector('#article'),
    rootMargin: '0px 0px -75%',
    threshold: 1.0
}

const MyToc = document.querySelector('.my-toc'),
    headingObserver = new IntersectionObserver(headings => {
        headings.forEach(heading => {
            const id = heading.target.getAttribute('id');
            if (heading.isIntersecting) {
                inactive();
                subItem = document.querySelector(`.my-toc a[href="#${id}"]`).classList.add('active');
            }
        });
    }, options);

document.querySelectorAll('h0[id],h1[id],h2[id],h3[id],h4[id]').forEach((heading) => {
    console.log(heading);
    headingObserver.observe(heading);
});

function inactive() {
    document.querySelectorAll('.my-toc a').forEach((a) => {
        a.classList.remove('active');
    });
}

let timer = null;
window.onscroll = function () {
  clearTimeout(timer);
  timer = setTimeout(function () {
    scroll_follow();
  }, 300);
};

function scroll_follow() {
  let res = document.querySelectorAll('.my-toc a.active');
  if (res.length != 1) { return; }
  let active_heading = res.item(0);

  let count = 0, current = 0;
  document.querySelectorAll('.my-toc a').forEach((a) => {
    if (a == active_heading) {
      current = count;
    }
    ++count;
  });
  ++current;
  count /= 2;

  let fullToc = document.querySelector('.docs-toc');
  let myToc = document.querySelector('.my-toc');

  let single = myToc.scrollHeight / count;
  let offset = fullToc.scrollHeight - myToc.scrollHeight;
  let max = parseInt((window.innerHeight - offset) / single);
  let mid = parseInt(max / 2);

  if (current >= max - mid) {
    fullToc.scrollTop = single * (current - mid);
  } else {
    fullToc.scrollTop = 0;
  }
}
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

// 与endLevel一致    
document.querySelectorAll('h0[id],h1[id],h2[id],h3[id]').forEach((heading) => {
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

  let scrollLimit = 5;
  if (scrollLimit > mid)
    scrollLimit = mid;
  let scrollAlready = 0;
  if (current - scrollAlready > scrollLimit) {
    scrollAlready = current - scrollLimit;
    fullToc.scrollTop = single * scrollAlready;
  } else {
    fullToc.scrollTop = 0;
  }
}

let frontEnd = 2000;
let backEnd = -460;
let picSize = 205;
let step = 0.2;

function translatePic(id, cur) {
  let list = document.querySelectorAll(id);
  let len = list.length;
  let i = 0;
  for (; i < len; ++i) {
    let thisCur = cur + i * picSize;
    
    if (thisCur > frontEnd)
      thisCur -= frontEnd - backEnd;
    else if (thisCur < backEnd)
      thisCur += frontEnd - backEnd;

    let value = 'translateX(' + thisCur + 'px)';
    list[i].style.setProperty('transform', value);
  }
}

let cur1 = 0;
let cur2 = 0;
let scrollTimer = window.setInterval(function () {
  cur1 = (cur1 + step) % (frontEnd - backEnd); // 0 ~ (frontEnd - backEnd)
  cur2 = (cur2 - step) % (frontEnd - backEnd); // (backEnd - frontEnd) ~ 0
  translatePic('#scrollpic1 li', cur1);
  translatePic('#scrollpic2 li', cur2);
}, 5);
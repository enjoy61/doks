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

let tCur1 = new Array();
let tCur2 = new Array();
document.addEventListener('DOMContentLoaded', () => {
  let cur = -100;
  let picSize = 205;
  let lis = document.querySelectorAll('#scrollpic1 li');
  let len = lis.length;
  let i = 0;
  for (i = 0; i < len; ++i) {
    tCur1[i] = cur + i * picSize;
  }

  lis = document.querySelectorAll('#scrollpic2 li');
  len = lis.length;
  for (i = 0; i < len; ++i) {
    tCur2[i] = cur + i * picSize;
  }
})

let te = 2000;
let ts = -460;
function setMarginLeft() {
  let lis1 = document.querySelectorAll('#scrollpic1 li');
  let lis2 = document.querySelectorAll('#scrollpic2 li');
  let len = lis1.length;
  let i = 0;
  for ( i = 0; i < len; ++i) {
    tCur1[i] += 0.2;
    if (tCur1[i] > te)
      tCur1[i] -= te - ts;
    let tValue1 = tCur1[i] + 'px';
    let tStr1 = 'translateX(' + tValue1 + ')';
    lis1[i].style.setProperty('transform', tStr1);
  }

  len = lis2.length;
  for (i = 0; i < len; ++i) {
    tCur2[i] -= 0.2;
    if (tCur2[i] < ts)
      tCur2[i] += te - ts;
    let tValue2 = tCur2[i] + 'px';
    let tStr2 = 'translateX(' + tValue2 + ')';
    lis2[i].style.setProperty('transform', tStr2);
  }
}

let scrollTimer = window.setInterval(function () {
  setMarginLeft();
}, 5);
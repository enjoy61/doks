// 高亮
let headingFlag;
let headingCnt;

function addHeadingIdx(list) {
  let i = 0;
  list.forEach((item) => {
    item.setAttribute('headingIdx', i++);
  });
}

function refreshHighlight() {
  headingCnt = 0;
  for (let i = 0; i < headingFlag.length; ++i) {
    if (headingFlag[i]) {
      headingCnt++;
      document.querySelector(`.my-toc a[headingIdx="${i}"]`).classList.add('active');
    }
    else
    {
      document.querySelector(`.my-toc a[headingIdx="${i}"]`).classList.remove('active');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toc = document.querySelector('.my-toc');
  if (!toc) return;

  const tocHeadings = toc.querySelectorAll('a');
  const headings = Array.apply(null, document.querySelectorAll('h2[id], h3[id]')).filter(function (value, index, arr) {
    return arr[index].querySelector('.anchor');
  });

  if (tocHeadings.length !== headings.length) return;

  addHeadingIdx(tocHeadings);
  addHeadingIdx(headings);

  headingFlag = new Array(headings.length).fill(false);
  headingCnt = 0;

  const intersectionOptions = {
    threshold: 1.0
  };

  const headingObserver = new IntersectionObserver(headings => {
    headings.forEach(heading => {
      // console.log('ratio', heading.target.getAttribute('id'), heading.intersectionRatio, heading.isIntersecting, headingCnt);
      const idx = heading.target.getAttribute('headingIdx');
      if ((headingFlag[idx] = heading.isIntersecting) || (headingCnt !== 1)) {
        refreshHighlight();
      }
    });
  }, intersectionOptions); 

  headings.forEach((heading) => {
    headingObserver.observe(heading);
  });
});

// 跟随滚动
const followTimerInterval = 300;
let headingHeight, UpIdx;
let followTimer = null;

function computeHeadingHeight() {
  const toc = document.querySelector('.my-toc');
  return toc.scrollHeight / toc.querySelectorAll('a').length;
}

function computeUpIdx() {
  const fullToc = document.querySelector('.docs-toc');
  const myToc = document.querySelector('.my-toc');
  const offset = fullToc.scrollHeight - myToc.scrollHeight;
  const max = parseInt((window.innerHeight - offset) / headingHeight);
  return parseInt(max / 6);
}

function scrollFollow() {
  const activeHeadings = document.querySelector('.my-toc').querySelectorAll('a.active');
  if (activeHeadings.length > 0) {
    const heading = activeHeadings.item(0);
    const idx = heading.getAttribute('scrollIdx');
    const scrollTarget = idx - upIdx;
    document.querySelector('.docs-toc').scrollTop = headingHeight * scrollTarget;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const myToc = document.querySelector('.my-toc');
  const fullToc = document.querySelector('.docs-toc');
  if (!myToc || !fullToc) return;
  
  let i = 0;
  myToc.querySelectorAll('a').forEach(entry => {
    entry.setAttribute('scrollIdx', i++);
  });

  headingHeight = computeHeadingHeight();
  upIdx = computeUpIdx();

  window.addEventListener('scroll', () => {
    clearTimeout(followTimer);
    followTimer = setTimeout(function () {
      scrollFollow();
    }, followTimerInterval);
  });
});

// 图片水平循环滚动
const picSize = 205;
const frontEnd = 2000;
const backEnd = -460;
const step = 0.2;

function translatePic(pics, cur) {
  for (let i = 0; i < pics.length; ++i) {
    let thisCur = cur + i * picSize;
    
    if (thisCur > frontEnd)
      thisCur -= frontEnd - backEnd;
    else if (thisCur < backEnd)
      thisCur += frontEnd - backEnd;

    const value = 'translateX(' + thisCur + 'px)';
    pics[i].style.setProperty('transform', value);
  }
}

let cur1 = 0;
let cur2 = 0;
document.addEventListener('DOMContentLoaded', () => {
  const pics1 = document.querySelectorAll('#scrollpic1 li');
  const pics2 = document.querySelectorAll('#scrollpic2 li');
  if (!pics1.length || !pics2.length) return;

  const scrollTimer = window.setInterval(function () {
    cur1 = (cur1 + step) % (frontEnd - backEnd); // 0 ~ (frontEnd - backEnd)
    cur2 = (cur2 - step) % (frontEnd - backEnd); // (backEnd - frontEnd) ~ 0
    translatePic(pics1, cur1);
    translatePic(pics2, cur2);
  }, 5);
});
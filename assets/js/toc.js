// 高亮
let HeadingFlag;
let HeadingCnt;

function addHeadingIdx(list) {
  let i = 0;
  list.forEach((item) => {
    item.setAttribute('headingIdx', i++);
  });
}

function refreshHighlight() {
  HeadingCnt = 0;
  for (let i = 0; i < HeadingFlag.length; ++i) {
    if (HeadingFlag[i]) {
      ++HeadingCnt;
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

  HeadingFlag = new Array(headings.length).fill(false);
  HeadingCnt = 0;

  const intersectionOptions = {
    threshold: 1.0
  };

  const headingObserver = new IntersectionObserver(headings => {
    headings.forEach(heading => {
      // console.log('ratio', heading.target.getAttribute('id'), heading.intersectionRatio, heading.isIntersecting, HeadingCnt);
      const idx = heading.target.getAttribute('headingIdx');
      if ((HeadingFlag[idx] = heading.isIntersecting) || (HeadingCnt !== 1)) {
        refreshHighlight();
      }
    });
  }, intersectionOptions); 

  headings.forEach((heading) => {
    headingObserver.observe(heading);
  });
});

// 跟随滚动
let HeadingHeight, UpIdx;
let FollowTimer = null;
const FollowTimerInterval = 300;

function computeHeadingHeight() {
  const toc = document.querySelector('.my-toc');
  return toc.scrollHeight / toc.querySelectorAll('a').length;
}

function computeUpIdx() {
  const fullToc = document.querySelector('.docs-toc');
  const myToc = document.querySelector('.my-toc');
  const offset = fullToc.scrollHeight - myToc.scrollHeight;
  const max = parseInt((window.innerHeight - offset) / HeadingHeight);
  return parseInt(max / 6);
}

function scrollFollow() {
  const activeHeadings = document.querySelector('.my-toc').querySelectorAll('a.active');
  if (activeHeadings.length > 0) {
    const heading = activeHeadings.item(0);
    const idx = heading.getAttribute('scrollIdx');
    const scrollTarget = idx - UpIdx;
    document.querySelector('.docs-toc').scrollTop = HeadingHeight * scrollTarget;
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

  HeadingHeight = computeHeadingHeight();
  UpIdx = computeUpIdx();

  window.onscroll = function () {
    clearTimeout(FollowTimer);
    FollowTimer = setTimeout(scrollFollow, FollowTimerInterval);
  };
});

// 图片水平循环滚动
const PicWidth = 205;
const FrontEnd = 2000;
const BackEnd = -460;
const Step = 0.2;
const ScrollTimerInterval = 5;

function translatePic(pics, cur) {
  for (let i = 0; i < pics.length; ++i) {
    let thisCur = cur + i * PicWidth;
    
    if (thisCur > FrontEnd)
      thisCur -= FrontEnd - BackEnd;
    else if (thisCur < BackEnd)
      thisCur += FrontEnd - BackEnd;

    const value = 'translateX(' + thisCur + 'px)';
    pics[i].style.setProperty('transform', value);
  }
}

let Cur1 = 0;
let Cur2 = 0;
document.addEventListener('DOMContentLoaded', () => {
  const pics1 = document.querySelectorAll('#scrollpic1 li');
  const pics2 = document.querySelectorAll('#scrollpic2 li');
  if (!pics1.length || !pics2.length) return;

  const scrollTimer = window.setInterval(function () {
    Cur1 = (Cur1 + Step) % (FrontEnd - BackEnd); // 0 ~ (FrontEnd - BackEnd)
    Cur2 = (Cur2 - Step) % (FrontEnd - BackEnd); // (BackEnd - FrontEnd) ~ 0
    translatePic(pics1, Cur1);
    translatePic(pics2, Cur2);
  }, ScrollTimerInterval);
});
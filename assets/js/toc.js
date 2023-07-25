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

document.querySelectorAll('h0[id],h1[id],h2[id],h3[id]').forEach((heading) => {
    console.log(heading);
    headingObserver.observe(heading);
});

function inactive() {
    document.querySelectorAll('.my-toc a').forEach((a) => {
        a.classList.remove('active');
    });
}
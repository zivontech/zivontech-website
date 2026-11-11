document.querySelector('.menu')?.addEventListener('click',function(){const n=document.querySelector('.links');n.classList.toggle('open');this.setAttribute('aria-expanded',String(n.classList.contains('open')))});document.querySelector('#enquiry')?.addEventListener('submit',function(e){e.preventDefault();const f=new FormData(this);const msg=['Name: '+f.get('name'),'Email: '+f.get('email'),'Phone: '+f.get('phone'),'Company: '+f.get('company'),'Service: '+f.get('service'),'','Message:',''+f.get('message')].join('\n');location.href='mailto:admin@zivontech.com?subject='+encodeURIComponent('Website enquiry - '+f.get('service'))+'&body='+encodeURIComponent(msg)});

// Progressive enhancement: content remains visible when JavaScript is disabled.
if ('IntersectionObserver' in window && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const targets = document.querySelectorAll('.section-head, .service, .split > div, .steps article, .chips span, .info-card, .contact-list > div, .contact-form, .cta-inner, .pagehero .wrap');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08, rootMargin: '0px 0px -30px 0px'});
  targets.forEach((element) => {
    // Only animate elements below the initial viewport; avoid initial flashes.
    if (element.getBoundingClientRect().top > window.innerHeight * 0.9) {
      element.classList.add('reveal-ready');
      observer.observe(element);
    }
  });
}

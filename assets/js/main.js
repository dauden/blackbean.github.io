(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  const scrollTo = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  let backToTop = select('.back-to-top')
  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 100) {
        backToTop.classList.add('active')
      } else {
        backToTop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBackToTop)
    onscroll(document, toggleBackToTop)
  }

  on('click', '.mobile-nav-toggle', function(_e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  on('click', '.scroll-to', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollTo(this.hash)
    }
  }, true)

  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollTo(window.location.hash)
      }
    }
  });

  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }


  on('click', '.toggleUI', function(_e) {
    select('body').classList.toggle('command-line');
  })

  const command = select('#commandSelect');
  if (command) {
    const typed_strings = command.getAttribute('data-typed-items')
    new Typed(command, {
      strings: typed_strings.split(','),
      loop: false,
      typeSpeed: 100,
      backSpeed: 50,
      startDelay: 1500,
      backDelay: 2000,
      showCursor: true,
      onBegin: () => {
        const result = select('#commandResult');
        if (result) result.style = 'display: none';
      },
      onComplete: (self) => {
        const result = select('#commandResult');
        if (result) result.style = '';
        const typing = select('#commandResultTyping');
        if (typing) {
          const typed_strings = typing.getAttribute('data-typed-items')
          new Typed(typing, {
            strings: typed_strings.split(','),
            loop: false,
            typeSpeed: 100,
            backSpeed: 50,
            startDelay: 0,
            backDelay: 2000,
            showCursor: false,
            onComplete: (self) => {
            }
          });
        }
      }
    });
  }

  let skillsContent = select('.skills-content');
  if (skillsContent) {
    new Waypoint({
      element: skillsContent,
      offset: '80%',
      handler: function(_direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  new Swiper('.recommendations-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
  new PureCounter();

  document.addEventListener("contextmenu", function (e){
    e.preventDefault();
  }, false);

})()

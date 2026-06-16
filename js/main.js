document
  .querySelectorAll('[data-fancybox="gallery"]')
  .forEach(function (element) {
    Fancybox.bind(element, {
      buttons: [
        'zoom',
        'share',
        'slideShow',
        'fullScreen',
        'download',
        'thumbs',
        'close',
      ],
      loop: true,
      speed: 500,
      transitionEffect: 'slide',
      closeBtn: true,
      keyboard: true,

      mobile: {
        preventCaptionOverlap: false,
        idleTime: false,
        clickContent: function (current, event) {
          return current.type === 'image' ? 'toggleControls' : 'close';
        },
        clickSlide: function (current, event) {
          return current.type === 'image' ? 'toggleControls' : 'close';
        },
        dblclickContent: false,
        dblclickSlide: false,
      },
    });
  });

document.addEventListener('scroll', function () {
  const elements = document.querySelectorAll('.hidden, .animate__slideInLeft');
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;

    // Verifica se o elemento está parcialmente visível
    const isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    if (isVisible) {
      el.classList.remove('hidden');
      el.classList.add('animate__slideInLeft');

      // Encontre e anime os elementos internos específicos
      const innerAnimations = el.querySelectorAll('.animate__rotateInDownLeft');
      innerAnimations.forEach((innerEl) => {
        innerEl.classList.add('animate__animated');
      });
    } else {
      el.classList.add('hidden');
      el.classList.remove('animate__slideInLeft');

      // Resetar animações internas
      const innerAnimations = el.querySelectorAll('.animate__rotateInDownLeft');
      innerAnimations.forEach((innerEl) => {
        innerEl.classList.remove('animate__animated');
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  setInterval(function () {
    var messageBox = document.querySelector('.whatsapp-message-box');
    messageBox.classList.remove(
      'animate__animated',
      'animate__headShake',
      'animate__shakeX'
    );

    void messageBox.offsetWidth;

    messageBox.classList.add(
      'animate__animated',
      'animate__headShake',
      'animate__shakeX'
    );
  }, 10000);
});

var animacao = lottie.loadAnimation({
  container: document.getElementById('calendario-animado'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'calendar.json',
});

// Scroll-spy: marca no menu a seção que está em foco na viewport
(function () {
  const navLinks = Array.from(
    document.querySelectorAll('.navbar-nav .nav-link')
  );
  const linkBySection = new Map();
  const sections = [];

  navLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('#') && href.length > 1) {
      const section = document.querySelector(href);
      if (section) {
        linkBySection.set(section, link);
        sections.push(section);
      }
    }
  });

  if (sections.length) {
    const setActive = (link) => {
      navLinks.forEach((l) => l.classList.remove('active'));
      if (link) link.classList.add('active');
    };

    const updateActive = () => {
      // No fim da página, força a última seção (footer/contato), que é curta
      // demais para alcançar a linha de referência ao rolar até o fim.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(linkBySection.get(sections[sections.length - 1]));
        return;
      }
      // Caso geral: última seção cujo topo passou da linha a 35% da viewport
      const line = window.innerHeight * 0.35;
      let current = sections[0];
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= line) current = section;
      });
      setActive(linkBySection.get(current));
    };

    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateActive();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
    updateActive();
  }

  // Fecha o menu suspenso no mobile ao clicar em um link
  const collapse = document.getElementById('navbarSupportedContent');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (collapse && collapse.classList.contains('show')) {
        collapse.classList.remove('show');
      }
    });
  });
})();



document.querySelectorAll('[data-fancybox="gallery"]').forEach(function(element) {
    Fancybox.bind(element, {
      buttons: [
        "zoom",
        "share",
        "slideShow",
        "fullScreen",
        "download",
        "thumbs",
        "close"
      ],
      loop: true,
      speed: 500,
      transitionEffect: "slide",
      closeBtn: true,
      keyboard: true,

      mobile: {
        preventCaptionOverlap: false,
        idleTime: false,
        clickContent: function(current, event) {
          return current.type === "image" ? "toggleControls" : "close";
        },
        clickSlide: function(current, event) {
          return current.type === "image" ? "toggleControls" : "close";
        },
        dblclickContent: false,
        dblclickSlide: false
      }


    });
  });

  document.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.hidden, .animate__slideInLeft');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elemTop = rect.top;
      const elemBottom = rect.bottom;
  
      // Verifica se o elemento está parcialmente visível
      const isVisible = (elemTop < window.innerHeight) && (elemBottom >= 0);
      if (isVisible) {
        el.classList.remove('hidden');
        el.classList.add('animate__slideInLeft');
  
        // Encontre e anime os elementos internos específicos
        const innerAnimations = el.querySelectorAll('.animate__rotateInDownLeft');
        innerAnimations.forEach(innerEl => {
          innerEl.classList.add('animate__animated');
        });
  
      } else {
        el.classList.add('hidden');
        el.classList.remove('animate__slideInLeft');
  
        // Resetar animações internas
        const innerAnimations = el.querySelectorAll('.animate__rotateInDownLeft');
        innerAnimations.forEach(innerEl => {
          innerEl.classList.remove('animate__animated');
        });
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    setInterval(function() {
      var messageBox = document.querySelector('.whatsapp-message-box');
      messageBox.classList.remove('animate__animated', 'animate__headShake', 'animate__shakeX');
      
      // Reforçar o reflow do navegador, necessário para reiniciar a animação
      void messageBox.offsetWidth;
      
      messageBox.classList.add('animate__animated', 'animate__headShake', 'animate__shakeX');
    }, 10000); 
  });
  
  
  var animacao = lottie.loadAnimation({
    container: document.getElementById('calendario-animado'), 
    renderer: 'svg', 
    loop: true, 
    autoplay: true, 
    path: 'calendar.json' 
  });


document.querySelector('.acceptButton').addEventListener('click', function() {
    document.querySelector('.cookieCard').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.cardl').forEach(cardl => {
    cardl.addEventListener('mousemove', e => {
      const light = cardl.querySelector('.card-lightl');
      light.style.opacity = 1;
      light.style.left = `${e.pageX - cardl.getBoundingClientRect().left - 75}px`;
      light.style.top = `${e.pageY - cardl.getBoundingClientRect().top - 75}px`;
    });

    cardl.addEventListener('mouseleave', () => {
      const light = cardl.querySelector('.card-lightl');
      light.style.opacity = 0;
    });
  });
});



         








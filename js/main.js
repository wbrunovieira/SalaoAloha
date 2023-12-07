

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

// https://freecodez.com
console.clear();

const cardsContainerl = document.querySelector(".cardsl");
const cardsContainerInnerl = document.querySelector(".cards__innerl");
const cardsl = Array.from(document.querySelectorAll(".cardl"));
const overlayl = document.querySelector(".overlayl");

const applyOverlayMaskl = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainerl.offsetLeft;
  const y = e.pageY - cardsContainerl.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createOverlayCtal = (overlayCardl, ctaEl) => {
  const overlayCtal = document.createElement("div");
  overlayCtal.classList.add("ctal");
  overlayCtal.textContent = ctaEl.textContent;
  overlayCtal.setAttribute("aria-hidden", true);
  overlayCardl.append(overlayCtal);
};

const observerl = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndexl = cardsl.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndexl].style.width = `${width}px`;
      overlay.children[cardIndexl].style.height = `${height}px`;
    }
  });
});

const initOverlayCardl = (cardEl) => {
  const overlayCardl = document.createElement("div");
  overlayCardl.classList.add("cardl");
  createOverlayCtal(overlayCardl, cardEl.lastElementChild);
  overlayl.append(overlayCardl);
  observerl.observe(cardEl);
};

cardsl.forEach(initOverlayCardl);
document.body.addEventListener("pointermove", applyOverlayMaskl);


 

    
         








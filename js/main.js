

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
      speed: 300,
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
  


 

    
         








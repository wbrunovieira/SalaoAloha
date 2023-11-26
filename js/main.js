let currentImageIndex = 0;

const images = [
    "images/work1.jpg",
    "images/work2.jpg",
    "images/work3.jpg",
    "images/work4.jpg",
    "images/work5.jpg",
    "images/work6.jpg",
    "images/work7.jpg",
    "images/work8.jpg",
    "images/work9.jpg",
];




    // loader
    
      


    // our work
  

document.addEventListener('DOMContentLoaded', (event) => {
        document.querySelector('.close').addEventListener('click', closeLightbox);
    });
         


document.querySelectorAll('.portfolio-popup').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        openLightbox(this.href);
    });
});

function openLightbox(src) {
    currentImageIndex = images.indexOf(src);
    if (currentImageIndex === -1) return; // URL não encontrado no array

    document.getElementById('lightbox').style.display = 'block';
    document.querySelector('.lightbox-content').src = src;
}


function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeImage(direction) {
    currentImageIndex += direction;

    // Verifique os limites do array
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    document.querySelector('.lightbox-content').src = images[currentImageIndex];
}


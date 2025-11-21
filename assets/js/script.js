AOS.init()

// nama sambutan
const urlParams = new URLSearchParams(window.location.search)
const panggilan = urlParams.get('p')
const nama = urlParams.get('n')
const namaSambutan = document.querySelector('#nama-sambutan')

namaSambutan.innerText = `${panggilan} ${nama}`

document.addEventListener("DOMContentLoaded", function() {
    
    // ====== 1. SMART AUTO SCROLL (Untuk Semua Gallery) ======
    const galleries = document.querySelectorAll('.gallery-container');

    galleries.forEach((gallery) => {
        let scrollAmount = 1;
        let scrollDirection = 1;
        let isPaused = false;

        // Fungsi Scroll
        function autoScroll() {
            if (!isPaused) {
                // Logika pantulan (ping-pong)
                if (gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 1) {
                    scrollDirection = -1; // Mundur
                } else if (gallery.scrollLeft <= 0) {
                    scrollDirection = 1; // Maju
                }
                
                gallery.scrollLeft += scrollDirection * 3; // Kecepatan scroll (1 itu smooth)
            }
        }

        // Jalankan interval
        let scrollInterval = setInterval(autoScroll, 20);

        // Fitur UX: Stop scroll saat mouse di atas gallery
        gallery.addEventListener('mouseenter', () => {
            isPaused = true;
            gallery.style.scrollBehavior = 'auto'; // Supaya user bisa scroll manual enak
        });

        gallery.addEventListener('mouseleave', () => {
            isPaused = false;
            gallery.style.scrollBehavior = 'smooth';
        });
    });

    // ====== 2. CLICK IMAGE TO OPEN MODAL (Tetap sama, sudah oke) ======
    const modalElement = document.getElementById('imageModal');
    
    // Cek apakah modal ada di HTML untuk menghindari error
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        const modalImage = document.getElementById('modalImage');
        const images = document.querySelectorAll('.gallery-img');

        images.forEach(img => {
            img.addEventListener('click', () => {
                modalImage.src = img.src;
                modal.show();
            });
        });
    }
});
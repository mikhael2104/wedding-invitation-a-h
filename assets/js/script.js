AOS.init({
    once: false,
    mirror: false,
    duration: 1000
});

// music
var music = document.querySelector('.music');
var isPlaying = true;

// navbar musik lingkaran
var musicNav = document.querySelector('.nav');

// awalnya disembunyikan
musicNav.style.display = 'none';

// disable scroll di awal
document.body.style.overflow = 'hidden';

// door mulai
function mulai() {
    // back to top
    window.scrollTo(0, 0);

    var doorSection = $('#door-section');

    setTimeout(function () {
        // musik play
        music.play();
        doorSection.css('transform-origin', '50% 650px');
        doorSection.css('transform', 'scale(6)');
    }, 600);

    setTimeout(function () {
        doorSection.css('opacity', 0);
        $('body').addClass('transition');
        doorSection.css('display', 'none');

        // aktifkan scroll lagi
        document.body.style.overflow = 'auto';

        // munculkan navbar musik setelah pintu hilang
        musicNav.style.display = 'block';
        // optional: tambahkan animasi fade-in
        musicNav.style.opacity = 0;
        setTimeout(() => {
            musicNav.style.transition = 'opacity 0.5s ease-in-out';
            musicNav.style.opacity = 1;
        }, 50);

        // refresh AOS supaya animasi section lain muncul
        setTimeout(() => {
            AOS.refreshHard();
        }, 300);
    }, 2000);
}

// toggle musik
function toggleMusic(event) {
    event.preventDefault();

    const musicButton = document.getElementById('music-button');

    if (isPlaying) {
        musicButton.innerHTML = '<i class ="fas fa-fw fa-pause"></i>';
        musicButton.classList.remove('rotate');
        musicButton.style.transform = 'translateY(0)';
        music.pause();
    } else {
        musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>';
        musicButton.classList.add('rotate');
        music.play();
    }

    isPlaying = !isPlaying;
}


// tombol open-invitation
document.querySelector('.btn-open').addEventListener('click', function(e) {
    e.preventDefault();

    const doorSection = document.getElementById('door-section');
    
    // animasi naik
    doorSection.style.transform = 'translateY(-100%)';
    doorSection.style.opacity = '0';

    // setelah animasi selesai, sembunyikan section
    setTimeout(() => {
        doorSection.style.display = 'none';
        document.body.classList.add('transition');
    }, 1000); // durasi sama dengan transition di CSS
});


// nama sambutan
const urlParams = new URLSearchParams(window.location.search)
const panggilan = urlParams.get('p')
const nama = urlParams.get('n')
const namaSambutan = document.querySelector('#nama-sambutan')

namaSambutan.innerText = `${panggilan} ${nama}`

// image scroll
document.addEventListener("DOMContentLoaded", function () {

    const modalElement = document.getElementById('imageModal');

    // Cek apakah Bootstrap sudah terload dengan benar
    if (typeof bootstrap !== 'undefined' && modalElement) {

        const myModal = new bootstrap.Modal(modalElement);
        const modalImage = document.getElementById('modalImage');
        const galleryImages = document.querySelectorAll('.gallery-img');

        console.log("Gallery Script Loaded. Jumlah gambar: " + galleryImages.length);

        galleryImages.forEach(img => {
            img.addEventListener('click', function () {
                // Set gambar modal sama dengan gambar yang diklik
                modalImage.src = this.src;
                // Tampilkan Modal
                myModal.show();
            });
        });

    } else {
        console.error("Bootstrap belum terload atau Modal ID tidak ditemukan!");
    }
});

// rsvp
window.addEventListener("load", function () {
    const form = document.getElementById('rsvp-form');
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const status = document.getElementById('status').value
        const nama = document.getElementById('nama').value

        if (nama === "") {
            Swal.fire({
                icon: "error",
                text: "Nama Harus Diisi"
            })
            return;
        }

        if (status == 0) {
            Swal.fire({
                icon: "error",
                text: "Pilih salah satu"
            })
            return;
        }

        const data = new FormData(form);
        const action = e.target.action;
        const input = form.querySelectorAll('input, select, button')
        input.forEach(input => {
            input.disabled = true
        })

        fetch(action, {
            method: 'POST',
            body: data
        })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    text: "Konfirmasi Kehadiran Anda Berhasil Terkirim"
                })
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    text: error
                })
            })
            .finally(() => {
                input.forEach(input => {
                    input.disabled = false
                })
            })
    })
})
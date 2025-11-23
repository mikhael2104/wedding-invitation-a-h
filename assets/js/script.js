AOS.init()

// music
var tempMusic = ''
music = document.querySelector('.music')

if (tempMusic) {
    music.src = tempMusic
}

// door mulai
function mulai() {
    // back to top
    window.scrollTo(0, 0)

    // door section
    var doorSection = $('#door-section')
    var doors = document.querySelectorAll('.door')

    // set timeout music
    setTimeout(function () {
        // music play
        music.play()
        doorSection.css('transform-origin', '50% 650px')
        doorSection.css('transform', 'scale(6)')
    }, 600)

    // set timeout door
    setTimeout(function () {
        doorSection.css('opacity', 0)
        $('body').addClass('transition')
        doorSection.css('display', 'none')
    }, 2000)
}

// button music
var isPlaying = true

function toggleMusic(event) {
    event.preventDefault()

    const musicButton = document.getElementById('music-button')

    if (isPlaying) {
        musicButton.innerHTML = '<i class ="fas fa-fw fa-pause"></i>'
        musicButton.classList.remove('rotate')
        musicButton.style.transform = 'translateY(0)'
        music.pause()
    } else {
        musicButton.innerHTML = '<i class = "fas fa-fw fa-compact-disc"></i>'
        musicButton.classList.add('rotate')
        music.play()
    }

    isPlaying = !isPlaying
}

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
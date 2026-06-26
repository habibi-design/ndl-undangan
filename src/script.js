// ==========================================
// 1. LOGIKA BUKA UNDANGAN & KONTROL AUDIO
// ==========================================
const btnBuka = document.getElementById('btn-buka');
const cover = document.getElementById('cover');
const kontenUtama = document.getElementById('konten-utama');
const musikLatar = document.getElementById('musik-latar');
const btnMusik = document.getElementById('btn-musik');
const ikonMusik = document.getElementById('ikon-musik');
const btnScroll = document.getElementById('btn-scroll'); 

btnBuka.addEventListener('click', () => {
    kontenUtama.classList.remove('hidden');
    btnMusik.classList.remove('hidden');
    btnScroll.classList.remove('hidden'); 
    cover.style.transform = 'translateY(-100%)';
    buatEfekBungaGugur();
    
    musikLatar.play().catch(error => {
        console.log("Pemutaran musik tertahan interaksi browser: ", error);
    });
});

btnMusik.addEventListener('click', () => {
    if (musikLatar.paused) {
        musikLatar.play();
        ikonMusik.innerText = "Mute";
        btnMusik.classList.remove('bg-stone-500', 'text-white', 'border-stone-400');
        btnMusik.classList.add('bg-stone-800', 'text-[#F2E8C6]', 'border-stone-700');
    } else {
        musikLatar.pause();
        ikonMusik.innerText = "Play";
        btnMusik.classList.remove('bg-stone-800', 'text-[#F2E8C6]', 'border-stone-700');
        btnMusik.classList.add('bg-stone-500', 'text-white', 'border-stone-400');
    }
});


// ==========================================
// 2. LOGIKA COUNTDOWN TIMER
// ==========================================
const tanggalTarget = new Date('December 31, 2026 09:00:00').getTime();

const hitungMundur = setInterval(() => {
    const waktuSekarang = new Date().getTime();
    const selisihWaktu = tanggalTarget - waktuSekarang;

    const hari = Math.floor(selisihWaktu / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisihWaktu % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const menit = Math.floor((selisihWaktu % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisihWaktu % (1000 * 60)) / 1000);

    document.getElementById('hari').innerText = hari < 10 ? '0' + hari : hari;
    document.getElementById('jam').innerText = jam < 10 ? '0' + jam : jam;
    document.getElementById('menit').innerText = menit < 10 ? '0' + menit : menit;
    document.getElementById('detik').innerText = detik < 10 ? '0' + detik : detik;

    if (selisihWaktu < 0) {
        clearInterval(hitungMundur);
        document.getElementById('countdown').innerHTML = `
            <div class="w-full text-center p-3 text-stone-800 font-editorial font-bold text-lg">
                Acara Telah Berlangsung
            </div>
        `;
    }
}, 1000);


// ==========================================
// 3. FITUR SALIN NOMOR REKENING AUTOMATIC
// ==========================================
const btnSalin = document.getElementById('btn-salin');
const noRek = document.getElementById('no-rek').innerText;
const notifSalin = document.getElementById('notif-salin');

btnSalin.addEventListener('click', () => {
    navigator.clipboard.writeText(noRek).then(() => {
        notifSalin.classList.remove('hidden');
        btnSalin.innerText = "Berhasil";
        setTimeout(() => {
            notifSalin.classList.add('hidden');
            btnSalin.innerText = "Salin Rekening";
        }, 2000);
    }).catch(err => {
        console.error("Gagal menyalin text: ", err);
    });
});


// ==========================================
// 4. FITUR SUBMIT RSVP & FILTER KATA KASAR
// ==========================================
const formUcapan = document.getElementById('form-ucapan');
const boxPesan = document.getElementById('box-pesan');

const daftarKataKasar = [
    "anjing", "babi", "monyet", "bangsat", "tolol", 
    "goblok", "bego", "bajingan", "asu", "kontol", "memek"
];

function saringPesan(teks) {
    let teksHasilSaringan = teks;
    daftarKataKasar.forEach(kata => {
        const regex = new RegExp(`\\b${kata}\\b`, 'gi');
        const sensor = "*".repeat(kata.length);
        teksHasilSaringan = teksHasilSaringan.replace(regex, sensor);
    });
    return teksHasilSaringan;
}

formUcapan.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nama = document.getElementById('input-nama').value;
    const konfirmasi = document.getElementById('input-konfirmasi').value;
    const pesanMentah = document.getElementById('input-pesan').value;
    
    const namaBersih = saringPesan(nama);
    const pesanBersih = saringPesan(pesanMentah);

    const ucapanBaru = document.createElement('div');
    ucapanBaru.className = "bg-white p-5 border border-stone-100 shadow-sm animate-pulse";
    ucapanBaru.innerHTML = `
        <div class="flex items-center justify-between mb-3">
            <strong class="font-editorial text-lg text-stone-800">${namaBersih}</strong>
            <span class="text-[8px] border border-stone-300 text-stone-600 px-2 py-1 uppercase tracking-widest">${konfirmasi}</span>
        </div>
        <p class="font-sans text-[10px] text-stone-500 leading-relaxed tracking-wide">${pesanBersih}</p>
    `;
    
    boxPesan.insertBefore(ucapanBaru, boxPesan.firstChild);
    
    setTimeout(() => {
        ucapanBaru.classList.remove('animate-pulse');
    }, 1000);
    
    formUcapan.reset();
});


// ==========================================
// 5. FITUR ANIMASI KELOPAK BUNGA BERGUGURAN
// ==========================================
function buatEfekBungaGugur() {
    const wadahBunga = document.getElementById('wadah-bunga');
    const jumlahKelopak = 20;

    for (let i = 0; i < jumlahKelopak; i++) {
        const kelopak = document.createElement('div');
        kelopak.className = 'kelopak-bunga';

        const ukuran = Math.random() * 10 + 10;
        kelopak.style.width = `${ukuran}px`;
        kelopak.style.height = `${ukuran}px`;
        kelopak.style.left = `${Math.random() * 100}%`;
        kelopak.style.animationDuration = `${Math.random() * 5 + 6}s`;
        kelopak.style.animationDelay = `${Math.random() * 5}s`;

        wadahBunga.appendChild(kelopak);
    }
}


// ==========================================
// 6. LOGIKA DETEKSI SCROLL ELEMEN NAIK
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const elemenAnimasi = document.querySelectorAll('.efek-scroll');

    const opsiPengaturan = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('muncul');
                observer.unobserve(entry.target); 
            }
        });
    }, opsiPengaturan);

    elemenAnimasi.forEach(elemen => {
        observer.observe(elemen);
    });
});


// ==========================================
// 7. FITUR SCROLL OTOMATIS (AUTOSCROLL)
// ==========================================
let intervalScroll = null;
let sedangAutoScroll = false;

btnScroll.addEventListener('click', () => {
    if (!sedangAutoScroll) {
        sedangAutoScroll = true;
        btnScroll.innerText = "Stop";
        btnScroll.classList.remove('bg-white/80', 'text-stone-700');
        btnScroll.classList.add('bg-stone-300', 'text-stone-900');

        intervalScroll = setInterval(() => {
            window.scrollBy(0, 1);
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                matikanAutoScroll();
            }
        }, 30);
    } else {
        matikanAutoScroll();
    }
});

function matikanAutoScroll() {
    sedangAutoScroll = false;
    clearInterval(intervalScroll);
    btnScroll.innerText = "Auto";
    btnScroll.classList.remove('bg-stone-300', 'text-stone-900');
    btnScroll.classList.add('bg-white/80', 'text-stone-700');
}

window.addEventListener('wheel', () => { if(sedangAutoScroll) matikanAutoScroll(); });
window.addEventListener('touchmove', () => { if(sedangAutoScroll) matikanAutoScroll(); });
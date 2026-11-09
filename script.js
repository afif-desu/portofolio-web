/* ==========================================================================
   SCRIPT.JS — LOGIKA INTERAKTIF, MUSIK 8-BIT, & DAFTAR OPINI RANDOM
   ==========================================================================
   PANDUAN CEPAT UNTUK PEMULA:
   1. Mau ganti kata-kata waktu ornamen 3D diklik? Cari bagian "ornamentDialogs".
   2. Mau ganti sapaan waktu foto/avatar diklik? Cari bagian "characterGreetings".
   3. Mau ganti/tambah kata-kata di tombol merah "Acak Opini!"? Cari "randomOpinions".
   ========================================================================== */

// ==========================================================================
// BAGIAN 1: DAFTAR TEKS & OPINI YANG BISA KAMU UBAH SESUKA HATI
// ==========================================================================

// 1A. Teks yang muncul saat 6 ornamen 3D di sekeliling avatar diklik:
const ornamentDialogs = {
  crt: '🖥️ "Monitor CRT tabung ini resolusinya cuma 800x600 tapi nostalgianya 4K Ultra HD!"',
  floppy: '💾 "Disket 1.44MB: Cukup buat nyimpen 1 dokumen Word dan kenangan masa kecil!"',
  coffee: '☕ "Kopi ke-3 hari ini! Selama masih ada biji Arabika, bug sebesar apapun bisa dijinakkan."',
  gamepad: '🎮 "Konami Code: Atas, Atas, Bawah, Bawah, Kiri, Kanan, Kiri, Kanan, B, A!"',
  cassette: '📼 "Kaset pita kalau kusut tinggal diputer pakai pensil 2B. Anak zaman sekarang mana tahu!"',
  pizza: '🍕 "Slice pizza hangat = +100 Stamina buat lanjut marathon film sci-fi 90-an!"'
};

// 1B. Teks sapaan saat karakter/avatar di tengah diklik:
const characterGreetings = [
  '"Halo! Suka hoodie hijau sage-ku nggak? Paling nyaman dipakai nongkrong di coffeeshop nih! 🧥☕"',
  '"Rambut belah tengah ala 90-an tetap paling ikonik sepanjang masa! 😎"',
  '"Jangan lupa seduh kopi dulu sebelum scroll ke bawah ya! ☕"',
  '"Coba klik tombol merah raksasa di bagian Acak Opini, dijamin seru! 🚨"'
];

// 1C. Daftar Opini Random Lucu (Muncul saat tombol merah "ACAK OPINI!" ditekan):
// Kamu bebas menambah atau mengubah isi teks di dalam tanda kutip di bawah ini!
const randomOpinions = [
  {
    tag: '#KULINER',
    text: '"Bubur ayam itu diaduk atau nggak diaduk sama enaknya, yang salah itu kalau kerupuknya ditaruh paling bawah sampai lembek!"'
  },
  {
    tag: '#NOSTALGIA',
    text: '"Tiup bagian bawah kaset Nintendo/Sega sebenarnya nggak benerin apa-apa secara ilmiah, tapi 100% berhasil karena kekuatan doa!"'
  },
  {
    tag: '#KOPI',
    text: '"Bilang \'nggak bisa tidur kalau minum kopi\' padahal habis minum es kopi susu masih bisa tidur pulas 8 jam itu bakat terpendam."'
  },
  {
    tag: '#GAMING',
    text: '"Save game 3 kali berturut-turut di PS1 bukan karena pelupa, tapi karena trust issue sama Memory Card 8MB bajakan!"'
  },
  {
    tag: '#CODING',
    text: '"90% waktu ngoding itu dipakai buat mikirin nama variabel dan milih playlist musik, 10% sisanya baru ngetik kode."'
  },
  {
    tag: '#PAPEDA',
    text: '"Bikin papeda itu ujian kesabaran tingkat tinggi: kurang panas jadi tepung cair, kebanyakan air jadi sup sagu!"'
  },
  {
    tag: '#DESAIN',
    text: '"Desain minimalis memang rapi, tapi web dengan tombol 3D membal dan warna retro pop jauh lebih bikin bahagia!"'
  },
  {
    tag: '#FILM90AN',
    text: '"Efek praktikal robot & monster di film tahun 90-an sering kelihatan lebih nyata daripada CGI ratusan juta dolar zaman sekarang."'
  },
  {
    tag: '#WARNET',
    text: '"Suara ketikan keyboard mekanikal zaman sekarang sebenarnya cuma usaha kita buat mengulang memori suara warnet tahun 2006."'
  },
  {
    tag: '#HIDUP',
    text: '"Dewasa itu ketika kamu lebih excited beli alat seduh kopi baru atau panci anti lengket daripada beli sepatu hypebeast."'
  }
];

// 1D. Angka Awal Board Statistik (Akan bertambah saat kartu diklik):
let coffeeCount = 1200;
let gameCount = 850;


// ==========================================================================
// BAGIAN 2: EFEK SUARA 8-BIT OTOMATIS (WEB AUDIO API)
// (Tidak perlu file MP3, suara dibuat otomatis oleh browser!)
// ==========================================================================
let sfxEnabled = true;
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playArcadeSFX(type = 'blip') {
  if (!sfxEnabled) return;
  const ctx = getAudioCtx();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === 'blip') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.09);
    osc.start(now);
    osc.stop(now + 0.09);
  } else if (type === 'coin') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(987.77, now); // Nada B5
    osc.frequency.setValueAtTime(1318.51, now + 0.07); // Nada E6
    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.start(now);
    osc.stop(now + 0.28);
  } else if (type === 'jump' || type === 'start') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(760, now + 0.18);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  } else if (type === 'pop') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(920, now + 0.11);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.12);
    osc.start(now);
    osc.stop(now + 0.12);
  }
}

function toggleSFX() {
  sfxEnabled = !sfxEnabled;
  document.getElementById('sfxIcon').textContent = sfxEnabled ? '🔊' : '🔇';
  document.getElementById('sfxLabel').textContent = sfxEnabled ? 'SFX:ON' : 'SFX:OFF';
  if (sfxEnabled) playArcadeSFX('coin');
}


// ==========================================================================
// BAGIAN 3: SAKLAR TEMA SIANG / MALAM (SUN vs ARCADE MODE)
// ==========================================================================
function toggleRetroTheme() {
  const htmlEl = document.documentElement;
  const knob = document.getElementById('themeKnob');
  htmlEl.classList.toggle('dark');
  const isDark = htmlEl.classList.contains('dark');

  if (isDark) {
    knob.style.transform = 'translateX(44px)';
    knob.textContent = '🌙';
  } else {
    knob.style.transform = 'translateX(0px)';
    knob.textContent = '☀️';
  }
  playArcadeSFX('blip');
}


// ==========================================================================
// BAGIAN 4: INTERAKSI KARAKTER UTAMA & ORNAMEN 3D MELAYANG
// ==========================================================================
function interactOrnament(key) {
  playArcadeSFX('pop');
  const bubble = document.getElementById('heroSpeechBubble');
  const text = document.getElementById('heroBubbleText');
  text.textContent = ornamentDialogs[key] || '"Halo dari ruang 3D Retro!"';
  bubble.classList.remove('animate-pop');
  void bubble.offsetWidth;
  bubble.classList.add('animate-pop');
}

let greetIdx = 0;
function pokeCharacter() {
  playArcadeSFX('coin');
  const bubble = document.getElementById('heroSpeechBubble');
  const text = document.getElementById('heroBubbleText');
  text.textContent = characterGreetings[greetIdx % characterGreetings.length];
  greetIdx++;
  bubble.classList.remove('animate-pop');
  void bubble.offsetWidth;
  bubble.classList.add('animate-pop');
}

// Ganti antara 3 mode avatar 3D (Tanpa Foto Asli): (1) 3D Clay Melambai -> (2) 3D Clay Portrait -> (3) Ilustrasi Vektor 3D
const avatarModes = ['3d', 'wave', 'svg'];
let currentAvatarModeIdx = 0;

function toggleAvatarStyle() {
  playArcadeSFX('blip');
  currentAvatarModeIdx = (currentAvatarModeIdx + 1) % avatarModes.length;
  const mode = avatarModes[currentAvatarModeIdx];

  const img = document.getElementById('avatarRenderImg');
  const svg = document.getElementById('svgClayAvatar');
  const modeLabel = document.getElementById('avatarModeLabel');

  if (mode === '3d') {
    img.src = 'avatar-3d.png';
    img.classList.remove('hidden');
    svg.classList.add('hidden');
    if (modeLabel) modeLabel.textContent = '🔄 Mode: 3D Clay Melambai (Klik ganti ke 3D Clay Portrait)';
  } else if (mode === 'wave') {
    img.src = 'avatar-wave.png';
    img.classList.remove('hidden');
    svg.classList.add('hidden');
    if (modeLabel) modeLabel.textContent = '🔄 Mode: 3D Clay Portrait (Klik ganti ke 3D Vector)';
  } else {
    img.classList.add('hidden');
    svg.classList.remove('hidden');
    if (modeLabel) modeLabel.textContent = '🔄 Mode: 3D Vector Rig (Klik kembali ke 3D Clay)';
  }
}

// Efek Parallax Halus Saat Mouse Bergerak di Sekitar Karakter
const heroStage = document.getElementById('heroParallaxStage');
if (heroStage) {
  heroStage.addEventListener('mousemove', (e) => {
    const rect = heroStage.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    document.querySelectorAll('.ornament-item').forEach((el) => {
      const factor = parseFloat(el.getAttribute('data-parallax') || '15');
      el.style.marginLeft = `${relX * factor}px`;
      el.style.marginTop = `${relY * factor}px`;
    });
  });
  heroStage.addEventListener('mouseleave', () => {
    document.querySelectorAll('.ornament-item').forEach((el) => {
      el.style.marginLeft = '0px';
      el.style.marginTop = '0px';
    });
  });
}


// ==========================================================================
// BAGIAN 5: KARTU STATISTIK & TAB POJOK HOBI
// ==========================================================================
function bumpStat(id, increment, toastMsg) {
  playArcadeSFX('coin');
  if (id === 'coffeeStat') {
    coffeeCount += increment;
    document.getElementById(id).textContent = coffeeCount.toLocaleString() + '+';
  } else if (id === 'gameStat') {
    gameCount += increment;
    document.getElementById(id).textContent = gameCount.toLocaleString() + '+';
  }
  const bubbleText = document.getElementById('heroBubbleText');
  if (bubbleText) bubbleText.textContent = `"${toastMsg}"`;
}

function switchHobbyTab(tabName) {
  playArcadeSFX('blip');
  const tabs = ['kopi', 'film', 'musik'];
  tabs.forEach((t) => {
    const panel = document.getElementById(`tabPanel-${t}`);
    const btn = document.getElementById(`tabBtn-${t}`);
    if (t === tabName) {
      panel.classList.remove('hidden');
      btn.className = 'arcade-btn bg-retro-yellow text-black font-pixel text-xs py-4 px-5 rounded-2xl flex items-center justify-center gap-3';
    } else {
      panel.classList.add('hidden');
      btn.className = 'arcade-btn bg-white dark:bg-retro-cardDark text-black dark:text-white font-pixel text-xs py-4 px-5 rounded-2xl flex items-center justify-center gap-3';
    }
  });
}

function brewMokaAnimation() {
  playArcadeSFX('jump');
  const svg = document.getElementById('mokaPotSvg');
  const status = document.getElementById('mokaBrewStatus');
  svg.classList.add('scale-110', 'rotate-6');
  status.textContent = '♨️ Blub.. blub.. Ekstraksi krema kopi berhasil! Harum banget!';
  setTimeout(() => {
    svg.classList.remove('scale-110', 'rotate-6');
  }, 450);
}


// ==========================================================================
// BAGIAN 6: INTEGRASI LETTERBOXD (@dorepap) & SPOTIFY REKOMENDASI LAGU
// ==========================================================================

// 6A. Konfigurasi Profil Letterboxd Kamu
const LETTERBOXD_USERNAME = 'dorepap';
const LETTERBOXD_PROFILE_URL = `https://letterboxd.com/${LETTERBOXD_USERNAME}/`;

// Fungsi untuk menyinkronkan review terbaru otomatis dari RSS Letterboxd @dorepap
async function fetchLetterboxdReviews(showSound = false) {
  if (showSound) playArcadeSFX('blip');
  const badge = document.getElementById('letterboxdSyncBadge');
  const grid = document.getElementById('letterboxdReviewsGrid');
  if (!grid) return;

  if (badge) badge.textContent = 'SYNCING...';

  try {
    const rssUrl = encodeURIComponent(`https://letterboxd.com/${LETTERBOXD_USERNAME}/rss/`);
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
    if (!response.ok) throw new Error('RSS fetch failed');
    const data = await response.json();

    if (data && data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
      const topItems = data.items.slice(0, 3);
      const cardColors = [
        { bg: 'bg-retro-yellow text-black', subBg: 'bg-white/80', tagColor: 'text-retro-teal', btn: 'bg-black text-retro-yellow' },
        { bg: 'bg-retro-teal text-black', subBg: 'bg-white/80', tagColor: 'text-retro-yellow', btn: 'bg-black text-retro-teal' },
        { bg: 'bg-retro-pink text-white', subBg: 'bg-black/35', tagColor: 'text-retro-pink', btn: 'bg-retro-yellow text-black border border-black' }
      ];

      grid.innerHTML = '';

      topItems.forEach((item, idx) => {
        const style = cardColors[idx % cardColors.length];
        // Pisahkan judul film dan rating bintang dari title RSS Letterboxd (Contoh: "La Haine, 1995 - ★★★★★")
        const rawTitle = item.title || 'Film Review';
        let filmTitle = rawTitle;
        let starRating = '★★★★★';

        if (rawTitle.includes(' - ')) {
          const parts = rawTitle.split(' - ');
          filmTitle = parts[0].trim();
          starRating = parts.slice(1).join(' - ').trim() || '★★★★½';
        }

        // Ambil URL Poster Film dari tag <img> di dalam RSS Letterboxd sebelum dibersihkan
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = item.description || '';
        const firstImg = tempDiv.querySelector('img');
        const posterUrl = firstImg ? firstImg.src : `https://placehold.co/300x450/121212/FFD100?font=monospace&text=${encodeURIComponent(filmTitle)}`;

        // Hapus tag gambar poster agar teks review bersih
        tempDiv.querySelectorAll('img').forEach(img => img.remove());
        let reviewText = (tempDiv.textContent || tempDiv.innerText || '').trim();
        if (!reviewText || reviewText.startsWith('Watched on')) {
          reviewText = `Ditonton dan dicatat di buku harian Letterboxd @${LETTERBOXD_USERNAME}. Klik di bawah untuk melihat detailnya!`;
        } else if (reviewText.length > 180) {
          reviewText = reviewText.substring(0, 177) + '...';
        }

        const card = document.createElement('div');
        card.className = `neo-card-interactive ${style.bg} rounded-2xl p-5 flex flex-col justify-between animate-pop`;
        card.innerHTML = `
          <div>
            <div class="bg-black text-white p-3 rounded-xl border-2 border-black mb-4 flex items-center justify-between">
              <span class="font-pixel text-[10px] ${style.tagColor}">LETTERBOXD • @${LETTERBOXD_USERNAME}</span>
              <span>🎬</span>
            </div>
            <div class="flex gap-4 mb-4 items-start">
              <div class="w-24 sm:w-28 aspect-[2/3] rounded-xl border-3 border-black shadow-[4px_4px_0px_#121212] overflow-hidden bg-black shrink-0">
                <img class="film-poster-img w-full h-full object-cover" alt="Poster Film" />
              </div>
              <div class="min-w-0">
                <div class="inline-block bg-white text-black border-2 border-black px-2.5 py-0.5 rounded font-pixel text-[10px] mb-2">${starRating}</div>
                <h3 class="font-extrabold text-lg sm:text-xl leading-tight mb-1"></h3>
                <span class="text-[11px] font-bold bg-black/15 px-2 py-0.5 rounded inline-block">@${LETTERBOXD_USERNAME}</span>
              </div>
            </div>
            <p class="text-sm font-bold ${style.subBg} p-3 rounded-xl border-2 border-black leading-relaxed"></p>
          </div>
          <div class="mt-4 pt-3 border-t-2 border-dashed border-black flex items-center justify-between text-xs font-extrabold">
            <span>🎞️ Review @${LETTERBOXD_USERNAME}</span>
            <a href="${item.link || LETTERBOXD_PROFILE_URL}" target="_blank" rel="noopener noreferrer" class="${style.btn} px-2.5 py-1 rounded hover:bg-retro-purple hover:text-white transition-colors">Baca di Letterboxd ↗</a>
          </div>
        `;
        const posterImgEl = card.querySelector('.film-poster-img');
        posterImgEl.src = posterUrl;
        posterImgEl.onerror = () => {
          posterImgEl.src = `https://placehold.co/300x450/121212/FFD100?font=monospace&text=${encodeURIComponent(filmTitle)}`;
        };
        card.querySelector('h3').textContent = filmTitle;
        card.querySelector('p').textContent = `"${reviewText}"`;
        grid.appendChild(card);
      });

      if (badge) badge.textContent = 'LIVE: @dorepap ✓';
    } else {
      if (badge) badge.textContent = 'PROFILE: @dorepap';
    }
  } catch (err) {
    // Jika dibuka tanpa internet atau RSS diblokir browser, tetap tampilkan kartu VHS bawaan @dorepap
    if (badge) badge.textContent = 'PROFILE: @dorepap';
  }
}

// Jalankan sinkronisasi otomatis Letterboxd saat halaman dibuka
window.addEventListener('DOMContentLoaded', () => {
  fetchLetterboxdReviews(false);
});

// 6B. Daftar 3 Rekomendasi Lagu Spotify Pilihanmu + Poster Album Resmi
// (1. Blur - Charmless Man, 2. Blur - Yuko and Hiro, 3. The Lemon Twigs - Corner Of My Eye)
const tracks = [
  {
    title: '01. Blur — Charmless Man',
    artistBadge: 'BLUR • THE GREAT ESCAPE (1995)',
    trackId: '7lJ9MeQgqHlBrE69omD4rN',
    spotifyUrl: 'https://open.spotify.com/track/7lJ9MeQgqHlBrE69omD4rN',
    poster: 'https://i.scdn.co/image/ab67616d00001e02d6edad0d4fc3448ccc61c13c',
    notes: [329.6, 392.0, 440.0, 493.9, 587.3, 493.9, 440.0, 392.0]
  },
  {
    title: '02. Blur — Yuko and Hiro',
    artistBadge: 'BLUR • THE GREAT ESCAPE (1995)',
    trackId: '2Qv8xJzenocwXyGlMU5PaC',
    spotifyUrl: 'https://open.spotify.com/track/2Qv8xJzenocwXyGlMU5PaC',
    poster: 'https://i.scdn.co/image/ab67616d00001e02d6edad0d4fc3448ccc61c13c',
    notes: [261.6, 329.6, 392.0, 523.2, 392.0, 329.6, 293.7, 349.2]
  },
  {
    title: '03. The Lemon Twigs — Corner Of My Eye',
    artistBadge: 'THE LEMON TWIGS • EVERYTHING HARMONY',
    trackId: '5DDMzzHlpUmZ6ILqZgJFyL',
    spotifyUrl: 'https://open.spotify.com/track/5DDMzzHlpUmZ6ILqZgJFyL',
    poster: 'https://upload.wikimedia.org/wikipedia/en/a/ac/The_Lemon_Twigs_-_Everything_Harmony.png',
    notes: [293.7, 370.0, 440.0, 587.3, 554.4, 440.0, 370.0, 329.6]
  }
];
let currentTrackIdx = 0;
let isPlayingChiptune = false;
let chiptuneInterval = null;
let noteStep = 0;

function updateTrackDisplay() {
  const track = tracks[currentTrackIdx];
  const titleEl = document.getElementById('currentTrackTitle');
  const badgeEl = document.getElementById('currentTrackArtistBadge');
  const posterEl = document.getElementById('currentTrackPoster');
  const stateBadge = document.getElementById('playerStateBadge');
  const iframeEl = document.getElementById('spotifyEmbedFrame');

  if (titleEl) titleEl.textContent = track.title;
  if (badgeEl) badgeEl.textContent = track.artistBadge;
  if (posterEl && track.poster) posterEl.src = track.poster;
  if (stateBadge) stateBadge.textContent = `TRACK 0${currentTrackIdx + 1} / 0${tracks.length}`;
  if (iframeEl) {
    iframeEl.src = `https://open.spotify.com/embed/track/${track.trackId}?utm_source=generator&theme=0`;
  }

  // Highlight kartu lagu yang sedang dipilih di sebelah kanan
  tracks.forEach((_, idx) => {
    const card = document.getElementById(`recTrackCard-${idx}`);
    if (!card) return;
    if (idx === currentTrackIdx) {
      card.className = 'bg-retro-yellow text-black neo-card-interactive rounded-2xl p-3.5 cursor-pointer flex items-center justify-between gap-3';
    } else {
      card.className = 'bg-white dark:bg-retro-cardDark text-black dark:text-white neo-card-interactive rounded-2xl p-3.5 cursor-pointer flex items-center justify-between gap-3';
    }
  });
}

function selectRecommendedTrack(index) {
  playArcadeSFX('coin');
  currentTrackIdx = index;
  noteStep = 0;
  updateTrackDisplay();
}

function toggleChiptunePlayer() {
  isPlayingChiptune = !isPlayingChiptune;
  const btn = document.getElementById('playPauseBtn');

  if (isPlayingChiptune) {
    if (btn) {
      btn.textContent = '🎹 MODE 8-BIT SYNTH: ON ♪';
      btn.classList.replace('bg-retro-teal', 'bg-retro-orange');
      btn.classList.add('text-white');
    }
    startChiptuneLoop();
  } else {
    if (btn) {
      btn.textContent = '🎹 MODE 8-BIT SYNTH: OFF';
      btn.classList.replace('bg-retro-orange', 'bg-retro-teal');
      btn.classList.remove('text-white');
    }
    stopChiptuneLoop();
  }
}

function startChiptuneLoop() {
  stopChiptuneLoop();
  const ctx = getAudioCtx();
  chiptuneInterval = setInterval(() => {
    if (!sfxEnabled || !isPlayingChiptune || !ctx) return;
    const notes = tracks[currentTrackIdx].notes;
    const freq = notes[noteStep % notes.length];
    noteStep++;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }, 240);
}

function stopChiptuneLoop() {
  if (chiptuneInterval) {
    clearInterval(chiptuneInterval);
    chiptuneInterval = null;
  }
}

function nextTrack() {
  playArcadeSFX('blip');
  currentTrackIdx = (currentTrackIdx + 1) % tracks.length;
  noteStep = 0;
  updateTrackDisplay();
}

function prevTrack() {
  playArcadeSFX('blip');
  currentTrackIdx = (currentTrackIdx - 1 + tracks.length) % tracks.length;
  noteStep = 0;
  updateTrackDisplay();
}


// ==========================================================================
// BAGIAN 7: MESIN GACHA "ACAK OPINI!" & BUKU TAMU (GUESTBOOK)
// ==========================================================================
let currentOpinionIdx = 0;

function triggerRandomOpinion() {
  playArcadeSFX('pop');
  let nextIdx = Math.floor(Math.random() * randomOpinions.length);
  if (nextIdx === currentOpinionIdx) {
    nextIdx = (nextIdx + 1) % randomOpinions.length;
  }
  currentOpinionIdx = nextIdx;

  const item = randomOpinions[currentOpinionIdx];
  const box = document.getElementById('opinionBubbleBox');
  const textEl = document.getElementById('opinionTextOutput');
  const tagEl = document.getElementById('opinionCategoryTag');
  const countEl = document.getElementById('opinionCountBadge');

  tagEl.textContent = item.tag;
  textEl.textContent = item.text;
  countEl.textContent = `${currentOpinionIdx + 1}/${randomOpinions.length}`;
  document.getElementById('opinionReactionFeedback').textContent = '';

  // Ikut mengubah teks gelembung di atas karakter utama
  const heroText = document.getElementById('heroBubbleText');
  if (heroText) heroText.textContent = item.text;

  box.classList.remove('animate-pop');
  void box.offsetWidth;
  box.classList.add('animate-pop');
}

function reactOpinion(reactionText) {
  playArcadeSFX('coin');
  const feedback = document.getElementById('opinionReactionFeedback');
  feedback.textContent = `Respon terkirim: ${reactionText}`;
}

function submitGuestbook(e) {
  e.preventDefault();
  playArcadeSFX('start');
  const nameInput = document.getElementById('gbName');
  const moodInput = document.getElementById('gbMood');
  const msgInput = document.getElementById('gbMessage');
  const list = document.getElementById('guestbookLogList');

  const name = nameInput.value.trim() || 'Player_Anon';
  const mood = moodInput.value;
  const msg = msgInput.value.trim();
  if (!msg) return;

  const card = document.createElement('div');
  card.className = 'bg-retro-teal/30 border-3 border-black rounded-xl p-3 shadow-[4px_4px_0px_#121212] animate-pop';

  const header = document.createElement('div');
  header.className = 'flex justify-between text-xs font-extrabold text-black mb-1';

  const nameSpan = document.createElement('span');
  nameSpan.textContent = `@${name}`;
  const moodSpan = document.createElement('span');
  moodSpan.textContent = mood;

  header.appendChild(nameSpan);
  header.appendChild(moodSpan);

  const body = document.createElement('p');
  body.className = 'text-sm font-bold text-black';
  body.textContent = `"${msg}"`;

  card.appendChild(header);
  card.appendChild(body);
  list.prepend(card);

  nameInput.value = '';
  msgInput.value = '';
}

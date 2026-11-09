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
  isPlayingChiptune = sfxEnabled;
  document.getElementById('sfxIcon').textContent = sfxEnabled ? '🔊' : '🔇';
  document.getElementById('sfxLabel').textContent = sfxEnabled ? 'SFX:ON' : 'SFX:OFF';
  if (sfxEnabled) {
    playArcadeSFX('coin');
    startChiptuneLoop();
  } else {
    stopChiptuneLoop();
  }
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
// BAGIAN 5: BERI MAKAN MEREKA! (PET FEEDING & LEVEL UP) + KOPI LAB 6 METODE
// ==========================================================================

// 5A. Data Level Awal Hewan Peliharaan Virtual (Kucing, Kelinci, Anjing, Beruang)
const petsData = {
  cat: {
    name: 'Si Meng (Kucing)',
    level: 12,
    bar: 65,
    food: '🐟 Ikan Tuna Segar',
    reactions: ['"Meoww! Nyam nyam.. Ikan tunanya enak banget! 🐱🐟"', '"Purrrr~ Si Meng makin sayang sama kamu! 🐾"', '"Meong! Level Si Meng naik! Makin gembul! 🐱✨"']
  },
  rabbit: {
    name: 'Si Boni (Kelinci)',
    level: 10,
    bar: 50,
    food: '🥕 Wortel Organik',
    reactions: ['"Krauk krauk! Wortelnya manis & renyah! 🐰🥕"', '"Si Boni melompat senang sambil goyang telinga! 🐰✨"', '"Level Up! Si Boni makin lincah! 🥕🌟"']
  },
  dog: {
    name: 'Si Doggo (Anjing)',
    level: 15,
    bar: 80,
    food: '🦴 Biskuit Tulang',
    reactions: ['"Guk guk! Ekor Si Doggo goyang-goyang kenceng! 🐶🦴"', '"Woof! Terima kasih makanannya bosku! 🐾"', '"Level Up! Si Doggo siap jagain ruang retro kamu! 🐶🏆"']
  },
  bear: {
    name: 'Si Kuma (Beruang)',
    level: 18,
    bar: 75,
    food: '🍯 Madu Hutan Manis',
    reactions: ['"Grrr~ Slurp! Madu hutannya manis legit! 🐻🍯"', '"Si Kuma kenyang dan senyum lebar! 🐻✨"', '"Level Up! Si Kuma makin kuat & hangat! 🍯🔥"']
  }
};

function feedPet(petKey) {
  const pet = petsData[petKey];
  if (!pet) return;

  playArcadeSFX('coin');

  // Tambah Level +1 setiap kali di-tap!
  pet.level += 1;
  pet.bar = pet.bar >= 100 ? 40 : Math.min(100, pet.bar + 20);

  const lvlEl = document.getElementById(`petLvl-${petKey}`);
  const barEl = document.getElementById(`petBar-${petKey}`);
  const statusEl = document.getElementById(`petStatus-${petKey}`);
  const iconEl = document.getElementById(`petIcon-${petKey}`);
  const toastEl = document.getElementById(`petToast-${petKey}`);

  if (lvlEl) lvlEl.textContent = `LVL ${pet.level}`;
  if (barEl) barEl.style.width = `${pet.bar}%`;
  if (statusEl) statusEl.textContent = `✨ Kenyang! (+1 ${pet.food})`;

  if (iconEl) {
    iconEl.classList.add('scale-125', '-rotate-12');
    setTimeout(() => iconEl.classList.remove('scale-125', '-rotate-12'), 250);
  }

  if (toastEl) {
    toastEl.classList.remove('opacity-0');
    setTimeout(() => toastEl.classList.add('opacity-0'), 900);
  }

  // Tampilkan reaksi lucu di gelembung ucapan karakter utama di atas
  const msg = pet.reactions[pet.level % pet.reactions.length];
  const bubbleText = document.getElementById('heroBubbleText');
  if (bubbleText) bubbleText.textContent = msg;
}

// 5B. Navigasi Tab Pojok Hobi (Tab 01: Musik/Spotify, Tab 02: Film, Tab 03: Kopi Lab)
function switchHobbyTab(tabName) {
  playArcadeSFX('blip');
  const tabs = ['musik', 'film', 'kopi'];
  tabs.forEach((t) => {
    const panel = document.getElementById(`tabPanel-${t}`);
    const btn = document.getElementById(`tabBtn-${t}`);
    if (!panel || !btn) return;
    if (t === tabName) {
      panel.classList.remove('hidden');
      btn.className = 'arcade-btn bg-retro-yellow text-black font-pixel text-xs py-4 px-5 rounded-2xl flex items-center justify-center gap-3';
    } else {
      panel.classList.add('hidden');
      btn.className = 'arcade-btn bg-white dark:bg-retro-cardDark text-black dark:text-white font-pixel text-xs py-4 px-5 rounded-2xl flex items-center justify-center gap-3';
    }
  });
}

// 5C. Data 6 Metode Seduh di Kopi Lab (V60, Tubruk, Kalita Wave, Moka Pot, AeroPress, French Press)
const coffeeBrewRecipes = {
  v60: {
    badge: 'POUR OVER ★',
    icon: '⏳',
    toolTitle: 'HARIO V60 DRIPPER 02',
    toolSubtitle: 'Karakter rasa bersih (clean cup), floral, dan keasaman buah yang cerah.',
    code: 'RESEP V60 #01',
    time: '⏱️ Total Waktu: 02:30 Menit',
    title: '"Japanese Iced / Hot V60 Manual Brew (Rasio 1:15)"',
    desc: 'Menggunakan biji Arabika Gayo / Flores Light-Medium Roast. Teknik 3x tuangan untuk menonjolkan aroma manis & fruity.',
    dose: '15 Gram',
    grind: 'Medium-Fine',
    water: '225 ml',
    ratio: 'Rasio 1:15',
    temp: '91°C - 93°C',
    tipTitle: 'Blooming',
    tipDesc: 'Diamkan 35 dtk',
    steps: '1. Bilas kertas filter V60 dengan air panas → 2. Masukkan 15g kopi, tuang 30ml air (blooming 0:00 - 0:35) → 3. Tuang memutar sampai 135ml (0:35 - 1:15) → 4. Tuang terakhir sampai 225ml & tunggu menetes habis di 2:30.'
  },
  tubruk: {
    badge: 'KLASIK NUSANTARA ★',
    icon: '☕',
    toolTitle: 'KOPI TUBRUK GELAS BELIMBING',
    toolSubtitle: 'Metode paling jujur, body tebal, aroma langsung nendang sejak seduhan pertama.',
    code: 'RESEP TUBRUK #02',
    time: '⏱️ Total Waktu: 04:00 Menit',
    title: '"Kopi Tubruk Specialty Ala Warung Klasik (Tanpa Ampas Mengambang)"',
    desc: 'Cocok untuk biji Robusta Temanggung atau Arabika Mandailing Medium-Dark Roast yang punya karakter cokelat & rempah kuat.',
    dose: '14 Gram',
    grind: 'Medium-Coarse',
    water: '200 ml',
    ratio: 'Rasio 1:14',
    temp: '94°C - 96°C',
    tipTitle: 'Break Crust',
    tipDesc: 'Aduk di menit ke-4',
    steps: '1. Masukkan 14g kopi giling agak kasar ke gelas → 2. Tuang 200ml air panas 95°C secara merata (jangan langsung diaduk) → 3. Diamkan 4 menit sampai bubuk kopi mengapung di atas → 4. Aduk permukaan 3x agar ampas turun semua, siap diseruput!'
  },
  kalita: {
    badge: 'FLAT BOTTOM ★',
    icon: '🌊',
    toolTitle: 'KALITA WAVE 185 DRIPPER',
    toolSubtitle: 'Dasar rata dengan 3 lubang tetes menghasilkan rasa manis (sweetness) & body yang seimbang.',
    code: 'RESEP KALITA #03',
    time: '⏱️ Total Waktu: 02:45 Menit',
    title: '"Sweet & Balanced Kalita Wave 185"',
    desc: 'Kertas filter bergelombang menjaga suhu tetap stabil dan meminimalkan channeling, menghasilkan seduhan yang super lembut.',
    dose: '16 Gram',
    grind: 'Medium',
    water: '250 ml',
    ratio: 'Rasio 1:15.5',
    temp: '92°C',
    tipTitle: 'Center Pour',
    tipDesc: 'Jangan kena lipatan',
    steps: '1. Bilas filter Kalita Wave hati-hati agar gelombang kertas tidak penyok → 2. Blooming 16g kopi dengan 40ml air selama 40 detik → 3. Tuang perlahan di bagian tengah sampai 150ml → 4. Lanjutkan tuangan sampai 250ml hingga selesai di menit 2:45.'
  },
  mokapot: {
    badge: 'STOVETOP ESPRESSO ★',
    icon: '🫖',
    toolTitle: 'BIALETTI MOKA POT 3D',
    toolSubtitle: 'Senjata utama penghasil kopi pekat mirip espresso buat bahan Es Kopi Susu Creamy.',
    code: 'RESEP MOKA POT #04',
    time: '⏱️ Total Waktu: 03:15 Menit',
    title: '"Es Kopi Susu Retro Creamy (Moka Pot Base)"',
    desc: 'Perpaduan biji Arabika Flores Bajawa medium-dark roast dengan susu oat dingin & sedikit gula aren cair.',
    dose: '18 Gram',
    grind: 'Fine-Medium',
    water: '160 ml (Panas)',
    ratio: 'Base Pekat',
    temp: 'Air Mendidih',
    tipTitle: 'Api Kecil',
    tipDesc: 'Angkat saat mendesis',
    steps: '1. Isi tabung bawah Moka Pot dengan air panas tepat di bawah katup pengaman → 2. Isi corong dengan 18g kopi tanpa ditekan (cukup diratakan) → 3. Masak dengan api paling kecil & tutup terbuka → 4. Segera angkat saat terdengar suara mendesis!'
  },
  aeropress: {
    badge: 'PRESSURE BREW ★',
    icon: '🧪',
    toolTitle: 'AEROPRESS INVERTED METHOD',
    toolSubtitle: 'Fleksibel, kaya rasa, bebas ampas, dan sangat cocok dibawa traveling.',
    code: 'RESEP AEROPRESS #05',
    time: '⏱️ Total Waktu: 02:00 Menit',
    title: '"Inverted AeroPress Juicy & Rich Cup"',
    desc: 'Menggabungkan teknik perendaman (immersion) dan tekanan udara untuk mengekstrak rasa manis maksimal tanpa rasa pahit berlebih.',
    dose: '15 Gram',
    grind: 'Medium-Fine',
    water: '210 ml',
    ratio: 'Rasio 1:14',
    temp: '88°C - 90°C',
    tipTitle: 'Press Halus',
    tipDesc: 'Tekan selama 30 dtk',
    steps: '1. Pasang AeroPress posisi terbalik (Inverted), masukkan 15g kopi → 2. Tuang 210ml air suhu 89°C lalu aduk 10 kali → 3. Pasang tutup filter yang sudah dibilas, tunggu sampai menit 1:30 → 4. Balik ke atas cangkir & tekan plunger perlahan selama 30 detik.'
  },
  frenchpress: {
    badge: 'FULL IMMERSION ★',
    icon: '🏺',
    toolTitle: 'FRENCH PRESS / COLD BREW',
    toolSubtitle: 'Tekstur kopi penuh (full-bodied) karena minyak alami kopi tidak tertahan kertas filter.',
    code: 'RESEP FRENCH PRESS #06',
    time: '⏱️ Total Waktu: 04:30 Menit',
    title: '"James Hoffmann Style Clean French Press"',
    desc: 'Teknik seduh rendam yang menghasilkan cangkir kopi kaya rasa, gurih, namun tetap bersih dari endapan lumpur di akhir.',
    dose: '18 Gram',
    grind: 'Coarse (Kasar)',
    water: '270 ml',
    ratio: 'Rasio 1:15',
    temp: '94°C',
    tipTitle: 'Jangan Tekan',
    tipDesc: 'Saring di permukaan',
    steps: '1. Tuang 270ml air panas ke 18g kopi giling kasar, diamkan 4 menit → 2. Aduk kerak kopi di atas lalu buang busa permukaannya dengan sendok → 3. Pasang saringan tepat di permukaan air (jangan ditekan sampai dasar) → 4. Tuang perlahan ke cangkir.'
  }
};

function selectBrewMethod(methodKey) {
  const recipe = coffeeBrewRecipes[methodKey];
  if (!recipe) return;

  playArcadeSFX('blip');

  // Update tombol metode aktif
  const allMethods = ['v60', 'tubruk', 'kalita', 'mokapot', 'aeropress', 'frenchpress'];
  allMethods.forEach((m) => {
    const btn = document.getElementById(`brewBtn-${m}`);
    if (!btn) return;
    if (m === methodKey) {
      btn.className = 'arcade-btn bg-retro-yellow text-black font-pixel text-[10px] py-3 px-3 rounded-xl flex items-center justify-center gap-1.5';
    } else {
      btn.className = 'arcade-btn bg-white dark:bg-retro-cardDark text-black dark:text-white font-pixel text-[10px] py-3 px-3 rounded-xl flex items-center justify-center gap-1.5';
    }
  });

  // Update tampilan resep
  document.getElementById('brewBadgeLabel').textContent = recipe.badge;
  document.getElementById('mokaPotSvg').textContent = recipe.icon;
  document.getElementById('brewToolTitle').textContent = recipe.toolTitle;
  document.getElementById('brewToolSubtitle').textContent = recipe.toolSubtitle;
  document.getElementById('brewRecipeCode').textContent = recipe.code;
  document.getElementById('brewRecipeTime').textContent = recipe.time;
  document.getElementById('brewRecipeTitle').textContent = recipe.title;
  document.getElementById('brewRecipeDesc').textContent = recipe.desc;
  document.getElementById('brewSpecDose').textContent = recipe.dose;
  document.getElementById('brewSpecGrind').textContent = recipe.grind;
  document.getElementById('brewSpecWater').textContent = recipe.water;
  document.getElementById('brewSpecRatio').textContent = recipe.ratio;
  document.getElementById('brewSpecTemp').textContent = recipe.temp;
  document.getElementById('brewSpecTipTitle').textContent = recipe.tipTitle;
  document.getElementById('brewSpecTipDesc').textContent = recipe.tipDesc;
  document.getElementById('brewStepsText').textContent = recipe.steps;
  document.getElementById('mokaBrewStatus').textContent = '';
}

function brewMokaAnimation() {
  playArcadeSFX('jump');
  const svg = document.getElementById('mokaPotSvg');
  const status = document.getElementById('mokaBrewStatus');
  svg.classList.add('scale-125', 'rotate-12');
  status.textContent = '♨️ Seduhan kopi selesai diekstraksi! Aromanya wangi banget!';
  setTimeout(() => {
    svg.classList.remove('scale-125', 'rotate-12');
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

// 6B. Daftar 6 Rekomendasi Lagu Spotify Pilihanmu (Lengkap dengan Full Spotify Embed Resmi!)
// 1. Blur — Charmless Man (ID: 7lJ9MeQgqHlBrE69omD4rN)
// 2. Blur — Yuko and Hiro (ID Resmi: 4ZdiH3M8L4lD3fmWJIQ3My)
// 3. The Lemon Twigs — Corner Of My Eye (ID: 5DDMzzHlpUmZ6ILqZgJFyL)
// 4. Sixpence None The Richer — Kiss Me (ID: 754kgU5rWscRTfvlsuEwFp)
// 5. So!YoON! & Phum Viphurit — Wings (ID: 4XQnhcwRPRmGG4E6PakLMb)
// 6. Gene — Save Me, I'm Yours (ID Resmi: 6OUgDgFBPxxDdKE0dgLxJz)
const tracks = [
  {
    title: '01. Blur — Charmless Man',
    artistBadge: 'BLUR • THE GREAT ESCAPE (1995)',
    embedUrl: 'https://open.spotify.com/embed/track/7lJ9MeQgqHlBrE69omD4rN?utm_source=generator&theme=0',
    spotifyUrl: 'https://open.spotify.com/track/7lJ9MeQgqHlBrE69omD4rN',
    searchQuery: 'Blur Charmless Man',
    poster: 'https://i.scdn.co/image/ab67616d00001e02d6edad0d4fc3448ccc61c13c',
    notes: [329.6, 392.0, 440.0, 493.9, 587.3, 493.9, 440.0, 392.0]
  },
  {
    title: '02. Blur — Yuko and Hiro',
    artistBadge: 'BLUR • THE GREAT ESCAPE (1995) • TRACK #15',
    embedUrl: 'https://open.spotify.com/embed/track/4ZdiH3M8L4lD3fmWJIQ3My?utm_source=generator&theme=0',
    spotifyUrl: 'https://open.spotify.com/track/4ZdiH3M8L4lD3fmWJIQ3My?si=7fa5b333aeb049ab',
    searchQuery: 'Blur Yuko and Hiro',
    poster: 'https://i.scdn.co/image/ab67616d00001e02d6edad0d4fc3448ccc61c13c',
    notes: [261.6, 329.6, 392.0, 523.2, 392.0, 329.6, 293.7, 349.2]
  },
  {
    title: '03. The Lemon Twigs — Corner Of My Eye',
    artistBadge: 'THE LEMON TWIGS • EVERYTHING HARMONY (2023)',
    embedUrl: 'https://open.spotify.com/embed/track/5DDMzzHlpUmZ6ILqZgJFyL?utm_source=generator&theme=0',
    spotifyUrl: 'https://open.spotify.com/track/5DDMzzHlpUmZ6ILqZgJFyL',
    searchQuery: 'The Lemon Twigs Corner Of My Eye',
    poster: 'https://upload.wikimedia.org/wikipedia/en/a/ac/The_Lemon_Twigs_-_Everything_Harmony.png',
    notes: [293.7, 370.0, 440.0, 587.3, 554.4, 440.0, 370.0, 329.6]
  },
  {
    title: '04. Sixpence None The Richer — Kiss Me',
    artistBadge: 'SIXPENCE NONE THE RICHER (1997)',
    embedUrl: 'https://open.spotify.com/embed/track/754kgU5rWscRTfvlsuEwFp?utm_source=generator&theme=0',
    spotifyUrl: 'https://open.spotify.com/track/754kgU5rWscRTfvlsuEwFp',
    searchQuery: 'Sixpence None The Richer Kiss Me',
    poster: 'https://upload.wikimedia.org/wikipedia/en/8/87/Kiss_me_sixpence_none_the_richer_shes_all_that_US_reissue.png',
    notes: [392.0, 440.0, 493.9, 587.3, 523.2, 493.9, 440.0, 392.0]
  },
  {
    title: '05. So!YoON! & Phum Viphurit — Wings',
    artistBadge: 'SO!YOON! X PHUM VIPHURIT (2020)',
    embedUrl: 'https://open.spotify.com/embed/track/4XQnhcwRPRmGG4E6PakLMb?utm_source=generator&theme=0',
    spotifyUrl: 'https://open.spotify.com/track/4XQnhcwRPRmGG4E6PakLMb',
    searchQuery: 'So!YoON! Phum Viphurit Wings',
    poster: 'https://i.ytimg.com/vi/dluPeE6PA-I/hqdefault.jpg',
    notes: [349.2, 440.0, 523.2, 659.3, 587.3, 523.2, 440.0, 392.0]
  },
  {
    title: '06. Gene — Save Me, I\'m Yours',
    artistBadge: 'GENE • DRAWN TO THE DEEP END (1997)',
    embedUrl: 'https://open.spotify.com/embed/track/6OUgDgFBPxxDdKE0dgLxJz?utm_source=generator&theme=0',
    spotifyUrl: 'https://open.spotify.com/track/6OUgDgFBPxxDdKE0dgLxJz?si=7c365930da2a4d5f',
    searchQuery: 'Gene Save Me I\'m Yours',
    poster: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Drawn_to_the_Deep_End.jpg',
    notes: [246.9, 293.7, 370.0, 493.9, 440.0, 370.0, 329.6, 293.7]
  }
];

let currentTrackIdx = 0;
// Musik Game 8-Bit langsung aktif otomatis saat membuka web!
let isPlayingChiptune = true;
let chiptuneInterval = null;
let noteStep = 0;

// Fungsi untuk menampilkan Pemutar Full Spotify Embed + Direct Audio Stream untuk ke-6 lagu rekomendasi
async function loadOfficialAudioPreview(track) {
  const audioBox = document.getElementById('inWebAudioPlayerBox');
  const audioEl = document.getElementById('nativeTrackAudio');
  const statusEl = document.getElementById('nativeAudioStatus');
  const iframeContainer = document.getElementById('spotifyIframeContainer');
  const iframeEl = document.getElementById('spotifyEmbedFrame');
  const posterEl = document.getElementById('currentTrackPoster');
  const fullLinkEl = document.getElementById('currentTrackFullLink');

  // Selalu tampilkan Full Spotify Embed Player untuk semua 6 lagu
  if (iframeContainer) iframeContainer.classList.remove('hidden');
  if (iframeEl && track.embedUrl && iframeEl.src !== track.embedUrl) {
    iframeEl.src = track.embedUrl;
  }
  if (fullLinkEl && track.spotifyUrl) {
    fullLinkEl.href = track.spotifyUrl;
  }

  try {
    if (audioBox) audioBox.classList.remove('hidden');
    if (statusEl) statusEl.textContent = `🔄 Memuat Audio Stream: ${track.title}...`;
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(track.searchQuery)}&entity=song&limit=1`);
    const data = await res.json();
    if (data && data.results && data.results.length > 0) {
      const song = data.results[0];
      if (audioEl && song.previewUrl) {
        audioEl.src = song.previewUrl;
        if (statusEl) statusEl.textContent = `🔊 IN-WEB STREAM: ${song.artistName} — ${song.trackName}`;
      }
      if (posterEl && song.artworkUrl100 && (!track.poster || track.poster.includes('wikimedia') || track.poster.includes('ytimg'))) {
        posterEl.src = song.artworkUrl100.replace('100x100bb', '600x600bb');
      }
    } else {
      if (statusEl) statusEl.textContent = `🎧 Putar langsung lewat Full Spotify Player di atas!`;
    }
  } catch (e) {
    if (statusEl) statusEl.textContent = `🎧 Putar langsung lewat Full Spotify Player di atas!`;
  }
}

function updateTrackDisplay() {
  const track = tracks[currentTrackIdx];
  const titleEl = document.getElementById('currentTrackTitle');
  const badgeEl = document.getElementById('currentTrackArtistBadge');
  const posterEl = document.getElementById('currentTrackPoster');
  const stateBadge = document.getElementById('playerStateBadge');

  if (titleEl) titleEl.textContent = track.title;
  if (badgeEl) badgeEl.textContent = track.artistBadge;
  if (posterEl && track.poster) posterEl.src = track.poster;
  if (stateBadge) stateBadge.textContent = `TRACK ${String(currentTrackIdx + 1).padStart(2, '0')} / ${String(tracks.length).padStart(2, '0')}`;

  loadOfficialAudioPreview(track);

  // Highlight kartu lagu yang sedang dipilih di sebelah kanan
  tracks.forEach((_, idx) => {
    const card = document.getElementById(`recTrackCard-${idx}`);
    if (!card) return;
    if (idx === currentTrackIdx) {
      card.className = 'bg-retro-yellow text-black neo-card-interactive rounded-2xl p-3 cursor-pointer flex items-center justify-between gap-3';
    } else {
      card.className = 'bg-white dark:bg-retro-cardDark text-black dark:text-white neo-card-interactive rounded-2xl p-3 cursor-pointer flex items-center justify-between gap-3';
    }
  });
}

function selectRecommendedTrack(index) {
  playArcadeSFX('coin');
  currentTrackIdx = index;
  noteStep = 0;
  updateTrackDisplay();
}

// 6C. OTOMATIS PUTAR LAGU GAME 8-BIT SAAT WEB DIBUKA!
function startChiptuneLoop() {
  stopChiptuneLoop();
  const ctx = getAudioCtx();
  chiptuneInterval = setInterval(() => {
    if (!sfxEnabled || !isPlayingChiptune) return;
    const activeCtx = getAudioCtx();
    if (!activeCtx || activeCtx.state !== 'running') return;

    const notes = tracks[currentTrackIdx].notes;
    const freq = notes[noteStep % notes.length];
    noteStep++;

    const now = activeCtx.currentTime;
    const osc = activeCtx.createOscillator();
    const gain = activeCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
    osc.connect(gain);
    gain.connect(activeCtx.destination);
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

// Buka kunci Web Audio API & putar lagu game 8-bit otomatis begitu halaman dibuka / disentuh pertama kali
function unlockAndStartGameBGM() {
  const ctx = getAudioCtx();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
  if (sfxEnabled && isPlayingChiptune && !chiptuneInterval) {
    startChiptuneLoop();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  updateTrackDisplay();
  startChiptuneLoop();

  // Jika pengguna memutar audio lagu asli di dalam web, hentikan sementara BGM 8-bit agar suara tidak bertabrakan
  const nativeAudio = document.getElementById('nativeTrackAudio');
  if (nativeAudio) {
    nativeAudio.addEventListener('play', () => {
      isPlayingChiptune = false;
    });
  }

  // Pastikan browser langsung memutar lagu game 8-bit saat membuka web atau interaksi pertama
  ['click', 'pointerdown', 'keydown', 'touchstart', 'scroll'].forEach((evt) => {
    window.addEventListener(evt, unlockAndStartGameBGM, { once: true, passive: true });
  });
});

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

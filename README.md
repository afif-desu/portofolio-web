# 🕹️ Panduan Mengedit Web Portfolio 3D Retro (Khusus Pemula)

Selamat datang di **3D Retro Space Portfolio** milikmu! Proyek ini sudah **dipisahkan menjadi beberapa file** supaya rapi dan kamu tidak bingung saat ingin mengubah nama, foto, warna, atau kata-kata di dalamnya.

---

## 📁 Daftar File di Dalam Folder Ini

Jangan bingung! Berikut adalah fungsi dari masing-masing file yang ada di dalam foldermu:

| Nama File | Fungsi File (Untuk Apa?) | Kapan Kamu Perlu Membukanya? |
| :--- | :--- | :--- |
| **`index.html`** | **Kerangka & Teks Utama Web** | Buka file ini kalau mau ganti **Nama**, **Judul**, **Deskripsi Diri**, **Resep Kopi**, **Review Film**, atau **Link Instagram/GitHub**. |
| **`script.js`** | **Otak Interaktif & Daftar Opini** | Buka file ini kalau mau mengubah/menambah kalimat lucu di tombol merah **"Acak Opini!"**, mengubah sapaan karakter, atau mengatur suara 8-bit. |
| **`style.css`** | **Desain, Warna & Animasi 3D** | Buka file ini kalau mau mengganti warna latar belakang, ketebalan bayangan 3D (*shadow*), atau kecepatan animasi melayang. |
| **`avatar-3d.png`** | **Avatar 3D Clay (Berdasarkan Fotomu)** | Gambar karakter 3D utama (rambut belah tengah + hoodie hijau sage dengan tali kepang & latar belakang cangkir kopi). |
| **`avatar-wave.png`** | **Avatar 3D Pose Melambai** | Variasi kedua avatar 3D yang sedang melambaikan tangan (muncul saat tombol *Mode* di bawah foto diklik). |
| **`foto-asli.jpg`** | **Foto Asli Referensimu** | Foto aslimu (juga bisa ditampilkan di web dengan mengklik tombol *Ganti Mode* di bawah avatar). |

---

## 🚀 Cara Membuka & Mengedit Web (Langkah demi Langkah)

1. **Untuk Melihat Hasil Web**:
   - Klik 2x (*double-click*) pada file **`index.html`**, maka web akan langsung terbuka di browser (Chrome / Edge / Firefox).
2. **Untuk Mengedit Isi Web**:
   - Klik kanan pada file yang ingin diedit (misalnya `index.html` atau `script.js`), lalu pilih **Open with -> Notepad** (atau lebih enak lagi pakai aplikasi gratis **VS Code**).
   - Setiap kali selesai mengubah teks, tekan **`Ctrl + S`** (Simpan), lalu kembali ke browser dan tekan **`F5`** (*Refresh*) untuk melihat perubahannya!

---

## ✏️ 1. Cara Mengganti Nama, Status & Deskripsi Diri (di `index.html`)

Buka file **`index.html`**, lalu tekan **`Ctrl + F`** untuk mencari kata yang ingin kamu ganti:

### A. Mengganti Nama Besar di Tengah (`APIP’S RETRO SPACE`)
Cari bagian ini di `index.html` (sekitar baris 125):
```html
<!-- UBAH JUDUL BESAR (HEADLINE) DI SINI -->
<h1 class="font-pixel ...">
  APIP’S RETRO SPACE
</h1>

<!-- UBAH SAPAAN & NAMA PANGGILAN DI SINI -->
<p class="mt-2 ...">
  Hai, Aku <span class="...">Apip!</span> 👋 Tukang Ngulik Kode, Kopi & Pop-Culture 90-an.
</p>
```
👉 **Cara ubah**: Ganti tulisan `APIP’S RETRO SPACE` dan `Apip!` dengan namamu sendiri. Hati-hati jangan menghapus tanda `<...>` di kiri-kanannya ya!

### B. Mengganti Status `"🟢 Sedang menyeduh kopi..."`
Cari tulisan `Sedang menyeduh kopi` di `index.html` (sekitar baris 68):
```html
<span class="text-xs font-extrabold ..." id="liveStatusText">
  🟢 Sedang menyeduh kopi...
</span>
```
👉 **Cara ubah**: Ganti menjadi status apa pun yang kamu mau, misalnya `"🟢 Sedang santai dengerin musik 90-an"`.

---

## 🖼️ 2. Cara Mengganti Foto / Avatar di Tengah

Saat ini web kamu sudah memiliki **4 Mode Avatar** yang bisa diganti-ganti langsung di layar dengan mengklik tombol **`🔄 Mode: 3D Clay Avatar`** tepat di bawah foto:
1. **`avatar-3d.png`**: Versi 3D Clay Designer Toy dari fotomu.
2. **`avatar-wave.png`**: Versi 3D Clay sedang melambaikan tangan 👋.
3. **`foto-asli.jpg`**: Foto asli referensimu.
4. **Mode Vector 3D**: Gambar ilustrasi bawaan kode.

**Bagaimana kalau suatu saat kamu mau ganti pakai foto baru?**
- Cukup siapkan gambar barumu, beri nama **`avatar-3d.png`**, lalu timpa (*replace*) file `avatar-3d.png` yang lama di dalam folder ini. Selesai!

---

## 🎲 3. Cara Mengubah Kalimat "Acak Opini!" (di `script.js`)

Ingin mengganti kata-kata lucu yang keluar waktu tombol merah besar ditekan?
1. Buka file **`script.js`**.
2. Lihat langsung di bagian paling atas (mulai baris 29) pada bagian **`randomOpinions`**:

```javascript
const randomOpinions = [
  {
    tag: '#KULINER',
    text: '"Bubur ayam itu diaduk atau nggak diaduk sama enaknya..."'
  },
  {
    tag: '#KOPI',
    text: '"Tulis opini seru buatanmu sendiri di sini!"'
  },
];
```
👉 **Cara ubah**: Kamu tinggal mengganti tulisan di dalam tanda kutip `text: '...'` dan kategori `tag: '#...'`. Kamu juga bebas menambah daftar baru sebanyak yang kamu mau!

---

## 📊 4. Cara Mengubah Angka Statistik & Pojok Hobi

### A. Mengubah Angka Statistik (Kopi, Jam Game, Papeda, Memori)
1. Buka **`index.html`**, cari bagian `BAGIAN 3: BOARD STATISTIK 3D` (sekitar baris 285).
2. Ubah angka `1,200+`, `850+`, `95%`, atau `99.9%` sesuai keinginanmu.
3. Agar saat diklik angkanya bertambah dari angka barumu, buka juga **`script.js`** di baris 75 dan sesuaikan angkanya:
   ```javascript
   let coffeeCount = 1200; // Ganti angka awal kopi di sini
   let gameCount = 850;    // Ganti angka awal jam game di sini
   ```

### B. Mengubah Resep Kopi, Letterboxd (`@dorepap`), & Lagu Spotify
- **Tab 01 (Kopi Lab)**: Buka **`index.html`**, cari `<!-- TAB 1: KOPI -->` untuk mengubah nama kopi, takaran gram, dan waktu seduh.
- **Tab 02 (Letterboxd Film `@dorepap`)**:
  - Tab ini **sudah terhubung otomatis** ke profil Letterboxd kamu (`https://letterboxd.com/dorepap/`). Setiap kali web dibuka dengan koneksi internet, fungsi `fetchLetterboxdReviews()` di **`script.js`** akan menarik 3 diary/review terbaru dari RSS Letterboxd kamu dan menampilkannya ke dalam kartu VHS 3D!
  - Kalau kamu ingin mengganti username Letterboxd suatu saat nanti, cukup buka **`script.js`** di baris 305 dan ubah:
    ```javascript
    const LETTERBOXD_USERNAME = 'dorepap';
    ```
- **Tab 03 (Spotify & Rekomendasi Lagu)**:
  - Tab ini sudah terhubung langsung ke profil Spotify kamu (`https://open.spotify.com/user/618sf2ln7u25muty9vgeylg2q?si=a7b45010fb7f45bc`) lengkap dengan **Spotify Embed Player resmi** yang bisa langsung memutar:
    1. **Blur — Charmless Man** (`7lJ9MeQgqHlBrE69omD4rN`)
    2. **Blur — Yuko and Hiro** (`2Qv8xJzenocwXyGlMU5PaC`)
    3. **The Lemon Twigs — Corner Of My Eye** (`5DDMzzHlpUmZ6ILqZgJFyL`)
  - Kalau suatu saat kamu ingin menambah/mengganti lagu rekomendasi di Spotify player, buka **`script.js`** di bagian `const tracks = [...]` (sekitar baris 388) dan ganti `title` serta `trackId`-nya (kode ID lagu bisa didapat dari link *Share -> Copy link to Song* di Spotify).

---

## 🌐 5. Cara Mengganti Link Sosial Media (Instagram, GitHub, Email)

Buka **`index.html`**, lalu gulir ke paling bawah (sekitar baris 538) pada bagian `UBAH LINK SOSIAL MEDIA KAMU DI SINI`:

```html
<a href="https://instagram.com/username_kamu" target="_blank" ...>
  <span>📸</span> <span>INSTAGRAM</span>
</a>
<a href="https://github.com/username_kamu" target="_blank" ...>
  <span>👾</span> <span>GITHUB</span>
</a>
<a href="https://linkedin.com/in/username_kamu" target="_blank" ...>
  <span>💼</span> <span>LINKEDIN</span>
</a>
<a href="mailto:emailkamu@gmail.com" ...>
  <span>✉️</span> <span>EMAIL ME</span>
</a>
```
👉 **Cara ubah**: Ganti `username_kamu` dan `emailkamu@gmail.com` dengan akun sosial mediamu yang asli.

---

## 🎨 6. Cara Mengganti Warna Tema (Opsional)

Jika ingin mengganti warna kuning/ungu/teal bawaan:
- Buka **`index.html`** di bagian paling atas (baris 25-36), kamu akan melihat daftar kode warna ini:
  ```javascript
  retro: {
    purple: '#8B5CF6', // Warna Ungu
    yellow: '#FFD100', // Warna Kuning
    teal: '#00E5B3',   // Warna Hijau Toska (Teal)
    orange: '#FF6B35', // Warna Jingga
    pink: '#FF499E',   // Warna Pink
  }
  ```
- Ganti kode warna `#...` tersebut dengan kode warna favoritmu (bisa cari di Google dengan kata kunci *"Color Picker"*).

Selamat berkreasi dengan ruang 3D Retro milikmu! ☕🕹️✨

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
| **`avatar-3d.png`** | **Avatar 3D Clay Melambai (Kulit Putih Cerah)** | Gambar karakter 3D utama (rambut belah tengah + hoodie hijau sage dengan tali kepang & latar belakang cangkir kopi). |
| **`avatar-wave.png`** | **Avatar 3D Clay Portrait Senyum** | Variasi kedua avatar 3D potret depan dengan senyum ramah (muncul saat tombol *Mode* di bawah foto diklik). |

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

## 🖼️ 2. Cara Mengganti Avatar 3D di Tengah

Saat ini web kamu memiliki **3 Mode Avatar 3D** (tanpa menampilkan foto asli) yang bisa diganti-ganti langsung di layar dengan mengklik tombol **`🔄 Mode: 3D Clay Melambai`** tepat di bawah foto:
1. **`avatar-3d.png`**: Versi 3D Clay berkulit putih cerah sedang melambaikan tangan 👋.
2. **`avatar-wave.png`**: Versi 3D Clay potret depan dengan senyum ramah.
3. **Mode Vector 3D**: Gambar ilustrasi vektor 3D bawaan kode.

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

## 🐾 4. Cara Mengubah Level Awal "Beri Makan Mereka!" & Pojok Hobi

### A. Mengubah Nama & Level Awal Hewan (Kucing, Kelinci, Anjing, Beruang)
1. Buka **`script.js`**, cari bagian `BAGIAN 5: BERI MAKAN MEREKA!` (sekitar baris 255).
2. Kamu bisa mengganti nama hewan, level awal (`level: 12`), atau kata-kata lucunya saat diberi makan:
   ```javascript
   const petsData = {
     cat: { name: 'Si Meng (Kucing)', level: 12, ... },
     rabbit: { name: 'Si Boni (Kelinci)', level: 10, ... },
     dog: { name: 'Si Doggo (Anjing)', level: 15, ... },
     bear: { name: 'Si Kuma (Beruang)', level: 18, ... }
   };
   ```

### B. Mengubah Lagu Rekomendasi Spotify, Public Playlist Asli, Film Letterboxd & Kopi Lab
Urutan tab di **Pojok Hobi & Media** sekarang adalah:
- **Tab 01 (Spotify & Lagu)**:
  - **Musik Game 8-Bit Otomatis**: Saat web dibuka, musik game 8-bit langsung berputar otomatis sebagai musik latar! Kamu bisa mematikan atau menyalakannya kapan saja lewat tombol **`🔊 SFX:ON`** di pojok kanan atas navigasi.
  - Menampilkan **6 Lagu Rekomendasi Pilihanmu** dengan **Pemutar Full Spotify Embed (`height="352"`)** + **In-Web Direct Audio Stream**:
    1. **Blur — *Charmless Man*** (`7lJ9MeQgqHlBrE69omD4rN`)
    2. **Blur — *Yuko and Hiro*** (`4ZdiH3M8L4lD3fmWJIQ3My`)
    3. **The Lemon Twigs — *Corner Of My Eye*** (`5DDMzzHlpUmZ6ILqZgJFyL`)
    4. **Sixpence None The Richer — *Kiss Me*** (`754kgU5rWscRTfvlsuEwFp`)
    5. **So!YoON! & Phum Viphurit — *Wings*** (`4XQnhcwRPRmGG4E6PakLMb`)
    6. **Gene — *Save Me, I'm Yours*** (`6OUgDgFBPxxDdKE0dgLxJz`)
  - **Koleksi Public Playlist Spotify Saya**: Langsung menampilkan **3 Public Playlist asli milikmu** secara penuh di dalam halaman web:
    1. Playlist #01: `https://open.spotify.com/playlist/34NA1LXp2PXr1QQ5CHyFP0`
    2. Playlist #02: `https://open.spotify.com/playlist/2vNdkEB6ZRa7kLTp9MKIHl`
    3. Playlist #03: `https://open.spotify.com/playlist/1UkWGqRi1t1ofvAUdqigUK`
- **Tab 02 (Letterboxd Film `@dorepap`)**:
  - Otomatis menarik 3 review/diary terbaru beserta **Poster Film** dari `https://letterboxd.com/dorepap/`.
- **Tab 03 (Kopi Lab — 6 Metode Seduh)**:
  - Sekarang memiliki **6 tombol resep metode seduh interaktif**: **V60**, **Kopi Tubruk**, **Kalita Wave**, **Moka Pot**, **AeroPress**, dan **French Press**. Kamu bisa mengedit takaran gram, suhu air, dan langkah seduhnya di **`script.js`** pada bagian `coffeeBrewRecipes`.

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


---

## 📱 7. Tampilan di HP (Responsif)

Semua pengaturan khusus HP ada di bagian paling bawah **`style.css`** (cari tulisan `TAMPILAN KHUSUS HP`). Yang berubah di HP:
- Avatar & 6 ornamen 3D mengecil dan tersusun rapi di kiri-kanan avatar (tidak menutupi avatar lagi).
- Teks "Selamat datang..." otomatis turun baris (tidak terpotong).
- **Beri Makan Mereka**: hanya **Kucing** yang tampil (Kelinci, Anjing, Beruang pakai class `hidden sm:block`, jadi tetap muncul di laptop).
- **Tab 01 Spotify**: kartu profil tersusun ke bawah, embed Spotify besar disembunyikan (class `hide-on-mobile`), cukup pakai pemutar audio langsung.
- **Tab 02 Letterboxd**: header profil Letterboxd rapi, dan hanya 1 review film yang tampil (sisanya bisa di-scroll ke bawah).
- **Rekomendasi Lagu**: hanya 3 lagu terlihat, sisanya scroll. Di laptop, tinggi daftar lagu otomatis menyamai pemutar di kiri (tidak ada ruang kosong).
- **Koleksi Public Playlist**: hanya 1 playlist terlihat, sisanya scroll.
- **Acak Opini**: tombol merah diperkecil, serta tombol reaksi (Setuju, Valid, Debatable) otomatis rata tengah (centered) di HP.

💡 **Tips menambah kartu lagu baru** di `index.html`: tempel kartunya di baris komentar `<!-- TEMPEL KARTU LAGU BARU (Lagu 7, 8, dst.) DI SINI -->`.

💡 **Cara cek tampilan HP di laptop**: buka web di Chrome → tekan **`F12`** → klik ikon HP/tablet (**`Ctrl + Shift + M`**) → pilih misalnya *iPhone 12 Pro*.

[English](README.md) | [Bahasa Indonesia](README.id.md)

# Nanta — Situs Web Portofolio Pribadi

Situs web portofolio pribadi yang statis dan responsif milik **Gede Yodyananta** ("Nanta"), mahasiswa Rekayasa Perangkat Lunak di Politeknik Negeri Bali. Situs ini menampilkan profil, perjalanan belajar, pendidikan, tech stack, nilai-nilai, proyek terpilih (termasuk studi kasus e-commerce), serta formulir kontak. Dibangun dengan HTML murni, Tailwind CSS v4, dan JavaScript vanilla, serta dideploy sebagai situs statis di Vercel.

## Latar Belakang & Konteks Proyek

Proyek ini dibuat sebagai syarat kelulusan anggota **UKM Computer Club (Divisi Web Development)**. Proyek ini menunjukkan keterampilan pengembangan web frontend praktis — HTML semantik, tata letak responsif dengan Tailwind CSS, interaktivitas dengan JavaScript vanilla, pertimbangan aksesibilitas, dan deployment statis — yang diterapkan pada produk portofolio pribadi yang nyata.

## Gambaran Proyek

- **Jenis situs:** Portofolio statis multi-halaman (tanpa backend, tanpa database, tanpa autentikasi).
- **Halaman:** `index.html` (portofolio utama) dan `projects/ecommerce-website/index.html` (studi kasus e-commerce).
- **Bagian di halaman utama:** Hero (dengan efek mengetik "live code editor"), About (siapa saya, timeline perjalanan, pendidikan, fokus saat ini, tech stack, visi, nilai-nilai), Projects (e-commerce unggulan, portofolio pribadi, proyek berikutnya, slot proyek lain), dan Contact (formulir berbasis Formspree).
- **Tema:** Mode gelap/terang dengan penyimpanan di `localStorage` dan fallback `prefers-color-scheme` untuk mencegah flash tema yang salah.
- **Interaktivitas:** Navbar yang menjadi glass saat scroll, bilah progres scroll, tautan aktif scroll-spy, menu mobile dengan focus trap, animasi masuk, fade-in gambar lazy, tahun hak cipta dinamis, serta formulir kontak dengan validasi sisi klien dan pengiriman asinkron.

## Fitur Utama

- Tata letak responsif di mobile, tablet, dan desktop.
- Toggle tema gelap/terang yang disimpan di `localStorage`.
- Bagian Hero dengan jendela editor kode bergaya macOS dan animasi mengetik karakter demi karakter.
- Bagian About dengan timeline perjalanan belajar animatif, kartu pendidikan, kartu fokus saat ini, kartu tech stack, panel visi, dan grid nilai-nilai pribadi.
- Bagian Projects: kartu proyek e-commerce unggulan dengan tautan "View Case Study", kartu portofolio pribadi yang menaut ke situs live, kartu proyek berikutnya "in progress", dan kartu undangan "more projects".
- Halaman studi kasus e-commerce khusus dengan gambaran umum, tantangan, solusi, fitur utama, rasionalisasi stack, timeline proses pengembangan, galeri tangkapan layar dengan lightbox, pelajaran yang dipetik, dan peta jalan peningkatan di masa depan.
- Formulir kontak yang mengirim ke Formspree dengan validasi field wajib dan pesan status.
- Metadata SEO: judul/deskripsi, Open Graph, Twitter Card, URL kanonikal, data terstruktur JSON-LD `Person`, `sitemap.xml`, dan `robots.txt`.
- Aksesibilitas: tautan skip-to-main-content, label/peran ARIA, focus trap di menu mobile, dukungan keyboard (Escape untuk menutup).

## Tech Stack

- **Markup:** HTML5
- **Styling:** Tailwind CSS v4 (melalui `@tailwindcss/cli`), dikompilasi dari `assets/css/input.css` menjadi `assets/css/output.css`
- **Scripting:** JavaScript vanilla (IIFE ES2015+ di `assets/js/main.js`)
- **Font:** Google Fonts — Inter dan Sora
- **Pengiriman kontak:** Formspree (endpoint formulir pihak ketiga)
- **Deployment:** Vercel (statis, `outputDirectory: "."`)
- **Perangkat dev:** `@tailwindcss/cli` ^4.3.2, `tailwindcss` ^4.3.2
- **Editor:** VS Code dengan Live Server di port 5502 (lihat `.vscode/settings.json`)

## Struktur Proyek

```
.
├── index.html                          # Halaman portofolio utama
├── package.json                        # Script npm dan dev dependencies
├── package-lock.json
├── vercel.json                         # Konfigurasi output statis Vercel
├── robots.txt
├── sitemap.xml
├── .gitignore
├── .vscode/
│   └── settings.json                   # Port Live Server 5502
├── assets/
│   ├── css/
│   │   ├── input.css                   # Sumber Tailwind
│   │   └── output.css                  # CSS hasil kompilasi/minifikasi
│   ├── images/                         # Gambar statis (termasuk .gitkeep)
│   └── js/
│       └── main.js                     # Seluruh interaktivitas portofolio
└── projects/
    └── ecommerce-website/
        └── index.html                  # Halaman studi kasus e-commerce
```

## Instalasi & Pengaturan Lokal

Prasyarat: Node.js dan npm (untuk build Tailwind). Disarankan menggunakan server statis agar perilaku path relatif benar.

1. Clone repositori:
   ```bash
   git clone <repository-url>
   cd ccdt-2026
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. (Opsional) Bangun ulang CSS jika mengedit `assets/css/input.css`:
   ```bash
   npm run build
   ```
   atau watch perubahan:
   ```bash
   npm run watch
   ```
4. Sajikan situs secara statis. Opsi:
   - Buka `index.html` langsung di browser (sebagian besar fitur berfungsi), atau
   - Gunakan VS Code Live Server (port `5502`), atau server statis lain:
     ```bash
     npx serve .
     ```

## Menjalankan Tes / Build

**Tidak ada test suite** yang didefinisikan di repositori ini (`package.json` tidak memiliki script `test`). Verifikasi dilakukan secara manual dengan memuat halaman di browser.

Perintah build (dari `package.json`):
```bash
npm run build
```
Menjalankan `npx @tailwindcss/cli -i ./assets/css/input.css -o ./assets/css/output.css --minify`.

Perintah watch:
```bash
npm run watch
```
Menjalankan Tailwind CLI dalam mode watch.

## Deployment

Situs dideploy sebagai situs statis di **Vercel**. `vercel.json` menetapkan `outputDirectory` ke `"."`, sehingga root repositori disajikan apa adanya. URL produksi kanonikal yang direferensikan di seluruh situs adalah `https://gedeyodyananta.vercel.app/`.

## Keterbatasan yang Diketahui

- **Tidak ada backend di repositori ini.** Portofolio murni HTML/CSS/JS statis. Tidak ada kode sisi server, database, atau autentikasi di repo ini.
- **Formulir kontak bergantung pada pihak ketiga.** Pesan dikirim ke Formspree (`https://formspree.io/gedeyodyananta14@gmail.com`); pengiriman dan penanganan spam bergantung pada layanan tersebut.
- **Preferensi tema bersifat lokal browser.** Pilihan gelap/terang disimpan di `localStorage` dan dapat reset per browser/perangkat; tidak terikat pada akun pengguna mana pun.
- **Tidak ada tes otomatis.** Quality assurance dilakukan secara manual.
- **Proyek e-commerce bersifat eksternal.** Aplikasi e-commerce PHP/JavaScript/CSS/MySQL yang sebenarnya bukan bagian dari repositori ini; hanya halaman studi kasus dan tangkapan layarnya yang disertakan. Tautan "View Source Code" menunjuk ke repositori terpisah.
- **Beberapa slot proyek adalah placeholder.** Kartu "Next Project" dan kartu "More projects" adalah placeholder untuk pekerjaan di masa depan.
# Sistem Pelatihan Haji — Satu Kode, Dua Mode

Project ini menggabungkan dua hal yang sebelumnya terpisah menjadi **satu kode frontend** yang bisa berjalan dengan dua cara berbeda, tinggal ganti **satu baris konfigurasi**:

| Mode | Butuh server? | Cocok untuk |
|---|---|---|
| **`local`** (default) | Tidak — cukup buka `index.html` di browser | Demo cepat, kumpul tugas, tidak perlu install apapun |
| **`api`** | Ya — jalankan backend NestJS di folder `backend/` | Aplikasi sungguhan dengan database PostgreSQL asli |

## Struktur Folder

```
combined/
├── frontend-html/   -> Website (HTML+CSS+JS) — SATU kode untuk kedua mode
│   └── assets/js/config.js   <- SATU-SATUNYA FILE YANG PERLU DIUBAH
└── backend/         -> API NestJS + Prisma (dipakai hanya kalau MODE = 'api')
```

## Cara Pindah Mode

Buka file **`frontend-html/assets/js/config.js`**:

```js
const CONFIG = {
  MODE: "local",   // <-- ganti jadi "api" kalau backend sudah jalan
  API_BASE_URL: "http://localhost:4000/api/v1",
};
```

Itu saja. Tidak ada file lain yang perlu diubah — semua halaman (`jadwal.html`, `daftar.html`, `akun.html`, dst) otomatis menyesuaikan, karena mereka memanggil fungsi yang sama (`getJadwalList()`, `daftarAnggota()`, dll) dari `assets/js/data.js`, dan fungsi itulah yang di baliknya memutuskan mau ambil data dari `localStorage` atau dari backend sungguhan.

## Menjalankan Mode `local` (default, tanpa server)

Langsung buka `frontend-html/index.html` di browser. Selesai. Data tersimpan di `localStorage` browser (lihat penjelasan lengkap di `frontend-html/README.md` bila ada, atau bagian bawah dokumen ini).

## Menjalankan Mode `api` (sungguhan, dengan database)

```bash
# 1. Jalankan backend terlebih dahulu
cd backend
cp .env.example .env
# sesuaikan DATABASE_URL di .env

npm install
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
# backend jalan di http://localhost:4000/api/v1
```

```bash
# 2. Ganti config.js
# frontend-html/assets/js/config.js -> MODE: "api"
```

```bash
# 3. Buka frontend-html/index.html di browser (lewat Live Server / http.server)
cd frontend-html
python3 -m http.server 5500
# buka http://localhost:5500
```

> Catatan: buka lewat server lokal (bukan langsung double-click file), karena beberapa browser membatasi `fetch()` dari halaman `file://` ke domain lain seperti `localhost:4000`.

## Bagaimana Ini Bisa Bekerja? (penjelasan teknis singkat)

Semua halaman HTML **tidak pernah** memanggil `localStorage` atau `fetch` secara langsung. Mereka selalu memanggil fungsi "netral" seperti:

```js
const jadwal = await getJadwalList();
await daftarKeJadwal(jadwalId);
await loginAnggota(email, password);
```

Fungsi-fungsi ini didefinisikan satu kali di `assets/js/data.js`, dan di dalamnya ada percabangan:

```js
async function getJadwalList() {
  if (CONFIG.MODE === "api") {
    // ambil dari backend NestJS via fetch()
  }
  return dbGet(DB_KEYS.JADWAL, []); // ambil dari localStorage
}
```

Supaya tampilan (HTML) tidak perlu tahu bedanya, data yang datang dari API juga "diseragamkan" bentuknya (fungsi `adaptJadwalFromApi()`, `adaptKegiatanFromApi()`, dst) supaya persis sama seperti data dari `localStorage`. Jadi kode yang me-render tabel/kartu di setiap halaman HTML **sama sekali tidak berubah**, siapa pun sumber datanya.

## Data yang Tersimpan di Mode `local`

- `haji_anggota`, `haji_jadwal`, `haji_kegiatan`, `haji_benefit`, `haji_profil`, `haji_pendaftaran`, `haji_session` — semuanya di `localStorage` browser
- Otomatis terisi data contoh saat pertama kali dibuka (lihat `seedIfEmpty()` di `data.js`)
- **Keterbatasan**: data tidak sinkron antar-browser/perangkat, dan hilang jika cache dibersihkan

## Kapan Pakai Mode Apa?

- **Untuk dikumpulkan sebagai tugas / demo ke dosen** → pakai `local`. Tidak ribet, tinggal buka file, semua fitur (pendaftaran, login, daftar jadwal, kuota) tetap berfungsi nyata.
- **Untuk pengembangan lanjutan / dipakai sungguhan oleh balai pelatihan** → pakai `api`, supaya data benar-benar tersimpan di database PostgreSQL dan bisa diakses banyak pengguna sekaligus dari device manapun.

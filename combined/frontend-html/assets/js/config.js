/* =========================================================
   config.js — SATU-SATUNYA FILE YANG PERLU DIUBAH
   untuk berpindah antara mode demo (tanpa server) dan
   mode sungguhan (terhubung ke backend NestJS).
   ========================================================= */

const CONFIG = {
  // Ganti baris ini saja:
  //   'local' -> semua data disimpan di localStorage browser.
  //              Tidak perlu server apapun. Cocok untuk demo/tugas.
  //   'api'   -> data diambil dari backend NestJS sungguhan
  //              (folder ../backend). Jalankan backend-nya dulu
  //              (lihat README backend), baru ganti ke 'api'.
  MODE: "local",

  // Hanya dipakai kalau MODE = 'api'
  API_BASE_URL: "http://localhost:4000/api/v1",
};

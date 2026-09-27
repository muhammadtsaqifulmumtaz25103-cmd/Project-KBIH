/* =========================================================
   data.js — Lapisan data terpadu.
   Semua fungsi di sini bisa dipanggil dengan cara yang SAMA
   dari halaman HTML manapun, tidak peduli CONFIG.MODE = 'local'
   atau 'api'. Percabangan mode-nya disembunyikan di sini saja.
   ========================================================= */

const DB_KEYS = {
  ANGGOTA: "haji_anggota",
  JADWAL: "haji_jadwal",
  KEGIATAN: "haji_kegiatan",
  BENEFIT: "haji_benefit",
  PROFIL: "haji_profil",
  PENDAFTARAN: "haji_pendaftaran",
  SESSION: "haji_session",   // { id, nama, email } - dipakai di kedua mode
  TOKEN: "haji_token",       // hanya dipakai saat MODE = 'api'
};

/* ---------- Helper localStorage ---------- */
function dbGet(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw); } catch (e) { return fallback; }
}
function dbSet(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function uid(prefix = "id") { return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`; }

/* ---------- Helper panggil API backend (dipakai saat MODE = 'api') ---------- */
async function apiFetch(path, options = {}) {
  const token = localStorage.getItem(DB_KEYS.TOKEN);
  const res = await fetch(`${CONFIG.API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const pesan = Array.isArray(body.message) ? body.message.join(", ") : body.message;
    throw new Error(pesan || "Terjadi kesalahan saat menghubungi server.");
  }
  return body;
}

/* ---------- Helper konversi status enum backend -> teks Indonesia ---------- */
function mapStatusKeanggotaan(s) {
  const map = {
    MENUNGGU_VERIFIKASI: "Menunggu Verifikasi",
    AKTIF: "Aktif",
    DITOLAK: "Ditolak",
    NONAKTIF: "Nonaktif",
  };
  return map[s] || s;
}
function mapStatusPendaftaran(s) {
  const map = {
    PENDING: "Menunggu",
    MENUNGGU_PEMBAYARAN: "Menunggu Pembayaran",
    TERKONFIRMASI: "Terkonfirmasi",
    DIBATALKAN: "Dibatalkan",
  };
  return map[s] || s;
}

/* ---------- Adapter: samakan bentuk data dari API dengan bentuk data lokal,
   supaya semua kode render di halaman HTML tidak perlu berubah ---------- */
function adaptKegiatanFromApi(k) {
  return { id: k.id, nama: k.namaKegiatan, kategori: k.jenis, deskripsi: k.deskripsi };
}
function adaptJadwalFromApi(j) {
  return {
    id: j.id,
    tanggalMulai: j.tanggalMulai,
    tanggalSelesai: j.tanggalSelesai,
    lokasi: j.lokasi,
    kuota: j.kuota,
    kuotaTerisi: j.kuotaTerisi,
    kegiatanIds: (j.kegiatan || []).map((k) => k.id),
    status: j.status,
  };
}
function adaptBenefitFromApi(b) {
  return { id: b.id, judul: b.judulBenefit, deskripsi: b.deskripsi };
}
function adaptProfilFromApi(p) {
  return {
    namaBalai: p.namaBalai,
    sejarah: p.sejarah,
    visi: p.visiMisi,
    misi: [],
    alamat: p.alamat,
    kontak: p.kontak,
    jamLayanan: "",
  };
}
function adaptAnggotaFromApi(a) {
  return {
    id: a.id,
    nik: a.nik,
    namaLengkap: a.namaLengkap,
    email: a.email,
    noHp: a.noHp,
    status: mapStatusKeanggotaan(a.statusKeanggotaan),
    tanggalDaftar: a.createdAt,
  };
}

/* =========================================================
   SEED DATA (hanya dipakai di MODE = 'local')
   ========================================================= */
function seedIfEmpty() {
  if (CONFIG.MODE !== "local") return; // di mode 'api', data datang dari database sungguhan

  if (!localStorage.getItem(DB_KEYS.PROFIL)) {
    dbSet(DB_KEYS.PROFIL, {
      namaBalai: "Balai Pelatihan Manasik Haji Nusantara",
      sejarah:
        "Balai Pelatihan Manasik Haji Nusantara berdiri sejak tahun 2005 dengan tujuan mempersiapkan calon jemaah haji secara fisik, mental, dan spiritual sebelum keberangkatan. Selama lebih dari dua dekade, balai ini telah membina ribuan alumni yang tersebar di berbagai daerah.",
      visi: "Menjadi pusat pelatihan manasik haji terdepan yang menghasilkan jemaah yang mandiri, tertib, dan mabrur.",
      misi: [
        "Menyelenggarakan pelatihan manasik haji yang komprehensif dan berkualitas.",
        "Membina jemaah agar memahami rukun, wajib, dan sunnah haji secara benar.",
        "Menyediakan pendampingan sebelum, selama, dan sesudah pelaksanaan ibadah haji.",
        "Membangun jejaring alumni untuk saling berbagi pengalaman dan dukungan.",
      ],
      alamat: "Jl. Pelatihan Haji No. 45, Jakarta Timur, DKI Jakarta",
      kontak: "(021) 555-0192 · info@balaihaji-nusantara.go.id",
      jamLayanan: "Senin–Jumat, 08.00–16.00 WIB",
    });
  }

  if (!localStorage.getItem(DB_KEYS.KEGIATAN)) {
    dbSet(DB_KEYS.KEGIATAN, [
      { id: uid("keg"), nama: "Teori Manasik Haji", kategori: "Teori", deskripsi: "Pemaparan rukun, wajib, dan sunnah haji secara sistematis oleh pembina bersertifikat." },
      { id: uid("keg"), nama: "Praktik Tawaf & Sa'i", kategori: "Praktik", deskripsi: "Simulasi praktik tawaf dan sa'i di area miniatur Ka'bah dan bukit Shafa-Marwah balai pelatihan." },
      { id: uid("keg"), nama: "Praktik Lempar Jumrah", kategori: "Praktik", deskripsi: "Simulasi lempar jumrah lengkap dengan penjelasan waktu dan tata cara yang benar." },
      { id: uid("keg"), nama: "Ceramah Kesehatan Jemaah", kategori: "Ceramah", deskripsi: "Materi menjaga stamina dan kesehatan selama menjalani ibadah haji dari tenaga medis." },
      { id: uid("keg"), nama: "Simulasi Keberangkatan", kategori: "Praktik", deskripsi: "Gladi resik alur keberangkatan dari embarkasi hingga kedatangan di Tanah Suci." },
    ]);
  }

  if (!localStorage.getItem(DB_KEYS.JADWAL)) {
    const kegiatan = dbGet(DB_KEYS.KEGIATAN, []);
    const idKeg = (i) => (kegiatan[i] ? kegiatan[i].id : null);
    dbSet(DB_KEYS.JADWAL, [
      { id: uid("jdw"), tanggalMulai: "2026-11-10", tanggalSelesai: "2026-11-13", lokasi: "Aula Utama Balai Pelatihan, Jakarta Timur", kuota: 40, kuotaTerisi: 28, kegiatanIds: [idKeg(0), idKeg(1), idKeg(3)], status: "Dijadwalkan" },
      { id: uid("jdw"), tanggalMulai: "2026-12-01", tanggalSelesai: "2026-12-04", lokasi: "Gedung Serbaguna Balai Pelatihan, Bekasi", kuota: 30, kuotaTerisi: 30, kegiatanIds: [idKeg(0), idKeg(2), idKeg(4)], status: "Dijadwalkan" },
      { id: uid("jdw"), tanggalMulai: "2027-01-15", tanggalSelesai: "2027-01-18", lokasi: "Aula Utama Balai Pelatihan, Jakarta Timur", kuota: 50, kuotaTerisi: 5, kegiatanIds: [idKeg(0), idKeg(1), idKeg(2), idKeg(3), idKeg(4)], status: "Dijadwalkan" },
    ]);
  }

  if (!localStorage.getItem(DB_KEYS.BENEFIT)) {
    dbSet(DB_KEYS.BENEFIT, [
      { id: uid("ben"), judul: "Sertifikat Resmi", deskripsi: "Setiap peserta yang lulus pelatihan mendapatkan sertifikat resmi dari balai pelatihan." },
      { id: uid("ben"), judul: "Pendampingan Pembina Berpengalaman", deskripsi: "Dibimbing langsung oleh pembina yang telah berpengalaman membina ribuan jemaah." },
      { id: uid("ben"), judul: "Fasilitas Praktik Lengkap", deskripsi: "Tersedia miniatur Ka'bah, area sa'i, dan lokasi simulasi lempar jumrah." },
      { id: uid("ben"), judul: "Jejaring Alumni", deskripsi: "Bergabung dengan komunitas alumni untuk berbagi pengalaman sebelum dan sesudah haji." },
      { id: uid("ben"), judul: "Konsultasi Kesehatan", deskripsi: "Sesi konsultasi kesehatan dengan tenaga medis sebelum keberangkatan." },
    ]);
  }

  if (!localStorage.getItem(DB_KEYS.ANGGOTA)) dbSet(DB_KEYS.ANGGOTA, []);
  if (!localStorage.getItem(DB_KEYS.PENDAFTARAN)) dbSet(DB_KEYS.PENDAFTARAN, []);
}

/* =========================================================
   MODUL 1: KEANGGOTAAN (register, login, session)
   ========================================================= */
async function daftarAnggota({ nik, namaLengkap, email, noHp, password }) {
  if (CONFIG.MODE === "api") {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ nik, namaLengkap, email, noHp, password }),
    });
  }

  // ---- mode local ----
  const anggotaList = dbGet(DB_KEYS.ANGGOTA, []);
  if (anggotaList.some((a) => a.email === email)) {
    throw new Error("Email sudah terdaftar. Silakan gunakan email lain atau masuk.");
  }
  if (anggotaList.some((a) => a.nik === nik)) {
    throw new Error("NIK sudah terdaftar sebelumnya.");
  }
  const anggotaBaru = {
    id: uid("ang"), nik, namaLengkap, email, noHp, password,
    status: "Menunggu Verifikasi", tanggalDaftar: new Date().toISOString(),
  };
  anggotaList.push(anggotaBaru);
  dbSet(DB_KEYS.ANGGOTA, anggotaList);
  return anggotaBaru;
}

async function loginAnggota(email, password) {
  if (CONFIG.MODE === "api") {
    const hasil = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem(DB_KEYS.TOKEN, hasil.accessToken);
    dbSet(DB_KEYS.SESSION, {
      id: hasil.profil.id,
      nama: hasil.profil.nama,
      email: hasil.profil.email,
    });
    return hasil.profil;
  }

  // ---- mode local ----
  const anggotaList = dbGet(DB_KEYS.ANGGOTA, []);
  const anggota = anggotaList.find((a) => a.email === email && a.password === password);
  if (!anggota) throw new Error("Email atau password salah.");
  dbSet(DB_KEYS.SESSION, { id: anggota.id, nama: anggota.namaLengkap, email: anggota.email });
  return anggota;
}

function getSession() {
  return dbGet(DB_KEYS.SESSION, null); // sinkron di kedua mode, cukup baca localStorage
}
function logout() {
  localStorage.removeItem(DB_KEYS.SESSION);
  localStorage.removeItem(DB_KEYS.TOKEN);
}

// Detail lengkap anggota yang sedang login (dipakai di akun.html)
async function getAnggotaSaya() {
  const session = getSession();
  if (!session) return null;

  if (CONFIG.MODE === "api") {
    const data = await apiFetch("/anggota/me");
    return adaptAnggotaFromApi(data);
  }

  // ---- mode local ----
  return dbGet(DB_KEYS.ANGGOTA, []).find((a) => a.id === session.id) || null;
}

/* =========================================================
   MODUL 2, 3, 4, 5: JADWAL, KEGIATAN, BENEFIT, PROFIL
   ========================================================= */
async function getJadwalList() {
  if (CONFIG.MODE === "api") {
    const data = await apiFetch("/jadwal");
    return data.map(adaptJadwalFromApi);
  }
  return dbGet(DB_KEYS.JADWAL, []);
}

async function getKegiatanList() {
  if (CONFIG.MODE === "api") {
    const data = await apiFetch("/kegiatan");
    return data.map(adaptKegiatanFromApi);
  }
  return dbGet(DB_KEYS.KEGIATAN, []);
}

function getKegiatanByIds(semuaKegiatan, ids) {
  return semuaKegiatan.filter((k) => (ids || []).includes(k.id));
}

async function getBenefitList() {
  if (CONFIG.MODE === "api") {
    const data = await apiFetch("/benefit");
    return data.map(adaptBenefitFromApi);
  }
  return dbGet(DB_KEYS.BENEFIT, []);
}

async function getProfil() {
  if (CONFIG.MODE === "api") {
    const data = await apiFetch("/profil-balai");
    return adaptProfilFromApi(data);
  }
  return dbGet(DB_KEYS.PROFIL, {});
}

/* =========================================================
   PENDAFTARAN KE JADWAL (mengikuti Sequence Diagram 6.3 pada blueprint)
   ========================================================= */
async function daftarKeJadwal(jadwalId) {
  const session = getSession();
  if (!session) throw new Error("Silakan masuk (login) terlebih dahulu sebelum mendaftar kegiatan.");

  if (CONFIG.MODE === "api") {
    return apiFetch("/pendaftaran", { method: "POST", body: JSON.stringify({ jadwalId }) });
  }

  // ---- mode local: validasi manual (di mode api, ini sudah divalidasi backend) ----
  const jadwalList = dbGet(DB_KEYS.JADWAL, []);
  const jadwal = jadwalList.find((j) => j.id === jadwalId);
  if (!jadwal) throw new Error("Jadwal tidak ditemukan.");
  if (jadwal.kuotaTerisi >= jadwal.kuota) throw new Error("Mohon maaf, kuota jadwal ini sudah penuh.");

  const pendaftaranList = dbGet(DB_KEYS.PENDAFTARAN, []);
  const sudahDaftar = pendaftaranList.some((p) => p.anggotaId === session.id && p.jadwalId === jadwalId);
  if (sudahDaftar) throw new Error("Anda sudah terdaftar pada jadwal ini.");

  const pendaftaranBaru = {
    id: uid("daf"), anggotaId: session.id, jadwalId,
    status: "Terkonfirmasi", tanggalDaftar: new Date().toISOString(),
  };
  pendaftaranList.push(pendaftaranBaru);
  dbSet(DB_KEYS.PENDAFTARAN, pendaftaranList);

  jadwal.kuotaTerisi += 1;
  dbSet(DB_KEYS.JADWAL, jadwalList);
  return pendaftaranBaru;
}

async function getPendaftaranSaya() {
  const session = getSession();
  if (!session) return [];

  if (CONFIG.MODE === "api") {
    const data = await apiFetch("/pendaftaran/saya");
    return data.map((p) => ({
      id: p.id,
      jadwalId: p.jadwalId,
      status: mapStatusPendaftaran(p.status),
      tanggalDaftar: p.tanggalDaftar,
      jadwal: adaptJadwalFromApi(p.jadwal),
    }));
  }

  // ---- mode local ----
  const semua = dbGet(DB_KEYS.PENDAFTARAN, []);
  const jadwalList = dbGet(DB_KEYS.JADWAL, []);
  return semua
    .filter((p) => p.anggotaId === session.id)
    .map((p) => ({ ...p, jadwal: jadwalList.find((j) => j.id === p.jadwalId) }));
}

/* Jalankan seed data (hanya efektif di mode 'local') */
seedIfEmpty();

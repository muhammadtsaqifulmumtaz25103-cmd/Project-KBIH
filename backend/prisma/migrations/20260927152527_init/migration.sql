-- CreateEnum
CREATE TYPE "StatusKeanggotaan" AS ENUM ('MENUNGGU_VERIFIKASI', 'AKTIF', 'DITOLAK', 'NONAKTIF');

-- CreateEnum
CREATE TYPE "StatusPendaftaran" AS ENUM ('PENDING', 'MENUNGGU_PEMBAYARAN', 'TERKONFIRMASI', 'DIBATALKAN');

-- CreateEnum
CREATE TYPE "StatusPembayaran" AS ENUM ('PENDING', 'PAID', 'FAILED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "StatusVerifikasiDokumen" AS ENUM ('MENUNGGU', 'DISETUJUI', 'DITOLAK');

-- CreateEnum
CREATE TYPE "StatusJadwal" AS ENUM ('DIJADWALKAN', 'BERLANGSUNG', 'SELESAI', 'DIBATALKAN');

-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anggota" (
    "id" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "nama_lengkap" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "no_hp" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "status_keanggotaan" "StatusKeanggotaan" NOT NULL DEFAULT 'MENUNGGU_VERIFIKASI',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "anggota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dokumen" (
    "id" TEXT NOT NULL,
    "anggota_id" TEXT NOT NULL,
    "jenis_dokumen" TEXT NOT NULL,
    "url_file" TEXT NOT NULL,
    "status_verifikasi" "StatusVerifikasiDokumen" NOT NULL DEFAULT 'MENUNGGU',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dokumen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori_kegiatan" (
    "id" TEXT NOT NULL,
    "nama_kategori" TEXT NOT NULL,

    CONSTRAINT "kategori_kegiatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kegiatan" (
    "id" TEXT NOT NULL,
    "kategori_id" TEXT NOT NULL,
    "nama_kegiatan" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,

    CONSTRAINT "kegiatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jadwal_kegiatan" (
    "id" TEXT NOT NULL,
    "tanggal_mulai" TIMESTAMP(3) NOT NULL,
    "tanggal_selesai" TIMESTAMP(3) NOT NULL,
    "kuota" INTEGER NOT NULL,
    "kuota_terisi" INTEGER NOT NULL DEFAULT 0,
    "lokasi" TEXT NOT NULL,
    "status" "StatusJadwal" NOT NULL DEFAULT 'DIJADWALKAN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jadwal_kegiatan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendaftaran" (
    "id" TEXT NOT NULL,
    "anggota_id" TEXT NOT NULL,
    "jadwal_id" TEXT NOT NULL,
    "status" "StatusPendaftaran" NOT NULL DEFAULT 'PENDING',
    "tanggal_daftar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pendaftaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pembayaran" (
    "id" TEXT NOT NULL,
    "pendaftaran_id" TEXT NOT NULL,
    "jumlah" DECIMAL(12,2) NOT NULL,
    "status_bayar" "StatusPembayaran" NOT NULL DEFAULT 'PENDING',
    "metode" TEXT,
    "referensi_external" TEXT,
    "tanggal_bayar" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pembayaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sertifikat" (
    "id" TEXT NOT NULL,
    "anggota_id" TEXT NOT NULL,
    "jadwal_id" TEXT NOT NULL,
    "nomor_sertifikat" TEXT NOT NULL,
    "url_file" TEXT NOT NULL,
    "tanggal_terbit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sertifikat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "balai_profil" (
    "id" TEXT NOT NULL,
    "nama_balai" TEXT NOT NULL,
    "sejarah" TEXT NOT NULL,
    "visi_misi" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "kontak" TEXT NOT NULL,

    CONSTRAINT "balai_profil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galeri" (
    "id" TEXT NOT NULL,
    "balai_id" TEXT NOT NULL,
    "url_gambar" TEXT NOT NULL,
    "keterangan" TEXT,

    CONSTRAINT "galeri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "benefit" (
    "id" TEXT NOT NULL,
    "balai_id" TEXT NOT NULL,
    "judul_benefit" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "benefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JadwalKegiatanToKegiatan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "role_nama_key" ON "role"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "anggota_nik_key" ON "anggota"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "anggota_email_key" ON "anggota"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pendaftaran_anggota_id_jadwal_id_key" ON "pendaftaran"("anggota_id", "jadwal_id");

-- CreateIndex
CREATE UNIQUE INDEX "pembayaran_pendaftaran_id_key" ON "pembayaran"("pendaftaran_id");

-- CreateIndex
CREATE UNIQUE INDEX "sertifikat_nomor_sertifikat_key" ON "sertifikat"("nomor_sertifikat");

-- CreateIndex
CREATE UNIQUE INDEX "_JadwalKegiatanToKegiatan_AB_unique" ON "_JadwalKegiatanToKegiatan"("A", "B");

-- CreateIndex
CREATE INDEX "_JadwalKegiatanToKegiatan_B_index" ON "_JadwalKegiatanToKegiatan"("B");

-- AddForeignKey
ALTER TABLE "anggota" ADD CONSTRAINT "anggota_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dokumen" ADD CONSTRAINT "dokumen_anggota_id_fkey" FOREIGN KEY ("anggota_id") REFERENCES "anggota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kegiatan" ADD CONSTRAINT "kegiatan_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "kategori_kegiatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran" ADD CONSTRAINT "pendaftaran_anggota_id_fkey" FOREIGN KEY ("anggota_id") REFERENCES "anggota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendaftaran" ADD CONSTRAINT "pendaftaran_jadwal_id_fkey" FOREIGN KEY ("jadwal_id") REFERENCES "jadwal_kegiatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembayaran" ADD CONSTRAINT "pembayaran_pendaftaran_id_fkey" FOREIGN KEY ("pendaftaran_id") REFERENCES "pendaftaran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sertifikat" ADD CONSTRAINT "sertifikat_anggota_id_fkey" FOREIGN KEY ("anggota_id") REFERENCES "anggota"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sertifikat" ADD CONSTRAINT "sertifikat_jadwal_id_fkey" FOREIGN KEY ("jadwal_id") REFERENCES "jadwal_kegiatan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galeri" ADD CONSTRAINT "galeri_balai_id_fkey" FOREIGN KEY ("balai_id") REFERENCES "balai_profil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benefit" ADD CONSTRAINT "benefit_balai_id_fkey" FOREIGN KEY ("balai_id") REFERENCES "balai_profil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JadwalKegiatanToKegiatan" ADD CONSTRAINT "_JadwalKegiatanToKegiatan_A_fkey" FOREIGN KEY ("A") REFERENCES "jadwal_kegiatan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JadwalKegiatanToKegiatan" ADD CONSTRAINT "_JadwalKegiatanToKegiatan_B_fkey" FOREIGN KEY ("B") REFERENCES "kegiatan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

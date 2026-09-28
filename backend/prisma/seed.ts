// Seed data awal: role, akun admin, profil balai
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const roles = ['ADMIN', 'PEMBINA', 'ANGGOTA'];
  const roleRecords: Record<string, string> = {};

  for (const nama of roles) {
    const role = await prisma.role.upsert({
      where: { nama },
      update: {},
      create: { nama },
    });
    roleRecords[nama] = role.id;
  }

  const passwordHash = await bcrypt.hash('Admin123!', 10);
  await prisma.anggota.upsert({
    where: { email: 'admin@balaihaji.go.id' },
    update: {},
    create: {
      nik: '0000000000000000',
      namaLengkap: 'Administrator Balai',
      email: 'admin@balaihaji.go.id',
      noHp: '081200000000',
      passwordHash,
      roleId: roleRecords['ADMIN'],
      statusKeanggotaan: 'AKTIF',
    },
  });

  const memberPasswordHash = await bcrypt.hash('Anggota123!', 10);
  await prisma.anggota.upsert({
    where: { email: 'anggota@balaihaji.go.id' },
    update: {},
    create: {
      nik: '1111111111111111',
      namaLengkap: 'Anggota Demo',
      email: 'anggota@balaihaji.go.id',
      noHp: '081211111111',
      passwordHash: memberPasswordHash,
      roleId: roleRecords['ANGGOTA'],
      statusKeanggotaan: 'AKTIF',
    },
  });

  await prisma.balaiProfil.upsert({
    where: { id: 'seed-profil-utama' },
    update: {},
    create: {
      id: 'seed-profil-utama',
      namaBalai: 'Balai Pelatihan Manasik Haji',
      sejarah: 'Diisi sesuai sejarah resmi balai pelatihan.',
      visiMisi: 'Diisi sesuai visi dan misi balai pelatihan.',
      alamat: 'Diisi sesuai alamat balai pelatihan.',
      kontak: '(021) 000-0000',
    },
  });

  for (const namaKategori of ['TEORI', 'PRAKTIK', 'CERAMAH']) {
    const existingCategory = await prisma.kategoriKegiatan.findFirst({ where: { namaKategori } });
    if (!existingCategory) await prisma.kategoriKegiatan.create({ data: { namaKategori } });
  }

  console.log('Seed selesai. Admin: admin@balaihaji.go.id / Admin123!');
  console.log('Seed selesai. Anggota: anggota@balaihaji.go.id / Anggota123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

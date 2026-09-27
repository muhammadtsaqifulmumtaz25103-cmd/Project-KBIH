"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const roles = ['ADMIN', 'PEMBINA', 'ANGGOTA'];
    const roleRecords = {};
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
    console.log('Seed selesai. Login admin: admin@balaihaji.go.id / Admin123!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map
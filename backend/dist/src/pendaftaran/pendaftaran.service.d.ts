import { PrismaService } from '../prisma/prisma.service';
import { JadwalService } from '../jadwal/jadwal.service';
import { CreatePendaftaranDto } from './dto/create-pendaftaran.dto';
export declare class PendaftaranService {
    private prisma;
    private jadwalService;
    constructor(prisma: PrismaService, jadwalService: JadwalService);
    create(anggotaId: string, dto: CreatePendaftaranDto): Promise<{
        pendaftaranId: string;
        pembayaranId: string;
        jumlah: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.StatusPendaftaran;
        pesan: string;
    }>;
    findByAnggota(anggotaId: string): import(".prisma/client").Prisma.PrismaPromise<({
        jadwal: {
            id: string;
            status: import(".prisma/client").$Enums.StatusJadwal;
            createdAt: Date;
            tanggalMulai: Date;
            tanggalSelesai: Date;
            kuota: number;
            kuotaTerisi: number;
            lokasi: string;
        };
        pembayaran: {
            id: string;
            jumlah: import("@prisma/client/runtime/library").Decimal;
            statusBayar: import(".prisma/client").$Enums.StatusPembayaran;
            metode: string | null;
            referensiExternal: string | null;
            tanggalBayar: Date | null;
            createdAt: Date;
            pendaftaranId: string;
        } | null;
    } & {
        id: string;
        status: import(".prisma/client").$Enums.StatusPendaftaran;
        tanggalDaftar: Date;
        anggotaId: string;
        jadwalId: string;
    })[]>;
    findOne(id: string): Promise<{
        anggota: {
            id: string;
            createdAt: Date;
            nik: string;
            namaLengkap: string;
            email: string;
            noHp: string;
            passwordHash: string;
            roleId: string;
            statusKeanggotaan: import(".prisma/client").$Enums.StatusKeanggotaan;
            updatedAt: Date;
        };
        jadwal: {
            id: string;
            status: import(".prisma/client").$Enums.StatusJadwal;
            createdAt: Date;
            tanggalMulai: Date;
            tanggalSelesai: Date;
            kuota: number;
            kuotaTerisi: number;
            lokasi: string;
        };
        pembayaran: {
            id: string;
            jumlah: import("@prisma/client/runtime/library").Decimal;
            statusBayar: import(".prisma/client").$Enums.StatusPembayaran;
            metode: string | null;
            referensiExternal: string | null;
            tanggalBayar: Date | null;
            createdAt: Date;
            pendaftaranId: string;
        } | null;
    } & {
        id: string;
        status: import(".prisma/client").$Enums.StatusPendaftaran;
        tanggalDaftar: Date;
        anggotaId: string;
        jadwalId: string;
    }>;
    konfirmasiSetelahBayar(pendaftaranId: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.StatusPendaftaran;
        tanggalDaftar: Date;
        anggotaId: string;
        jadwalId: string;
    }>;
}

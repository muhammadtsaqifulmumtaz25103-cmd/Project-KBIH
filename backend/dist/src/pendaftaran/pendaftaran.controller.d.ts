import { PendaftaranService } from './pendaftaran.service';
import { CreatePendaftaranDto } from './dto/create-pendaftaran.dto';
export declare class PendaftaranController {
    private pendaftaranService;
    constructor(pendaftaranService: PendaftaranService);
    create(req: any, dto: CreatePendaftaranDto): Promise<{
        pendaftaranId: string;
        pembayaranId: string;
        jumlah: import("@prisma/client/runtime/library").Decimal;
        status: import(".prisma/client").$Enums.StatusPendaftaran;
        pesan: string;
    }>;
    findMine(req: any): import(".prisma/client").Prisma.PrismaPromise<({
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
}

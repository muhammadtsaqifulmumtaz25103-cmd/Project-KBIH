import { PrismaService } from '../prisma/prisma.service';
import { CreateJadwalDto } from './dto/create-jadwal.dto';
export declare class JadwalService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        kegiatan: {
            id: string;
            kategoriId: string;
            namaKegiatan: string;
            deskripsi: string;
            jenis: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        tanggalMulai: Date;
        tanggalSelesai: Date;
        kuota: number;
        lokasi: string;
        kuotaTerisi: number;
        status: import(".prisma/client").$Enums.StatusJadwal;
    })[]>;
    findOne(id: string): Promise<{
        kegiatan: {
            id: string;
            kategoriId: string;
            namaKegiatan: string;
            deskripsi: string;
            jenis: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        tanggalMulai: Date;
        tanggalSelesai: Date;
        kuota: number;
        lokasi: string;
        kuotaTerisi: number;
        status: import(".prisma/client").$Enums.StatusJadwal;
    }>;
    create(dto: CreateJadwalDto): import(".prisma/client").Prisma.Prisma__JadwalKegiatanClient<{
        kegiatan: {
            id: string;
            kategoriId: string;
            namaKegiatan: string;
            deskripsi: string;
            jenis: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        tanggalMulai: Date;
        tanggalSelesai: Date;
        kuota: number;
        lokasi: string;
        kuotaTerisi: number;
        status: import(".prisma/client").$Enums.StatusJadwal;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    cekKetersediaan(jadwalId: string): Promise<{
        kegiatan: {
            id: string;
            kategoriId: string;
            namaKegiatan: string;
            deskripsi: string;
            jenis: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        tanggalMulai: Date;
        tanggalSelesai: Date;
        kuota: number;
        lokasi: string;
        kuotaTerisi: number;
        status: import(".prisma/client").$Enums.StatusJadwal;
    }>;
    tambahKuotaTerisi(jadwalId: string): Promise<{
        id: string;
        createdAt: Date;
        tanggalMulai: Date;
        tanggalSelesai: Date;
        kuota: number;
        lokasi: string;
        kuotaTerisi: number;
        status: import(".prisma/client").$Enums.StatusJadwal;
    }>;
}

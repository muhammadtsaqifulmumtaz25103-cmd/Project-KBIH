import { PrismaService } from '../prisma/prisma.service';
import { CreateKegiatanDto } from './dto/create-kegiatan.dto';
export declare class KegiatanService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        kategori: {
            id: string;
            namaKategori: string;
        };
    } & {
        id: string;
        kategoriId: string;
        namaKegiatan: string;
        deskripsi: string;
        jenis: string;
    })[]>;
    findOne(id: string): Promise<{
        kategori: {
            id: string;
            namaKategori: string;
        };
    } & {
        id: string;
        kategoriId: string;
        namaKegiatan: string;
        deskripsi: string;
        jenis: string;
    }>;
    create(dto: CreateKegiatanDto): import(".prisma/client").Prisma.Prisma__KegiatanClient<{
        id: string;
        kategoriId: string;
        namaKegiatan: string;
        deskripsi: string;
        jenis: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllKategori(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        namaKategori: string;
    }[]>;
}

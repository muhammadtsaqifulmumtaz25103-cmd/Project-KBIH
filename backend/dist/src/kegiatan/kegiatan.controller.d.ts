import { KegiatanService } from './kegiatan.service';
import { CreateKegiatanDto } from './dto/create-kegiatan.dto';
export declare class KegiatanController {
    private kegiatanService;
    constructor(kegiatanService: KegiatanService);
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
    findAllKategori(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        namaKategori: string;
    }[]>;
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
}

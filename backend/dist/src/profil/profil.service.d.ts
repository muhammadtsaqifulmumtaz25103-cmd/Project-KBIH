import { PrismaService } from '../prisma/prisma.service';
export declare class ProfilService {
    private prisma;
    constructor(prisma: PrismaService);
    findProfil(): Promise<{
        galeri: {
            id: string;
            balaiId: string;
            urlGambar: string;
            keterangan: string | null;
        }[];
        benefit: {
            id: string;
            deskripsi: string;
            balaiId: string;
            judulBenefit: string;
        }[];
    } & {
        id: string;
        namaBalai: string;
        sejarah: string;
        visiMisi: string;
        alamat: string;
        kontak: string;
    }>;
    update(id: string, data: Partial<{
        namaBalai: string;
        sejarah: string;
        visiMisi: string;
        alamat: string;
        kontak: string;
    }>): Promise<{
        id: string;
        namaBalai: string;
        sejarah: string;
        visiMisi: string;
        alamat: string;
        kontak: string;
    }>;
    addGaleri(balaiId: string, urlGambar: string, keterangan?: string): import(".prisma/client").Prisma.Prisma__GaleriClient<{
        id: string;
        balaiId: string;
        urlGambar: string;
        keterangan: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

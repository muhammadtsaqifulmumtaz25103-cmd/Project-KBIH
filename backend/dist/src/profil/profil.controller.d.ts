import { ProfilService } from './profil.service';
export declare class ProfilController {
    private profilService;
    constructor(profilService: ProfilService);
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
    update(id: string, body: any): Promise<{
        id: string;
        namaBalai: string;
        sejarah: string;
        visiMisi: string;
        alamat: string;
        kontak: string;
    }>;
    addGaleri(id: string, body: {
        urlGambar: string;
        keterangan?: string;
    }): import(".prisma/client").Prisma.Prisma__GaleriClient<{
        id: string;
        balaiId: string;
        urlGambar: string;
        keterangan: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

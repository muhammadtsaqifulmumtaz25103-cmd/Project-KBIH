import { AnggotaService } from './anggota.service';
export declare class AnggotaController {
    private anggotaService;
    constructor(anggotaService: AnggotaService);
    getMe(req: any): Promise<{
        role: {
            id: string;
            nama: string;
        };
        dokumen: {
            id: string;
            createdAt: Date;
            jenisDokumen: string;
            urlFile: string;
            statusVerifikasi: import(".prisma/client").$Enums.StatusVerifikasiDokumen;
            anggotaId: string;
        }[];
        id: string;
        nik: string;
        email: string;
        namaLengkap: string;
        noHp: string;
        roleId: string;
        statusKeanggotaan: import(".prisma/client").$Enums.StatusKeanggotaan;
        createdAt: Date;
        updatedAt: Date;
    }>;
    uploadDokumen(req: any, body: {
        jenisDokumen: string;
        urlFile: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        jenisDokumen: string;
        urlFile: string;
        statusVerifikasi: import(".prisma/client").$Enums.StatusVerifikasiDokumen;
        anggotaId: string;
    }>;
    findAll(): Promise<{
        role: {
            id: string;
            nama: string;
        };
        id: string;
        nik: string;
        email: string;
        namaLengkap: string;
        noHp: string;
        roleId: string;
        statusKeanggotaan: import(".prisma/client").$Enums.StatusKeanggotaan;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    verifikasi(id: string, body: {
        disetujui: boolean;
    }): Promise<{
        id: string;
        createdAt: Date;
        jenisDokumen: string;
        urlFile: string;
        statusVerifikasi: import(".prisma/client").$Enums.StatusVerifikasiDokumen;
        anggotaId: string;
    }>;
}

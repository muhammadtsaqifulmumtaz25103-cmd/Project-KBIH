import { PrismaService } from '../prisma/prisma.service';
export declare class AnggotaService {
    private prisma;
    constructor(prisma: PrismaService);
    findMe(anggotaId: string): Promise<{
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
    uploadDokumen(anggotaId: string, jenisDokumen: string, urlFile: string): Promise<{
        id: string;
        createdAt: Date;
        jenisDokumen: string;
        urlFile: string;
        statusVerifikasi: import(".prisma/client").$Enums.StatusVerifikasiDokumen;
        anggotaId: string;
    }>;
    verifikasiDokumen(dokumenId: string, disetujui: boolean): Promise<{
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
}

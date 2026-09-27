import { PrismaService } from '../prisma/prisma.service';
import { PendaftaranService } from '../pendaftaran/pendaftaran.service';
export declare class PembayaranService {
    private prisma;
    private pendaftaranService;
    constructor(prisma: PrismaService, pendaftaranService: PendaftaranService);
    handleCallback(payload: {
        pembayaranId: string;
        statusBayar: 'PAID' | 'FAILED' | 'EXPIRED';
        metode?: string;
        referensiExternal?: string;
    }): Promise<{
        id: string;
        jumlah: import("@prisma/client/runtime/library").Decimal;
        statusBayar: import(".prisma/client").$Enums.StatusPembayaran;
        metode: string | null;
        referensiExternal: string | null;
        tanggalBayar: Date | null;
        createdAt: Date;
        pendaftaranId: string;
    }>;
}

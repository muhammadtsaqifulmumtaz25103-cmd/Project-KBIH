import { PembayaranService } from './pembayaran.service';
export declare class PembayaranController {
    private pembayaranService;
    constructor(pembayaranService: PembayaranService);
    handleCallback(body: {
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

import { PrismaService } from '../prisma/prisma.service';
export declare class BenefitService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        deskripsi: string;
        balaiId: string;
        judulBenefit: string;
    }[]>;
    create(balaiId: string, judulBenefit: string, deskripsi: string): import(".prisma/client").Prisma.Prisma__BenefitClient<{
        id: string;
        deskripsi: string;
        balaiId: string;
        judulBenefit: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

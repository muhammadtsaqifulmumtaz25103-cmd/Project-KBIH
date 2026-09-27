import { BenefitService } from './benefit.service';
export declare class BenefitController {
    private benefitService;
    constructor(benefitService: BenefitService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        deskripsi: string;
        balaiId: string;
        judulBenefit: string;
    }[]>;
    create(body: {
        balaiId: string;
        judulBenefit: string;
        deskripsi: string;
    }): import(".prisma/client").Prisma.Prisma__BenefitClient<{
        id: string;
        deskripsi: string;
        balaiId: string;
        judulBenefit: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}

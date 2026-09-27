import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BenefitService {
  constructor(private prisma: PrismaService) {}

  // Publik: daftar benefit program (Modul 4 pada blueprint)
  findAll() {
    return this.prisma.benefit.findMany();
  }

  create(balaiId: string, judulBenefit: string, deskripsi: string) {
    return this.prisma.benefit.create({ data: { balaiId, judulBenefit, deskripsi } });
  }
}

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { BenefitService } from './benefit.service';

@ApiTags('Benefit')
@Controller('benefit')
export class BenefitController {
  constructor(private benefitService: BenefitService) {}

  @Get()
  findAll() {
    return this.benefitService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() body: { balaiId: string; judulBenefit: string; deskripsi: string }) {
    return this.benefitService.create(body.balaiId, body.judulBenefit, body.deskripsi);
  }
}

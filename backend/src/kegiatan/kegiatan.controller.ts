import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { KegiatanService } from './kegiatan.service';
import { CreateKegiatanDto } from './dto/create-kegiatan.dto';

@ApiTags('Kegiatan')
@Controller('kegiatan')
export class KegiatanController {
  constructor(private kegiatanService: KegiatanService) {}

  @Get()
  findAll() {
    return this.kegiatanService.findAll();
  }

  @Get('kategori')
  findAllKategori() {
    return this.kegiatanService.findAllKategori();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kegiatanService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'PEMBINA')
  @Post()
  create(@Body() dto: CreateKegiatanDto) {
    return this.kegiatanService.create(dto);
  }
}

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { JadwalService } from './jadwal.service';
import { CreateJadwalDto } from './dto/create-jadwal.dto';

@ApiTags('Jadwal Kegiatan')
@Controller('jadwal')
export class JadwalController {
  constructor(private jadwalService: JadwalService) {}

  @Get()
  findAll() {
    return this.jadwalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jadwalService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateJadwalDto) {
    return this.jadwalService.create(dto);
  }
}

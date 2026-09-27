import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PendaftaranService } from './pendaftaran.service';
import { CreatePendaftaranDto } from './dto/create-pendaftaran.dto';

@ApiTags('Pendaftaran')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pendaftaran')
export class PendaftaranController {
  constructor(private pendaftaranService: PendaftaranService) {}

  @Post()
  create(@Req() req, @Body() dto: CreatePendaftaranDto) {
    return this.pendaftaranService.create(req.user.userId, dto);
  }

  @Get('saya')
  findMine(@Req() req) {
    return this.pendaftaranService.findByAnggota(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pendaftaranService.findOne(id);
  }
}

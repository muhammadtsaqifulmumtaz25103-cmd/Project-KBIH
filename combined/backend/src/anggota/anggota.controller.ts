import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AnggotaService } from './anggota.service';

@ApiTags('Anggota')
@ApiBearerAuth()
@Controller('anggota')
export class AnggotaController {
  constructor(private anggotaService: AnggotaService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    return this.anggotaService.findMe(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('dokumen')
  uploadDokumen(@Req() req, @Body() body: { jenisDokumen: string; urlFile: string }) {
    return this.anggotaService.uploadDokumen(req.user.userId, body.jenisDokumen, body.urlFile);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.anggotaService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch('dokumen/:id/verifikasi')
  verifikasi(@Param('id') id: string, @Body() body: { disetujui: boolean }) {
    return this.anggotaService.verifikasiDokumen(id, body.disetujui);
  }
}

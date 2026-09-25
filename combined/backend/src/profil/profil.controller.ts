import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ProfilService } from './profil.service';

@ApiTags('Profil Balai')
@Controller('profil-balai')
export class ProfilController {
  constructor(private profilService: ProfilService) {}

  @Get()
  findProfil() {
    return this.profilService.findProfil();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.profilService.update(id, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post(':id/galeri')
  addGaleri(@Param('id') id: string, @Body() body: { urlGambar: string; keterangan?: string }) {
    return this.profilService.addGaleri(id, body.urlGambar, body.keterangan);
  }
}

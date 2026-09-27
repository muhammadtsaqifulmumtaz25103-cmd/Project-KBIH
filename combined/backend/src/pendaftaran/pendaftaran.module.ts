import { Module } from '@nestjs/common';
import { PendaftaranController } from './pendaftaran.controller';
import { PendaftaranService } from './pendaftaran.service';
import { JadwalModule } from '../jadwal/jadwal.module';

@Module({
  imports: [JadwalModule],
  controllers: [PendaftaranController],
  providers: [PendaftaranService],
  exports: [PendaftaranService],
})
export class PendaftaranModule {}

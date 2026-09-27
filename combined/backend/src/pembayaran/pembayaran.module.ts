import { Module } from '@nestjs/common';
import { PembayaranController } from './pembayaran.controller';
import { PembayaranService } from './pembayaran.service';
import { PendaftaranModule } from '../pendaftaran/pendaftaran.module';

@Module({
  imports: [PendaftaranModule],
  controllers: [PembayaranController],
  providers: [PembayaranService],
})
export class PembayaranModule {}

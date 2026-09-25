import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PembayaranService } from './pembayaran.service';

@ApiTags('Pembayaran')
@Controller('pembayaran')
export class PembayaranController {
  constructor(private pembayaranService: PembayaranService) {}

  @Post('callback')
  handleCallback(
    @Body()
    body: {
      pembayaranId: string;
      statusBayar: 'PAID' | 'FAILED' | 'EXPIRED';
      metode?: string;
      referensiExternal?: string;
    },
  ) {
    return this.pembayaranService.handleCallback(body);
  }
}

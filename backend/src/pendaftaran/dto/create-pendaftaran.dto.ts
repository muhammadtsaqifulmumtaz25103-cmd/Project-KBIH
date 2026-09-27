import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePendaftaranDto {
  @ApiProperty({ example: 'id-jadwal-kegiatan' })
  @IsString()
  jadwalId: string;
}

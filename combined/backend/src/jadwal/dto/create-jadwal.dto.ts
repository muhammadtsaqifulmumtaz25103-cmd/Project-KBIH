import { IsArray, IsDateString, IsInt, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJadwalDto {
  @ApiProperty({ example: '2026-11-10' })
  @IsDateString()
  tanggalMulai: string;

  @ApiProperty({ example: '2026-11-15' })
  @IsDateString()
  tanggalSelesai: string;

  @ApiProperty({ example: 40 })
  @IsInt()
  @Min(1)
  kuota: number;

  @ApiProperty({ example: 'Aula Balai Pelatihan Haji Jakarta' })
  @IsString()
  lokasi: string;

  @ApiProperty({ example: ['id-kegiatan-1', 'id-kegiatan-2'], required: false })
  @IsArray()
  kegiatanIds?: string[];
}

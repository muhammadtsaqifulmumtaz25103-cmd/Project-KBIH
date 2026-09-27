import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateKegiatanDto {
  @ApiProperty({ example: 'id-kategori-manasik' })
  @IsString()
  kategoriId: string;

  @ApiProperty({ example: 'Praktik Tawaf dan Sa\'i' })
  @IsString()
  namaKegiatan: string;

  @ApiProperty({ example: 'Simulasi praktik tawaf dan sa\'i di area miniatur Ka\'bah balai pelatihan' })
  @IsString()
  deskripsi: string;

  @ApiProperty({ example: 'PRAKTIK' })
  @IsString()
  jenis: string;
}

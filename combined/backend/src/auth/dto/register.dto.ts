import { IsEmail, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: '3201xxxxxxxxxxxx' })
  @IsString()
  @Matches(/^\d{16}$/, { message: 'NIK harus 16 digit angka' })
  nik: string;

  @ApiProperty({ example: 'Ahmad Fauzi' })
  @IsString()
  namaLengkap: string;

  @ApiProperty({ example: 'ahmad.fauzi@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '081234567890' })
  @IsString()
  noHp: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @MinLength(8, { message: 'Password minimal 8 karakter' })
  password: string;
}

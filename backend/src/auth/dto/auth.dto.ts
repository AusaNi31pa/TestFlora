import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'user@example.com', description: 'อีเมลของผู้ใช้งาน' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'รหัสผ่าน' })
  password: string;
}
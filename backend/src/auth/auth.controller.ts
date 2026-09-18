import { Controller, Post, Body, Req, UseGuards, Get, UnauthorizedException, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'สมัครสมาชิกด้วย Email และ Password' })
  @ApiBody({ type: AuthDto })
  @Post('register')
  async register(@Body() body: AuthDto) {
    return this.authService.register(body.email, body.password);
  }

  @ApiOperation({ summary: 'เข้าสู่ระบบด้วย Email และ Password' })
  @ApiBody({ type: AuthDto })
  @Post('login')
  async login(@Body() body: AuthDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'เข้าสู่ระบบด้วย Google (สำหรับเปิดบน Browser)' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: any) {}

  @ApiOperation({ summary: 'Google Callback (ระบบใช้ภายใน)' })
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const authData = await this.authService.login(req.user);
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    res.cookie('access_token', authData.access_token, {
      httpOnly: true, 
      secure: false, 
      sameSite: 'lax', 
      maxAge: 15 * 60 * 1000, 
    });

    res.cookie('refresh_token', authData.refresh_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(`${frontendUrl}/home`);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'ออกจากระบบ' })
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req: any) {
    await this.authService.logout(req.user.sub);
    return { message: 'Logged out successfully' };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'ขอ Access Token ใหม่ด้วย Refresh Token' })
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refreshTokens(@Req() req: any) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }
}

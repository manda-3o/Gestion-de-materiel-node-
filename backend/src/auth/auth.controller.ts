import { Controller, Post, Body, BadRequestException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto)
    } catch (error) {
      throw new BadRequestException('Invalid credentials')
    }
  }
}

import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    // Mock auth : manda@gmail.com / admin123
    if (loginDto.email === 'manda@gmail.com' && loginDto.password === 'admin123') {
      const payload = {
        sub: 1,
        email: loginDto.email,
        name: 'Manda Admin',
        role: 'Administrateur',
      }
      const token = this.jwtService.sign(payload)

      return {
        access_token: token,
        user: {
          id: 1,
          email: loginDto.email,
          name: 'Manda Admin',
          role: 'Administrateur',
        },
      }
    }

    throw new Error('Invalid credentials')
  }

  validateToken(token: string) {
    try {
      return this.jwtService.verify(token)
    } catch {
      return null
    }
  }
}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthModule } from './auth/auth.module'
import { MaterialModule } from './material/material.module'
import { Material } from './material/entities/material.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'gestmat.db',
      entities: [Material],
      synchronize: true,
      logging: false,
    }),
    JwtModule.register({
      secret: 'your-secret-key-change-this',
      signOptions: { expiresIn: '7d' },
    }),
    PassportModule,
    AuthModule,
    MaterialModule,
  ],
})
export class AppModule {}

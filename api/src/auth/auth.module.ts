import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthSerializer } from './providers/serialization.provider';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AuthSerializer],
})
export class AuthModule {}

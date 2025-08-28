import { Module } from '@nestjs/common';
import { FiordeLoginService } from './login.service';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [FiordeLoginService],
  exports: [FiordeLoginService]
})

export class FiordeLoginModule {}

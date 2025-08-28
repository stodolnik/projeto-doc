import { Module } from '@nestjs/common';
import { FiordeHttpService } from './http.service';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [FiordeHttpService],
  exports: [FiordeHttpService]
})

export class FiordeHttpModule {}

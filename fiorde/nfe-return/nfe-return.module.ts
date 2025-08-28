import { Module } from '@nestjs/common';
import { FiordeNfeService } from './nfe-return.service';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [FiordeNfeService],
  exports: [FiordeNfeService]
})

export class FiordNfeModule {}

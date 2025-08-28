import { Module } from '@nestjs/common';
import { FiordePartnerService } from './partner.service';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [FiordePartnerService],
  exports: [FiordePartnerService]
})

export class FiordePartnerModule {}

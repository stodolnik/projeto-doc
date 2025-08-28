import { Module } from '@nestjs/common';
import { FiordeJournalEntriesService } from './journal-entries.service';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [FiordeJournalEntriesService],
  exports: [FiordeJournalEntriesService]
})

export class JournalEntriesModule {}

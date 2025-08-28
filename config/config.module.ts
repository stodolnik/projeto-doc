import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: 'ConfigService',
      useValue: new ConfigService(`./environment/${process.env.NODE_ENV || 'staging'}.json`),
      
    },
  ],  
  exports: [ConfigService],
})
export class ConfigModule {}

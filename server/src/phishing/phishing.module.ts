// src/phishing/phishing.module.ts - תיקון
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import {
  PhishingAttempt,
  PhishingAttemptSchema,
} from './schema/phishing-attempt.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema },
    ]),
    ConfigModule,
  ],
  controllers: [PhishingController],
  providers: [PhishingService],
  exports: [PhishingService],
})
export class PhishingModule {}

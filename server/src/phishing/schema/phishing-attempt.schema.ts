// src/phishing/schema/phishing-attempt.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhishingAttemptDocument = PhishingAttempt & Document;

@Schema({ timestamps: true })
export class PhishingAttempt {
  @Prop()
  userId: string;

  @Prop({ required: true })
  targetEmail: string;

  @Prop({
    required: true,
    enum: ['pending', 'clicked', 'error'],
    default: 'pending',
  })
  status: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  clickedAt?: Date;

  @Prop({ required: true })
  trackingId: string;
}

export const PhishingAttemptSchema =
  SchemaFactory.createForClass(PhishingAttempt);

import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendPhishingDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email address is required' })
  targetEmail: string;
}

export class PhishingResponseDto {
  success: boolean;
  message: string;
  trackingId?: string;
  status?: string;
}

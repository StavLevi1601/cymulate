// src/phishing/phishing.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { SendPhishingDto, PhishingResponseDto } from './dto/phishing.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  @UseGuards(JwtAuthGuard)
  async sendPhishingEmail(
    @Req() req,
    @Body(ValidationPipe) phishingDto: SendPhishingDto,
  ): Promise<PhishingResponseDto> {
    try {
      const result = await this.phishingService.createPhishingAttempt(
        req.user.id,
        phishingDto.targetEmail,
      );

      return {
        success: true,
        message: 'Phishing email added to table. Please check the status email',
        trackingId: result.trackingId,
        status: result.status,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to send phishing email',
      };
    }
  }

  @Get('attempts')
  @UseGuards(JwtAuthGuard)
  async getPhishingAttempts(): Promise<any> {
    try {
      const attempts = await this.phishingService.getPhishingAttempts();

      return {
        success: true,
        data: attempts,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to fetch phishing attempts',
      };
    }
  }

  @Get('track/:trackingId')
  async trackClick(@Req() req): Promise<any> {
    try {
      await this.phishingService.trackClick(req.params.trackingId);

      return {
        success: true,
        message: 'Phishing attempt updated',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to update phishing attempt',
      };
    }
  }
}

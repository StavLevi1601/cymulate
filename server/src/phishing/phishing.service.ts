import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhishingAttempt } from './schema/phishing-attempt.schema';
import * as nodemailer from 'nodemailer';
import { v4 as uuid4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

const APP_URL = 'http://localhost:4444';

@Injectable()
export class PhishingService {
  private transporter: nodemailer.Transporter;
  private readonly baseUrl: string;

  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingModel: Model<PhishingAttempt>,
    private configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: this.configService.get('MAILTRAP_USER'),
        pass: this.configService.get('MAILTRAP_PASS'),
      },
    });
    this.baseUrl = this.configService.get('APP_URL') || APP_URL;
  }

  async createPhishingAttempt(
    userId: string,
    targetEmail: string,
  ): Promise<PhishingAttempt> {
    const existingAttempt = await this.phishingModel.findOne({
      targetEmail,
    });

    if (existingAttempt) {
      await this.updateAttemptStatus(existingAttempt.trackingId, 'error');
      return;
    }

    const trackingId = uuid4();
    const trackingUrl = `${this.baseUrl}/phishing/track/${trackingId}`;

    const content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e53e3e;">Security Alert: Action Required</h2>
          <p>Dear User,</p>
          <p>We've detected unusual activity in your account. Please verify your identity by clicking the link below:</p>
          <p style="margin: 20px 0;">
            <a href="${trackingUrl}" 
               style="background-color: #3182ce; color: white; padding: 10px 20px; 
                      text-decoration: none; border-radius: 5px;">
              Verify Account
            </a>
          </p>
          <p style="color: #718096; font-size: 12px;">
            If you did not request this verification, please ignore this email.
          </p>
        </div>`;

    const attempt = new this.phishingModel({
      userId,
      targetEmail,
      status: 'pending',
      trackingId,
      content: content,
    });

    await attempt.save();

    await this.sendPhishingEmail(targetEmail, trackingId, content);

    return attempt;
  }

  private async sendPhishingEmail(
    email: string,
    trackingId: string,
    content: string,
  ): Promise<void> {
    const mailOptions = {
      from: this.configService.get('EMAIL_FROM'),
      to: email,
      subject: 'Important Security Alert',
      html: content,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending phishing email:', error);
      await this.updateAttemptStatus(trackingId, 'error');
      throw error;
    }
  }

  async updateAttemptStatus(trackingId: string, status: string): Promise<void> {
    const updates: any = { status };
    if (status === 'clicked') {
      updates.clickedAt = new Date();
    }

    await this.phishingModel.findOneAndUpdate({ trackingId }, updates, {
      new: true,
    });
  }

  async trackClick(trackingId: string): Promise<void> {
    await this.updateAttemptStatus(trackingId, 'clicked');
  }

  async getPhishingAttempts(): Promise<any[]> {
    return this.phishingModel.find({}, 'targetEmail content status').exec();
  }
}

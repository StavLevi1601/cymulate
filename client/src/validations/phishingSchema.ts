import { z } from 'zod';

export const phishingSchema = z.object({
  targetEmail: z.string().email('Invalid email address'),
});

export type PhishingFormData = z.infer<typeof phishingSchema>;
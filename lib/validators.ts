import { z } from 'zod'
import { VALIDATION } from '@/constants'

export const SignupSchema = z.object({
  fullName: z
    .string()
    .min(VALIDATION.NAME_MIN_LENGTH, `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`)
    .max(VALIDATION.NAME_MAX_LENGTH, `Name must be at most ${VALIDATION.NAME_MAX_LENGTH} characters`),
  email: z
    .string()
    .max(VALIDATION.EMAIL_MAX_LENGTH)
    .email('Invalid email address'),
  password: z
    .string()
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`),
})

export const SigninSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const ListingQuerySchema = z.object({
  type: z.string().optional(),
  location: z.string().optional(),
})

export const MessageQuerySchema = z.object({
  conversationId: z.string().optional(),
})

export const MessageCreateSchema = z.object({
  conversationId: z.string().min(1, 'Conversation ID is required'),
  content: z.string().min(1, 'Message content is required'),
})

export type SignupInput = z.infer<typeof SignupSchema>
export type SigninInput = z.infer<typeof SigninSchema>
export type ListingQueryInput = z.infer<typeof ListingQuerySchema>
export type MessageQueryInput = z.infer<typeof MessageQuerySchema>
export type MessageCreateInput = z.infer<typeof MessageCreateSchema>

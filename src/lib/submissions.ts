/*
 * Form submission boundary — every form on the site goes through submitForm().
 *
 * MVP: there is no backend yet. Submissions are simulated so loading / success / error states
 * work end to end, but NOTHING IS DELIVERED. Before launch, connect one of:
 *   - Supabase:  const { error } = await supabase.from(submissionTables[kind]).insert(payload)
 *   - Email/CRM/Messenger: POST to a serverless function that holds the secret keys.
 * Never call email/CRM APIs with secret keys from the browser.
 */

export type ContactMethod = 'Call' | 'Text' | 'Messenger' | 'Email'

type ContactFields = {
  name: string
  phone: string
  email?: string
  preferredContact?: ContactMethod
}

export type InquiryPayload = ContactFields & {
  intent: 'inquiry' | 'viewing'
  vehicleId?: string
  vehicle?: string
  message?: string
  preferredDate?: string
  preferredTime?: string
}

export type SellRequestPayload = ContactFields & {
  make: string
  model: string
  year: string
  variant?: string
  mileage?: string
  transmission?: string
  fuelType?: string
  condition?: string
  accidentHistory?: string
  floodHistory?: string
  serviceHistory?: string
  /** File names until photo upload (e.g. Supabase Storage) is connected. */
  photos?: string[]
}

export type TradeRequestPayload = ContactFields & {
  currentYear: string
  currentMake: string
  currentModel: string
  currentMileage?: string
  currentCondition?: string
  desiredVehicle?: string
  budget?: string
}

export type ConsignmentRequestPayload = ContactFields & {
  year: string
  make: string
  model: string
  mileage?: string
  askingPrice?: string
  message?: string
}

export type FinancingRequestPayload = ContactFields & {
  vehicle?: string
  downPayment?: string
  preferredTerm?: string
}

export type ContactPayload = ContactFields & {
  interest: string
  message?: string
}

export type Submissions = {
  inquiry: InquiryPayload
  sell: SellRequestPayload
  trade: TradeRequestPayload
  consign: ConsignmentRequestPayload
  financing: FinancingRequestPayload
  contact: ContactPayload
}

export type SubmissionKind = keyof Submissions

/** Future Supabase tables — one per form. */
export const submissionTables: Record<SubmissionKind, string> = {
  inquiry: 'inquiries',
  sell: 'sell_requests',
  trade: 'trade_requests',
  consign: 'consignment_requests',
  financing: 'financing_requests',
  contact: 'contact_messages',
}

export async function submitForm<K extends SubmissionKind>(kind: K, payload: Submissions[K]): Promise<void> {
  // ponytail: simulated submit (see note at top) — swap for a Supabase insert or serverless call.
  await new Promise((resolve) => setTimeout(resolve, 900))
  if (import.meta.env.DEV) console.info(`[F2A] ${kind} → ${submissionTables[kind]}`, payload)
}

import { MessageCircle, Phone, Send } from 'lucide-react'
import { site } from '../../data/site'
import { useInquiry } from '../inquiry/inquiryContext'

/** Fixed CALL / MESSAGE / INQUIRE bar on phones and tablets. On a car page, INQUIRE is pre-filled with that car. */
export function MobileActionBar() {
  const { openInquiry, pageVehicle } = useInquiry()
  const item = 'flex h-16 flex-col items-center justify-center gap-1.5 eyebrow text-[10px]'

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-3">
        <a href={site.phone.href} className={`${item} text-white/80 active:bg-white/5`}>
          <Phone className="size-[18px]" aria-hidden />
          Call
        </a>
        <a href={site.messenger} target="_blank" rel="noopener noreferrer" className={`${item} border-x border-white/10 text-white/80 active:bg-white/5`}>
          <MessageCircle className="size-[18px]" aria-hidden />
          Message
        </a>
        <button type="button" onClick={() => openInquiry({ vehicle: pageVehicle })} className={`${item} bg-f2a text-white active:bg-f2a-deep`}>
          <Send className="size-[18px]" aria-hidden />
          Inquire
        </button>
      </div>
    </div>
  )
}

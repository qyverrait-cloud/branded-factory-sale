"use client"

import { useState } from "react"
import { Phone, MessageSquare, X, ChevronUp } from "lucide-react"
import Link from "next/link"

type Contact = { label: string; phone: string }

const CONTACTS: Contact[] = [
  { label: "Ashish Jain", phone: "8003246909" },
  { label: "Rishi Gandhi", phone: "9251554751" },
  { label: "Vaibhav Gandhi", phone: "9660994037" },
]

export function FloatingContactWidget() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Contact>(CONTACTS[0])

  const waLink = `https://wa.me/91${selected.phone}?text=${encodeURIComponent(
    "Hello, I'm interested in wholesale products from Branded Factory Sale.",
  )}`
  const telLink = `tel:+91${selected.phone}`

  return (
    <div className="fixed z-50 bottom-3 right-3 sm:bottom-4 sm:right-4 flex flex-col items-end gap-2">
      {open && (
        <div className="w-[calc(100vw-1.5rem)] sm:w-72 max-w-sm bg-card/95 backdrop-blur-md border border-border/60 rounded-xl shadow-lg p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-sm sm:text-base">Contact Options</div>
            <button 
              aria-label="Close" 
              onClick={(e) => {
                e.stopPropagation()
                setOpen(false)
              }} 
              className="p-1.5 rounded hover:bg-muted/30 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center hover:scale-110 transition-transform"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <label className="text-xs text-muted-foreground">Select person</label>
          <div className="mt-1.5 grid grid-cols-3 gap-2">
            {CONTACTS.map((c) => (
              <button
                key={c.phone}
                onClick={() => setSelected(c)}
                className={`text-xs px-2 py-2 rounded border touch-manipulation min-h-[44px] ${
                  selected.phone === c.phone ? "border-primary text-primary bg-primary/10" : "border-border/60 text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href={waLink}
              target="_blank"
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-md bg-green-600 text-white hover:opacity-90 touch-manipulation min-h-[44px] text-sm"
            >
              <MessageSquare className="h-4 w-4" /> <span className="hidden sm:inline">WhatsApp</span><span className="sm:hidden">WA</span>
            </Link>
            <Link
              href={telLink}
              className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 touch-manipulation min-h-[44px] text-sm"
            >
              <Phone className="h-4 w-4" /> Call
            </Link>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2.5 rounded-full shadow-lg bg-background/90 border border-border/60 backdrop-blur-md touch-manipulation min-h-[44px]"
        aria-label="Open contact widget"
      >
        <ChevronUp className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        <span className="text-sm hidden sm:inline">Contact</span>
      </button>
      <Link
        href={`https://wa.me/918003246909`}
        target="_blank"
        className="rounded-full h-12 w-12 sm:h-14 sm:w-14 grid place-items-center shadow-lg bg-green-600 text-white touch-manipulation active:scale-95 transition-transform"
        aria-label="Quick WhatsApp Ashish Jain"
        title="WhatsApp Ashish Jain"
      >
        <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
      </Link>
      <Link
        href="tel:+918003246909"
        className="rounded-full h-12 w-12 sm:h-14 sm:w-14 grid place-items-center shadow-lg bg-primary text-primary-foreground touch-manipulation active:scale-95 transition-transform"
        aria-label="Quick Call Ashish Jain"
        title="Call Ashish Jain"
      >
        <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
      </Link>
    </div>
  )
}

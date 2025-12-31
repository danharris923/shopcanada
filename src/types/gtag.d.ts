interface GtagEventParams {
  event_category?: string
  event_label?: string
  value?: number
  deal_id?: string
  store?: string
  is_affiliate?: boolean
  [key: string]: string | number | boolean | undefined
}

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      targetOrAction: string | Date,
      params?: GtagEventParams | Record<string, unknown>
    ) => void
  }
}

export {}

export interface Event {
  id: number
  title: string
  image?: string | null
  description?: string | null
  performers_id?: string | null
  clients_id: number
  wage_offer: number
  start_date: Date
  end_date: Date
  location: string
  hashtag_details?: string
}

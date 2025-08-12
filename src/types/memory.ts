export interface LifeEvent {
  id: number;
  user_id: number;
  event_title: string;
  event_date: string; 
  description: string;
  image_url?: string;
  image_caption?: string;
}

export interface LifeEventInput {
  event_title: string;
  event_date: string;
  description: string;
  image_url?: string;
  image_caption?: string;
}

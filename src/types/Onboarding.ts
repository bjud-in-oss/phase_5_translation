export interface OnboardingCard {
  id: string;
  provider: 'intro' | 'gemini' | 'livekit' | 'daily' | 'cloudflare' | 'outro' | 'keys' | 'sfu_choice';
  title: string;
  description: string;
  imageUrl?: string;
  overlays?: {
    ringX: number;
    ringY: number;
    magX: number;
    magY: number;
    zoom: number;
    text?: string;
  }[];
}

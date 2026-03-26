export interface MagnifierOverlay {
  ringX: number; // Procent (0-100) för lilla måltavlan (X)
  ringY: number; // Procent (0-100) för lilla måltavlan (Y)
  magX: number;  // Procent (0-100) för det stora förstoringsglaset (X)
  magY: number;  // Procent (0-100) för det stora förstoringsglaset (Y)
  zoom: number;  // Zoom-faktor (ex. 3 för 300%)
  text?: string; // Valfri instruktion under förstoringsglaset
}

export interface OnboardingCard {
  id: string;
  provider: 'intro' | 'gemini' | 'livekit' | 'daily' | 'cloudflare' | 'outro' | 'sfu-choice' | 'keys';
  title: string;
  description: string;
  imageUrl?: string; // Valfri för text-only kort
  overlays?: MagnifierOverlay[];
}

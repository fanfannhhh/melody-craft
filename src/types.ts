export type MusicStyle = 'Jazz' | 'Classical' | 'Electronic' | 'Pop' | 'Rock';

export interface MusicRequest {
  style: MusicStyle;
  description: string;
}

export interface GeneratedMusic {
  id: number | string;
  style: MusicStyle;
  description: string;
  timestamp: string;
  status: 'generated' | 'pending' | 'failed';
  mockData?: Record<string, unknown>;
}

export interface MusicFormProps {
  onSubmit: (request: MusicRequest) => Promise<void>;
  isLoading: boolean;
}

export interface MusicPlayerProps {
  music: GeneratedMusic | null;
}


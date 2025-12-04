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
  // 可选的本地生成音频URL（由MIDI转换而来）
  audioUrl?: string;
}

export interface MusicFormProps {
  onSubmit: (request: MusicRequest) => Promise<void>;
  isLoading: boolean;
}

export interface MusicPlayerProps {
  music: GeneratedMusic | null;
}


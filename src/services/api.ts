import { MusicRequest, GeneratedMusic } from '../types';
import { generateMIDI, midiBase64ToDataUrl } from '../utils/midiGenerator';

export const generateMusic = async (
  request: MusicRequest,
): Promise<GeneratedMusic> => {
  try {
    const base64 = await generateMIDI(request.style, request.description, 16);
    const audioUrl = midiBase64ToDataUrl(base64);

    return {
      id: Date.now(),
      style: request.style,
      description: request.description,
      timestamp: new Date().toISOString(),
      status: 'generated',
      mockData: {
        source: 'local-midi',
        audioUrl,
      },
      audioUrl,
    } as GeneratedMusic & { audioUrl: string };
  } catch (error) {
    console.error('本地MIDI生成失败，回退到Mock数据:', error);

    return {
      id: Date.now(),
      style: request.style,
      description: request.description,
      timestamp: new Date().toISOString(),
      status: 'generated',
      mockData: {
        source: 'mock-fallback',
        description: request.description,
        style: request.style,
      },
    };
  }
};




import { Scale, Chord } from 'tonal';
import MidiWriter from 'midi-writer-js';
import { MusicStyle } from '../types';

type InternalStyle = Lowercase<MusicStyle> | 'electronic';

interface StyleConfig {
  scale: string;
  chords: string[];
  bpm: number;
}

const STYLE_CONFIG: Record<InternalStyle, StyleConfig> = {
  jazz: {
    scale: 'C major',
    chords: ['Cmaj7', 'Am7', 'Dm7', 'G7'],
    bpm: 90,
  },
  classical: {
    scale: 'G major',
    chords: ['G', 'Em', 'C', 'D'],
    bpm: 80,
  },
  electronic: {
    scale: 'A minor',
    chords: ['Am', 'F', 'C', 'G'],
    bpm: 120,
  },
  pop: {
    scale: 'C major',
    chords: ['C', 'G', 'Am', 'F'],
    bpm: 110,
  },
  rock: {
    scale: 'E minor',
    chords: ['Em', 'C', 'G', 'D'],
    bpm: 120,
  },
};

const toInternalStyle = (style: string): InternalStyle => {
  const normalized = style.toLowerCase() as InternalStyle;
  if (normalized in STYLE_CONFIG) {
    return normalized;
  }
  return 'pop';
};

const createMelodyTrack = (
  scaleNotes: string[],
  totalBars: number,
  description: string,
) => {
  const track = new MidiWriter.Track();
  track.addEvent(new MidiWriter.ProgramChangeEvent({ instrument: 1 }));

  const notesPerBar = 4; // quarter notes
  const emphasis = /sad|slow|soft|ambient|lofi|chill/i.test(description)
    ? ['4', '5']
    : ['5', '6', '7'];

  for (let bar = 0; bar < totalBars; bar += 1) {
    for (let i = 0; i < notesPerBar; i += 1) {
      const degreePool = bar % 2 === 0 ? emphasis : scaleNotes;
      const pitch = degreePool[Math.floor(Math.random() * degreePool.length)];
      track.addEvent(
        new MidiWriter.NoteEvent({
          pitch: [pitch],
          duration: '4',
          velocity: 80,
        }),
      );
    }
  }

  return track;
};

const createChordTrack = (
  chords: string[],
  totalBars: number,
) => {
  const track = new MidiWriter.Track();
  track.addEvent(
    new MidiWriter.ProgramChangeEvent({
      instrument: 0,
    }),
  );

  for (let bar = 0; bar < totalBars; bar += 1) {
    const chordSymbol = chords[bar % chords.length];
    const chordNotes = Chord.get(chordSymbol).notes;
    if (!chordNotes || chordNotes.length === 0) {
      // fallback simple triad on C
      track.addEvent(
        new MidiWriter.NoteEvent({
          pitch: ['C3', 'E3', 'G3'],
          duration: '1',
          velocity: 60,
        }),
      );
      continue;
    }

    const bass = `${chordNotes[0]}2`;
    const triad = chordNotes.slice(0, 3).map((n) => `${n}3`);

    track.addEvent(
      new MidiWriter.NoteEvent({
        pitch: [bass, ...triad],
        duration: '1',
        velocity: 60,
      }),
    );
  }

  return track;
};

export const generateMIDI = async (
  style: string,
  description: string,
  durationSeconds: number = 16,
): Promise<string> => {
  const internalStyle = toInternalStyle(style);
  const config = STYLE_CONFIG[internalStyle];

  const scaleNotes = Scale.get(config.scale).notes.map((n) => `${n}4`);
  const bars = Math.max(2, Math.floor((config.bpm * (durationSeconds / 60)) / 4));

  const file = new MidiWriter.Writer([]);

  const melodyTrack = createMelodyTrack(scaleNotes, bars, description);
  const chordTrack = createChordTrack(config.chords, bars);

  file.tracks.push(chordTrack);
  file.tracks.push(melodyTrack);

  const dataUri = file.dataUri(); // "data:audio/midi;base64,AAAA..."
  const base64 = dataUri.split(',')[1] ?? '';
  return base64;
};

export const midiBase64ToDataUrl = (base64: string) =>
  `data:audio/midi;base64,${base64}`;



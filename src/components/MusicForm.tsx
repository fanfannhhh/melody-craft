import React, { useState } from 'react';
import { MusicFormProps, MusicStyle } from '../types';

const MUSIC_STYLES: MusicStyle[] = ['Jazz', 'Classical', 'Electronic', 'Pop', 'Rock'];

const MusicForm: React.FC<MusicFormProps> = ({ onSubmit, isLoading }) => {
  const [style, setStyle] = useState<MusicStyle>('Jazz');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    await onSubmit({ style, description: description.trim() });
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">音乐风格</label>
        <div className="flex flex-wrap gap-2">
          {MUSIC_STYLES.map((musicStyle) => (
            <button
              key={musicStyle}
              type="button"
              onClick={() => setStyle(musicStyle)}
              className={`px-4 py-2 rounded-lg transition-all ${
                style === musicStyle
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {musicStyle}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">描述 / 灵感</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="描述你想要的音乐，例如：温暖的爵士钢琴夜、激昂的电子舞曲、宁静的古典小提琴..."
          className="w-full h-32 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          disabled={isLoading}
        />
        <p className="mt-2 text-sm text-gray-400">
          示例：快乐的钢琴曲 | 悲伤的小提琴 | 动感的电子音乐
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading || !description.trim()}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
          isLoading || !description.trim()
            ? 'bg-gray-700 cursor-not-allowed text-gray-400'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            正在生成中...
          </span>
        ) : (
          '生成音乐灵感'
        )}
      </button>

      <div className="p-4 bg-gray-900/50 rounded-lg">
        <h4 className="font-medium text-gray-300 mb-2">如何使用：</h4>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>1. 选择音乐风格</li>
          <li>2. 用中文或英文描述你想要的音乐</li>
          <li>3. 点击生成，AI将为你创作音乐灵感</li>
          <li>4. 在右侧播放器查看生成结果</li>
        </ul>
      </div>
    </form>
  );
};

export default MusicForm;


import React from 'react';
import { MusicPlayerProps } from '../types';

const MusicPlayer: React.FC<MusicPlayerProps> = ({ music }) => {
  if (!music) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
          <svg
            className="w-8 h-8 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            ></path>
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-300 mb-2">等待生成的音乐</h3>
        <p className="text-gray-500">提交表单后，将在此展示AI生成的音乐信息</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-white">{music.style} 音乐</h3>
          <p className="text-gray-300 mt-1">{music.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            music.status === 'generated'
              ? 'bg-green-900/30 text-green-400'
              : music.status === 'pending'
              ? 'bg-yellow-900/30 text-yellow-400'
              : 'bg-red-900/30 text-red-400'
          }`}
        >
          {music.status === 'generated' ? '生成成功' : music.status === 'pending' ? '生成中' : '生成失败'}
        </span>
      </div>

      <div className="bg-gray-900 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <p className="font-medium">AI 生成音乐片段</p>
              <p className="text-sm text-gray-400">ID: {music.id}</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">模拟播放</button>
        </div>

        {/* 模拟播放器 */}
        <div className="mt-4">
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-blue-500"></div>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>0:00</span>
            <span>0:30</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <button className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <button className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832l10-6a1 1 0 000-1.664l-10-6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* API返回数据展示（技术展示） */}
      <div className="bg-gray-900 rounded-xl p-4">
        <h4 className="font-medium text-gray-300 mb-3">API返回数据</h4>
        <div className="bg-black rounded-lg p-4 overflow-auto">
          <pre className="text-sm text-green-400">
            {JSON.stringify(
              music.mockData || {
                music_style: music.style,
                description: music.description,
                id: music.id,
                status: music.status,
                timestamp: music.timestamp,
                message: 'AI音乐生成请求处理成功',
              },
              null,
              2,
            )}
          </pre>
        </div>
        <div className="flex gap-3 mt-4">
          <button className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition">
            下载MIDI
          </button>
          <button className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition">
            分享结果
          </button>
          <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition">
            再次生成
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-500 pt-4 border-t border-gray-800">
        <p>生成时间: {new Date(music.timestamp).toLocaleString('zh-CN')}</p>
        <p className="mt-1">技术说明: 此版本使用Mock API展示完整流程，实际可集成Hugging Face MusicGen等AI模型</p>
      </div>
    </div>
  );
};

export default MusicPlayer;


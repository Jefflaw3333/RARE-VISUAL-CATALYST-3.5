import React, { useState, useEffect } from 'react';
import { getAllKeys, saveAllKeys, clearAllKeys } from '../services/apiKeyStore';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaved: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSaved }) => {
    const [keys, setKeys] = useState({
        gemini: '',
        geminiEndpoint: '',
        geminiTextModel: '',
        geminiImageModel: '',
        fal: '',
        googleDriveApiKey: '',
        googleDriveClientId: '',
    });
    const [showKeys, setShowKeys] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setKeys(getAllKeys());
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!keys.gemini.trim()) {
            alert('Gemini API Key 是必填项');
            return;
        }
        saveAllKeys(keys);
        onSaved();
        onClose();
    };

    const handleClear = () => {
        if (confirm('确认清除所有 API Key？')) {
            clearAllKeys();
            setKeys({ gemini: '', geminiEndpoint: '', geminiTextModel: '', geminiImageModel: '', fal: '', googleDriveApiKey: '', googleDriveClientId: '' });
            onSaved();
        }
    };

    const inputClass =
        'w-full px-3 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500/30 transition-colors font-mono';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
                    <h2 className="text-lg font-bold text-white tracking-tight">🔑 API Key 管理</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white text-xl transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
                    {/* Toggle visibility */}
                    <button
                        onClick={() => setShowKeys(!showKeys)}
                        className="text-xs text-slate-400 hover:text-lime-400 transition-colors"
                    >
                        {showKeys ? '🙈 隐藏密钥' : '👁️ 显示密钥'}
                    </button>

                    {/* Gemini — Required */}
                    <div>
                        <label className="block text-sm font-semibold text-lime-400 mb-1.5">
                            Gemini API Key <span className="text-red-400">*必填</span>
                        </label>
                        <p className="text-xs text-slate-500 mb-2">
                            用于图片生成和文本分析。从{' '}
                            <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="underline text-slate-400 hover:text-lime-400">
                                Google AI Studio
                            </a>{' '}获取。
                        </p>
                        <input
                            type={showKeys ? 'text' : 'password'}
                            value={keys.gemini}
                            onChange={(e) => setKeys({ ...keys, gemini: e.target.value })}
                            placeholder="sk-... 或 AIzaSy..."
                            className={inputClass}
                        />
                    </div>

                    {/* Gemini Endpoint — Optional */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                            API Endpoint <span className="text-slate-500 text-xs">选填</span>
                        </label>
                        <p className="text-xs text-slate-500 mb-2">
                            自定义代理地址。留空则使用 Google 官方 API。
                        </p>
                        <input
                            type="text"
                            value={keys.geminiEndpoint}
                            onChange={(e) => setKeys({ ...keys, geminiEndpoint: e.target.value })}
                            placeholder="http://127.0.0.1:8045 或 https://your-proxy.dev"
                            className={inputClass}
                        />
                    </div>

                    {/* Model Names — Optional */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">文本模型名称</label>
                            <input
                                type="text"
                                value={keys.geminiTextModel}
                                onChange={(e) => setKeys({ ...keys, geminiTextModel: e.target.value })}
                                placeholder="gemini-3-pro-preview"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-slate-400 mb-1">图片模型名称</label>
                            <input
                                type="text"
                                value={keys.geminiImageModel}
                                onChange={(e) => setKeys({ ...keys, geminiImageModel: e.target.value })}
                                placeholder="gemini-3-pro-image-preview"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* FAL — Optional */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-1.5">
                            FAL API Key <span className="text-slate-500 text-xs">选填</span>
                        </label>
                        <p className="text-xs text-slate-500 mb-2">
                            用于视频生成（Kling Video）。从{' '}
                            <a href="https://fal.ai/dashboard/keys" target="_blank" rel="noopener noreferrer" className="underline text-slate-400 hover:text-lime-400">
                                fal.ai
                            </a>{' '}获取。
                        </p>
                        <input
                            type={showKeys ? 'text' : 'password'}
                            value={keys.fal}
                            onChange={(e) => setKeys({ ...keys, fal: e.target.value })}
                            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:..."
                            className={inputClass}
                        />
                    </div>

                    {/* Google Drive — Optional */}
                    <div className="border-t border-slate-700/50 pt-4">
                        <p className="text-xs text-slate-500 mb-3 font-semibold uppercase tracking-wider">Google Drive（选填，用于导出）</p>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">API Key</label>
                                <input
                                    type={showKeys ? 'text' : 'password'}
                                    value={keys.googleDriveApiKey}
                                    onChange={(e) => setKeys({ ...keys, googleDriveApiKey: e.target.value })}
                                    placeholder="AIzaSy..."
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-400 mb-1">Client ID</label>
                                <input
                                    type={showKeys ? 'text' : 'password'}
                                    value={keys.googleDriveClientId}
                                    onChange={(e) => setKeys({ ...keys, googleDriveClientId: e.target.value })}
                                    placeholder="xxxx.apps.googleusercontent.com"
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700 bg-slate-900/50">
                    <button
                        onClick={handleClear}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                        清除所有密钥
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            取消
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-lime-600 hover:bg-lime-500 text-white font-bold text-sm rounded-lg transition-colors shadow-lg shadow-lime-900/20"
                        >
                            保存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyModal;

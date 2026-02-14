// Centralized API Key Store — reads/writes from localStorage
// All services should use this instead of process.env

const KEYS = {
    GEMINI: 'rvc_gemini_api_key',
    GEMINI_ENDPOINT: 'rvc_gemini_endpoint',
    GEMINI_TEXT_MODEL: 'rvc_gemini_text_model',
    GEMINI_IMAGE_MODEL: 'rvc_gemini_image_model',
    FAL: 'rvc_fal_api_key',
    GOOGLE_DRIVE_API_KEY: 'rvc_gdrive_api_key',
    GOOGLE_DRIVE_CLIENT_ID: 'rvc_gdrive_client_id',
} as const;

const get = (key: string): string => localStorage.getItem(key) || '';
const set = (key: string, value: string) => {
    if (value) {
        localStorage.setItem(key, value.trim());
    } else {
        localStorage.removeItem(key);
    }
};

// Gemini (required)
export const getGeminiApiKey = (): string => get(KEYS.GEMINI);
export const setGeminiApiKey = (v: string) => set(KEYS.GEMINI, v);

// Gemini Endpoint (optional — for custom proxies)
export const getGeminiEndpoint = (): string => get(KEYS.GEMINI_ENDPOINT);
export const setGeminiEndpoint = (v: string) => set(KEYS.GEMINI_ENDPOINT, v);

// Gemini Model Names (optional — override defaults)
export const getGeminiTextModel = (): string => get(KEYS.GEMINI_TEXT_MODEL) || 'gemini-3-pro-preview';
export const setGeminiTextModel = (v: string) => set(KEYS.GEMINI_TEXT_MODEL, v);
export const getGeminiImageModel = (): string => get(KEYS.GEMINI_IMAGE_MODEL) || 'gemini-3-pro-image-preview';
export const setGeminiImageModel = (v: string) => set(KEYS.GEMINI_IMAGE_MODEL, v);

// FAL (optional — for video generation)
export const getFalApiKey = (): string => get(KEYS.FAL);
export const setFalApiKey = (v: string) => set(KEYS.FAL, v);

// Google Drive (optional)
export const getGoogleDriveApiKey = (): string => get(KEYS.GOOGLE_DRIVE_API_KEY);
export const setGoogleDriveApiKey = (v: string) => set(KEYS.GOOGLE_DRIVE_API_KEY, v);
export const getGoogleDriveClientId = (): string => get(KEYS.GOOGLE_DRIVE_CLIENT_ID);
export const setGoogleDriveClientId = (v: string) => set(KEYS.GOOGLE_DRIVE_CLIENT_ID, v);

// Check if the minimum required key (Gemini) is set
export const hasRequiredKeys = (): boolean => !!getGeminiApiKey();

// Get all keys for the modal display
export const getAllKeys = () => ({
    gemini: getGeminiApiKey(),
    geminiEndpoint: getGeminiEndpoint(),
    geminiTextModel: get(KEYS.GEMINI_TEXT_MODEL),
    geminiImageModel: get(KEYS.GEMINI_IMAGE_MODEL),
    fal: getFalApiKey(),
    googleDriveApiKey: getGoogleDriveApiKey(),
    googleDriveClientId: getGoogleDriveClientId(),
});

// Save all keys at once from the modal
export const saveAllKeys = (keys: {
    gemini: string;
    geminiEndpoint: string;
    geminiTextModel: string;
    geminiImageModel: string;
    fal: string;
    googleDriveApiKey: string;
    googleDriveClientId: string;
}) => {
    setGeminiApiKey(keys.gemini);
    setGeminiEndpoint(keys.geminiEndpoint);
    setGeminiTextModel(keys.geminiTextModel);
    setGeminiImageModel(keys.geminiImageModel);
    setFalApiKey(keys.fal);
    setGoogleDriveApiKey(keys.googleDriveApiKey);
    setGoogleDriveClientId(keys.googleDriveClientId);
};

// Clear all keys
export const clearAllKeys = () => {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
};

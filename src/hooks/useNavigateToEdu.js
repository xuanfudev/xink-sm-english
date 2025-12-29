import { useCallback } from 'react';
import { encodeUrl } from '../utils/urlEncryption';

/**
 * Custom hook to handle navigation to EDU platform with proper token and fromUrl
 * @returns {Function} navigateToEdu - Function to navigate to EDU platform
 */
export function useNavigateToEdu() {
  const navigateToEdu = useCallback(() => {
    const token = localStorage.getItem('token');

    // Get EDU base URL from environment
    let eduBaseUrl = (
      import.meta.env.VITE_EDU_URL || 'http://localhost:3000'
    ).trim();
    eduBaseUrl = eduBaseUrl.replace(/\/$/, '');

    // Get current domain and encode it for fromUrl
    const currentDomain = window.location.origin;
    const encodedFromUrl = encodeUrl(currentDomain);

    // Build URL with token and encoded fromUrl
    const url = token
      ? `${eduBaseUrl}/auth/callback?token=${encodeURIComponent(
          token
        )}&fromUrl=${encodeURIComponent(encodedFromUrl)}`
      : eduBaseUrl;

    console.log('Navigating to EDU platform:', url);

    // Navigate to EDU platform
    window.location.href = url;

    return url;
  }, []);

  return navigateToEdu;
}

/**
 * Utility functions for encrypting/decrypting URLs stored in localStorage
 * Using base64 encoding with a simple transformation for basic obfuscation
 */

const SECRET_KEY = 'xink_edu_secret_2024';

/**
 * Encode a URL for storage
 */
export function encodeUrl(url) {
  try {
    // Combine URL with secret key for basic obfuscation
    const combined = `${SECRET_KEY}:${url}`;
    // Base64 encode
    const encoded = btoa(encodeURIComponent(combined));
    // Reverse the string for additional obfuscation
    return encoded.split('').reverse().join('');
  } catch (error) {
    console.error('Failed to encode URL:', error);
    return '';
  }
}

/**
 * Decode a URL from storage
 */
export function decodeUrl(encoded) {
  try {
    // Reverse the string back
    const reversed = encoded.split('').reverse().join('');
    // Base64 decode
    const decoded = decodeURIComponent(atob(reversed));
    // Extract the URL part
    const parts = decoded.split(':');
    if (parts[0] === SECRET_KEY && parts.length >= 2) {
      return parts.slice(1).join(':'); // Handle URLs with colons
    }
    return null;
  } catch (error) {
    console.error('Failed to decode URL:', error);
    return null;
  }
}

/**
 * Save fromUrl to localStorage with encryption
 */
export function saveFromUrl(url) {
  const encoded = encodeUrl(url);
  if (encoded) {
    localStorage.setItem('fromUrl', encoded);
  }
}

/**
 * Get fromUrl from localStorage with decryption
 */
export function getFromUrl() {
  const encoded = localStorage.getItem('fromUrl');
  if (!encoded) return null;
  return decodeUrl(encoded);
}

/**
 * Remove fromUrl from localStorage
 */
export function removeFromUrl() {
  localStorage.removeItem('fromUrl');
}

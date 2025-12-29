import { useEffect } from 'react';

/**
 * Component to handle logout sync from XinKEdu
 * This should be mounted at app level to always listen for logout param
 */
export default function LogoutHandler() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const logoutFlag = params.get('logout');
    
    if (logoutFlag === 'true') {
      // Clear token when coming back from XinKEdu logout
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('Logged out from XinKEdu, token cleared');
      
      // Call XinKEdu logout-sync to clear fromUrl there
      const eduBaseUrl = (import.meta.env.VITE_EDU_URL || 'http://localhost:3000').trim().replace(/\/$/, '');
      
      try {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = `${eduBaseUrl}/auth/logout-sync`;
        document.body.appendChild(iframe);
        
        // Remove iframe after clearing
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 2000);
      } catch (error) {
        console.error('Failed to sync logout with XinKEdu:', error);
      }
      
      // Remove logout param from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
      
      // Force reload to update UI state
      window.location.reload();
    }
  }, []);

  // This component doesn't render anything
  return null;
}

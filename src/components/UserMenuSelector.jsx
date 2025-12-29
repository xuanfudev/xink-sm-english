import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, ExternalLink, User, Shield, ChevronDown, Settings } from 'lucide-react';
import { useNavigateToEdu } from '../hooks/useNavigateToEdu';

export default function UserMenuSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navigateToEdu = useNavigateToEdu();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const handleNavigateToEdu = () => {
    const allowedRoles = ['admin', 'teacher', 'student', 'instructor'];
    const hasAccess = user?.role && allowedRoles.includes(user.role.toLowerCase());
    
    if (!hasAccess) {
      alert('Bạn không có quyền truy cập EDU Platform. Chỉ Admin, Teacher, Student, hoặc Instructor mới có thể truy cập.');
      return;
    }

    // Use the hook to navigate with proper token and fromUrl encoding
    navigateToEdu();
    setIsOpen(false);
  };

  const canAccessEdu = () => {
    const allowedRoles = ['admin', 'teacher', 'student', 'instructor'];
    return user?.role && allowedRoles.includes(user.role.toLowerCase());
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1 rounded-xl bg-brand-500 hover:bg-brand-400 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white font-semibold text-sm shadow-sm">
          {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
        </div>
       
        <ChevronDown 
          className={`w-4 h-4 text-white transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold truncate">
                  {user.name || user.username || 'User'}
                </h3>
                <p className="text-white/80 text-sm truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="mt-2 inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
              <Shield className="w-3 h-3" />
              {user.role || 'User'}
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* Navigate to EDU Platform */}
            <button
              onClick={handleNavigateToEdu}
              disabled={!canAccessEdu()}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                canAccessEdu()
                  ? 'hover:bg-blue-50 text-slate-700 cursor-pointer group'
                  : 'text-slate-400 cursor-not-allowed'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                canAccessEdu() ? 'bg-blue-50 group-hover:bg-blue-100' : 'bg-slate-100'
              }`}>
                <ExternalLink className="w-4 h-4" />
              </div>
              <div className="flex-1 text-left">
                  {canAccessEdu() ?
                    <div className="text-sm font-medium">
                        EDU Platform
                    </div> : ''}
              </div>
            </button>

            {/* Divider */}
            <div className="my-2 border-t border-slate-100" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100">
                <LogOut className="w-4 h-4" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-medium">Đăng xuất</div>
                <div className="text-xs opacity-75">Thoát khỏi tài khoản</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


import { useUI } from '../store/ui'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Topbar(){
  const { lang, setLang } = useUI()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="h-16 flex items-center justify-end gap-3 px-4">
      <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
        <button onClick={()=>setLang('en')} className={`px-3 py-1 rounded-full text-sm ${lang==='en'?'bg-white shadow':''}`}>EN</button>
        <button onClick={()=>setLang('vi')} className={`px-3 py-1 rounded-full text-sm ${lang==='vi'?'bg-white shadow':''}`}>VI</button>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-right hidden sm:block">
          <div className="text-sm font-medium">{user?.name || 'User Account'}</div>
          <div className="text-[12px] text-emerald-600">Free Plan</div>
        </div>
  <div className="w-9 h-9 rounded-full from-brand-300 to-brand-500 shadow-soft" >

          <img src="/icon_xinkmeet.png" alt="" className="w-full h-full object-cover" />
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          title="Đăng xuất"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

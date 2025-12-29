
import { useEffect, useState } from 'react'
import { transcripts } from '../../services/transcripts'
import { NavLink } from 'react-router-dom'
import { Search, Filter } from 'lucide-react'

function Glow(){ return <div className="absolute inset-0 -z-10 blur-3xl opacity-40 pointer-events-none">
  <div className="absolute top-10 left-20 w-72 h-72 rounded-full gradient-background-orange" />
  <div className="absolute bottom-[35rem] right-[20rem] w-56 h-56 rounded-full gradient-background-purple" />
  <div className="absolute bottom-[45.5rem] right-[45rem] w-56 h-56 rounded-full gradient-background-green" />
  <div className="absolute bottom-30 right-10 w-64 h-64 rounded-full gradient-background-1" />
</div>}

export default function AllTranscripts(){
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  useEffect(()=>{ transcripts.list().then(setItems) },[])
  return (
    <div className="p-6 relative">
      <Glow/>
      <div className="text-2xl font-semibold">All Transcripts</div>
      <div className="mt-3 flex gap-3 justify-end">
        <div className="flex items-center gap-2 bg-white border rounded-full px-3 py-1.5 w-80">
          <Search size={16} className="text-gray-400"/>
          <input className="outline-none flex-1 text-sm" placeholder="Search transcripts..." value={q} onChange={e=>setQ(e.target.value)}/>
        </div>
        <button className="flex items-center gap-2 border rounded-xl px-3 py-1.5 text-sm"><Filter size={16}/> Filter</button>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.filter(x=>(x.title+x.description).toLowerCase().includes(q.toLowerCase())).map(item=>(
          <NavLink key={item.id} to={`/home?id=${item.id}`} className="rounded-2xl border shadow-sm hover:shadow-soft transition p-4 bg-white block">
            <div className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.isLiveMeeting? 'bg-blue-100':'bg-cyan-100'}`}>{item.isLiveMeeting? '🎥':'📄'}</div>
              <div className="font-semibold">{item.title}</div>
            </div>
            <div className="mt-2 flex gap-2 text-xs">
              {item.isLiveMeeting && (
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Live Meeting</span>
              )}
              <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-600">Vietnamese</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">English</span>
            </div>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{item.description}</p>
            {item.isLiveMeeting && (
              <div className="mt-2 text-xs text-gray-500 break-all">
                <div>Meet code: <span className="font-medium">{item.meetCode||'-'}</span></div>
                {item.meetingUrl && <div>URL: {item.meetingUrl}</div>}
              </div>
            )}
            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
              <span>📅 {new Date(item.createdAt).toLocaleDateString()}</span>
              <span>🕒 {item.timeLabel}</span>
              <span>⭐ {item.highlightsCount} highlights</span>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

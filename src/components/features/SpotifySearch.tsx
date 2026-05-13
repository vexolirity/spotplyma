'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Play, Download, Heart } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Skeleton from '@/components/ui/Skeleton'
import apiClient from '@/lib/apiClient'
import toast from 'react-hot-toast'

export default function SpotifySearch({ colorGradient }: { colorGradient: string }) {
  const [query, setQuery] = useState('')
  const [tracks, setTracks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const search = async () => {
    if (!query.trim()) return toast.error('Enter song name')
    setLoading(true)
    try {
      const res = await apiClient.get(`/spotify/search?q=${encodeURIComponent(query)}`)
      setTracks(res.data)
    } catch { toast.error('Search failed') } finally { setLoading(false) }
  }

  const playTrack = async (track: any) => {
    try {
      const res = await apiClient.get(`/play?q=${encodeURIComponent(track.title + ' ' + track.artist)}`)
      if (res.data?.data?.url) {
        const audio = new Audio(res.data.data.url)
        audio.play()
        toast.success(`Playing: ${track.title}`)
      } else toast.error('No playable version')
    } catch { toast.error('Play failed') }
  }

  const downloadTrack = async (track: any) => {
    toast.loading('Preparing download...', { id: 'dl' })
    try {
      const res = await apiClient.get(`/spotify/download?q=${encodeURIComponent(track.title + ' ' + track.artist)}`)
      if (res.data?.data?.url) {
        const link = document.createElement('a')
        link.href = res.data.data.url
        link.download = `${track.title}.mp3`
        link.click()
        toast.success('Download started', { id: 'dl' })
      } else toast.error('Download not available', { id: 'dl' })
    } catch { toast.error('Download failed', { id: 'dl' }) }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3"><Input placeholder="Search Spotify..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && search()} /><Button onClick={search} loading={loading} className={`bg-gradient-to-r ${colorGradient}`}><Search className="w-4 h-4 mr-2" />Search</Button></div>
      {loading && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tracks.map((track) => (
          <div key={track.id} className="glassmorphism p-4 flex gap-4 items-center">
            <img src={track.thumbnail} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1"><h3 className="font-semibold">{track.title}</h3><p className="text-sm text-gray-400">{track.artist}</p><p className="text-xs text-gray-500">{track.duration} • {track.popularity}</p></div>
            <div className="flex gap-2">
              <button onClick={() => playTrack(track)} className="p-2 rounded-lg bg-cyan-500/20"><Play className="w-4 h-4" /></button>
              <button onClick={() => downloadTrack(track)} className="p-2 rounded-lg bg-white/10"><Download className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

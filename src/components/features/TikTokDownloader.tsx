'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Video, Music, LinkIcon } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import apiClient from '@/lib/apiClient'
import toast from 'react-hot-toast'

export default function TikTokDownloader({ colorGradient }: { colorGradient: string }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [format, setFormat] = useState<'mp4' | 'mp3'>('mp4')

  const fetchVideo = async () => {
    if (!url.trim()) return toast.error('Enter TikTok URL')
    setLoading(true)
    try {
      const res = await apiClient.get(`/tiktok?url=${encodeURIComponent(url)}`)
      setData(res.data.data)
    } catch { toast.error('Failed to load') } finally { setLoading(false) }
  }

  const download = async () => {
    if (!data) return
    let downloadUrl = format === 'mp4' ? (data.videoWM || data.video) : data.audio
    if (format === 'mp3' && !downloadUrl) {
      toast.loading('Converting to MP3...', { id: 'conv' })
      try { const res = await apiClient.post('/tiktok/audio', { videoUrl: data.video }); downloadUrl = res.data.url } catch { toast.error('MP3 conversion failed', { id: 'conv' }); return }
    }
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = `tiktok_${data.id}.${format}`
    link.click()
    toast.success(`Downloading ${format.toUpperCase()}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3"><Input placeholder="Paste TikTok URL..." value={url} onChange={(e) => setUrl(e.target.value)} icon={<LinkIcon className="w-4 h-4" />} /><Button onClick={fetchVideo} loading={loading} className={`bg-gradient-to-r ${colorGradient}`}>Load</Button></div>
      {data && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glassmorphism p-6"><div className="flex flex-col md:flex-row gap-6"><video src={data.videoWM || data.video} controls className="w-full md:w-1/2 rounded-xl" /><div className="flex-1"><div className="flex items-center gap-3"><img src={data.author.avatarLarger} className="w-12 h-12 rounded-full" /><div><p className="font-bold">{data.author.nickname}</p><p className="text-sm text-gray-400">@{data.author.uniqueId}</p></div></div><p className="mt-3 text-gray-300 line-clamp-3">{data.caption}</p><div className="mt-4 flex gap-3"><button onClick={() => setFormat('mp4')} className={`px-4 py-2 rounded-full ${format === 'mp4' ? 'bg-cyan-500' : 'bg-white/10'}`}><Video className="w-4 h-4 inline mr-2" />MP4</button><button onClick={() => setFormat('mp3')} className={`px-4 py-2 rounded-full ${format === 'mp3' ? 'bg-cyan-500' : 'bg-white/10'}`}><Music className="w-4 h-4 inline mr-2" />MP3</button></div><Button onClick={download} className="mt-4 w-full"><Download className="w-4 h-4 mr-2" />Download {format.toUpperCase()}</Button></div></div></motion.div>}
    </div>
  )
}
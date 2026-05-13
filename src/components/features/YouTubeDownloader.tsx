'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Video, Music, Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import apiClient from '@/lib/apiClient'
import toast from 'react-hot-toast'

export default function YouTubeDownloader({ colorGradient }: { colorGradient: string }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<'audio' | 'video'>('audio')
  const [quality, setQuality] = useState('128kbps')
  const [result, setResult] = useState<any>(null)

  const process = async () => {
    if (!url.trim()) return toast.error('Enter URL or query')
    setLoading(true)
    try {
      const res = await apiClient.get(`/youtube?url=${encodeURIComponent(url)}&type=${type}&quality=${quality}`)
      setResult(res.data)
    } catch { toast.error('Processing failed') } finally { setLoading(false) }
  }

  const download = () => {
    if (result?.data?.url) {
      const link = document.createElement('a')
      link.href = result.data.url
      link.download = result.data.filename
      link.click()
      toast.success('Download started')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3"><Input placeholder="YouTube URL or search..." value={url} onChange={(e) => setUrl(e.target.value)} icon={<Search className="w-4 h-4" />} /><Button onClick={process} loading={loading} className={`bg-gradient-to-r ${colorGradient}`}>Process</Button></div>
      <div className="flex gap-4 justify-center"><button onClick={() => setType('audio')} className={`px-6 py-2 rounded-full ${type === 'audio' ? 'bg-green-500' : 'bg-white/10'}`}><Music className="w-4 h-4 inline mr-2" />MP3</button><button onClick={() => setType('video')} className={`px-6 py-2 rounded-full ${type === 'video' ? 'bg-red-500' : 'bg-white/10'}`}><Video className="w-4 h-4 inline mr-2" />MP4</button></div>
      <div className="flex gap-3 justify-center">{type === 'audio' ? ['128kbps','192kbps','320kbps'].map(q => <button key={q} onClick={() => setQuality(q)} className={`px-3 py-1 rounded-lg ${quality === q ? 'bg-cyan-500' : 'bg-white/10'}`}>{q}</button>) : ['720p','480p','360p'].map(q => <button key={q} onClick={() => setQuality(q)} className={`px-3 py-1 rounded-lg ${quality === q ? 'bg-cyan-500' : 'bg-white/10'}`}>{q}</button>)}</div>
      {result && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glassmorphism p-6 flex flex-col md:flex-row gap-6"><img src={result.thumbnail} className="w-48 rounded-xl" /><div><h3 className="text-xl font-bold">{result.title}</h3><p className="text-gray-400">{result.channel}</p><p>{result.duration} • {result.views}</p><p className="text-sm">Size: {result.data.size} • Quality: {result.data.quality}</p><Button onClick={download} className="mt-4"><Download className="w-4 h-4 mr-2" />Download {type === 'audio' ? 'MP3' : 'MP4'}</Button></div></motion.div>}
    </div>
  )
}

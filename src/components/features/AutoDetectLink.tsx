'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link2, Download, ExternalLink } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import apiClient from '@/lib/apiClient'
import toast from 'react-hot-toast'

export default function AutoDetectLink({ colorGradient }: { colorGradient: string }) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const detect = async () => {
    if (!url.trim()) return toast.error('Enter URL')
    setLoading(true)
    try {
      const res = await apiClient.get(`/aio?url=${encodeURIComponent(url)}`)
      setResult(res.data)
      toast.success('Link detected')
    } catch { toast.error('Detection failed') } finally { setLoading(false) }
  }

  const download = () => {
    if (result?.data?.url || result?.video) {
      const link = document.createElement('a')
      link.href = result.data?.url || result.video
      link.download = 'media'
      link.click()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <Input placeholder="Paste any link..." value={url} onChange={(e) => setUrl(e.target.value)} icon={<Link2 className="w-4 h-4" />} />
        <Button onClick={detect} loading={loading} className={`bg-gradient-to-r ${colorGradient}`}>Detect</Button>
      </div>
      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glassmorphism p-6">
          <h3 className="text-lg font-semibold">Detected Media</h3>
          <p className="mt-2">{result.caption || result.title || 'Content'}</p>
          <div className="flex gap-3 mt-4">
            <Button onClick={download}><Download className="w-4 h-4 mr-2" />Download</Button>
            <Button variant="outline" onClick={() => window.open(url, '_blank')}><ExternalLink className="w-4 h-4 mr-2" />Open Original</Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

'use client'
import { useEffect, useRef, useState } from 'react'
import { Play, Pause, X } from 'lucide-react'
export default function MusicPlayer({ title, artist, thumbnail, audioUrl, isPlaying, onPlayPause, onClose }: any) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  useEffect(() => { if (audioRef.current) isPlaying ? audioRef.current.play() : audioRef.current.pause() }, [isPlaying, audioUrl])
  return <div className="fixed bottom-0 left-0 right-0 glassmorphism p-4 flex items-center gap-4"><audio ref={audioRef} src={audioUrl} /><img src={thumbnail} className="w-12 h-12 rounded-lg" /><div><p className="font-semibold">{title}</p><p className="text-sm text-gray-400">{artist}</p></div><button onClick={onPlayPause} className="p-2 rounded-full bg-cyan-500">{isPlaying ? <Pause /> : <Play />}</button><button onClick={onClose}><X /></button></div>
}
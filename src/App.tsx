import './App.css'
import { useRef, useState } from 'react'
import demoUrl from './assets/demo.wav'
import { AudioEngine } from './AudioEngine/AudioEngine'
import { Button } from "@/components/ui/button"
import { AudioPlayback } from './AudioPlayback/AudioPlayback'

function App() {
  const audioEngine = useRef<AudioEngine | null>(null)
  const audioPlayback = useRef<AudioPlayback | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function getAudioEngine(): AudioEngine | null {
    const currentEngine = audioEngine.current
    if (!currentEngine) {
      const engine = new AudioEngine();
      audioEngine.current = engine
    }
    return audioEngine.current
  }

  function finishPlayback() {
    setIsPlaying(false)
    setIsLoading(false)
  }

  function getAudioPlayback(): AudioPlayback | null {
    const currentAudioPlayback = audioPlayback?.current
    const currentAudioEngine = getAudioEngine()
    if (!currentAudioPlayback && currentAudioEngine) {
      const playback = new AudioPlayback(currentAudioEngine, demoUrl, finishPlayback)
      audioPlayback.current = playback
    }
    return audioPlayback.current
  }

  async function play() {
    const playback = getAudioPlayback()
    if (playback) {
      setIsLoading(true)
      try {
        await playback.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Error with audio playback:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }
  function stop() {
    const playback = getAudioPlayback()
    if (playback) {
      playback.stop()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Hello World!</h1>
          <Button onClick={isPlaying ? stop : play} disabled={isLoading}>{isPlaying ? 'Stop' : 'Play'}</Button>
        </div>
      </div>
    </>
  )
}

export default App

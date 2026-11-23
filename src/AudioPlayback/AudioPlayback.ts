import type { AudioEngine } from "@/AudioEngine/AudioEngine";

export class AudioPlayback {
  private audioBufferSource: AudioBufferSourceNode | null = null
  private audioEngine: AudioEngine | null = null
  private sourceUrl: string | null = null

  constructor(audioEngine: AudioEngine, sourceUrl: string) {
    this.audioEngine = audioEngine
    this.sourceUrl = sourceUrl
  }

  private async loadSource(context: AudioContext | null, sourceUrl: string | null) {
    if (!context || !sourceUrl) {
      return
    }
    const sourceResponse = await fetch(sourceUrl)
    // TODO - keep this buffer in a class variable so we don't have to decode it more than once
    const audioBuffer = await context.decodeAudioData(
      await sourceResponse.arrayBuffer()
    )
    const source = context.createBufferSource()
    source.buffer = audioBuffer
    source.connect(context.destination)
    this.audioBufferSource = source

    source.onended = () => {
      if (this.audioBufferSource === source) {
        this.audioBufferSource = null
      }
    }
    source.start()
  }

  async play() {
    const context = this.audioEngine?.audioContext
    if (context) {
      await this.loadSource(context, this.sourceUrl)  
      this.audioBufferSource?.start()
    }
  }

  stop() {
    this.audioBufferSource?.stop()
  }
}
import type { AudioEngine } from "@/AudioEngine/AudioEngine";

export class AudioPlayback {
  private audioBuffer: AudioBuffer | null = null
  private audioBufferSource: AudioBufferSourceNode | null = null
  private audioEngine: AudioEngine | null = null
  private sourceUrl: string | null = null
  private onEnded: () => void | undefined

  constructor(audioEngine: AudioEngine, sourceUrl: string, onEnded: () => void | undefined) {
    this.audioEngine = audioEngine
    this.sourceUrl = sourceUrl
    this.onEnded = onEnded
  }

  private async loadSource(context: AudioContext | null, sourceUrl: string | null) {
    if (!context || !sourceUrl) {
      return
    }
    const sourceResponse = await fetch(sourceUrl)

    // decoding audio data is expensive, we only need to do it once
    if (!this.audioBuffer) {
      const buffer = await context.decodeAudioData(
        await sourceResponse.arrayBuffer()
      )
      this.audioBuffer = buffer;
    }

    const source = context.createBufferSource()
    source.buffer = this.audioBuffer
    source.connect(context.destination)
    this.audioBufferSource = source

    source.onended = () => {
      source.disconnect()

      if (this.audioBufferSource === source) {
        this.audioBufferSource = null
        this.onEnded?.()
      }
    }
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
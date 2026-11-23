export class AudioEngine {
  private _audioContext: AudioContext | null = null
  
  get audioContext(): AudioContext | null {
    return this._audioContext;
  }
    
  private initializeAudioContext() {
    this._audioContext = new AudioContext
  }

  constructor() {
    this.initializeAudioContext()
  }
}
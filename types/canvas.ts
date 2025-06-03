export interface CanvasElement {
  id: string
  type: "background" | "main-image" | "logo" | "text"
  visible: boolean
  x: number
  y: number
  width: number
  height: number
  image?: HTMLImageElement
  text?: string
  fontSize?: number
  fontFamily?: string
  color?: string
  strokeColor?: string
  strokeWidth?: number
  background?: string
  gradient?: string
}

export interface BackgroundOption {
  id: string
  name: string
  value: string
}

export interface FontOption {
  id: string
  name: string
  value: string
}

export type TabType = "background" | "image" | "logo" | "text"

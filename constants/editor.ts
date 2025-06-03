import type { BackgroundOption, FontOption } from "../types/canvas"

export const CANVAS_WIDTH = 800
export const CANVAS_HEIGHT = 800

export const BACKGROUNDS: BackgroundOption[] = [
  { id: "solid-black", name: "Preto Sólido", value: "#000000" },
  { id: "solid-white", name: "Branco Sólido", value: "#ffffff" },
  { id: "solid-red", name: "Vermelho", value: "#dc2626" },
  { id: "solid-blue", name: "Azul", value: "#2563eb" },
  { id: "solid-purple", name: "Roxo", value: "#7c3aed" },
  { id: "solid-green", name: "Verde", value: "#16a34a" },
  { id: "gradient-sunset", name: "Pôr do Sol", value: "linear-gradient(45deg, #ff6b6b, #feca57)" },
  { id: "gradient-ocean", name: "Oceano", value: "linear-gradient(45deg, #667eea, #764ba2)" },
  { id: "gradient-forest", name: "Floresta", value: "linear-gradient(45deg, #134e5e, #71b280)" },
  { id: "gradient-fire", name: "Fogo", value: "linear-gradient(45deg, #f12711, #f5af19)" },
]

export const FONTS: FontOption[] = [
  { id: "arial", name: "Arial", value: "Arial, sans-serif" },
  { id: "helvetica", name: "Helvetica", value: "Helvetica, sans-serif" },
  { id: "times", name: "Times New Roman", value: "Times New Roman, serif" },
  { id: "georgia", name: "Georgia", value: "Georgia, serif" },
  { id: "impact", name: "Impact", value: "Impact, sans-serif" },
  { id: "comic", name: "Comic Sans", value: "Comic Sans MS, cursive" },
]

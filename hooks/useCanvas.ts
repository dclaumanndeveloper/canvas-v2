"use client"

import { useCallback, useRef } from "react"
import type { CanvasElement } from "../types/canvas"

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawCanvas = useCallback((elements: CanvasElement[]) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    elements
      .filter((el) => el.visible)
      .forEach((element) => {
        ctx.save()

        switch (element.type) {
          case "background":
            if (element.gradient) {
              const gradientMatch = element.gradient.match(/linear-gradient$$(\d+)deg,\s*([^,]+),\s*([^)]+)$$/)
              if (gradientMatch) {
                const angle = Number.parseInt(gradientMatch[1])
                const color1 = gradientMatch[2].trim()
                const color2 = gradientMatch[3].trim()

                const angleRad = (angle * Math.PI) / 180
                const gradientSize = Math.max(canvas.width, canvas.height) * 1.5

                const startX = canvas.width / 2 - (Math.cos(angleRad) * gradientSize) / 2
                const startY = canvas.height / 2 - (Math.sin(angleRad) * gradientSize) / 2
                const endX = canvas.width / 2 + (Math.cos(angleRad) * gradientSize) / 2
                const endY = canvas.height / 2 + (Math.sin(angleRad) * gradientSize) / 2

                const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
                gradient.addColorStop(0, color1)
                gradient.addColorStop(1, color2)
                ctx.fillStyle = gradient
              } else {
                ctx.fillStyle = "#000000"
              }
            } else {
              ctx.fillStyle = element.background || "#000000"
            }
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            break

          case "main-image":
          case "logo":
            if (element.image) {
              ctx.drawImage(element.image, element.x, element.y, element.width, element.height)
            }
            break

          case "text":
            if (element.text) {
              ctx.font = `${element.fontSize}px ${element.fontFamily}`
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"

              if (element.strokeWidth && element.strokeWidth > 0) {
                ctx.strokeStyle = element.strokeColor || "#000000"
                ctx.lineWidth = element.strokeWidth
                ctx.strokeText(element.text, element.x + element.width / 2, element.y + element.height / 2)
              }

              ctx.fillStyle = element.color || "#ffffff"
              ctx.fillText(element.text, element.x + element.width / 2, element.y + element.height / 2)
            }
            break
        }

        ctx.restore()
      })
  }, [])

  const exportCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    try {
      const dataURL = canvas.toDataURL("image/png", 1.0)
      const link = document.createElement("a")
      link.download = "capa-musical.png"
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Erro ao exportar imagem:", error)
    }
  }, [])

  return {
    canvasRef,
    drawCanvas,
    exportCanvas,
  }
}

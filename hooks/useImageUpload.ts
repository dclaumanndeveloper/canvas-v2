"use client"

import type React from "react"

import { useCallback } from "react"
import type { CanvasElement } from "../types/canvas"
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants/editor"

export function useImageUpload(
  elements: CanvasElement[],
  updateElement: (type: string, updates: Partial<CanvasElement>) => void,
  setElements: React.Dispatch<React.SetStateAction<CanvasElement[]>>,
) {
  const handleImageUpload = useCallback(
    (type: "main-image" | "logo", event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          const aspectRatio = img.width / img.height
          let width, height, x, y

          if (type === "main-image") {
            const maxSize = 600
            if (aspectRatio > 1) {
              width = maxSize
              height = maxSize / aspectRatio
            } else {
              width = maxSize * aspectRatio
              height = maxSize
            }
            x = (CANVAS_WIDTH - width) / 2
            y = (CANVAS_HEIGHT - height) / 2 - 50
          } else {
            const maxSize = 150
            if (aspectRatio > 1) {
              width = maxSize
              height = maxSize / aspectRatio
            } else {
              width = maxSize * aspectRatio
              height = maxSize
            }
            x = CANVAS_WIDTH - width - 50
            y = 50
          }

          const existingElement = elements.find((el) => el.type === type)
          if (existingElement) {
            updateElement(type, { image: img, width, height, x, y })
          } else {
            setElements((prev) => [
              ...prev,
              {
                id: type,
                type,
                visible: true,
                x,
                y,
                width,
                height,
                image: img,
              },
            ])
          }
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    },
    [elements, updateElement, setElements],
  )

  return { handleImageUpload }
}

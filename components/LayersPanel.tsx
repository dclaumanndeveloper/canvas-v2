"use client"

import { Button } from "@/components/ui/button"
import { Layers, Palette, ImageIcon, Upload, Type } from "lucide-react"
import type { CanvasElement } from "../types/canvas"

interface LayersPanelProps {
  elements: CanvasElement[]
  onToggleVisibility: (type: string) => void
}

export function LayersPanel({ elements, onToggleVisibility }: LayersPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "background":
        return Palette
      case "main-image":
        return ImageIcon
      case "logo":
        return Upload
      case "text":
        return Type
      default:
        return Layers
    }
  }

  const getDisplayName = (type: string) => {
    switch (type) {
      case "main-image":
        return "Imagem"
      case "background":
        return "Fundo"
      default:
        return type
    }
  }

  return (
    <div className="w-64 bg-white border-l border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Camadas</h3>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {elements.map((element) => {
          const Icon = getIcon(element.type)
          return (
            <div
              key={element.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                element.visible ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium capitalize">{getDisplayName(element.type)}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0"
                onClick={() => onToggleVisibility(element.type)}
              >
                {element.visible ? "👁️" : "🙈"}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ImageIcon } from "lucide-react"
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants/editor"
import type { CanvasElement } from "../types/canvas"

interface ImagePanelProps {
  imageElement?: CanvasElement
  onImageUpload: () => void
  onImageUpdate: (updates: Partial<CanvasElement>) => void
}

export function ImagePanel({ imageElement, onImageUpload, onImageUpdate }: ImagePanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-700">Imagem Principal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={onImageUpload}
          className="w-full h-20 border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center gap-2"
          variant="outline"
        >
          <ImageIcon className="w-6 h-6 text-gray-400" />
          <span className="text-sm text-gray-600">{imageElement ? "Trocar Imagem" : "Carregar Imagem"}</span>
        </Button>

        {imageElement && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Posição X</Label>
                <Slider
                  value={[imageElement.x]}
                  onValueChange={([value]) => onImageUpdate({ x: value })}
                  min={-200}
                  max={CANVAS_WIDTH}
                  step={1}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Posição Y</Label>
                <Slider
                  value={[imageElement.y]}
                  onValueChange={([value]) => onImageUpdate({ y: value })}
                  min={-200}
                  max={CANVAS_HEIGHT}
                  step={1}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Tamanho</Label>
              <Slider
                value={[imageElement.width]}
                onValueChange={([value]) => {
                  const aspectRatio = imageElement.height / imageElement.width
                  onImageUpdate({ width: value, height: value * aspectRatio })
                }}
                min={100}
                max={800}
                step={10}
                className="mt-1"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

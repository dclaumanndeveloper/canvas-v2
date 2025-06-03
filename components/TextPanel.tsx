"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FONTS, CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants/editor"
import type { CanvasElement } from "../types/canvas"

interface TextPanelProps {
  textElement?: CanvasElement
  onTextUpdate: (updates: Partial<CanvasElement>) => void
}

export function TextPanel({ textElement, onTextUpdate }: TextPanelProps) {
  if (!textElement) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-700">Texto da Capa</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-xs">Texto</Label>
          <Textarea
            value={textElement.text || ""}
            onChange={(e) => onTextUpdate({ text: e.target.value })}
            placeholder="Nome da música, artista..."
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label className="text-xs">Fonte</Label>
          <Select value={textElement.fontFamily} onValueChange={(value) => onTextUpdate({ fontFamily: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONTS.map((font) => (
                <SelectItem key={font.id} value={font.value}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-xs">Tamanho: {textElement.fontSize}px</Label>
          <Slider
            value={[textElement.fontSize || 48]}
            onValueChange={([value]) => onTextUpdate({ fontSize: value })}
            min={20}
            max={100}
            step={2}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Cor do Texto</Label>
            <Input
              type="color"
              value={textElement.color || "#ffffff"}
              onChange={(e) => onTextUpdate({ color: e.target.value })}
              className="mt-1 h-10"
            />
          </div>
          <div>
            <Label className="text-xs">Cor do Contorno</Label>
            <Input
              type="color"
              value={textElement.strokeColor || "#000000"}
              onChange={(e) => onTextUpdate({ strokeColor: e.target.value })}
              className="mt-1 h-10"
            />
          </div>
        </div>

        <div>
          <Label className="text-xs">Espessura do Contorno: {textElement.strokeWidth}px</Label>
          <Slider
            value={[textElement.strokeWidth || 2]}
            onValueChange={([value]) => onTextUpdate({ strokeWidth: value })}
            min={0}
            max={10}
            step={1}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Posição X</Label>
            <Slider
              value={[textElement.x]}
              onValueChange={([value]) => onTextUpdate({ x: value })}
              min={0}
              max={CANVAS_WIDTH - textElement.width}
              step={5}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">Posição Y</Label>
            <Slider
              value={[textElement.y]}
              onValueChange={([value]) => onTextUpdate({ y: value })}
              min={0}
              max={CANVAS_HEIGHT - textElement.height}
              step={5}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

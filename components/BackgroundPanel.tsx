"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BACKGROUNDS } from "../constants/editor"
import type { CanvasElement, BackgroundOption } from "../types/canvas"

interface BackgroundPanelProps {
  backgroundElement?: CanvasElement
  onBackgroundChange: (bg: BackgroundOption) => void
  onCustomColorChange: (color: string) => void
}

export function BackgroundPanel({ backgroundElement, onBackgroundChange, onCustomColorChange }: BackgroundPanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-gray-700">Escolher Fundo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {BACKGROUNDS.map((bg) => (
            <Button
              key={bg.id}
              variant="outline"
              className="h-16 p-2 flex flex-col items-center gap-1"
              onClick={() => onBackgroundChange(bg)}
            >
              <div
                className="w-8 h-6 rounded border"
                style={{
                  background: bg.value,
                }}
              />
              <span className="text-xs">{bg.name}</span>
            </Button>
          ))}
        </div>

        <div className="mt-4">
          <Label className="text-xs">Cor Personalizada</Label>
          <div className="flex items-center gap-2 mt-1">
            <Input
              type="color"
              value={backgroundElement?.background || "#000000"}
              onChange={(e) => onCustomColorChange(e.target.value)}
              className="w-12 h-10 p-1"
            />
            <span className="text-sm text-gray-500">
              {backgroundElement?.background || backgroundElement?.gradient?.substring(0, 20) + "..."}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

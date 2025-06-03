"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, Music } from "lucide-react"

import type { CanvasElement, TabType, BackgroundOption } from "./types/canvas"
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants/editor"
import { useCanvas } from "./hooks/useCanvas"
import { useImageUpload } from "./hooks/useImageUpload"

import { TabNavigation } from "./components/TabNavigation"
import { BackgroundPanel } from "./components/BackgroundPanel"
import { ImagePanel } from "./components/ImagePanel"
import { TextPanel } from "./components/TextPanel"
import { LayersPanel } from "./components/LayersPanel"

export default function CanvasEditor() {
  const [elements, setElements] = useState<CanvasElement[]>([
    {
      id: "background",
      type: "background",
      visible: true,
      x: 0,
      y: 0,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      background: "#000000",
    },
    {
      id: "text",
      type: "text",
      visible: true,
      x: 50,
      y: 650,
      width: 700,
      height: 100,
      text: "NOME DA MÚSICA",
      fontSize: 48,
      fontFamily: "Impact, sans-serif",
      color: "#ffffff",
      strokeColor: "#000000",
      strokeWidth: 2,
    },
  ])

  const [activeTab, setActiveTab] = useState<TabType>("background")
  const mainImageInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const { canvasRef, drawCanvas, exportCanvas } = useCanvas()

  const updateElement = useCallback((type: string, updates: Partial<CanvasElement>) => {
    setElements((prev) => prev.map((el) => (el.type === type ? { ...el, ...updates } : el)))
  }, [])

  const { handleImageUpload } = useImageUpload(elements, updateElement, setElements)

  const backgroundElement = elements.find((el) => el.type === "background")
  const mainImageElement = elements.find((el) => el.type === "main-image")
  const logoElement = elements.find((el) => el.type === "logo")
  const textElement = elements.find((el) => el.type === "text")

  useEffect(() => {
    drawCanvas(elements)
  }, [elements, drawCanvas])

  const handleBackgroundChange = useCallback(
    (bg: BackgroundOption) => {
      if (bg.value.startsWith("linear-gradient")) {
        updateElement("background", { gradient: bg.value, background: undefined })
      } else {
        updateElement("background", { background: bg.value, gradient: undefined })
      }
    },
    [updateElement],
  )

  const handleCustomColorChange = useCallback(
    (color: string) => {
      updateElement("background", { background: color, gradient: undefined })
    },
    [updateElement],
  )

  const handleToggleVisibility = useCallback(
    (type: string) => {
      updateElement(type, { visible: !elements.find((el) => el.type === type)?.visible })
    },
    [elements, updateElement],
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Music className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Editor de Capas</h1>
          </div>
        </div>

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {activeTab === "background" && (
            <BackgroundPanel
              backgroundElement={backgroundElement}
              onBackgroundChange={handleBackgroundChange}
              onCustomColorChange={handleCustomColorChange}
            />
          )}

          {activeTab === "image" && (
            <>
              <ImagePanel
                imageElement={mainImageElement}
                onImageUpload={() => mainImageInputRef.current?.click()}
                onImageUpdate={(updates) => updateElement("main-image", updates)}
              />
              <input
                ref={mainImageInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload("main-image", e)}
                className="hidden"
              />
            </>
          )}

          {activeTab === "logo" && (
            <>
              <ImagePanel
                imageElement={logoElement}
                onImageUpload={() => logoInputRef.current?.click()}
                onImageUpdate={(updates) => updateElement("logo", updates)}
              />
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload("logo", e)}
                className="hidden"
              />
            </>
          )}

          {activeTab === "text" && (
            <TextPanel textElement={textElement} onTextUpdate={(updates) => updateElement("text", updates)} />
          )}
        </div>

        <div className="p-6 border-t border-gray-100">
          <Button
            onClick={exportCanvas}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Baixar Capa (PNG)
          </Button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-medium text-gray-900">Preview da Capa</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>800 × 800px</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Formato Quadrado</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 flex items-center justify-center bg-gray-100">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="border border-gray-200 rounded"
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar - Layers */}
      <LayersPanel elements={elements} onToggleVisibility={handleToggleVisibility} />
    </div>
  )
}

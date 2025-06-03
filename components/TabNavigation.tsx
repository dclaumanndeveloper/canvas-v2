"use client"

import { Button } from "@/components/ui/button"
import { Palette, ImageIcon, Upload, Type } from "lucide-react"
import type { TabType } from "../types/canvas"

interface TabNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: "background" as const, label: "Fundo", icon: Palette },
    { id: "image" as const, label: "Imagem", icon: ImageIcon },
    { id: "logo" as const, label: "Logo", icon: Upload },
    { id: "text" as const, label: "Texto", icon: Type },
  ]

  return (
    <div className="p-4 border-b border-gray-100">
      <div className="grid grid-cols-2 gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

export default function CursorLight() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  if (typeof window === "undefined") return null

  return (
    <div
      className={`fixed pointer-events-none z-50 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-30 blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-30" : "opacity-0"
      }`}
      style={{
        left: `${position.x - 16}px`,
        top: `${position.y - 16}px`,
        transform: "translate(-50%, -50%)",
      }}
    />
  )
}

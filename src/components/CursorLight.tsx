import { useEffect, useRef } from 'react'

interface CursorLightProps {
  radius?: number
  intensity?: number
}

export default function CursorLight({
  radius = 150,
  intensity = 0.25,
}: CursorLightProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const targetPosRef = useRef({ x: 0, y: 0 })
  const currentPosRef = useRef({ x: 0, y: 0 })

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Animate cursor light
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Watch for theme changes
    const themeObserver = new MutationObserver(() => {
      // Theme changed, will adapt on next render
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    // Easing function for smooth movement
    const easeOutQuad = (t: number): number => {
      return t * (2 - t)
    }

    const render = (): void => {
      const isDark = document.documentElement.classList.contains('dark')

      // Smooth interpolation between current and target position
      const dx = targetPosRef.current.x - currentPosRef.current.x
      const dy = targetPosRef.current.y - currentPosRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 0.1) {
        // Use easing for smooth follow effect
        const easingFactor = easeOutQuad(Math.min(1, distance / 100)) * 0.1
        currentPosRef.current.x += dx * easingFactor
        currentPosRef.current.y += dy * easingFactor
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Only draw if mouse has moved
      if (currentPosRef.current.x > 0 || currentPosRef.current.y > 0) {
        // Create radial gradient for light effect
        const gradient = ctx.createRadialGradient(
          currentPosRef.current.x,
          currentPosRef.current.y,
          0,
          currentPosRef.current.x,
          currentPosRef.current.y,
          radius
        )

        // Theme-aware colors
        const baseOpacity = intensity * (isDark ? 1 : 0.6)
        
        if (isDark) {
          // Dark mode: subtle blue/cyan glow
          gradient.addColorStop(0, `rgba(14, 165, 233, ${baseOpacity * 0.8})`) // primary-500
          gradient.addColorStop(0.3, `rgba(14, 165, 233, ${baseOpacity * 0.4})`)
          gradient.addColorStop(0.6, `rgba(14, 165, 233, ${baseOpacity * 0.1})`)
          gradient.addColorStop(1, 'rgba(14, 165, 233, 0)')
        } else {
          // Light mode: subtle blue glow
          gradient.addColorStop(0, `rgba(2, 132, 199, ${baseOpacity * 0.6})`) // primary-600
          gradient.addColorStop(0.3, `rgba(2, 132, 199, ${baseOpacity * 0.3})`)
          gradient.addColorStop(0.6, `rgba(2, 132, 199, ${baseOpacity * 0.1})`)
          gradient.addColorStop(1, 'rgba(2, 132, 199, 0)')
        }

        // Draw the light circle
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(currentPosRef.current.x, currentPosRef.current.y, radius, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle inner glow
        const innerGradient = ctx.createRadialGradient(
          currentPosRef.current.x,
          currentPosRef.current.y,
          0,
          currentPosRef.current.x,
          currentPosRef.current.y,
          radius * 0.3
        )

        const innerOpacity = baseOpacity * 0.5
        if (isDark) {
          innerGradient.addColorStop(0, `rgba(56, 189, 248, ${innerOpacity})`) // primary-400
          innerGradient.addColorStop(1, 'rgba(56, 189, 248, 0)')
        } else {
          innerGradient.addColorStop(0, `rgba(14, 165, 233, ${innerOpacity})`) // primary-500
          innerGradient.addColorStop(1, 'rgba(14, 165, 233, 0)')
        }

        ctx.fillStyle = innerGradient
        ctx.beginPath()
        ctx.arc(currentPosRef.current.x, currentPosRef.current.y, radius * 0.3, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameRef.current = requestAnimationFrame(render)
    }

    // Start animation
    animationFrameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      themeObserver.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [radius, intensity])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      aria-hidden="true"
    />
  )
}


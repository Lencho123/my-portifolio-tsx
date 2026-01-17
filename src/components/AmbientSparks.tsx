import { useEffect, useRef } from 'react'

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
  hue: number
}

interface AmbientSparksProps {
  count?: number
  speed?: number
  size?: { min: number; max: number }
}

export default function AmbientSparks({
  count = 30,
  speed = 0.3,
  size = { min: 1, max: 3 },
}: AmbientSparksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparksRef = useRef<Spark[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef<number>(0)

  // Initialize sparks
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
      // Theme changed, sparks will adapt on next render
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    // Initialize sparks with random positions and velocities
    const initSparks = (): Spark[] => {
      const newSparks: Spark[] = []
      for (let i = 0; i < count; i++) {
        const life = Math.random() * 10000 + 5000 // 5-15 seconds
        newSparks.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed * 0.5,
          vy: (Math.random() - 0.5) * speed * 0.5,
          size: Math.random() * (size.max - size.min) + size.min,
          opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6 opacity
          life: Math.random() * life,
          maxLife: life,
          hue: Math.random() * 60 + 180, // Blue-cyan range (180-240)
        })
      }
      return newSparks
    }

    sparksRef.current = initSparks()

    // Physics-based easing functions
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3)
    }

    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    }

    // Update spark physics
    const updateSpark = (spark: Spark, deltaTime: number): void => {
      // Apply gentle acceleration/deceleration for natural motion (air resistance)
      const friction = 0.9995
      spark.vx *= friction
      spark.vy *= friction

      // Add subtle random acceleration (wind-like effect) with easing
      const windStrength = 0.00002
      const windX = (Math.random() - 0.5) * windStrength
      const windY = (Math.random() - 0.5) * windStrength
      
      // Apply easing to wind forces for smoother transitions
      const windEasing = easeInOutQuad(Math.random())
      spark.vx += windX * deltaTime * windEasing
      spark.vy += windY * deltaTime * windEasing

      // Clamp velocity to prevent excessive speed
      const maxVel = speed * 2
      spark.vx = Math.max(-maxVel, Math.min(maxVel, spark.vx))
      spark.vy = Math.max(-maxVel, Math.min(maxVel, spark.vy))

      // Update position with velocity-based movement
      // Use easing for smoother position updates
      const velocityEasing = easeOutCubic(Math.min(1, Math.abs(spark.vx + spark.vy) / speed))
      spark.x += spark.vx * deltaTime * (0.8 + velocityEasing * 0.2)
      spark.y += spark.vy * deltaTime * (0.8 + velocityEasing * 0.2)

      // Boundary wrapping with smooth transition
      if (spark.x < 0) {
        spark.x = canvas.width
      } else if (spark.x > canvas.width) {
        spark.x = 0
      }
      if (spark.y < 0) {
        spark.y = canvas.height
      } else if (spark.y > canvas.height) {
        spark.y = 0
      }

      // Update life cycle
      spark.life += deltaTime
      if (spark.life >= spark.maxLife) {
        // Reset spark to new random position
        spark.x = Math.random() * canvas.width
        spark.y = Math.random() * canvas.height
        spark.vx = (Math.random() - 0.5) * speed * 0.5
        spark.vy = (Math.random() - 0.5) * speed * 0.5
        spark.life = 0
        spark.opacity = Math.random() * 0.4 + 0.2
      }

      // Subtle opacity pulsing based on life cycle
      const lifeProgress = (spark.life % spark.maxLife) / spark.maxLife
      const pulse = Math.sin(lifeProgress * Math.PI * 2) * 0.1 + 0.9
      spark.opacity = (Math.random() * 0.4 + 0.2) * pulse
    }

      // Render sparks
    const render = (currentTime: number): void => {
      const deltaTime = currentTime - lastTimeRef.current || 16.67 // ~60fps default
      lastTimeRef.current = currentTime

      const isDark = document.documentElement.classList.contains('dark')
      
      // Update blend mode based on theme
      if (canvas.style.mixBlendMode !== (isDark ? 'screen' : 'multiply')) {
        canvas.style.mixBlendMode = isDark ? 'screen' : 'multiply'
      }
      
      // Clear canvas with theme-aware fade for trail effect
      ctx.fillStyle = isDark 
        ? 'rgba(0, 0, 0, 0.1)' 
        : 'rgba(255, 255, 255, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw each spark
      sparksRef.current.forEach((spark) => {
        updateSpark(spark, deltaTime)

        // Draw spark with gradient for glow effect
        const gradient = ctx.createRadialGradient(
          spark.x,
          spark.y,
          0,
          spark.x,
          spark.y,
          spark.size * 2
        )

        // Use theme-aware colors (subtle blue/cyan)
        const baseColor = isDark
          ? `hsla(${spark.hue}, 70%, 70%, ${spark.opacity})`
          : `hsla(${spark.hue + 20}, 60%, 40%, ${spark.opacity * 0.5})`

        gradient.addColorStop(0, baseColor)
        gradient.addColorStop(0.5, baseColor.replace(/[\d.]+\)$/, '0.3)'))
        gradient.addColorStop(1, baseColor.replace(/[\d.]+\)$/, '0)'))

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle glow trail
        if (Math.random() > 0.7) {
          ctx.fillStyle = baseColor.replace(/[\d.]+\)$/, '0.1)')
          ctx.beginPath()
          ctx.arc(spark.x - spark.vx * 5, spark.y - spark.vy * 5, spark.size * 0.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

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
  }, [count, speed, size.min, size.max])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}


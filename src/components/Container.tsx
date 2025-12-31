import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export default function Container({ 
  children, 
  className = '', 
  size = 'full' 
}: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-container-sm',
    md: 'max-w-container-md',
    lg: 'max-w-container-lg',
    xl: 'max-w-container-xl',
    full: 'max-w-container',
  }

  return (
    <div 
      className={`
        w-full mx-auto px-4 sm:px-6 lg:px-8
        ${sizeClasses[size]}
        ${className}
      `}
      style={{ maxWidth: '100%' }}
    >
      {children}
    </div>
  )
}


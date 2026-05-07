interface AvatarProps {
  src: string
  name: string
  size?: 'sm' | 'md' | 'lg'
}

export function Avatar({ src, name, size = 'md' }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden flex-center bg-primary text-white font-sans font-bold flex-shrink-0`}
    >
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
        }}
      />
      <span className="hidden first:inline">{initials}</span>
    </div>
  )
}

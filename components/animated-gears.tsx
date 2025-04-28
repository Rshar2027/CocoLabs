interface AnimatedGearsProps {
  className?: string
  color?: string
  density?: "low" | "medium" | "high"
  speed?: "slow" | "medium" | "fast"
}

export function AnimatedGears({
  className = "",
  color = "currentColor",
  density = "medium",
  speed = "medium",
}: AnimatedGearsProps) {
  // Determine number of gears based on density
  const gearCount = density === "low" ? 5 : density === "medium" ? 10 : 15

  // Determine animation duration multiplier based on speed
  const speedMultiplier = speed === "slow" ? 1.5 : speed === "medium" ? 1 : 0.5

  // Generate random positions and sizes for gears
  const gears = Array.from({ length: gearCount }, (_, i) => {
    const size = Math.floor(Math.random() * 100) + 50 // Random size between 50px and 150px
    const top = Math.floor(Math.random() * 100) // Random top position (0-100%)
    const left = Math.floor(Math.random() * 100) // Random left position (0-100%)
    const rotationDirection = i % 2 === 0 ? "clockwise" : "counterclockwise"
    const animationDuration = (Math.floor(Math.random() * 20) + 20) * speedMultiplier // Random duration between 20-40s
    const zIndex = Math.floor(Math.random() * 3) - 1 // Random z-index between -1 and 1

    return { size, top, left, rotationDirection, animationDuration, zIndex }
  })

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {gears.map((gear, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: `${gear.top}%`,
            left: `${gear.left}%`,
            width: `${gear.size}px`,
            height: `${gear.size}px`,
            zIndex: gear.zIndex,
            animation: `${gear.rotationDirection === "clockwise" ? "spin" : "spin-reverse"} ${
              gear.animationDuration
            }s linear infinite`,
            opacity: 0.05,
          }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={color} className="w-full h-full">
            <path d="M50 10c-1.7 0-3-1.3-3-3V3c0-1.7 1.3-3 3-3s3 1.3 3 3v4c0 1.7-1.3 3-3 3zm-17.6 4.1c-1.2-1.2-1.2-3.1 0-4.2l2.8-2.8c1.2-1.2 3.1-1.2 4.2 0 1.2 1.2 1.2 3.1 0 4.2l-2.8 2.8c-1.2 1.2-3 1.2-4.2 0zm35.3 0c-1.2 1.2-3.1 1.2-4.2 0l-2.8-2.8c-1.2-1.2-1.2-3.1 0-4.2 1.2-1.2 3.1-1.2 4.2 0l2.8 2.8c1.2 1.2 1.2 3 0 4.2zM30 50c0-1.7 1.3-3 3-3h4c1.7 0 3 1.3 3 3s-1.3 3-3 3h-4c-1.7 0-3-1.3-3-3zm30 0c0 1.7-1.3 3-3 3h-4c-1.7 0-3-1.3-3-3s1.3-3 3-3h4c1.7 0 3 1.3 3 3zm-4.1 17.6c-1.2 1.2-3.1 1.2-4.2 0l-2.8-2.8c-1.2-1.2-1.2-3.1 0-4.2 1.2-1.2 3.1-1.2 4.2 0l2.8 2.8c1.2 1.2 1.2 3 0 4.2zm-15.8 0c-1.2-1.2-1.2-3.1 0-4.2l2.8-2.8c1.2-1.2 3.1-1.2 4.2 0 1.2 1.2 1.2 3.1 0 4.2l-2.8 2.8c-1.2 1.2-3 1.2-4.2 0zM50 80c-1.7 0-3-1.3-3-3v-4c0-1.7 1.3-3 3-3s3 1.3 3 3v4c0 1.7-1.3 3-3 3z" />
            <circle cx="50" cy="50" r="20" />
            <circle cx="50" cy="50" r="10" fill="none" stroke={color} strokeWidth="4" />
          </svg>
        </div>
      ))}
    </div>
  )
}

export function LargeGear({ className = "", color = "currentColor", rotate = 0 }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill={color}
    >
      <path d="M100 20c-3.4 0-6-2.6-6-6V6c0-3.4 2.6-6 6-6s6 2.6 6 6v8c0 3.4-2.6 6-6 6zm-35.2 8.2c-2.4-2.4-2.4-6.2 0-8.5l5.6-5.6c2.4-2.4 6.2-2.4 8.5 0 2.4 2.4 2.4 6.2 0 8.5l-5.6 5.6c-2.4 2.4-6.1 2.4-8.5 0zm70.5 0c-2.4 2.4-6.2 2.4-8.5 0l-5.6-5.6c-2.4-2.4-2.4-6.2 0-8.5 2.4-2.4 6.2-2.4 8.5 0l5.6 5.6c2.4 2.4 2.4 6.1 0 8.5zM60 100c0-3.4 2.6-6 6-6h8c3.4 0 6 2.6 6 6s-2.6 6-6 6h-8c-3.4 0-6-2.6-6-6zm60 0c0 3.4-2.6 6-6 6h-8c-3.4 0-6-2.6-6-6s2.6-6 6-6h8c3.4 0 6 2.6 6 6zm-8.2 35.2c-2.4 2.4-6.2 2.4-8.5 0l-5.6-5.6c-2.4-2.4-2.4-6.2 0-8.5 2.4-2.4 6.2-2.4 8.5 0l5.6 5.6c2.4 2.4 2.4 6.1 0 8.5zm-31.6 0c-2.4-2.4-2.4-6.2 0-8.5l5.6-5.6c2.4-2.4 6.2-2.4 8.5 0 2.4 2.4 2.4 6.2 0 8.5l-5.6 5.6c-2.4 2.4-6.1 2.4-8.5 0zM100 160c-3.4 0-6-2.6-6-6v-8c0-3.4 2.6-6 6-6s6 2.6 6 6v8c0 3.4-2.6 6-6 6z" />
      <circle cx="100" cy="100" r="40" />
      <circle cx="100" cy="100" r="20" fill="none" stroke={color} strokeWidth="8" />
    </svg>
  )
}

export function MediumGear({ className = "", color = "currentColor", rotate = 0 }) {
  return (
    <svg
      viewBox="0 0 150 150"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill={color}
    >
      <path d="M75 15c-2.5 0-4.5-2-4.5-4.5v-6c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5v6c0 2.5-2 4.5-4.5 4.5zm-26.4 6.2c-1.8-1.8-1.8-4.7 0-6.4l4.2-4.2c1.8-1.8 4.7-1.8 6.4 0 1.8 1.8 1.8 4.7 0 6.4l-4.2 4.2c-1.8 1.8-4.6 1.8-6.4 0zm52.9 0c-1.8 1.8-4.7 1.8-6.4 0l-4.2-4.2c-1.8-1.8-1.8-4.7 0-6.4 1.8-1.8 4.7-1.8 6.4 0l4.2 4.2c1.8 1.8 1.8 4.6 0 6.4zM45 75c0-2.5 2-4.5 4.5-4.5h6c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5h-6c-2.5 0-4.5-2-4.5-4.5zm45 0c0 2.5-2 4.5-4.5 4.5h-6c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5h6c2.5 0 4.5 2 4.5 4.5zm-6.2 26.4c-1.8 1.8-4.7 1.8-6.4 0l-4.2-4.2c-1.8-1.8-1.8-4.7 0-6.4 1.8-1.8 4.7-1.8 6.4 0l4.2 4.2c1.8 1.8 1.8 4.6 0 6.4zm-23.7 0c-1.8-1.8-1.8-4.7 0-6.4l4.2-4.2c1.8-1.8 4.7-1.8 6.4 0 1.8 1.8 1.8 4.7 0 6.4l-4.2 4.2c-1.8 1.8-4.6 1.8-6.4 0zM75 120c-2.5 0-4.5-2-4.5-4.5v-6c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5v6c0 2.5-2 4.5-4.5 4.5z" />
      <circle cx="75" cy="75" r="30" />
      <circle cx="75" cy="75" r="15" fill="none" stroke={color} strokeWidth="6" />
    </svg>
  )
}

export function SmallGear({ className = "", color = "currentColor", rotate = 0 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill={color}
    >
      <path d="M50 10c-1.7 0-3-1.3-3-3V3c0-1.7 1.3-3 3-3s3 1.3 3 3v4c0 1.7-1.3 3-3 3zm-17.6 4.1c-1.2-1.2-1.2-3.1 0-4.2l2.8-2.8c1.2-1.2 3.1-1.2 4.2 0 1.2 1.2 1.2 3.1 0 4.2l-2.8 2.8c-1.2 1.2-3 1.2-4.2 0zm35.3 0c-1.2 1.2-3.1 1.2-4.2 0l-2.8-2.8c-1.2-1.2-1.2-3.1 0-4.2 1.2-1.2 3.1-1.2 4.2 0l2.8 2.8c1.2 1.2 1.2 3 0 4.2zM30 50c0-1.7 1.3-3 3-3h4c1.7 0 3 1.3 3 3s-1.3 3-3 3h-4c-1.7 0-3-1.3-3-3zm30 0c0 1.7-1.3 3-3 3h-4c-1.7 0-3-1.3-3-3s1.3-3 3-3h4c1.7 0 3 1.3 3 3zm-4.1 17.6c-1.2 1.2-3.1 1.2-4.2 0l-2.8-2.8c-1.2-1.2-1.2-3.1 0-4.2 1.2-1.2 3.1-1.2 4.2 0l2.8 2.8c1.2 1.2 1.2 3 0 4.2zm-15.8 0c-1.2-1.2-1.2-3.1 0-4.2l2.8-2.8c1.2-1.2 3.1-1.2 4.2 0 1.2 1.2 1.2 3.1 0 4.2l-2.8 2.8c-1.2 1.2-3 1.2-4.2 0zM50 80c-1.7 0-3-1.3-3-3v-4c0-1.7 1.3-3 3-3s3 1.3 3 3v4c0 1.7-1.3 3-3 3z" />
      <circle cx="50" cy="50" r="20" />
      <circle cx="50" cy="50" r="10" fill="none" stroke={color} strokeWidth="4" />
    </svg>
  )
}

export function ConnectedGears({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <LargeGear className="absolute w-32 h-32 animate-spin-slow" color="currentColor" rotate={0} />
      <MediumGear
        className="absolute w-24 h-24 animate-spin-reverse-slow"
        color="currentColor"
        rotate={0}
        style={{ top: "20px", left: "100px" }}
      />
      <SmallGear
        className="absolute w-16 h-16 animate-spin-slow"
        color="currentColor"
        rotate={0}
        style={{ top: "80px", left: "80px" }}
      />
    </div>
  )
}

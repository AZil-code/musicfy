import { useState } from "react"

export function ProgressControl() {
  const [value, setValue] = useState(0)
  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={value}
      onChange={(event) => setValue(parseFloat(event.target.value))}
    />
  )
}

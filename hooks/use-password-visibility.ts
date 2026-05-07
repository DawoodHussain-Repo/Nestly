import { useState } from 'react'

export function usePasswordVisibility(initial = false) {
  const [visible, setVisible] = useState(initial)
  const toggle = () => setVisible((value) => !value)
  return { visible, toggle }
}

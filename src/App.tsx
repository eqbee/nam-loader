import { useState } from 'react'
import './App.css'
import type { MouseEvent } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Hello World!</h1>
          <Button label="Increment counter" onClick={increment}></Button>
          <p>Count: {count}</p>
        </div>
      </div>
    </>
  )
}

type ButtonProps = {
  label: string
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

function Button({ label, onClick }: ButtonProps) {
  return (
    <>
      <button type="button" className="rounded-md bg-blue-600 px-4 py-2 my-2 text-white cursor-pointer" onClick={onClick}>{label}</button>
    </>
  )
}

export default App

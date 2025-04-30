import { useState } from 'react'
import './App.css'
import From from './form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <From />
    </>
  )
}
export default App

import { useState } from 'react'
import DashBoard from './pages/DashBoard'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DashBoard></DashBoard>
    </>
  )
}

export default App

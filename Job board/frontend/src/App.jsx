import { useState } from 'react'
import './App.css'
import HomeLayout from './Layout/HomeLayout'

function App() {
  const [count, setCount] = useState(0)

 return(
  <div>
    <HomeLayout />
    <h1 className=' text-red-600'>Hello world</h1>
  </div>
 )
}

export default App

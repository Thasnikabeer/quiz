import { useState } from 'react'
import './App.css'
import StartPage from './components/StartPage'
import QuestionBuilder from './components/QuestionBuilder'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StartPage/>
     < QuestionBuilder/>
       
    </>
  )
}

export default App

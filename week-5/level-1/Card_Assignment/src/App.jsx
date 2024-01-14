import { useState } from 'react'
import Card from './components/Card'

function App() {

  const details= {
    name: "Amogh",
    description: "I am a developer",
    interests: ["App development", "Machine Learning", "Data Analytics"]
  }
  return (
    <div>
      <Card name={details.name} description={details.description} interests={details['interests']} />
    </div>
  )
}



export default App

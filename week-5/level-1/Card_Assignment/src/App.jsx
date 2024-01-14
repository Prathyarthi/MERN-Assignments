import { useEffect, useState } from 'react'
import Card from './components/Card'
import Card_template from './components/Card_template'
import axios from 'axios';

function App() {
  const [details, setDetails] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8000/card/CardDetails')
      .then(async (res) => {
        const response = await setDetails(res.data.cards)
        console.log(response);
      })
  }, [])



  // const details = [{
  //   id: 1,
  //   name: "Amogh",
  //   description: "I am a developer",
  //   interests: ["App development ", "Machine Learning ", "Data Analytics "]
  // }, {
  //   id: 2,
  //   name: "Kiran",
  //   description: "I am a developer",
  //   interests: ["App development ", "Machine Learning ", "Data Analytics "]
  // }, {
  //   id: 3,
  //   name: "Ram",
  //   description: "I am a developer",
  //   interests: ["App development ", "Machine Learning ", "Data Analytics "]
  // }]
  return (
    <div className='h-screen justify-center items-center flex w-screen'>
      {/* <Card name={details.name} description={details.description} interests={details['interests']} /> */}
      {details.map((data) => {
        return <Card_template
          key={data.id} name={data.name} description={data.description} interests={data['interests']}>
        </Card_template>
      })}
    </div >
  )
}



export default App

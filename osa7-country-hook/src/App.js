import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    //console.log("calling: ", name)
    if(name === '')
      return

    const link = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
   
  
    const getCountry = async () => {

      //let response
      try {
        const response = await axios.get(link).catch(err => { throw err } )

        const respdata = response.data[0]
        const data = { 
          name: respdata.name,
          capital: respdata.capital,
          population: respdata.population,
          flag: respdata.flag
        }

        //console.log(response.data)
        //console.log(data)
        setCountry({ found: true, data })

      } catch (error) {
        console.log(`There was an error: ${error.message}`)
        setCountry({found: false})
      } 
    }
    
    getCountry()
   
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
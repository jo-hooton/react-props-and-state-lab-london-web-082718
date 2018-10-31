import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onAdoptPet = id => {
    let foundPetCopy
    const pets = [...this.state.pets]
    const foundPet = pets.find(pet => pet.id === id)
    foundPetCopy = JSON.parse(JSON.stringify(foundPet))
    foundPetCopy.isAdopted = true
    pets.splice(pets.indexOf(foundPet), 1, foundPetCopy)
    this.setState({ pets })
  }

  onChangeType = (petType) => {
    this.setState({filters: {type: petType}})
  }

  
  onFindPetsClick = () => {
    let url
    if (this.state.filters.type === 'all') {
      url = '/api/pets'
    } else {
      url = `/api/pets?type=${this.state.filters.type}`
    }
     return fetch(url)
     .then(resp => resp.json())
     .then(filteredPets => this.setState({pets: filteredPets}))
  }



  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div> 
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

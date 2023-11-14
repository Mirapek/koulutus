import { useEffect, useState, useReducer } from 'react'
import './App.css'
import List from './components/List'



const initialState = {
    names1: ["Maija", "Pekka", "Saara", "Meri", "Siiri"],
    names2: ["Tarja", "Jaakko", "Tuomas", "Heli", "Kalle"], 
    selected: [],
    filterLeft: "",
    filterRight: "",
    resultsLeft: [],
    resultsRight: [],
    disableRightArrow: false,
    disableLeftArrow: false
  }


function reducer(state, action) {
  switch (action.type) {

    case "SELECT_NAME": {
    //Tarkastaa onko nimi jo valittuna. Jos on, poistaa nimen selected-listalta ja poistaa nuolten disabloinnit.
      if (state.selected.includes(action.value)) {
          return {...state, selected: state.selected.filter(selectedName => selectedName !== action.value), disableLeftArrow: false, disableRightArrow: false}
    //Estää valitsemasta nimiä samaan aikaan sekä names1 että names2 listoilta.
      } else if (state.names1.filter(name => state.selected.includes(name)).length > 0 && state.names2.includes(action.value)) {
          return {...state}
      } else if (state.names2.filter(name => state.selected.includes(name)).length > 0 && state.names1.includes(action.value)) {
          return {...state}
      //Lisää nimen selected-listaan ja disabloi vasemmalle osoittavan nuolen.
        }  else if (state.names1.includes(action.value)) {
            return {...state, selected: state.selected.concat(action.value), disableLeftArrow: true}
      //Lisää nimen selected-listaan ja disabloi oikealle osoittavan nuolen.
          } else if (state.names2.includes(action.value)) {
              return {...state, selected: state.selected.concat(action.value), disableRightArrow: true}   
      }      
    }

    case "MOVE_NAME_RIGHT": {
        for (let i=0; i < state.selected.length; i++) {
          state.names2.push(state.selected[i])
          state.names1 = state.names1.filter(name => name !== state.selected[i])
        }
        return {...state, selected: [], disableLeftArrow: false}
      
    }
    case "MOVE_NAME_LEFT": { 
      for (let i=0; i < state.selected.length; i++) {
        state.names1.push(state.selected[i])
        state.names2 = state.names2.filter(name => name !== state.selected[i])
      }
      return {...state, selected: [], disableRightArrow: false}
    
  }
    case "FILTER_LEFT": {
      return {...state, 
        [action.field]: action.newInput, 
        [action.results]: state.names1.filter(name => name.toLowerCase().includes(action.newInput.toLowerCase()))};  
    }

    case "FILTER_RIGHT": {
      return {...state, 
        [action.field]: action.newInput, 
        [action.results]: state.names2.filter(name => name.toLowerCase().includes(action.newInput.toLowerCase()))}; 
    }

  }
  throw Error("Unknown action:" + action.type)
}


const App = () => {

const [state, dispatch] = useReducer(reducer, initialState)

useEffect(() => {
  console.log(state.selected);
}, [state])

const selectName = (name) => {
  dispatch({ type: "SELECT_NAME", value: name })
}

const handleToRight = () => {
  dispatch({ type: "MOVE_NAME_RIGHT" })
}

const handleToLeft = () => {
  dispatch({ type: "MOVE_NAME_LEFT" })
}

const handleFilterRight = (event) => {
  dispatch({ type: "FILTER_RIGHT", newInput: event.target.value, field: "filterRight", results: "resultsRight" })
}

const handleFilterLeft = (event) => {
  dispatch({ type: "FILTER_LEFT", newInput: event.target.value, field: "filterLeft", results: "resultsLeft" })
}



  return (
    <div className='div'>
      <div className='container'>
        <List 
          content={state.names1}
          selected={state.selected}
          selectName={selectName} 
          filter={state.filterLeft} 
          handleFilter={handleFilterLeft}
          results={state.resultsLeft} 
          />
        <div className='button-div'>
          <button 
            className='button' 
            onClick={handleToRight}
            disabled={state.disableRightArrow}>
            →
          </button>
          <button 
            className='button' 
            onClick={handleToLeft}
            disabled={state.disableLeftArrow}>
            ←
          </button>
        </div>
        <List 
          content={state.names2}
          selected={state.selected} 
          selectName={selectName} 
          filter={state.filterRight} 
          handleFilter={handleFilterRight}
          results={state.resultsRight} 
          /> 
      </div>
    </div>
  )
}


// Vanha koodi, jossa käytetään useStatea

/* const [selected, setSelected] = useState([])
const [filterInputLeft, setFilterInputLeft] = useState("")
const [filterInputRight, setFilterInputRight] = useState("")
const [displayedResultsLeft, setDisplayedResultsLeft] = useState([])
const [displayedResultsRight, setDisplayedResultsRight] = useState([]) */

/* const selectName = (name) => {
  if (selected.includes(name)) {
    setSelected(selected.filter(selectedName => selectedName !== name))
  } else {
    setSelected(selected.concat(name))
  }
} */

/* const handleToRight = () => {
  for (let i=0; i < selected.length; i++) {
    names2.push(selected[i])
    names1 = names1.filter(name => name !== selected[i])
  }
  setSelected([])
}

const handleToLeft = () => {
  for (let i=0; i < selected.length; i++) {
    names1.push(selected[i]);
    names2 = names2.filter(name => name !== selected[i])
  }
  setSelected([])
}

/* const handleFilterRight = (event) => {
  let newInput = event.target.value
  setFilterInputRight(newInput)
  const filterResults = names2.filter(name => name.toLowerCase().includes(newInput.toLowerCase()))
  setDisplayedResultsRight(filterResults)
}

const handleFilterLeft = (event) => {
  let newInput = event.target.value
  setFilterInputLeft(newInput)
  const filterResults = names1.filter(name => name.toLowerCase().includes(newInput.toLowerCase()))
  setDisplayedResultsLeft(filterResults)
} */



export default App

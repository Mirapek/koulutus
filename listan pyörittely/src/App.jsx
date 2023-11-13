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
  }


function reducer(state, action) {
  switch (action.type) {

    case "SELECT_NAME": {
      if (state.selected.includes(action.value)) {
          return {...state, selected: state.selected.filter(selectedName => selectedName !== action.value)}
        } else {
          return {...state, selected: state.selected.concat(action.value)}
      };
    }
    case "MOVE_NAME_RIGHT": {
        for (let i=0; i < state.selected.length; i++) {
          state.names2.push(state.selected[i])
          state.names1 = state.names1.filter(name => name !== state.selected[i])
        }
        return {...state, selected: []}
      
    }
    case "MOVE_NAME_LEFT": { 
      for (let i=0; i < state.selected.length; i++) {
        state.names1.push(state.selected[i])
        state.names2 = state.names2.filter(name => name !== state.selected[i])
      }
      return {...state, selected: []}
    
  }
    case "FILTER_LEFT": {
      const filterResults = state.names1.filter(name => name.toLowerCase().includes(action.newInput.toLowerCase()))
      return {
        ...state, [state.filterLeft]: action.newInput, [state.resultsLeft]: filterResults
      };
    }
    case "FILTER_RIGHT": {
      const filterResults = state.names2.filter(name => name.toLowerCase().includes(action.newInput.toLowerCase()))
      return {
        ...state, [state.filterRight]: action.newInput, [state.resultsRight]: filterResults
      };
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
  dispatch({ type: "FILTER_RIGHT", newInput: event.target.value })
}

const handleFilterLeft = (event) => {
  dispatch({ type: "FILTER_LEFT", newInput: event.target.value })
}



  return (
    <div className='div'>
      <div className='container'>
        <List 
          content={state.names1}
          selected={state.selected}
          selectName={selectName} 
          filterInput={state.filterLeft} 
          handleFilter={handleFilterLeft}
          filter={state.resultsLeft} 
          />
        <div className='button-div'>
          <button className='button' onClick={handleToRight}>→</button>
          <button className='button' onClick={handleToLeft}>←</button>
        </div>
        <List 
          content={state.names2}
          selected={state.selected} 
          selectName={selectName} 
          filterInput={state.filterRight} 
          handleFilter={handleFilterRight}
          filter={state.resultsRight} 
          /> 
      </div>
    </div>
  )
}


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

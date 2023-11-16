import { useEffect, useReducer } from 'react'
import './App.css'
import List from './components/List'
import reducer from './reducer'
import {
    SAVE_NEW_NAME,
    ADD_NAME,
    DELETE_NAME,
    SELECT_NAME,
    MOVE_NAME_RIGHT,
    MOVE_NAME_LEFT,
    FILTER_RIGHT,
    FILTER_LEFT,
    UPDATE_STATE
} from "./reducer"


const App = () => {

const initialState = () => {
  const storedData = JSON.parse(localStorage.getItem("stored"))
  if (storedData) {return storedData}
  else {
  return ({
    names1: ["Maija", "Pekka", "Saara", "Meri", "Siiri"],
    names2: ["Tarja", "Jaakko", "Tuomas", "Heli", "Kalle"], 
    selected: [],
    filterLeft: "",
    filterRight: "",
    resultsLeft: [],
    resultsRight: [],
    disableRightArrow: false,
    disableLeftArrow: false,
    newName: ""}
  )}
} 

const [state, dispatch] = useReducer(reducer, initialState())

useEffect(() => {
  localStorage.setItem("stored", JSON.stringify(state))   
}, [state])

useEffect(() => {
  const state = JSON.parse(localStorage.getItem("stored"));
  if (state) {
   dispatch({ type: UPDATE_STATE, data: state});
  }
}, []);



const selectName = (name) => {
  dispatch({ type: SELECT_NAME, value: name })
}

const saveName = (event) => {
  dispatch({ type: SAVE_NEW_NAME, typedName: event.target.value })
}

const addNewName = () => {
  dispatch({ type: ADD_NAME})
}

const handleToRight = () => {
  dispatch({ type: MOVE_NAME_RIGHT})
}

const handleToLeft = () => {
  dispatch({ type: MOVE_NAME_LEFT })
}

const handleFilterRight = (event) => {
  dispatch({ type: FILTER_RIGHT, newInput: event.target.value })
}

const handleFilterLeft = (event) => {
  dispatch({ type: FILTER_LEFT, newInput: event.target.value })
}

const deleteName = () => {
  dispatch({ type: DELETE_NAME })
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
          <input 
            className="add-name-input" 
            value= {state.newName}
            onChange={saveName} 
            placeholder='Add a new name'></input>
          <button className='add-button' onClick={addNewName}>Add</button>
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
          <button className='delete-button' onClick={deleteName}>Delete</button>
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

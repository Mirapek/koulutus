import List from "./features/list/List"
import { useEffect } from "react"
import "./App.css"
import { useAppSelector, useAppDispatch } from "./app/hooks"
import {
  updateState, 
  saveNewName, 
  addName, 
  deleteName, 
  selectName, 
  moveNameLeft, 
  moveNameRight, 
  ShowFilterLeft, 
  ShowFilterRight,
  selectList
} from "./features/list/listSlice"


const App = () => {

  const list: any = useAppSelector(selectList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    localStorage.setItem("stored", JSON.stringify(list))   
  }, [list])

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem("stored") || "");
    if (state) {
     dispatch(updateState(state));
    }
  }, [])

  return (
    <div className='div'>
      <div className='container'>
        <List 
          content={list.names1}
          filter={list.filterLeft} 
          results={list.resultsLeft}
          handleFilter={(e: any) => dispatch(ShowFilterLeft(e.target.value))} 
          />
        <div className='button-div'>
          <input 
            className="add-name-input" 
            value= {list.newName}
            onChange={(e) => dispatch(saveNewName(e.target.value))} 
            placeholder='Add a new name'></input>
          <button 
            className='add-button' 
            onClick={() => dispatch(addName())}>
              Add
            </button>
          <button 
            className='button' 
            onClick={() => dispatch(moveNameRight())}
            disabled={list.disableRightArrow}>
            →
          </button>
          <button 
            className='button' 
            onClick={() => dispatch(moveNameLeft())}
            disabled={list.disableLeftArrow}>
            ←
          </button>
          <button className='delete-button' onClick={() => dispatch(deleteName())}>Delete</button>
        </div>
        <List 
          content={list.names2}
          filter={list.filterRight} 
          handleFilter={(e: any) => dispatch(ShowFilterRight(e.target.value))}
          results={list.resultsRight} 
          /> 
      </div>
    </div>
  )
}

export default App



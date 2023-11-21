import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"


// Define a type for the slice state
export interface ListState {
  names1: Array<string>
  names2: Array<string>
  selected: Array<string>
  filterLeft: string
  filterRight: string
  resultsLeft: Array<string>
  resultsRight: Array<string>
  disableRightArrow: boolean
  disableLeftArrow: boolean
  newName: string
}

/* const storedData: string | null = localStorage.getItem("stored")
  if (storedData) {
    const parsedData: ListState = JSON.parse(storedData)
    return storedData} */

// Define the initial state using that type
const initialState: ListState = {
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


export const listSlice: any = createSlice({
  name: "list",
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<object>) => {
      //state = action.payload
    },
    saveNewName: (state, action: PayloadAction<string>) => {
      state.newName = action.payload
    },
    addName: (state) => {
      if(state.newName.length > 1) {
        state.names1.push(state.newName)
        state.newName = ""
      }
      
    },
    deleteName: (state) => {
      for (let element of state.selected) {
        state.names1 = state.names1.filter(name => name !== element)
        state.names2 = state.names2.filter(name => name !== element)
      }
      state.selected = []
      state.disableLeftArrow = false
      state.disableRightArrow = false
    },
    selectName: (state, action: PayloadAction<string>) => {
      //Tarkastaa onko nimi jo valittuna. Jos on, poistaa nimen selected-listalta ja poistaa nuolten disabloinnit.
      if (state.selected.includes(action.payload)) {
            state.selected = state.selected.filter(selectedName => selectedName !== action.payload), 
            state.disableLeftArrow = false, 
            state.disableRightArrow = false
          }
      //Estää valitsemasta nimiä samaan aikaan sekä names1 että names2 listoilta.
          else if (state.names1.filter(name => state.selected.includes(name)).length > 0 && state.names2.includes(action.payload)) {
              state
          } else if (state.names2.filter(name => state.selected.includes(name)).length > 0 && state.names1.includes(action.payload)) {
              state
          //Lisää nimen selected-listaan ja disabloi vasemmalle osoittavan nuolen.
            }  else if (state.names1.includes(action.payload)) {
                state.selected = state.selected.concat(action.payload), 
                state.disableLeftArrow = true
          //Lisää nimen selected-listaan ja disabloi oikealle osoittavan nuolen.
              } else if (state.names2.includes(action.payload)) {
                  state.selected = state.selected.concat(action.payload), 
                  state.disableRightArrow = true}   
      },
      moveNameRight: (state) => {
        for (let element of state.selected) {
          state.names2.push(element)
          state.names1 = state.names1.filter(name => name !== element)
        }
        state.selected = []
        state.disableLeftArrow = false
      },
      moveNameLeft: (state) => {
        for (let element of state.selected) {
          state.names1.push(element)
          state.names2 = state.names2.filter(name => name !== element)
        }
        state.selected = []
        state.disableRightArrow = false
      },
      ShowFilterLeft: (state, action: PayloadAction<string>) => {
        state.filterLeft = action.payload
        state.resultsLeft = state.names1.filter(name => name.toLowerCase().includes(action.payload.toLowerCase()))
      },
      ShowFilterRight: (state, action: PayloadAction<string>) => {
        state.filterRight = action.payload
        state.resultsRight = state.names2.filter(name => name.toLowerCase().includes(action.payload.toLowerCase()))
    }
  }

})

export const {updateState, saveNewName, addName, deleteName, selectName, moveNameLeft, moveNameRight, ShowFilterLeft, ShowFilterRight } = listSlice.actions
export const selectList = (state: RootState) => state.list
export default listSlice.reducer


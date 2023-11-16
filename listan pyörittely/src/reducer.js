



function reducer(state, action) {

    switch (action.type) {

      case "UPDATE_STATE" : {
        return action.data
      }
  
      case "SAVE_NEW_NAME": {
        return {...state, newName: action.typedName}
      }    
      
      case "ADD_NAME": {
        if(state.newName.length > 1) {
          state.names1.push(state.newName)
        }
        return {...state, newName: ""}
      }
  
      case "DELETE_NAME": {
        for (let element of state.selected) {
          state.names1 = state.names1.filter(name => name !== element)
          state.names2 = state.names2.filter(name => name !== element)
        }
        return {...state, selected: [], disableLeftArrow: false, disableRightArrow: false}
      }
  
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
          for (let element of state.selected) {
            state.names2.push(element)
            state.names1 = state.names1.filter(name => name !== element)
          }
          return {...state, selected: [], disableLeftArrow: false}
        
      }
      case "MOVE_NAME_LEFT": { 
        for (let element of state.selected) {
          state.names1.push(element)
          state.names2 = state.names2.filter(name => name !== element)
        }
        return {...state, selected: [], disableRightArrow: false}
      
    }
      case "FILTER_LEFT": {
        return {...state, 
          filterLeft: action.newInput, 
          resultsLeft: state.names1.filter(name => name.toLowerCase().includes(action.newInput.toLowerCase()))};  
      }
  
      case "FILTER_RIGHT": {
        return {...state, 
          filterRight: action.newInput, 
          resultsRight: state.names2.filter(name => name.toLowerCase().includes(action.newInput.toLowerCase()))}; 
      }
      default: throw Error("Unknown action:" + action.type)
    }
    
  }

  export default reducer
  export const SAVE_NEW_NAME = "SAVE_NEW_NAME"
  export const ADD_NAME ="ADD_NAME"
  export const DELETE_NAME = "DELETE_NAME"
  export const SELECT_NAME = "SELECT_NAME"
  export const MOVE_NAME_RIGHT = "MOVE_NAME_RIGHT"
  export const MOVE_NAME_LEFT = "MOVE_NAME_LEFT"
  export const FILTER_LEFT = "FILTER_LEFT"
  export const FILTER_RIGHT = "FILTER_RIGHT"
  export const UPDATE_STATE = "UPDATE_STATE"
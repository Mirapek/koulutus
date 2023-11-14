import Filter from "./Filter"
import {uid} from "uid"

const List = (props) => {
  
    if (props.content.length === 0) {
      //Jos lista on tyhjä
      return (
        <div className='list'>
        <p style={{fontSize: "large"}}>This list has no items.</p>
        </div>
      )
      //Perustilanne. Filter-kentissä ei tekstiä.
    } else if (props.filter === "") {
      return (
        <div className='list'>
        <Filter value={props.filter} onChange={props.handleFilter}/>
        <ul className='names'>
          {props.content.map((name) => 
            <li 
            className={props.selected.indexOf(name) > -1 ? "clicked" : "normal"} 
            key={uid()} 
            onClick={() => props.selectName(name)} > 
              {name}
            </li>)}
          </ul>
        </div>
      )
      //Filter-kentässä tekstiä. Näyttää suodatetut tulokset.
    } else {
        return (
            <div className='list'>
            <Filter value={props.filter} onChange={props.handleFilter}/>
            <ul className='names'>
              {props.results.map((name) => 
                <li 
                className={props.selected.indexOf(name) > -1 ? "clicked" : "normal"} 
                key={uid()} 
                onClick={() => props.selectName(name)} > 
                  {name}
                </li>)}
            </ul>
            </div>
          )
    }
    }

export default List
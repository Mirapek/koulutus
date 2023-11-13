import Filter from "./Filter"

const List = (props) => {
  
    if (props.content.length === 0) {
      return (
        <div className='list'>
        <p>This list has no items</p>
        </div>
      )
    } else if (props.filterInput === "") {
      return (
        <div className='list'>
        <Filter value={props.filterInput} onChange={props.handleFilter}/>
        <ul className='names'>
          {props.content.map((name, index) => 
            <li 
            className={props.selected.indexOf(name) > -1 ? "clicked" : "normal"} 
            key={index} 
            onClick={() => props.selectName(name)} > 
              {name}
            </li>)}
          </ul>
        </div>
      )
    } else {
        return (
            <div className='list'>
            <Filter value={props.filterInput} onChange={props.handleFilter}/>
            <ul className='names'>
              {props.filter.map((name, index) => 
                <li 
                className={props.selected.indexOf(name) > -1 ? "clicked" : "normal"} 
                key={index} 
                onClick={() => props.selectName(name)} > 
                  {name}
                </li>)}
            </ul>
            </div>
          )
    }
    }

export default List
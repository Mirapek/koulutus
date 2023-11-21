import Filter from "./Filter"
import {uid} from "uid"

import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  selectName, 
  selectList
} from "./listSlice"


interface ListProps {
    content: Array<string>,
    filter: string,
    results: Array<string>,
    handleFilter: any
  }

const List: React.FC<ListProps> = ({ content, filter, results, handleFilter}: ListProps) => {

    const list: any = useAppSelector(selectList)
    const dispatch = useAppDispatch()

        //Jos lista on tyhjä
      if (content.length === 0) {
        return (
          <div className='list'>
          <p style={{fontSize: "large"}}>
            This list has no items.
            </p>
          </div>
        )
        //Perustilanne. Filter-kentissä ei tekstiä.
      } else if (filter === "") {
        return (
          <div className='list'>
          <Filter 
            value={filter} 
            onChange={handleFilter}
            />
          <ul className='names'>
            {content.map((name: string) => 
              <li 
              className={list.selected.indexOf(name) > -1 ? "clicked" : "normal"} 
              key={uid()} 
              onClick={() => dispatch(selectName(name))} > 
                {name}
              </li>)}
            </ul>
          </div>
        )
        //Filter-kentässä tekstiä. Näyttää suodatetut tulokset.
      } else {
          return (
              <div className='list'>
              <Filter 
                value={filter} 
                onChange={handleFilter}/>
              <ul className='names'>
                {results.map((name: string) => 
                  <li 
                  className={list.selected.indexOf(name) > -1 ? "clicked" : "normal"} 
                  key={uid()} 
                  onClick={() => selectName(name)} > 
                    {name}
                  </li>)}
              </ul>
              </div>
            )
      }
      }
  
  export default List
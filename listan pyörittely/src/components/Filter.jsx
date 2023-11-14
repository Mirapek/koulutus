import { uid } from "uid"

const Filter = (props) => {
    return (
        <div>
        <input style={{fontSize: "large"}}
          id={uid()} 
          value={props.value}
          onChange={props.onChange}
          placeholder="Search"
        />
      </div>
    )
  }

export default Filter
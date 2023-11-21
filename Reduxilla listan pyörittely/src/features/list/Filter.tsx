import { uid } from "uid"


interface FilterProps {
  value: string,
  onChange: any
}

const Filter: React.FC<FilterProps> = ({ value, onChange}: FilterProps) => {

    return (
        <div>
        <input style={{fontSize: "large"}}
          id={uid()} 
          value={value}
          onChange={onChange}
          placeholder="Search"
        />
      </div>
    )
  }

export default Filter
import { useContext } from "react";
import { Select as ModernSelect } from 'antd';
import { BebidasContext } from "../context/BebidasContext";
const Select = ({ label, options, id, blankValue }) => {
  const { filtro, setFiltro, setQuery,query } = useContext(BebidasContext);
  const inputActive = id === filtro;
  console.log(inputActive ? (query ? query : blankValue) : blankValue);
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex gap-10">
          <label htmlFor={id}>Seleccione un ingrediente</label>
          <input
            type="radio"
            value={id}
            checked={inputActive}

            onChange={(e) => {
              setFiltro(e.target.value);
            }}
            
            name="inputState"
            
            id={id}
          />
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor={id} className={"font-bold "+(inputActive ? 'text-black' : 'text-gray-400')}>
            {label}
            </label>

            <ModernSelect 
                defaultValue={inputActive ? (query ? query : blankValue) : blankValue}
                options={options}
                onChange={(e)=>{setQuery(e)}}
                disabled={!inputActive}
            />
        </div>
      </div>
    </>
  );
};

export default Select;

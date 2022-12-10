import { useEffect, useState } from "react";

const BebidaDetails = ({bebidaObj}) => {
    let [ingredientes, setIngredientes] = useState([]);
    let [cantidades, setCantidades] = useState([]);
    const {strInstructions, strInstructionsES, strDrinkThumb,strDrink} = bebidaObj.drinks[0];

    useEffect(()=>{
        const ig  = [];
        const c = [];
        for (let i = 1; i <= 15; i++) {
            if(bebidaObj.drinks[0]['strIngredient'+(i)]){
                ig.push(bebidaObj.drinks[0]['strIngredient'+(i)]);
            }
            if(bebidaObj.drinks[0]['strMeasure'+(i)]){
                c.push(bebidaObj.drinks[0]['strMeasure'+(i)]);
            }
        }
        setIngredientes(ig);
        setCantidades(c);
    },[])

    return (
    <div className="flex flex-col gap-5 items-center">
      <img
        src={strDrinkThumb}
        width={400}
        height={180}
        alt={strDrink}
        className="rounded-xl"
        loading="lazy"
      />
      <p>
        {strInstructionsES ?? strInstructions}
      </p>
      <ul>
        {
            ingredientes.map((ingrediente,i) =>(
                <li key={Math.random()+""}>{ingrediente} {cantidades[i] ?? ''}</li>
            ))
        }
      </ul>
    </div>
  );
};

export default BebidaDetails;

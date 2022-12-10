import Select from "./Select";
import { useContext, useEffect, useState } from "react";
import { BebidasContext } from "../context/BebidasContext";
import { Link } from "react-router-dom";
const Header = () => {
    const [categorias, setCategorias] = useState();
    const [ingredientes, setIngredientes] = useState();
    const { filtro, query,setSpinner,setBebidas } = useContext(BebidasContext);
    const [error, setError] = useState(false);
    useEffect(() => {
      fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list").then(
        (data) => {
          data.json().then(({ drinks: categorias }) => {
            setCategorias(
              categorias.map(({ strCategory: categoria }) => {
                return {
                  value: categoria,
                  label: categoria,
                };
              })
            );
          });
        }
      );
    }, []);
    useEffect(() => {
      fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list").then(
        (data) => {
          data.json().then(({ drinks: ingredientes }) => {
            setIngredientes(
              ingredientes.map(({ strIngredient1: ingrediente }) => {
                return {
                  value: ingrediente,
                  label: ingrediente,
                };
              })
            );
          });
        }
      );
    }, []);
    return ( 
        <header
        className="
      text-white bg-[url(/img/header.jpg)] bg-center bg-no-repeat bg-cover py-20 relative 
      before:content-[''] before:absolute before:top-0 before:right-0 before:left-0 before:bottom-0 before:bg-black before:opacity-40 "
      >
        <div className="relative p-5 flex-col items-center flex gap-5">
          <h1 className="font-bold text-6xl">Buscador de Bebidas</h1>

          <div className="bg-white p-8 rounded-lg text-black flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <p className="text-red-600">
                <span className="font-bold">Nota: </span>Solo puedes elegir un
                filtro
                </p>
                <Link to={"/favoritos"}>Ir a favoritos</Link>
            </div>

            {error && (
              <p className="text-red-600">
                <span className="font-bold">Alerta: </span>Debes Elegir un item
              </p>
            )}
            <div className="flex flex-col md:flex-row gap-5">
              <Select
                label={"Ingrediente"}
                id={"ingrediente"}
                options={ingredientes}
                blankValue="Seleccione un ingrediente"
              />
              <Select
                label={"Categoria"}
                id={"category"}
                options={categorias}
                blankValue="Seleccione una categoria"
              />
              <div className="flex flex-col justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!query) {
                      setError(true);
                      return
                    }
                    
                    if(filtro === 'ingrediente'){
                      setSpinner(true)
                        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`).then(data =>{
                          data.json().then(({drinks: bebidas})  =>{
                            setBebidas(bebidas)
                            setSpinner(false)
                          })
                        })
                    }
                    if(filtro === 'category'){
                      setSpinner(true)
                      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${query}`).then(data =>{
                        data.json().then(({drinks: bebidas}) =>{
                          setBebidas(bebidas)
                          setSpinner(false)
                        })
                      })
                    }
                  }}
                  className="transition-all  p-2 bg-blue-600 text-white  rounded-lg px-6 hover:bg-blue-400 active:shadow-md active:shadow-blue-500 active:bg-blue-600"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
     );
}
 
export default Header;
import { useState, createContext, useEffect } from "react";

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
  const [filtro, setFiltro] = useState("ingrediente");
  const [query, setQuery] = useState("");
  const [bebidas, setBebidas] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [favoritos, setFavoritos] = useState(JSON.parse(localStorage.getItem("favoritos")) ?? [])
  useEffect(()=>{
    localStorage.setItem("favoritos", JSON.stringify(favoritos))
  },[favoritos])
  
  useEffect(()=>{
    setQuery('');
  },[filtro])
  
  return (
    <BebidasContext.Provider
      value={{
        filtro,
        setFiltro,
        query,
        setQuery,
        bebidas,
        setBebidas,
        spinner,
        setSpinner,
        favoritos,
        setFavoritos,
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};

export {BebidasContext, BebidasProvider}

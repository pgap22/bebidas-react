import { useContext } from "react";
import { Link } from "react-router-dom";
import { BebidasContext } from "../context/BebidasContext";
import Bebida from "./Bebida";
const Favoritos = () => {
  const {favoritos: bebidasFavorite} = useContext(BebidasContext)
  return (
    <>
      <header
        className="
      text-white bg-[url(/img/header.jpg)] bg-center bg-no-repeat bg-cover py-20 relative 
      before:content-[''] before:absolute before:top-0 before:right-0 before:left-0 before:bottom-0 before:bg-black before:opacity-40 "
      >
        <div className="relative p-5 flex-col items-center flex gap-5">
        <h1 className="font-bold text-6xl">Tus Favoritos</h1>
        <div className="bg-white p-8 rounded-lg text-black flex flex-col gap-5">
            <Link to={"/"}>Ir al inicio</Link>
        </div>
        </div>
      </header>
      <main>
      <div className="flex justify-center">
            <div className="grid justify-center max-w-[1920px] gap-5 sm:grid-cols-2 md:flex md:flex-wrap">
              {bebidasFavorite.length
                ? bebidasFavorite.map((bebida) => (
                    <Bebida key={bebida.id} {...bebida} />
                  ))
                : null}
            </div>
          </div>
      </main>
    </>
  );
};

export default Favoritos;

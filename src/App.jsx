import { useContext } from "react";
import Bebida from "./components/Bebida";
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import { BebidasContext } from "./context/BebidasContext";

function App() {
  const { bebidas, spinner } = useContext(BebidasContext);
  return (
    <>
      <Header />
      <main>
        {spinner && <Spinner />}
        <>
          <div className="flex justify-center">
            <div className="grid justify-center max-w-[1920px] gap-5 sm:grid-cols-2 md:flex md:flex-wrap">
              {bebidas.length
                ? bebidas.map(({ strDrinkThumb, strDrink, idDrink }) => (
                    <Bebida key={idDrink} imagen={strDrinkThumb} nombre={strDrink} id={idDrink} />
                  ))
                : null}
            </div>
          </div>
        </>
      </main>
    </>
  );
}

export default App;

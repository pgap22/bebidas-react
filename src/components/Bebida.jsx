import { Button, Modal } from "antd";
import { useContext, useState } from "react";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import BebidaDetails from "./BebidaDetails";
import Spinner from "./Spinner";
import { notification } from "antd";
import { BebidasContext } from "../context/BebidasContext";
const Bebida = ({ imagen, nombre, id }) => {
  const [modal, setModal] = useState(false);
  const [bebidasDetails, setDetails] = useState({});
  const [spinner, setSpinner] = useState(true);
  const [noti, contextHolder] = notification.useNotification();
  const {favoritos,setFavoritos} = useContext(BebidasContext)
  const addFavorites = () => {
    const bebida = {
      id,
      nombre,
      imagen
    }
    if(!favoritos.some(bebida => bebida.id == id)){
      setFavoritos([...favoritos,bebida])
      noti.info({
        message: "Added to Favorites !",
        description: "Added to Favorites !",
      });
    }
    if(favoritos.some(bebida => bebida.id == id)){
      noti.info({
        message: "Removed from Favorites !",
        description: "Removed from Favorites !",
      });

      const newFavoritos = favoritos.filter(bebida => bebida.id !== id )
      setFavoritos(newFavoritos);
    }
  };

  const getData = async () => {
    const respuesta = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id
    );
    const datos = await respuesta.json();
    return datos;
  };

  return (
    <div className="border rounded-lg border-gray-400 grid md:grid-cols-2 p-4 max-w-[250px] gap-y-5 md:max-w-lg gap-5 m-1 ">
      <Modal
        title={nombre}
        open={modal}
        onCancel={() => {
          setModal(false);
        }}
        footer={[
          <Button danger onClick={addFavorites}>
            {favoritos.some(bebida => bebida.id == id) ? <MdFavorite size={20} />  : <MdOutlineFavoriteBorder size={20} />}
            
          </Button>,
        ]}
        centered
      >
        {spinner && <Spinner />}
        {bebidasDetails.drinks && <BebidaDetails bebidaObj={bebidasDetails} />}
      </Modal>
      {contextHolder}
      <img
        src={imagen}
        width={240}
        height={180}
        alt={nombre}
        className="rounded-xl"
        loading="lazy"
      />

      <div className="flex flex-col justify-between gap-4">
        <h2 className="font-medium text-2xl">{nombre}</h2>

        <div className="grid grid-cols-[1fr_max-content] gap-3">
          <div
            onClick={async () => {
              setModal(true);
              const data = await getData();
              setDetails(data);
              setSpinner(false);
            }}
            className="transition-all  p-2 bg-blue-600 text-white text-center cursor-pointer text-xl font-bold  rounded-lg px-6 hover:bg-blue-400 active:shadow-md active:shadow-blue-500 active:bg-blue-600"
          >
            Ver Receta
          </div>
          <div
            onClick={addFavorites}
            className="flex border-none items-center justify-center p-2 border bg-red-500 rounded-lg px-4 hover:bg-red-400 active:shadow-md active:shadow-red-500 active:bg-red-600"
          >
             {favoritos.some(bebida => bebida.id == id) ? <MdFavorite color="white" size={20} />  : <MdOutlineFavoriteBorder color="white" size={20} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bebida;

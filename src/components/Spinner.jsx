import "./spinner.css";
const Spinner = () => {
    return ( 
        <div className="flex justify-center">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
     );
}
 
export default Spinner;
import { useNavigate } from "react-router-dom";
import loading_globe_world from "../../assets/loading_globe_world.gif";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/countries");
  };
  return (
    <div>
      <div className="divCabecera">
        <h1>Countries</h1>
      </div>
      <div className="divCuerpo">
        <div className="divDescripcion">
          <h3>Date una aventura y conoce nuestros Paises,</h3>
          <h3> Continentes, Capitales,Banderas, etc. Y crea tus </h3>
          <h3> propias Actividades Turisticas</h3>
          <div className="group_btn1">
            <button type="submit" onClick={handleSubmit}>
              Ingresar
            </button>
          </div>
        </div>
        <div className="divDer">
          <div className="card_image">
            <img
              src={loading_globe_world}
              width="500"
              height="480"
              alt="image.gif"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;

import { IPet } from "../../../model/pet";
import { Link } from "react-router-dom";

type Props = {
  pet: IPet;
};

export const PetCard = (props: Props) => {
  const pet = props.pet;

  return (
    <div className="pet-card">
      <div className="preview">
        <img src={pet.imgUrl} alt="" />{" "}
      </div>
      <p className="name">Name: {pet.name}</p>
      <p className="type">Type: {pet.type}</p>
      
      <Link to={`/pet/${pet._id}`} state={pet}>
        <button className="btnDet">Details</button>
      </Link>
    </div>
  );
};
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { IPet } from "../../../model/pet";


export type TCurrentPetState = {
  pet: IPet | null;
  loading: boolean;
  error: boolean;
};

export const PetCardDetail = () => {
  const params = useParams();
  const location = useLocation();
  
  const _id = params._id;
  const pet: IPet = location.state;

  const [currentPetState, setCurrentPetState] =
    useState<TCurrentPetState>({
      pet,
      loading: false,
      error: false,
    });

  const fetchPetById = async () => {
    setCurrentPetState({
      ...currentPetState,
      loading: true,
    });

    try {
      const res = await axios.get(`http://localhost:3000/animal/${_id}`);

      setCurrentPetState({
        ...currentPetState,
        loading: false,
        pet: res.data,
      });
    } catch (e) {
      setCurrentPetState({
        ...currentPetState,
        loading: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    !pet && fetchPetById();
  }, []);

  return (
    <div className="pagDetail">
      {currentPetState.loading && "Loading"}
      {currentPetState.error && "Error loading "}
      {currentPetState.pet && (
        <div className="pet-details">
          <div className="preview">
            <h1>This is the pet's details</h1>
            <img src={currentPetState.pet.imgUrl} alt="" />{" "}
          </div>
          <div className="datiDetails">
          <b>Name: {currentPetState.pet.name}</b>
          <p>Breed: {currentPetState.pet.breed}</p>
          <p>Type: {currentPetState.pet.type}</p>
          <p>BirthDate: {currentPetState.pet.birthDate}</p>
          <p>Description: {currentPetState.pet.description}</p>
          <p>Pedigree: {currentPetState.pet.pedigree ? "yes" : "no"}</p>
          </div>
          <div className="btnEdit1">
            {" "}
            <Link 
              to={`/pet/${currentPetState.pet._id}/edit`}
              state={currentPetState.pet}
            >
              <button>Edit</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
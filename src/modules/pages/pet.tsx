import axios from "axios";
import { useEffect, useState } from "react";
import { IPet } from "../../model/pet";
import { PetCard } from "./details/pet-card";

type TPetState = {
  loading: boolean;
  error: boolean;
  pets: IPet[] | null;
};

export const Pets = () => {
  const [petState, setPetState] = useState<TPetState>({
    loading: false,
    error: false,
    pets: null,
  });

  const fetchPets = async () => {
    setPetState({
      ...petState,
      loading: true,
    });

    try {
      const res = await axios.get(`http://localhost:3000/animal`);
      const data: IPet[] = res.data;
      setPetState({
        ...petState,
        pets: data,
        loading: false,
      });
    } catch (e) {
      setPetState({
        ...petState,
        loading: false,
        error: true,
      });
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className="pets">
      <h1>Pets</h1>
      <div className="pets-list">
        {petState.loading && "Loading"}
        {petState.error && "Error"}

        {petState.pets?.length === 0 && "No pets found"}
        {petState.pets?.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </div>
  );
};
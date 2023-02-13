import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {IPet} from "../../../model/pet";
import {TCurrentPetState} from './pet-card-detail';
import { PetForm } from "../pet-form/pet-form";
import axios from "axios";

export const EditPet = () => {
  const location = useLocation();
  const params = useParams();
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
    <div className="edit">
      
      <h1 className="rowTitle">Edit or delete your pet</h1>
      {currentPetState.loading && "Loading"}
      {currentPetState.error && "Error loading "}
      {currentPetState.pet && (
        <PetForm defaultValues={currentPetState.pet} />
       )} </div>
  );
};
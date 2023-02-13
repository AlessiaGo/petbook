import React from "react";
import { useForm } from "react-hook-form";
import { IPet } from "../../../model/pet";
import { defaultPet } from "../../../utils/default-pet";
import dayjs from "dayjs";

export const AddPet = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange", defaultValues: defaultPet });
  const onSubmit = (data: IPet) => {
    console.log(data);
  };

  const now = dayjs().format("YYYY-MM-DD");

  
  return (
    <div>
      <h2>Add pet in the PetBook</h2>
      <form>
        {" "}
        <div className="row">
          <label htmlFor="name"> Insert name </label>
          <input
            id="name"
            {...register("name", {
              required: { value: true, message: " Fiel required" },
              minLength: { value: 1, message: " Minimum 1 char" },
            })}
            placeholder="Name"
          />
          {errors.name?.message}
        </div>
        <div className="row">
          <label htmlFor="type"> Type</label>
          <select
            {...register("type", { required: true })}
            placeholder="type"
          >
            <option value="CAT">Cat</option>
            <option value="DOG">Dog</option>
          </select>
        </div>
        <div className="row">
          <label htmlFor="breed"> Insert breed </label>
          <input
            id="breed"
            {...register("breed", {
              required: { value: true, message: " Field required" },
            })}
            placeholder="Breed"
          />
          {errors.breed?.message}
        </div>
        <div className="row">
          <label htmlFor="birthDate">Insert the birthdate</label>
          <input
            id="birthDate"
            type="date"
            max={now}
            {...register("birthDate", {
              required: { value: true, message: "Field required" },
            })}
            placeholder="Birthdate"
          />
          {errors.birthDate && errors.birthDate.message}
        </div>
        <button className="btnCreate" disabled={!isValid} onClick={handleSubmit(onSubmit)}>
          Create your pet profile
        </button>
      </form>
    </div>
  );
};
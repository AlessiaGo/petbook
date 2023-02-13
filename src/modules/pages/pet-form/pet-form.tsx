import {useForm} from "react-hook-form";
import dayjs from "dayjs";
import axios from "axios";
import {IPet} from "../../../model/pet";
import { useNavigate } from "react-router-dom";
import { useState,  } from "react";
import { confirmAlert } from 'react-confirm-alert';
import { Pets } from "../pet";
import { PetCardDetail } from "../details/pet-card-detail";



type Tprops = {
  defaultValues: IPet;
};


type TPostPetState = {
  saving: boolean;
  error: boolean;
};

type TDeletePetState = {
  deleting : boolean;
  error: boolean;
}

export const PetForm = (props: Tprops) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm({ mode: "onChange", defaultValues: props.defaultValues });
  const [petState, setPetState] = useState<TPostPetState>({
    saving: false,
    error: false,
  });
  const [petDeleteState, setPetDeleteState] = useState<TDeletePetState>({
    deleting: false,
    error: false,
  });

  const navigate = useNavigate();

    const savePet = async (data : IPet) => {
      setPetState({
        ...petState,
        saving: true,
      });
      try {
        const res = props.defaultValues._id
          ? await axios.put(`http://localhost:3000/animal/:_id`, data)
          : await axios.post(`http://localhost:3000/animal`, data);
          setPetState({
          ...petState,
          saving: false,
        });
        const _id = res.data._id;
        navigate(`/animal/${_id}`);
      } catch (error) {
        setPetState({
          ...petState,
          saving: false,
          error: true,
        });
      }
    };
  


  const Delete = async () => {
    setPetDeleteState({
      ...petState,
      deleting: true,
    });


    try {
      const res = await axios.delete(
        `http://localhost:3000/animal/${props.defaultValues._id}`
      );
     setPetDeleteState({
        ...petState,
        error: false,
        deleting: false,
      });
      console.log(res);
      if (res.data === true) {
      }
      navigate(`/animal`);
    } catch (error) {
      setPetDeleteState({
        ...petState,
        deleting: false,
        error: true,
      });
      console.log(error);
    }
 
  };


  const confirm = () => {
    confirmAlert({
      title: 'Are you sure you want to delete the pet?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => Delete()
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    });
  }



  const watchImage = watch("imgUrl");
  const watchType = watch("type");
  const text = props.defaultValues._id ? "Edit" : "create profile";
  const now = dayjs().format("YYYY-MM-DD");
 
  return (
    <div className="formdetail">
      <form>
        {" "}
        <div className="row">
          <label htmlFor="name"> Insert name: </label>
          <input
            {...register("name", {
              required: { value: true, message: " Field required" },
              minLength: { value: 1, message: " Minimum 1 chars" },
            })}
            placeholder="Name"
          />
          {errors.name?.message}
        </div>


        <div className="row">
          <label htmlFor="type">Insert Type</label>

          <select {...register("type", { required: true })}>

            <option value="CAT">CAT</option>
            <option value="DOG">DOG</option>
          </select>
        </div>

        {watchType && (
          <div className="row">
            <label htmlFor="breed"> Breed </label>
            <select
              {...register("breed", {
                required: { value: true, message: "Field required" },
              })}
            >
              {watchType === "CAT" ? (
                <>
                  <option value="">None</option>
                  <option value="Persian">Persian</option>
                  <option value="Siamese">Siamese</option>
                  <option value="Abyssinian">Abyssinian</option>
                  
                </>
              ) : (
                <>
                  <option value="">None</option>
                  <option value="JackRussel">Jack Russel</option>
                  <option value="Pinscher">Pinscher</option>
                  <option value="Pitbull">Pitbull</option>
                </>
              )}
            </select>
          </div>
        )}


        <div className="row">
          <label htmlFor="birthDate">Insert birthdate</label>
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
        <div className="row">
          <label htmlFor="description"> Description </label>
          <input
            {...register("description", {
              required: {
                value: true,
                message: " Field required",
              },
              minLength: { value: 10, message: " Minimum 10 chars" },
            })}
            placeholder="Description"
          />
          {errors.description?.message}
        </div>


        <div className="row">
          <label htmlFor="image">Insert Image url:</label>
          <input
            id="image"
            {...register("imgUrl", {
              required: { value: true, message: "Field required" },
            })}
            placeholder="Image"
          />
          {errors.imgUrl?.message}
        </div>
        <div className="row">
          {watchImage && (
            <img className="preview-image" src={watchImage} alt="" />
          )}
        </div>


        <div className="row">
          <label htmlFor="pedigree">Does your pet have a pedrigee?</label>
          <input
            id="pedigree"
            type="checkbox"
            {...register("pedigree", {
              required: { value: false, message: "Field required" },
            })}
          />
        </div>
        <button className="btn1"
        disabled={!isValid || petState.saving} onClick={handleSubmit(savePet)}>
          {text}
        </button>
      </form>
      <div>
      {" "}
        {props.defaultValues.name && (
          <button 
          className="btn2" onClick={confirm} disabled={petDeleteState.deleting}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
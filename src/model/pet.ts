export interface IPet {
  _id?: string;
  name: string;
  type: "CAT" | "DOG"| null;
  breed: string;
  birthDate: string;
  imgUrl: string,
  description: string,
  pedigree: boolean,
}

export interface INewPet extends IPet {
  created_at: string;
  updated_at: string;
}
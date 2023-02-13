import { Routes, Route } from 'react-router-dom';
import { PetCardDetail } from './modules/pages/details/pet-card-detail';
import { Homepage } from './modules/pages/homepage';
import { NotFound } from './modules/pages/not-found';
import { Pets } from './modules/pages/pet';
import { PetForm } from './modules/pages/pet-form/pet-form';
import { EditPet } from './modules/pages/details/edit-pet';
import { defaultPet } from './utils/default-pet';
import { DeleteCompl } from './modules/pages/details/del-complete';




export const AppRoutes = () => {
    return (
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/pet"element={<Pets />} />
      <Route path="/pet/:_id" element={<PetCardDetail />} />
      <Route path="/pet/:_id/edit" element={<EditPet />} />
      <Route path="new" element={<PetForm defaultValues={defaultPet} />} />
      <Route path='animal/:_id' element={<PetCardDetail />} />
      <Route path='animal' element ={<DeleteCompl />} />
      </Routes>

    )
}

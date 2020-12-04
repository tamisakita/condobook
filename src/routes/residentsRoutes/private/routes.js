import { Router } from 'express';

import ResidentEntity from '../../../models/Residents';
import residentMapper from '../../../mappers/residents.mapper';

import residentsService from '../../../services/residents.service';
import ApplicantionError from '../../../errors/ApplicationError';

const router = Router();

router.post('/register', ResidentEntity.validateRegisterParams , async (req, res, next) => {
  try {
    const role = req.user.role
      if (role === "síndico") {
        const { body } = req;

        await residentsService.register(body);
        return res.status(201).json({ message: 'Resident created' });
      }else{
        return res.status(403).json({message:"Access Denied"});
      }
    
  } catch (error) {
    return next(new ApplicantionError(error));
  }
});

router.get('/list', async (req, res, next) => {
  try {
    const role = req.user.role
      if (role === "síndico") {
      const { search } = req.query;

      const mappedSearch = search.trim();

      const residents = await residentsService.get(mappedSearch);

      return res.status(200).json(residents);
      }else{
        return res.status(403).json({message:"Access Denied"});
      }
  } catch (error) {
    return next(new ApplicantionError(error))
  }
})

router.put('/update/:id', async (req, res, next) => {
  try {
    const role = req.user.role
      if (role === "síndico") {
        const { id } = req.params;
        const { body } = req;

        const mappedBody = residentMapper.updateOne(body);
  
        const updatedResident = await residentsService.updateOne(id, mappedBody);

        return res.status(200).json(updatedResident);
      }else{
        return res.status(403).json({message:"Access Denied"});
      }
  } catch (error) {
    return next(new ApplicantionError(error))
  }
})

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const role = req.user.role
      if (role === "síndico") {
        const { id } = req.params;

        await residentsService.deleteOne(id);

        return res.status(200).json({ message: 'Resident deleted' });
      }else{
        return res.status(403).json({message:"Access Denied"});
      }
  } catch (error) {
    return next(new ApplicantionError(error))
  }
})

export default router;


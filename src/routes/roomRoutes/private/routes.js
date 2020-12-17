import { Router } from 'express';

import RoomsService from '../../../services/rooms.service';

import ApplicationError from '../../../errors/ApplicationError';

const router = Router();


router.get('/list', async (req, res, next) => {
    try {
  
      const rooms = await RoomsService.get();
  
      return res.status(200).json(rooms);
    } catch (error) {
      return next(new ApplicationError(error));
    }
  });

router.post('/create', async (req, res, next) => {
    try {
      const role = req.user.role
      if (role === "sindico") {
        const newRoomInfo = req.body;
  
        await RoomsService.create(newRoomInfo);
  
        return res.status(201).json();
      } else{
        return res.status(403).json({message:"Access Denied"});
      }
      
    } catch (error) {
      return next(new ApplicationError(error));
    }
  });  

router.put('/update/:id',async (req, res, next) => {
    try {
      const role = req.user.role
      if (role === "sindico") {
        const { id } = req.params;
        const updateObject = req.body;
  
        const updatedRoom = await projectsService.updateOne(updateObject, id);
  
        return res.status(200).json(updatedRoom);
      }else{
        return res.status(403).json({message:"Access Denied"});
      }

    } catch (error) {
      return next(new ApplicationError(error));
    }
  });

router.delete('/delete/:id', async (req, res, next) => {
    try {
      const role = req.user.role
      if (role === "sindico") {
        const { id } = req.params;
  
        await RoomsService.deleteOne(id);
  
        return res.status(200).json();
      }else{
        return res.status(403).json({message:"Access Denied"});
      }

    } catch (error) {
      return next(new ApplicationError(error));
    }
  });

export default router;


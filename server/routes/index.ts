import express from 'express';

import * as optionCtrl from '../controllers/option-ctrl';

export const optionRouter = express.Router();

optionRouter.post('/member', optionCtrl.createMember);
optionRouter.get('/member', optionCtrl.readMember);
optionRouter.put('/member/:id', optionCtrl.updateMember);
optionRouter.delete('/member/:id', optionCtrl.deleteMember);

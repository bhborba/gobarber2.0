import { Router } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '@modules/users/services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const createSession = container.resolve(CreateSessionService);

  const { user, token } = await createSession.execute({
    email,
    password,
  });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;

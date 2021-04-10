
import { NextApiRequest, NextApiResponse } from "next";

import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import { PrismaClient, Prisma } from '@prisma/client';
import authService from '../../../services/auth';
import authConfig from '../../../config/auth';
import Messages from "../../messages";

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    const schema = Yup.object().shape({
      cpf: Yup.string().min(11).max(14).required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: Messages.MSG_A002 });
    }

    const { email, password } = request.body;

    const usuario = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!usuario) {
      return response.status(400).json({ error: 'Não foi encontrado um usuário com este email' });
    }

    if (!(await authService.checkPassword(password, usuario.password))) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = usuario;

    await prisma.$disconnect();

    return response.status(200).json({
      usuario: {
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
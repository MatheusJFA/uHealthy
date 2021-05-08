
import { NextApiRequest, NextApiResponse } from "next";

import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import { PrismaClient, Prisma } from '@prisma/client';
import authService from '../../../services/auth';
import authConfig from '../../../config/auth';

import Messages from '../../../utils/messages';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    const schema = Yup.object().shape({
      cpf: Yup.string().min(11).max(14).required(Messages.MSG_E003("CPF")),
      password: Yup.string().required(Messages.MSG_E003("Senha")),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).send(Messages.MSG_A002);
    }

    const { cpf, password } = request.body;

    const user = await prisma.user.findFirst({
      where: {
        cpf,
      },
    });

    if (!user) {
      return response.status(400).json({ error: Messages.MSG_E007 });
    }

    if (!(await authService.checkPassword(password, user.password))) {
      return response.status(401).json({ error: Messages.MSG_E005 });
    }

    await prisma.$disconnect();

    const { id, name, email, } = user;

    return response.status(200).send({
      token: jwt.sign({ id, name, email, cpf }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
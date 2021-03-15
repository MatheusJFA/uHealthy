import { NextApiRequest, NextApiResponse } from "next";

import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
  var today = new Date();

  if (request.method === "POST") {
    const schema = Yup.object().shape({
      cpf: Yup.string().max(14).required(),
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).max(15).required('Password is required'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      phone: Yup.string().required(),
      birthDate: Yup.date().required().max(today)
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validação falhou' });
    }

    let { cpf, name, email, password, phone, birthDate } = request.body;

    const usuarioExiste = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { cpf },
        ],
      },
    });

    if (usuarioExiste) {
      return response.status(400).json({ error: 'Usuário ja existe' });
    }

    birthDate = new Date(birthDate).toISOString() as any;

    const usuario = await prisma.user.create({
      data: {
        cpf,
        name,
        email,
        password: await bcrypt.hash(password, 8),
        phone,
        birthDate
      },
    });

    delete usuario.password;

    await prisma.$disconnect()

    return response.status(200).send({ usuario });
  }
}
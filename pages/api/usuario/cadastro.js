import bcrypt from 'bcryptjs';
import * as Yup from 'yup';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (request, response) => {
  if (request.method === "POST") {
    const schema = Yup.object().shape({
      cpf: Yup.string().max(14).required(),
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).max(15).required('Password is required'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      phone: Yup.string().required(),
      birthDate: Yup.date().required()
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validação falhou' });
    }

    const { cpf, name, email, password, phone, birthDate } = request.body;

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

    response.status(200).json(usuario.name, usuario.email);
  }
}
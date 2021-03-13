import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async (request, response) => {
  if (request.method === "POST") {
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

    response.status(200).json(usuario);
  }
}
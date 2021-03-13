import { PrismaClient, Prisma } from '@prisma/client';

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
        password,
        phone,
        birthDate
      },
    });

    response.status(200).json(usuario);
  }
}
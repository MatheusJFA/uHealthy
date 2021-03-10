import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (request, response) => {
  const { cpf, name, email, password } = request.body;

  const usuarioExiste = await prisma.user.findFirst({ where: { email } });

  if (usuarioExiste) {
    return response.status(400).json({ error: 'Usuário ja existe' });
  }

  const usuario = await prisma.user.create({
    data: {
      cpf,
      name,
      email,
      password
    },
  });

  response.status(200).json(usuario);
}
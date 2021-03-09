import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  const { cpf, nome, email, senhaConfirmacao, senha } = req.body;

  const usuarioExiste = await prisma.User.findUnique({ where: { email: req.body.email } });

  if (usuarioExiste) {
    return res.status(400).json({ error: 'Usuário ja existe' });
  }

  const usuario = await prisma.User.create({
    data: {
      cpf,
      nome,
      email,
      senhaConfirmacao,
      senha
    },
  });

  res.status(200).json(usuario);
}
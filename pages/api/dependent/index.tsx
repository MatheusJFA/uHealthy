import { NextApiRequest, NextApiResponse } from "next";

import * as Yup from 'yup';

import Messages from '../../../utils/messages';

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {

  try {
    var today = new Date();

    if (request.method === "POST") {
      const schema = Yup.object().shape({
        userId: Yup.number().required(),
        name: Yup.string().required(),
        cpf: Yup.string().required(),
        birthDate: Yup.date().required().max(today),
      });

      if (!(await schema.isValid(request.body))) return response.status(400).json({ error: Messages.MSG_A002 });

      let { userId, name, cpf, birthDate } = request.body;

      const userExists = await prisma.user.findFirst(
        {
          where: {
            id: userId
          },
        });

      if (!userExists) return response.status(400).json({ error: Messages.MSG_E001("Usuario") });

      birthDate = new Date(birthDate).toISOString() as any;

      const dependentExists = await prisma.dependent.findFirst(
        {
          where: {
            AND: [
              { userId },
              { cpf },
            ], 
          }
        }
      );

      if (dependentExists) return response.status(400).json({ error: Messages.MSG_E000("Dependente") });

      const dependent = await prisma.dependent.create({
        data: {
          userId,
          name,
          cpf,
          birthDate
        },
      });

      await prisma.$disconnect()

      return response.status(200).send({ dependente: dependent });
    }

    if (request.method === "GET") {
      const schema = Yup.object().shape({
        userId: Yup.number().required(),
      });

      if (!(await schema.isValid(request.query))) {
        return response.status(400).send(Messages.MSG_E003("userId"));
      }

      const { userId } = request.query;

      const userExists = await prisma.user.findFirst({
        where: {
          id: Number(userId)
        }
      })

      if (!userExists) {
        return response.status(400).json({ error: Messages.MSG_E007 });
      }

      const dependents = await prisma.dependent.findMany({
        where: {
          userId: Number(userId)
        }
      });

      if (!dependents) {
        return response.status(400).json({ error: Messages.MSG_E010 });
      }

      await prisma.$disconnect();

      return response.status(200).send({ dependentes: dependents });
    }

  } catch (error) {
    response.status(500).json({ error: error });
  }
}
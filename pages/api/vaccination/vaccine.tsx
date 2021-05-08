import { NextApiRequest, NextApiResponse } from "next";

import * as Yup from 'yup';
import { PrismaClient, Prisma } from '@prisma/client';

import Messages from '../../../utils/messages';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "GET") {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(request.query))) {
      return response.status(400).send({ error: Messages.MSG_E003("id") });
    }

    const { id } = request.query;

    const vaccination = await prisma.vaccination.findFirst(
      {
        where: {
          id: Number(id),
        },
      });

    if (!vaccination) return response.status(400).json({ error: Messages.MSG_E001("Vacinação") });

    await prisma.$disconnect();

    return response.status(200).send({ vaccination });
  }
}
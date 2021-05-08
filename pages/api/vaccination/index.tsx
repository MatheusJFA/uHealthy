import { NextApiRequest, NextApiResponse } from "next";

import * as Yup from 'yup';
import { PrismaClient, Prisma } from '@prisma/client';

import Messages from '../../../utils/messages';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "GET") {
    const schema = Yup.object().shape({
      userId: Yup.number().required(),
    });

    if (!(await schema.isValid(request.query))) {
      return response.status(400).send({ error: Messages.MSG_E003("userId") });
    }

    const { userId } = request.query;

    const userExists = await prisma.user.findFirst(
      {
        where: {
          id: Number(userId),
        },
      });

    if (!userExists) return response.status(400).json({ error: Messages.MSG_E007 });

    const vaccinations = await prisma.vaccination.findMany({
      where: {
        userId: Number(userId),
      },
    });

    if (!vaccinations) {
      return response.status(400).json({ error: Messages.MSG_E008 });
    }

    await prisma.$disconnect();

    return response.status(200).send({ vaccinations: vaccinations });
  }

  if (request.method === "POST") {
    const schema = Yup.object().shape({
      userId: Yup.number().required(Messages.MSG_E003("userId")),
      vaccineName: Yup.string().required(Messages.MSG_E003("vaccineName")),
      vaccineType: Yup.string().required(Messages.MSG_E003("vaccineType")),
      vaccineManufacturer: Yup.string(),
      vaccineDoses: Yup.array().of(Yup.string()),
      vaccineMandatory: Yup.boolean().required(Messages.MSG_E003("vaccineMandatory")),
      vaccinationLocal: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: Messages.MSG_A002 });
    }

    const {
      userId,
      vaccineName,
      vaccineType,
      vaccineManufacturer,
      vaccineMandatory,
      vaccineDoses,
      vaccinationLocal
    } = request.body;

    const userExists = await prisma.user.findFirst(
      {
        where: {
          id: userId
        },
      });

    if (!userExists) return response.status(400).json({ error: Messages.MSG_E007 });

    const vaccinationExists = await prisma.vaccination.findFirst({
      where: {
        AND: [
          { userId },
          { vaccineName },
          { vaccineType },
          { vaccineManufacturer }
        ],
      },
    });

    if (vaccinationExists) {
      return response.status(400).json({ error: Messages.MSG_E000("Vacina", false) });
    }

    const vaccination = await prisma.vaccination.create({
      data: {
        userId,
        vaccineName,
        vaccineType,
        vaccineManufacturer,
        vaccineMandatory,
        vaccineDoses,
        vaccinationLocal
      }
    });

    await prisma.$disconnect();

    return response.status(200).send({ vaccination: vaccination });
  }

  if (request.method === "PUT") {
    const schema = Yup.object().shape({
      id: Yup.number().required(Messages.MSG_E003("id")),
      vaccineName: Yup.string(),
      vaccineType: Yup.string(),
      vaccineManufacturer: Yup.string(),
      vaccineMandatory: Yup.boolean(),
      vaccineDoses: Yup.array().of(Yup.string()),
      vaccinationLocal: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: Messages.MSG_A002 });
    }

    const {
      id,
      userId,
      vaccineName,
      vaccineType,
      vaccineManufacturer,
      vaccineMandatory,
      vaccineDoses,
      vaccinationLocal
    } = request.body;

    let vaccinationExists = await prisma.vaccination.findFirst({
      where: {
        id,
      },
    });

    if (!vaccinationExists) {
      return response.status(400).json({ error: Messages.MSG_E001("Vacina") });
    }

    vaccinationExists = await prisma.vaccination.findFirst({
      where: {
        AND: [
          { userId },
          { vaccineName },
          { vaccineType },
          { vaccineManufacturer }
        ],
      },
    });

    if (id !== vaccinationExists.id) {
      return response.status(400).json({ error: Messages.MSG_E009 });
    }

    const vaccination = await prisma.vaccination.update({
      where: {
        id,
      },
      data: {
        userId,
        vaccineName,
        vaccineType,
        vaccineManufacturer,
        vaccineMandatory,
        vaccineDoses,
        vaccinationLocal
      }
    });

    await prisma.$disconnect();

    return response.status(200).send({ vaccination: vaccination });
  }

  if (request.method === "DELETE") {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).send(Messages.MSG_E003("id"));
    }

    const { id } = request.body;

    let vaccinationExists = await prisma.vaccination.findFirst({
      where: {
        id,
      },
    });

    if (!vaccinationExists) {
      return response.status(400).json({ error: Messages.MSG_E001("Vacina") });
    }

    const vaccination = await prisma.vaccination.delete({
      where: {
        id,
      },
    });

    await prisma.$disconnect();

    return response.status(200).send(Messages.MSG_SUCCESS_MESSAGE("Vacinação", "deletada"));
  }
}
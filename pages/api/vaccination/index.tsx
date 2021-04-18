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
      return response.status(400).send({ error : Messages.MSG_E003("userId")});
    }

    const { userId } = request.query;

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
      userId: Yup.number().required(),
      vaccineName: Yup.string().required(),
      vaccineType: Yup.string().required(),
      vaccineManufacturer: Yup.string(),
      vaccineMandatory: Yup.boolean().required(),
      vaccineDoses: Yup.array().of(Yup.date()),
      vaccinationDate: Yup.date().required(),
      vaccinationLocal: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).send(Messages.MSG_E003("userId"));
    }

    const {
      userId,
      vaccineName,
      vaccineType,
      vaccineManufacturer,
      vaccineMandatory,
      vaccineDoses,
      vaccinationDate,
      vaccinationLocal
    } = request.body;

    const vaccinationExists = await prisma.vaccination.findFirst({
      where: {
        userId,
        OR: [
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
        vaccinationDate,
        vaccinationLocal
      }
    });

    await prisma.$disconnect();

    return response.status(200).send({ vaccination: vaccination });
  }

  if (request.method === "PUT") {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      vaccineName: Yup.string(),
      vaccineType: Yup.string(),
      vaccineManufacturer: Yup.string(),
      vaccineMandatory: Yup.boolean(),
      vaccineDoses: Yup.array().of(Yup.date()),
      vaccinationDate: Yup.date(),
      vaccinationLocal: Yup.string(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).send(Messages.MSG_E003("id"));
    }

    const {
      id,
      userId,
      vaccineName,
      vaccineType,
      vaccineManufacturer,
      vaccineMandatory,
      vaccineDoses,
      vaccinationDate,
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
        userId,
        OR: [
          { vaccineName },
          { vaccineType },
          { vaccineManufacturer }
        ],
      },
    });

    if (vaccinationExists) {
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
        vaccinationDate,
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

    const {
      id,

    } = request.body;

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

    return response.status(200).send(Messages.MSG_S003);
  }
}
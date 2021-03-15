import { PrismaClient, Prisma } from '@prisma/client';
import { request } from 'node:http';
import * as Yup from 'yup';

const prisma = new PrismaClient();

enum VaccineType {
    MANDATORY,
    OTHERS
  }

export default async (request, response) => {
    if (request.method ==="POST") {
        const schema = Yup.object().shape({
           name: Yup.string().required(),
           type: Yup.string().required(),
           manufacturer: Yup.string().required()
        })
        
        if (!(await schema.isValid(request.body))) {
            return response.status(400).jason({error: 'Validação falhou' });
        }

    const {name, type, manufacturer } = request.body;

    const vacinaExiste = await prisma.vaccine.findFirst({
        where: {
            OR: [
                { name },
                { type },
                {manufacturer}
            ],
        },
    });

if (vacinaExiste) {
    return response.status(400).json({ error: 'Vacina já existe'});
}

const vacina = await prisma.vaccine.create({
    data: {
        name,
        type,
        manufacturer
    }

});

}



}


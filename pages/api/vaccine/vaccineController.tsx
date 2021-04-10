import { PrismaClient, Prisma } from '@prisma/client';
import * as Yup from 'yup';
import Messages from '../../messages';

const prisma = new PrismaClient();

// export default async (request, response) => {
//     if (request.method === "POST") {
//         const schema = Yup.object().shape({
//             name: Yup.string().required(),
//             type: Yup.string().required(),
//             manufacturer: Yup.string().required(),
//             mandatory: Yup.bool().required(),
//         })

//         if (!(await schema.isValid(request.body))) {
//             return response.status(400).jason({ error: 'Validação falhou' });
//         }

//         const { name, type, manufacturer, mandatory } = request.body;

//         const vaccineExists = await prisma.vaccine.findFirst({
//             where: {
//                 OR: [
//                     { name },
//                 ],
//             },
//         });

//         if (vaccineExists) {
//             return response.status(400).json({ error: Messages.MSG_E000("Vacina", false)});
//         }

//         // const vaccine = await prisma.vaccine.create({
//         //     data: {
//         //         vaccineName,
//         //         vaccineType,
//         //         vaccineManufacturer,
//         //         vaccineMandatory,
//         //         vaccineDoses,
//         //         vaccinationDate,
//         //         vaccinationLocal,
//         //     }
//         // });

//         await prisma.$disconnect();

//         // return response.status(200).json(vaccine);
//     }
// }


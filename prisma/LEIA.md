yarn prisma studio
yarn prisma migrate dev --preview-feature  --name alteracao_campo 

yarn prisma migrate resolve --applied 20210309215347_create_database --preview-feature

yarn prisma db push --preview-feature
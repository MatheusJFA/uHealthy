1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, 
mysql or sqlite.
3. Run yarn prisma introspect to turn your database schema into a Prisma data model.
4. Run yarn prisma generate to install Prisma Client. You can then start querying your database. 


#Colocar no Docker o comando.
docker run --name uHealthy -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

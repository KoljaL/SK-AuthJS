rm prisma/dev.db
rm -r prisma/migrations
npx prisma migrate dev --name init --skip-seed
# npm run dev


# npx prisma migrate dev --name init
# rm prisma/dev.db-journal
# npx prisma generate
# npx prisma migrate dev --name init
# npx prisma db seed
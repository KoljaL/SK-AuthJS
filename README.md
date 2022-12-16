# SvelteKit + AuthJS example

Authenticate user via [AuthJS-SvelteKit](https://authjs.dev/reference/sveltekit/) and store them in a SQLite database via [Prisma](https://authjs.dev/reference/adapters/prisma).   
Did not work right out of the box, but with a little [help](https://github.com/nextauthjs/next-auth/issues/6076).   


## ToDO
- [x] connecting SvelteKit, AuthJS and Prisma
- [ ] make protected routes secure via [await parent()](https://www.youtube.com/watch?v=UbhhJWV3bmI)
- [ ] Authenticate via GitHub OAuth
- [ ] Authenticate via email & password
- [ ] Verification Mail
- [ ] Seed-data aka user, posts, comments, etc
- [ ] 



## Usage
`npm install` and reset Prisma

### reset Prisma
removes migrations, database-file and starts dev server\
`bash resetdb.sh`



## Notes


#### `package.json` 
do we need this?   
`prisma-adapter` is manually added in `lib/server/PrismaAdapter`   
and `next-auth` is replaced with `@auth/core`   

```JSON
"@next-auth/prisma-adapter": "^1.0.5",
"next-auth": "^4.18.6"
```
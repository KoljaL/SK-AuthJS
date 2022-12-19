// https://100lvlmaster.medium.com/seeding-nestjs-with-prisma-and-faker-af6a36a3954d
// https://www.w3schools.com/js/js_random.asp
// https://github.com/ctrlplusb/prisma-pg-jest/blob/master/prisma/seed.ts

import { faker } from '@faker-js/faker'

import { PrismaClient } from '@prisma/client'
import { users, tags, categories, topics, comments } from './data.js'
import { USER, CATEGORIES, TAGS } from './faker.js'
const prisma = new PrismaClient()

async function load () {
	//
	// delete existing tables
	//
	// console.log('Deleted old tables')
	// await prisma.user.deleteMany()
	// await prisma.session.deleteMany()
	// await prisma.tag.deleteMany()

	//
	// reset auto increment
	//
	// await prisma.$queryRaw`ALTER TABLE Tag AUTO_INCREMENT = 1`
	// const result = await prisma.$queryRaw`SELECT * FROM User`
	// console.log(result)

	//
	// TAGS
	//
	console.log('\n\nCreating tags')
	TAGS.forEach(async tag => {
		await prisma.tag.create({ data: tag }).then(() => {
			console.log(`Tag ${tag.name} created!`)
		})
	})

	//
	// categories
	//
	console.log('\n\nCreating categories')
	CATEGORIES.forEach(async cat => {
		await prisma.category.create({ data: cat }).then(() => {
			console.log(`Category ${cat.name} created!`)
		})
	})

	console.log('\n\nCreating users')
	USER.forEach(async user => {
		await prisma.user.create({ data: user }).then(() => {
			console.log(`User ${user.name} created!`)
		})
	})
}

load()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})

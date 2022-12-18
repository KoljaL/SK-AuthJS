import { faker } from '@faker-js/faker'

import { PrismaClient } from '@prisma/client'
import { users, tags, categories, topics, comments } from './data.js'
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
	// USER
	//
	console.log('\n\nCreating users')
	users.forEach(async user => {
		await prisma.user.create({ data: user }).then(() => {
			console.log(`User ${user.name} created!`)
		})
	})

	//
	// TAGS
	//
	console.log('\n\nCreating tags')
	tags.forEach(async tag => {
		await prisma.tag.create({ data: tag }).then(() => {
			console.log(`Tag ${tag.name} created!`)
		})
	})

	//
	// categories
	//
	console.log('\n\nCreating categories')
	categories.forEach(async cat => {
		await prisma.category.create({ data: cat }).then(() => {
			console.log(`Category ${cat.name} created!`)
		})
	})

	//
	// topics
	//
	// console.log('\n\nCreating topics')
	// topics.forEach(async topic => {
	// 	await prisma.topic.create({ data: topic }).then(() => {
	// 		console.log(`Topic ${topic.name} created!`)
	// 	})
	// })
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

// FAKER JS
// const USERS = []
// function createRandomUser () {
// 	return {
// 		userId: faker.datatype.uuid(),
// 		username: faker.internet.userName(),
// 		email: faker.internet.email(),
// 		avatar: faker.image.avatar(),
// 		password: faker.internet.password(),
// 		birthdate: faker.date.birthdate(),
// 		registeredAt: faker.date.past()
// 	}
// }
// Array.from({ length: 10 }).forEach(() => {
// 	USERS.push(createRandomUser())
// })
// console.log(USERS)

//
//
// OLD CODE
//

// } catch (e) {
// 	console.error(e)
// 	process.exit(1)
// } finally {
// 	await prisma.$disconnect()
// }

// await load().then(async () => {
// 	console.log('Done')
// 	const result = await prisma.$queryRaw`SELECT * FROM User ORDER BY RANDOM() LIMIT 1;`
// 	console.log('result', result)
// })

// results = await prisma
// 	.$queryRawUnsafe(
// 		// DO NOT pass in or accept user input here
// 		`SELECT * FROM "User" ORDER BY RANDOM() LIMIT 30;`
// 	)
// 	.then(results => {
// 		console.log(results)
// 	})
// topics.forEach(async topic => {
// 	// add user to topic
// 	topic.user = { connect: { id: 1 } }

// 	console.log(`Topic ${JSON.stringify(topic, null, 2)}`)
// })

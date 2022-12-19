// https://100lvlmaster.medium.com/seeding-nestjs-with-prisma-and-faker-af6a36a3954d
// https://www.w3schools.com/js/js_random.asp
// https://github.com/ctrlplusb/prisma-pg-jest/blob/master/prisma/seed.ts

import { faker } from '@faker-js/faker'

import { PrismaClient } from '@prisma/client'
// import { users, tags, categories, topics, comments } from './data.js'
import { USER, CATEGORIES, TAGS, COMMENTS } from './faker.js'
const prisma = new PrismaClient()

console.log('\n\n \n//\n//\n//\n//\n// SEEDED DATA\n//\n//\n//\n//\n')

// delete existing tables
// await prisma.tag.deleteMany()
// reset auto increment
// await prisma.$queryRaw`ALTER TABLE Tag AUTO_INCREMENT = 1`

//
// MAKE TAGS
//
async function makeTags () {
	console.log('\n\nCreating Tags')
	for (const tag of TAGS) {
		await prisma.tag.create({ data: tag }).then(() => {
			console.log(`Tag ${tag.name} created!`)
		})
	}
	console.log('Tag finished')
}

//
// MAKE CATEGORIES
//
async function makeCats () {
	console.log('\n\nCreating Cats')
	for (const cat of CATEGORIES) {
		await prisma.category.create({ data: cat }).then(() => {
			console.log(`Cat ${cat.name} created!`)
		})
	}
	console.log('Cat finished')
}

//
// MAKE USERS
//
async function makeUser () {
	console.log('\n\nCreating users')
	for (const user of USER) {
		await prisma.user.create({ data: user }).then(() => {
			console.log(`User ${user.name} created!`)
		})
	}
	console.log('User finished')
}

//
// MAKE COMMENTS
//
async function makeComments (randTopic, randUser) {
	console.log('\n\nCreating comments')
	for (const comment of COMMENTS) {
		comment.topic_id = randTopic
		comment.user_id = randUser
		console.log(comment)
		await prisma.comment.create({ data: comment })
		// increment comment count for topic
		await prisma.topic.update({
			where: { id: randTopic },
			data: { comment_count: { increment: 1 } }
		})
		// incfease comment count for User
		await prisma.user.update({
			where: { id: randUser },
			data: { comment_count: { increment: 1 } }
		})
	}
	console.log('Comment finished')
}

//
// GET TOPICS
//
async function getTopics () {
	const topics = await prisma.$queryRaw`SELECT * FROM Topic`
	return topics
}

//
// GET USER
//
async function getUser () {
	const user = await prisma.$queryRaw`SELECT * FROM User`
	return user
}

async function seed () {
	await makeCats()
	await makeTags()
	await makeUser()
	const DB_TOPICS = await getTopics()
	const DB_USERS = await getUser()
	// console.log(DB_TOPICS)
	console.log(DB_USERS.length)

	for (let i = 0; i < 150; i++) {
		const randUser = DB_USERS[Math.floor(Math.random() * DB_USERS.length)].id
		const randTopic = DB_TOPICS[Math.floor(Math.random() * DB_TOPICS.length)].id

		await makeComments(randTopic, randUser)
	}
}

seed()
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
	.finally(async () => {
		console.log('\n\n all done -> Disconnecting')
		await prisma.$disconnect()
	})

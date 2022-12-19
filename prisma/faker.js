// https://100lvlmaster.medium.com/seeding-nestjs-with-prisma-and-faker-af6a36a3954d
// https://www.w3schools.com/js/js_random.asp
// https://github.com/ctrlplusb/prisma-pg-jest/blob/master/prisma/seed.ts

import { faker } from '@faker-js/faker'
import { users, tags, categories, topics, comments } from './data.js'

////////////////////////

/**
 *
 * Create a random number
 * @param {number} min
 * @param {number} max
 * @returns {number} random number
 *
 */
function rnd (min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}
// console.log(rnd(1, 10))

/**
 *
 * Create a random category
 * @returns {string} category
 *
 */
// prettier-ignore
const fakeCatsArray = ['red','orange','yellow','green','blue','indigo','violet','black','white','gray']
function randomCategory () {
	const category = fakeCatsArray[rnd(0, categories.length - 1)]
	return category
}

/**
 *
 * Create a random number of categories
 * @returns {array} categories
 *
 */
function createCategories () {
	const fakeCategories = []

	for (let i = 0; i < fakeCatsArray.length; i++) {
		const category = {
			name: fakeCatsArray[i],
			slug: faker.helpers.slugify(fakeCatsArray[i]),
			description: faker.lorem.sentence(),
			count: 0
		}
		fakeCategories.push(category)
	}
	return fakeCategories
}
// console.log(createCategories())

/**
 *
 * Create a random number of tags
 * @returns {array} tags
 *
 */
// prettier-ignore
const fakeTagsArray = ['javascript','react','node','express','mongodb','mysql','postgresql','html','css','bootstrap','material-ui','tailwind','nextjs','vue','angular','typescript','python','django','flask','ruby','rails','php','laravel','symfony','go','rust','c','c++','c#','java','kotlin','swift','dart','flutter','aws','azure']
function randomTags () {
	const count = rnd(2, 4)
	const tags = []
	for (let i = 0; i < count; i++) {
		const tag = fakeTagsArray[rnd(0, fakeTagsArray.length - 1)]
		tags.push(tag)
	}
	return tags
}
// console.log(randomTags())

/**
 *
 * Create a random number of topics
 * @param {number} amountOfTopics
 * @returns {object} fakeTopics
 *
 */
function createTags () {
	const fakeTags = []

	for (let i = 0; i < fakeTagsArray.length; i++) {
		const tag = {
			name: fakeTagsArray[i],
			slug: faker.helpers.slugify(fakeTagsArray[i]),
			description: faker.lorem.sentence(),
			count: 0
		}
		fakeTags.push(tag)
	}
	return fakeTags
}
// console.log(createTags())

function createTopics (count) {
	const fakeTopics = []

	for (let i = 0; i < count; i++) {
		const title = faker.lorem.words(3)
		const topic = {
			title: title,
			slug: faker.helpers.slugify(title),
			excerp: faker.lorem.sentence(),
			private: false,
			tags: randomTags().toString(),
			// tags: 'tag',
			content: faker.lorem.paragraphs(),
			image: faker.image.imageUrl(),
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent(),
			comment_count: 0
			// category_id: 1
		}
		fakeTopics.push(topic)
	}
	return fakeTopics
}

// console.log(createTopics(2))

/**
 *
 * Create a random number of users
 * @param {number} amountOfUsers
 * @returns {object} fakeUser
 *
 */
function createUser (amountOfUsers) {
	const fakeUser = []

	for (let i = 0; i < amountOfUsers; i++) {
		const firstName = faker.name.firstName()
		const lastName = faker.name.lastName()

		const user = {
			name: firstName,
			email: faker.internet.email(firstName, lastName),
			image: faker.image.avatar(),
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent(),
			Topic: { create: createTopics(rnd(3, 10)) }
		}

		fakeUser.push(user)
	}
	return fakeUser
}

//
// RUN & EXPORT
//
const CATEGORIES = createCategories()
const TAGS = createTags()
const USER = createUser(1)
// console.log('\n\nUSER:\n', USER)

export { USER, CATEGORIES, TAGS }

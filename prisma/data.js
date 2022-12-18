import { Prisma } from '@prisma/client'

const users = [
	{
		name: 'Peter',
		email: 'peter@mail.com',
		image: 'http://localhost:5173/img/peter.jpg'
	},
	{
		name: 'Petra',
		email: 'petra@mail.com',
		image: 'http://localhost:5173/img/petra.jpg'
	},
	{
		name: 'Paul',
		email: 'paul@mail.com',
		image: 'http://localhost:5173/img/paul.jpg'
	},
	{
		name: 'Pia',
		email: 'pia@mail.com',
		image: 'http://localhost:5173/img/pia.jpg'
	}
]

const categories = [
	{
		name: 'Support',
		description: 'all your support questions'
	},
	{
		name: 'Events',
		description: 'where to meet up'
	}
]

const tags = [
	{
		name: 'Horse',
		slug: 'horse',
		description: 'a nice animal',
		count: 0
	},
	{
		name: 'Dog',
		slug: 'dog',
		description: 'are cute',
		count: 0
	}
]

const topics = [
	{
		title: 'My first topic',
		slug: 'my-first-topic',
		user_id: '1',
		private: false,
		tags: 'horse,dog',
		content: '# My first topic\n\nThis is my first topic. I am so excited!',
		excerp: 'This is my first topic. I am so excited!',
		created: Date.now(),
		comment_count: 0,
		category_id: 1
	},
	{
		title: 'My second topic',
		slug: 'my-second-topic',
		user_id: '2',
		private: false,
		tags: 'horse,dog',
		content: '# My second topic\n\nThis is my second topic. I am so excited!',
		excerp: 'This is my second topic. I am so excited!',
		created: Date.now(),
		comment_count: 0,
		category_id: 1
	}
]

const comments = [
	{
		created: Date.now(),
		parent: 0,
		user_id: '1',
		topic_id: 1,
		content: 'This is a comment'
	},
	{
		created: Date.now(),
		parent: 0,
		user_id: '1',
		topic_id: 1,
		content: 'This is a comment'
	}
]

export { users, tags, categories, topics, comments }

import type { PageLoad } from './$types'
import type { Actions } from './$types'
import type { PageServerLoad } from './$types'
import { sequence } from '@sveltejs/kit/hooks'
import { redirect } from '@sveltejs/kit'

// AuthJS & Prisma
import SvelteKitAuth from '@auth/sveltekit'
import { PrismaAdapter } from '$lib/server/PrismaAdapter'
import { PrismaClient } from '@prisma/client'
import GitHub from '@auth/core/providers/github'
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private'
import CredentialsProvider from '@auth/core/providers/credentials'
import type { Adapter, AdapterAccount } from '@auth/core/adapters'
const prisma = new PrismaClient()

export const load = async ({ cookies }) => {
	const user = 'x' //await db.getUserFromSession(cookies.get('sessionid'));
	return { user }
}
export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData()
		const name = data.get('name')
		const password = data.get('password')
		console.log('login', name, password)
		return { success: true }
	},
	register: async ({ cookies, request }) => {
		const data = await request.formData()
		const name = data.get('name')
		const password = data.get('password')
		console.log('login', name, password)
		const doAuth = SvelteKitAuth({
			adapter: PrismaAdapter(prisma),
			session: {
				strategy: 'database',
				generateSessionToken: () => {
					return crypto.randomUUID()
				}
			},
			providers: [
				// login via GitHub
				GitHub({
					clientId: GITHUB_ID,
					clientSecret: GITHUB_SECRET
				}),
				// login via name & password
				CredentialsProvider({
					async authorize (credentials) {
						const authResponse = await fetch('/users/login', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(credentials)
						})

						if (!authResponse.ok) {
							return null
						}

						const user = await authResponse.json()

						return user
					}
				})
			]
		})
	}
}

// const doAuth = SvelteKitAuth({
// 	adapter: PrismaAdapter(prisma),
// 	session: {
// 		strategy: 'database',
// 		generateSessionToken: () => {
// 			return crypto.randomUUID()
// 		}
// 	},
// 	providers: [
// 		// login via GitHub
// 		GitHub({
// 			clientId: GITHUB_ID,
// 			clientSecret: GITHUB_SECRET
// 		}),
// 		// login via name & password
// 		CredentialsProvider({
// 			async authorize (credentials) {
// 				const authResponse = await fetch('/users/login', {
// 					method: 'POST',
// 					headers: {
// 						'Content-Type': 'application/json'
// 					},
// 					body: JSON.stringify(credentials)
// 				})

// 				if (!authResponse.ok) {
// 					return null
// 				}

// 				const user = await authResponse.json()

// 				return user
// 			}
// 		})
// 	]
// })

// //
// // Export multiple hooks by sequence
// //

// export const handle = sequence(doAuth )

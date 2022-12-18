import { sequence } from '@sveltejs/kit/hooks'
import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

// AuthJS & Prisma
import SvelteKitAuth from '@auth/sveltekit'
import { PrismaAdapter } from '$lib/server/PrismaAdapter'
import { PrismaClient } from '@prisma/client'
import GitHub from '@auth/core/providers/github'
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private'
import CredentialsProvider from '@auth/core/providers/credentials'
import type { Adapter, AdapterAccount } from '@auth/core/adapters'
const prisma = new PrismaClient()

/**
 *
 * isUser HOOK
 * 
 */
const isUser = async ({ event, resolve }) => {
	const result = await resolve(event)
	const session = await event.locals.getSession()

	console.log('\n\n hooks.server.ts', new Date())
	console.log(event.url.pathname)

	if (!session?.user && event.url.pathname.includes('/protected')) {
		throw redirect(302, '/#not_allowed:'+event.url.pathname)
	}
	return result
}

/**
 *
 * doAuth HOOK
 *
 */
const doAuth = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'database',
		generateSessionToken: () => {
			return crypto.randomUUID()
		}
	},
	providers: [
		GitHub({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET
		}),
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

export const handle = sequence(isUser, doAuth )

//
//
// OLD CODE
//
//

// export const handle = SvelteKitAuth({
// 	adapter: PrismaAdapter(prisma),
// 	session: {
// 		strategy: 'database',
// 		generateSessionToken: () => {
// 			return crypto.randomUUID()
// 		}
// 	},
// 	providers: [
// 		GitHub({
// 			clientId: GITHUB_ID,
// 			clientSecret: GITHUB_SECRET
// 		}),
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

// export const load: LayoutServerLoad = async (event) => {
//     let session = await event.locals.getSession()
//     console.log(session)
//     if (!session?.user ) {
//       throw redirect(302, "/#not_allowed")
//     }
//     return {
//       session: session
//     }
//   }

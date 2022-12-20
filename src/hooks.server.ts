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
	const session = await event.locals.getSession()

	if (!session?.user && event.url.pathname.includes('/protected')) {
		// not a secure way to do this, because it will show the user the path of the protected page
		throw redirect(302, '/#not_allowed:' + event.url.pathname)
	}
	const result = await resolve(event)

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
		// login via GitHub
		GitHub({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize (credentials, req) {
				console.log('credentials', credentials)
				console.log('req', req)

				// Add logic here to look up the user from the credentials supplied
				const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					console.log(user)
					return user
				} else {
					console.log('else', user)
					// If you return null then an error will be displayed advising the user to check their details.
					return null

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			}
		})
	]
})

//
// Export multiple hooks by sequence
//

export const handle = sequence(doAuth, isUser)

// const data = await request.formData()
// const name = data.get('name')
// const password = data.get('password')
// console.log('login', name, password)
// console.log(credentials)

// login via name & password
// CredentialsProvider({
// 	async authorize (credentials) {
// const authResponse = await fetch('/users/login', {
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/json'
// 	},
// 	body: JSON.stringify(credentials)
// })
// if (!authResponse.ok) {
// 	return null
// }
// const user = await authResponse.json()
// return user
// 	}
// })

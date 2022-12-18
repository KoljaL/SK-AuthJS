import SvelteKitAuth from '@auth/sveltekit'
import { PrismaAdapter } from '$lib/server/PrismaAdapter'
import { PrismaClient } from '@prisma/client'
import GitHub from '@auth/core/providers/github'
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private'
// import CredentialsProvider from "next-auth/providers/credentials"
import CredentialsProvider from "@auth/core/providers/credentials"
import type { Adapter, AdapterAccount } from "@auth/core/adapters"

console.log(CredentialsProvider)
const prisma = new PrismaClient()

export const handle = SvelteKitAuth({
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

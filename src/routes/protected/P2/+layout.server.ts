import type { LayoutServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
import type { PageLoad } from "./$types"



// export const load: LayoutServerLoad = async (event) => {
//     let session = await event.locals.getSession()
//     if (!session?.user ) {
//       throw redirect(302, "/#not_allowed")
//     }
//     return {
//       session: session 
//     }
//   }
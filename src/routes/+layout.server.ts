import type { LayoutServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit"
import type { PageLoad } from "./$types"


export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.getSession(),
  }
}


// export const load: LayoutServerLoad = async (event) => {
//   let session = await event.locals.getSession()
//   console.log(event.url.pathname)
//   console.log(session)
//   if (!session?.user && event.url.pathname !== "/") {
//     throw redirect(302, "/")
//   }
//   return {
//     session: session / 
//   }
// }
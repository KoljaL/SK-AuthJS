import type { PageServerLoad } from './$types'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function getUser () {
	const user = await prisma.$queryRaw`SELECT * FROM User`
	return user
}

const categories = await prisma.category.findMany({
 
})



const topics = await prisma.topic.findMany({ 
    take: 10, 
    orderBy: { 
        id: 'desc' 
    } ,
    include: {
        user:true,
        Category:{
            select:{
                name:true   
            },
        },
    }
})

export const load: PageServerLoad = async () => {
	return { categories,  topics }
}

'use server'

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "@/lib/utils";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
	try {
		const { data } = await clerkClient().users.getUserList({
			emailAddress: userIds
		})
		
		const users = data.map(user => ( {
			id: user.id,
			name: `${user.firstName} ${user.lastName}`,
			email: user.emailAddresses[0].emailAddress,
			avatar: user.imageUrl
		} ))
		
		const sortUsers = userIds.map(email => users.find(user => user.email === email))
		
		return parseStringify(sortUsers)
	} catch (err) {
		console.log(`Error fetching users ${err}`)
	}
}
'use server'

import { nanoid } from "nanoid";
import { liveblocks } from "@/lib/liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "@/lib/utils";
import { Room } from "@liveblocks/core";

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
	const roomId = nanoid()
	
	try {
		const metadata = {
			creatorId: userId,
			email,
			title: 'Untitled'
		}
		
		const usersAccesses: RoomAccesses = {
			[email]: [ 'room:write' ]
		}
		
		const room = await liveblocks.createRoom(roomId, {
			metadata,
			usersAccesses,
			defaultAccesses: [ 'room:write' ]
		});
		revalidatePath('/')
		
		return parseStringify(room)
	} catch (error) {
		console.log(`Error happened while creating room: ${error}`)
	}
}

export const getDocument = async ({ userId, roomId }: { userId: string, roomId: string }) => {
	try {
		const room = await liveblocks.getRoom(roomId);
		
		// const hasAccess = Object.keys(room.usersAccesses).includes(userId);
		//
		// if (!hasAccess) {
		// 	throw new Error('You do not have the access to this document');
		// }
		
		return parseStringify(room)
	} catch (error) {
		console.log(`Error happened while getting a room: ${error}`)
	}
}

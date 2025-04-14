"use client";
import { ListFilter, Search, UserPlus } from "lucide-react";
import { Input } from "../ui/input";
import ThemeSwitch from "./theme-switch";
import Conversation from "./conversation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import UserListDialog from "./user-list-dialog";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect } from "react";
import { useConversationStore } from "@/store/chat-store";

const LeftPanel = () => {
	const { user } = useUser();
	const conversations = useQuery(api.conversations.getMyConversations);
	const { selectedConversation, setSelectedConversation } = useConversationStore();

	useEffect(() => {
		const conversationIds = conversations?.map((conversation) => conversation._id);
		if (selectedConversation && conversationIds && !conversationIds.includes(selectedConversation._id)) {
			setSelectedConversation(null);
		}
	}, [conversations, selectedConversation, setSelectedConversation]);

	if (!conversations) return null;

	return (
		<div className={`${selectedConversation ? 'hidden' : 'flex'} md:flex md:w-1/4 w-full flex-col bg-left-panel border-r border-gray-primary`}>
			<div className="p-4 flex justify-between items-center border-b border-gray-primary">
				<div className="flex items-center gap-3">
					<Avatar className="w-8 h-8 md:w-10 md:h-10">
						<AvatarImage src={user?.imageUrl} className="object-cover" />
						<AvatarFallback>
							<div className="animate-pulse bg-gray-tertiary w-full h-full rounded-full" />
						</AvatarFallback>
					</Avatar>
					<span className="text-sm md:text-base font-medium">{user?.fullName}</span>
				</div>

				<UserListDialog>
					<Button variant="ghost" size="icon">
						<UserPlus className="w-5 h-5" />
					</Button>
				</UserListDialog>
			</div>

			<div className="flex-1 overflow-y-auto">
				<div className="flex flex-col py-2">
					{conversations.map((conversation) => (
						<Conversation key={conversation._id} conversation={conversation} />
					))}
				</div>
			</div>
		</div>
	);
};

export default LeftPanel;

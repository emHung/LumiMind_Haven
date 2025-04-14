import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useConversationStore } from "@/store/chat-store";
import { Button } from "@/components/ui/button";
import { Smile, Send } from "lucide-react";
import MediaDropdown from "./media-dropdown";

const MessageInput = () => {
	const { selectedConversation } = useConversationStore();
	const sendMessage = useMutation(api.messages.sendTextMessage);
	const [message, setMessage] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleSendMessage = () => {
		if (!message.trim() || !selectedConversation) return;

		sendMessage({
			content: message,
			conversation: selectedConversation._id,
		});

		setMessage("");
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();
		}
	};

	const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	return (
		<div className="sticky bottom-0 bg-gray-primary p-2 md:p-4">
			<div className="flex items-end gap-2 md:gap-4">
				<div className="flex gap-1 md:gap-2">
					<Button variant="ghost" size="icon" className="hidden md:flex">
						<Smile className="w-5 h-5" />
					</Button>
					<MediaDropdown />
				</div>

				<div className="flex-1 relative">
					<textarea
						ref={textareaRef}
						value={message}
						onChange={handleTextareaChange}
						onKeyDown={handleKeyDown}
						placeholder="Type a message"
						className="w-full resize-none rounded-lg bg-background px-3 py-2 text-sm focus:outline-none max-h-32"
						rows={1}
					/>
				</div>

				<Button
					variant="ghost"
					size="icon"
					className="h-10 w-10"
					onClick={handleSendMessage}
					disabled={!message.trim() || !selectedConversation}
				>
					<Send className="w-5 h-5" />
				</Button>
			</div>
		</div>
	);
};

export default MessageInput;

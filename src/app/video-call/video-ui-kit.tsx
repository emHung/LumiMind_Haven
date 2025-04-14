import { randomID } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function getUrlParams(url = window.location.href) {
	let urlStr = url.split("?")[1];
	return new URLSearchParams(urlStr);
}

export default function VideoUIKit() {
	const roomID = getUrlParams().get("roomID") || randomID(5);
	const conversationId = getUrlParams().get("conversationId");
	const { user } = useClerk();
	const sendTextMessage = useMutation(api.messages.sendTextMessage);

	let myMeeting = (element: HTMLDivElement) => {
		const initMeeting = async () => {
			const res = await fetch(`/api/zegocloud?userID=${user?.id}`);
			const { token, appID } = await res.json();

			const username = user?.fullName || user?.emailAddresses[0].emailAddress.split("@")[0];

			const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(appID, token, roomID, user?.id!, username);

			const zp = ZegoUIKitPrebuilt.create(kitToken);
			
			// Construct the personal link
			const personalLink = window.location.protocol + "//" + window.location.host + window.location.pathname + "?roomID=" + roomID;
			
			// Send the link to the conversation if conversationId exists
			if (conversationId) {
				try {
					await sendTextMessage({
						content: personalLink,
						conversation: conversationId,
					});
				} catch (error) {
					console.error("Failed to send video call link:", error);
				}
			}

			zp.joinRoom({
				container: element,
				sharedLinks: [
					{
						name: "Personal link",
						url: personalLink,
					},
				],
				scenario: {
					mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
				},
			});
		};
		initMeeting();
	};

	return <div className='myCallContainer' ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>;
}

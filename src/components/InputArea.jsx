import React, { useState } from "react";
import { InputGroup } from "./ui/input-group";
import { LuArrowUp } from "react-icons/lu";
import { IconButton, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { apiCallerAuthPost } from "@/api/ApiCaller";
import { useAuth } from "@/context/AuthContext";

export default function InputArea({
	isNewChart = false,
	widthOnSS = "md",
	widthOnLS = "3xl",
	onSubmitClick,
}) {
	const navigate = useNavigate();
	const { token } = useAuth(); // Access the authorization token
	const [value, setValue] = useState("");
	const [isLoading, setIsLoading] = useState(false); // Track loading state for new chat creation

	const handleSendMessage = async () => {
		if (value.trim() === "") return; // Prevent sending empty messages

		if (isNewChart) {
			try {
				setIsLoading(true);

				// Step 1: Create Chat
				const createChatResponse = await apiCallerAuthPost(
					"/api/chats/create/",
					{ name: value.substring(0, 50) }, // Use the first 50 characters of the message as the chat name
					token
				);

				if (createChatResponse.status === 201) {
					const newChatId = createChatResponse.data.id;
					setIsLoading(true)
					// Step 2: Add First Message to Chat
					await apiCallerAuthPost(
						`/api/chats/${newChatId}/messages/add/`,
						{ content: value },
						token
					);

					apiCallerAuthPost(
						`/api/chats/${newChatId}/messages/add/`,
						{ content: value },
						token
					).then((response) => {
						if (response.status === 201) {
							setIsLoading(false);

							// Navigate to the newly created chat
							navigate(`/c/${newChatId}`);
						} else {
							throw new Error(response?.data?.error || "Failed to create chat");
						}
					}).catch((error) => {
						console.error("Error creating new chat:", error);
						apiCallerAuthPost(
							`/api/chats/delete/`, {
								chat_id: newChatId
							}, token).then((response) => {
								if (response.status === 200) {
									setIsLoading(false);
								}
							}).catch((error) => {
								console.error("Error deleting chat:", error);
							}).finally(() => {
								setIsLoading(false);
							})
						alert("Failed to create a new chat. Please try again later." + error);	
						navigate(`/c/new`);
					})

					setIsLoading(false);

					// Navigate to the newly created chat
					navigate(`/c/${newChatId}`);
				} else {
					throw new Error(createChatResponse.data?.detail || "Failed to create chat");
				}
			} catch (error) {
				console.error("Error creating new chat:", error);
				alert("Failed to create a new chat. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		} else {
			// Handle sending messages in an existing chat
			onSubmitClick(value);
			setValue(""); // Clear the input field after sending
		}
	};

	return (
		<InputGroup
			flex="1"
			w="full"
			maxW={{ base: widthOnSS, md: widthOnLS }}
			endElement={
				<IconButton
					variant="plain"
					bg="primary"
					rounded="full"
					size="xs"
					onClick={handleSendMessage}
					isLoading={isLoading} // Show loading spinner during chat creation
					aria-label="Send Message">
					<LuArrowUp size={30} />
				</IconButton>
			}>
			<Input
				placeholder="Type your message ..."
				size="lg"
				value={value}
				onChange={(e) => setValue(e.target.value)} // Fixed the onChange handler
				onKeyDown={(e) => {
					if (e.key === "Enter") handleSendMessage(); // Submit on Enter key press
				}}
				maxW={{ base: widthOnSS, md: widthOnLS }}
				rounded="full"
				bg="gray.800"
				border="1px solid"
				borderColor="#B55CFF"
				_hover={{ borderColor: "purple.400" }}
				_focus={{ borderColor: "purple.300" }}
			/>
		</InputGroup>
	);
}

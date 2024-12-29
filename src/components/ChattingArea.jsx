import React, { useState, useEffect } from "react";
import { VStack, Flex, Box, Text } from "@chakra-ui/react";
import { useParams, useLocation, useNavigate } from "react-router";
import ChatMessage from "./ChatMessage";
import InputArea from "./InputArea";
import { apiCallerAuthPost, apiCallerAuthGet } from "@/api/ApiCaller";
import { useAuth } from "@/context/AuthContext";

const ChattingArea = () => {
	const { id } = useParams(); // Extract the chatId from the URL
	const { state } = useLocation(); // Access the first prompt passed during navigation
	const navigate = useNavigate();
	const { token } = useAuth(); // Get the authorization token
	const [messages, setMessages] = useState([]);
	const [chatId, setChatId] = useState(null); // Store the current chat ID
	const [isCreatingChat, setIsCreatingChat] = useState(false); // Track if chat creation is in progress

	// Debugging logs for state and URL params
	console.log("ChattingArea Initialized:", { id, state, chatId });

	// Fetch all messages for a chat
	const fetchMessages = async (chatId) => {
		try {
			console.log("Fetching messages for chatId:", chatId);
			const response = await apiCallerAuthGet(`/api/chats/${chatId}/messages/`, token);
			if (response.status === 200) {
				const formattedMessages = response.data.map((msg) => ({
					message: msg.content,
					isUser: !msg.is_system_message,
				}));
				setMessages(formattedMessages);
			} else {
				throw new Error("Failed to fetch messages");
			}
		} catch (error) {
			console.error("Error fetching messages:", error);
			alert("Error fetching messages. Please try again later.");
		}
	};

	// Handle new chat creation or fetching messages for an existing chat
	useEffect(() => {
		if (id) {
			// If navigating to `/c/:id`, fetch messages for the existing chat
			setChatId(id);
			fetchMessages(id);
		} else if (state && !chatId && !isCreatingChat) {
			// If on `/c/new`, create a new chat using the state as the first prompt
			const createChat = async () => {
				setIsCreatingChat(true); // Prevent duplicate chat creation

				try {
					console.log("Creating new chat...");

					// Step 1: Call Create Chat API
					const createChatResponse = await apiCallerAuthPost(
						"/api/chats/create/",
						{ name: state.substring(0, 50) },
						token
					);

					if (createChatResponse.status === 201) {
						const newChatId = createChatResponse.data.id;
						console.log("Chat created successfully with ID:", newChatId);
						setChatId(newChatId);

						// Step 2: Add the First Message
						const addMessageResponse = await apiCallerAuthPost(
							`/api/chats/${newChatId}/messages/add/`,
							{ content: state },
							token
						);

						// Update Messages State
						setMessages([
							{ message: addMessageResponse.data.content, isUser: true },
							{ message: addMessageResponse.data.ai_response, isUser: false },
						]);

						// Navigate to the new chat
						navigate(`/c/${newChatId}`);
					} else {
						throw new Error(createChatResponse.data?.detail || "Failed to create chat");
					}
				} catch (error) {
					console.error("Error creating chat:", error);
					alert(`Error creating chat: ${error.message || "Please try again later."}`);
				} finally {
					setIsCreatingChat(false);
				}
			};

			createChat();
		}
	}, [id, state, chatId, token, navigate, isCreatingChat]);

	// Handle user messages
	const onSubmitClick = async (newMessage) => {
		if (!chatId) {
			alert("Chat is not properly initialized. Please try again.");
			return;
		}

		setMessages((prev) => [...prev, { message: newMessage, isUser: true }]);

		try {
			const addMessageResponse = await apiCallerAuthPost(
				`/api/chats/${chatId}/messages/add/`,
				{ content: newMessage },
				token
			);

			setMessages((prev) => [
				...prev,
				{ message: addMessageResponse.data.ai_response, isUser: false },
			]);
		} catch (error) {
			console.error("Error adding message to chat:", error);
			alert(`Error adding message: ${error.message || "Unable to add message."}`);
		}
	};

	return (
		<Flex flexDirection="column" h="100vh" w="full" color="white" p={4}>
			{/* Messages Container */}
			<VStack
				spacing={4}
				overflowY="auto"
				w="full"
				h="78%"
				pr={2}
				pb={5}
				css={{
					"&::-webkit-scrollbar-thumb": {
						background: "transparent",
						borderRadius: "10px",
					},
				}}>
				{messages.map((msg, index) => (
					<ChatMessage key={index} message={msg.message} isUser={msg.isUser} />
				))}
			</VStack>

			{/* Message Input */}
			<Box w="full" pt={0} zIndex={10}>
				<InputArea
					widthOnSS="full"
					widthOnLS="full"
					onSubmitClick={onSubmitClick}
				/>
				<Text
					fontSize="xx-small"
					color="gray.500"
					fontStyle="italic"
					textAlign="center"
					mt={2}>
					MindHush.ai is not a licensed professional. For urgent or serious
					concerns, please seek assistance from a qualified expert.
				</Text>
			</Box>
		</Flex>
	);
};

export default ChattingArea;

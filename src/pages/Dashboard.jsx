import React, { useState, useEffect } from "react";
import {
	Box,
	VStack,
	HStack,
	Flex,
	IconButton,
	Spinner,
	useBreakpointValue,
	Text,
} from "@chakra-ui/react";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import AuthButtons from "@/components/AuthButtons";
import Sidebar from "@/components/Sidebar";
import {
	DrawerRoot,
	DrawerBackdrop,
	DrawerTrigger,
	DrawerContent,
	DrawerCloseTrigger,
} from "@/components/ui/drawer";
import NewChatArea from "@/components/NewChatArea";
import ChattingArea from "@/components/ChattingArea";
import { apiCallerAuthGet, apiCallerGet } from "@/api/ApiCaller";
import { useAuth } from "@/context/AuthContext";

const Dashboard = ({ isNewChart = false }) => {
	const { token, isAuthenticated, logout } = useAuth();
	
	const [activeChat, setActiveChat] = useState(null);
	const [chats, setChats] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const isDrawer = useBreakpointValue({ base: true, md: false });

	useEffect(() => {
		const fetchChats = async () => {
			if (!token) {
				setError("Authorization token is missing.");
				setIsLoading(false);
				return;
			}

			setIsLoading(true);
			setError(null);

			try {
				console.log("token", token);
				const response = await apiCallerAuthGet("/api/chats/user/", token);
				console.log(response)
				if (response?.status === 200) {
					setChats(response.data);
					if (response.data.length > 0) {
						setActiveChat(response.data[0].id);
					}
				} else {
					throw new Error(JSON.stringify(response.data.messages) || "Failed to fetch chats.");
				}
			} catch (err) {
				setError(err.message || "An error occurred while fetching chats.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchChats();
	}, [token]);

	const categorizeChats = (chats) => {
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(today.getDate() - 1);

		const categories = {
			"Today": [],
			"Yesterday": [],
			"Previous 7 Days": [],
			"Previous 30 Days": [],
			"older": [],
		};

		chats.forEach((chat) => {
			const chatDate = new Date(chat.created_at);
			if (chatDate === today) {
				categories.Today.push(chat);
			} else if (chatDate.toDateString() === yesterday.toDateString()) {
				categories.Yesterday.push(chat);
			} else if (chatDate > new Date(today.setDate(today.getDate() - 7))) {
				categories["Previous 7 Days"].push(chat);
			} else if (chatDate > new Date(today.setDate(today.getDate() - 30))) {
				categories["Previous 30 Days"].push(chat);
			} else {
				categories.older.push(chat);
			}

		});

		return categories;
	};

	const categorizedChats = categorizeChats(chats);

	return (
		<Box minH='100vh' color='white'>
			<HStack w='full' spacing={0}>
				{!isDrawer && (
					<Sidebar
						categorizedChats={categorizedChats}
						activeChat={activeChat}
						setActiveChat={setActiveChat}
					/>
				)}

				<VStack w='full' minH='100vh' gap={8} p={4}>
					<Flex
						justifyContent={{ base: "space-between", md: "flex-end" }}
						w='full'>
						{isDrawer && (
							<DrawerRoot placement='start'>
								<DrawerBackdrop />
								<DrawerTrigger asChild>
									<IconButton
										aria-label='Open Sidebar'
										bg='secondary.50'
										color='white'
										size='xs'
										_hover={{ bg: "gray.700" }}
										zIndex={10}>
										<MdOutlineSpaceDashboard />
									</IconButton>
								</DrawerTrigger>
								<DrawerContent>
									<Sidebar
										isDrawer={isDrawer}
										categorizedChats={categorizedChats}
										activeChat={activeChat}
										setActiveChat={setActiveChat}
									/>
									<DrawerCloseTrigger />
								</DrawerContent>
							</DrawerRoot>
						)}

						<AuthButtons />
					</Flex>

					{isLoading ? (
						<Spinner size='lg' color='white' />
					) : error ? (
						<Text color='red.500' fontSize='lg'>
							{error}
						</Text>
					) : isNewChart ? (
						<NewChatArea isDrawer={isDrawer} />
					) : (
						<ChattingArea chatId={activeChat} />
					)}
				</VStack>
			</HStack>
		</Box>
	);
};

export default Dashboard;

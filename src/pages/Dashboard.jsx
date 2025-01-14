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
import { apiCallerAuthGet } from "@/api/ApiCaller";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useParams } from "react-router";

const Dashboard = ({ isNewChart = false }) => {
	const { token, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const { id } = useParams(); // ✅ Extract chatId from URL
	const isDrawer = useBreakpointValue({ base: true, md: false });

	const [activeChat, setActiveChat] = useState(null);
	const [chats, setChats] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchChats = async () => {
			if (!token) {
				setIsLoading(false);
				return;
			}

			setIsLoading(true);
			setError(null);

			try {
				console.log("Fetching chats with token:", token);
				const response = await apiCallerAuthGet("/api/chats/user/", token);

				if (response?.status === 200) {
					setChats(response.data);

					// ✅ Set active chat based on URL params or fallback to the first chat
					if (id && response.data.some(chat => chat.id === parseInt(id))) {
						setActiveChat(parseInt(id)); // ✅ Set active chat from URL
					} else if (response.data.length > 0) {
						setActiveChat(response.data[0].id); // ✅ Fallback to first chat
						navigate(`/c/${response.data[0].id}`); // ✅ Update URL if no valid chatId
					}
				} else {
					throw new Error(response?.data?.messages || "Failed to fetch chats.");
				}
			} catch (err) {
				console.error("Error fetching chats:", err);
				setError(err.message || "An error occurred while fetching chats.");
			} finally {
				setIsLoading(false);
			}
		};

		if (isAuthenticated && token) {
			fetchChats();
		}
	}, [token, isAuthenticated ]); 

	const categorizeChats = (chats) => {
		console.log('Raw Chats:', chats);

		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(today.getDate() - 1);

		const sevenDaysAgo = new Date(today);
		sevenDaysAgo.setDate(today.getDate() - 7);

		const thirtyDaysAgo = new Date(today);
		thirtyDaysAgo.setDate(today.getDate() - 30);

		const categories = {
			"Today": [],
			"Yesterday": [],
			"Previous 7 Days": [],
			"Previous 30 Days": [],
			"Older": [],
		};

		chats.forEach((chat) => {
			const chatDate = new Date(chat?.created_at);
			const chatDateString = chatDate.toDateString();
			const todayString = today.toDateString();
			const yesterdayString = yesterday.toDateString();

			if (chatDateString === todayString) {
				categories["Today"].push(chat);
			} else if (chatDateString === yesterdayString) {
				categories["Yesterday"].push(chat);
			} else if (chatDate >= sevenDaysAgo) {
				categories["Previous 7 Days"].push(chat);
			} else if (chatDate >= thirtyDaysAgo) {
				categories["Previous 30 Days"].push(chat);
			} else {
				categories["Older"].push(chat);
			}
		});

		console.log('Categorized Chats:', categories);
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

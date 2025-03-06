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
import RenewSubscriptionModal from "@/components/RenewSubscriptionModal";
import { useRecoilValue } from "recoil";
import { userState } from "@/atom/state";

const Dashboard = ({ isNewChart = false }) => {
	const { token, isAuthenticated } = useAuth();
	const profile = useRecoilValue(userState);
	const navigate = useNavigate();
	const { id } = useParams();
	const isDrawer = useBreakpointValue({ base: true, md: false });

	const [activeChat, setActiveChat] = useState(null);
	const [chats, setChats] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [refresh, setRefresh] = useState(false);

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
					// Set active chat based on URL params or fallback to the first chat
					if (id && response.data.some((chat) => chat.id === parseInt(id))) {
						setActiveChat(parseInt(id));
					} else if (response.data.length > 0) {
						setActiveChat(response.data[0].id);
						navigate(`/c/${response.data[0].id}`);
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
	}, [token, isAuthenticated, refresh, id, navigate]);

	const categorizeChats = (chats) => {
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(today.getDate() - 1);

		const sevenDaysAgo = new Date(today);
		sevenDaysAgo.setDate(today.getDate() - 7);

		const thirtyDaysAgo = new Date(today);
		thirtyDaysAgo.setDate(today.getDate() - 30);

		const categories = {
			Today: [],
			Yesterday: [],
			"Previous 7 Days": [],
			"Previous 30 Days": [],
			Older: [],
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

		return categories;
	};

	const categorizedChats = categorizeChats(chats);

	// Check if subscription has expired
	const subscriptionExpired =
		profile &&
		profile.subscription_end_date &&
		new Date(profile.subscription_end_date) < new Date();

	return (
		<Box minH="100vh" color="white">
			{/* Auto-open the Renew Subscription Modal if subscription has expired */}
			{subscriptionExpired && <RenewSubscriptionModal autoOpen={true} />}
			<HStack w="full" spacing={0}>
				{!isDrawer && (
					<Sidebar
						refresh={refresh}
						setRefresh={setRefresh}
						categorizedChats={categorizedChats}
						activeChat={activeChat}
						setActiveChat={setActiveChat}
					/>
				)}

				<VStack
					w="full"
					maxH="100vh"
					gap={0}
					mt={0}
					p={0}
					pt={{ base: 2, md: 0 }}
					boxSizing="border-box"
					overflow="hidden">
					<Flex
						justifyContent={{ base: "space-between", md: "flex-end" }}
						w="full"
						px={{ base: 4, md: 0 }}>
						{isDrawer && (
							<DrawerRoot placement="start">
								<DrawerBackdrop />
								<DrawerTrigger asChild>
									<IconButton
										aria-label="Open Sidebar"
										bg="secondary.50"
										color="white"
										size="xs"
										_hover={{ bg: "gray.700" }}
										zIndex={10}>
										<MdOutlineSpaceDashboard />
									</IconButton>
								</DrawerTrigger>
								<DrawerContent>
									<Sidebar
										refresh={refresh}
										setRefresh={setRefresh}
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
						<Spinner size="lg" color="white" />
					) : error ? (
						<Text color="red.500" fontSize="lg">
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

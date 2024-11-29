import React from "react";
import { Box, VStack, HStack, Image, Button, Text } from "@chakra-ui/react";
import { BsChatSquareText, BsStars } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { LuPlus, LuMessageCircle } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { ProgressRoot, ProgressBar, ProgressValueText } from "./ui/progress";
import EarnReferModal from "./EarnReferModal";

const Sidebar = ({ categorizedChats, activeChat, setActiveChat }) => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();
	return (
		<Box
			alignSelf='flex-start'
			h='100vh'
			w={{ base: "100%", md: "350px" }}
			bg='linear-gradient(to right, #222529, #282A2F)'
			p={4}
			display='flex'
			flexDirection='column'>
			{/* Header Section */}
			<VStack align='stretch' spacing={4} flexShrink={0}>
				{/* Logo */}
				<Box alignSelf='flex-start' w='80px' mb={10}>
					<Image src='/logo.png' alt='Company Logo' />
				</Box>

				{/* New Chat Button */}
				<Button
					variant='outline'
					border='1px solid #616161'
					rounded='2xl'
					onClick={() => navigate("/")}>
					<LuPlus style={{ marginRight: "2px" }} />
					Start New
				</Button>
			</VStack>

			{/* Chat List Section */}
			{isAuthenticated && (
				<VStack align='stretch' overflowY='auto' flex='1' spacing={0} mt={4}>
					{Object.entries(categorizedChats).map(
						([category, chats]) =>
							chats.length > 0 && (
								<Box key={category}>
									<Text fontSize='sm' color='gray.400' mt={4}>
										{category}
									</Text>
									{chats.map((chat) => (
										<Button
											key={chat.id}
											variant='ghost'
											justifyContent='flex-start'
											bg={activeChat === chat.id ? "gray.900" : "#25282C"}
											size='sm'
											w='full'
											rounded='xl'
											my={1}
											onClick={() => setActiveChat(chat.id)}>
											<BsChatSquareText />
											{chat.name}
										</Button>
									))}
								</Box>
							)
					)}
				</VStack>
			)}

			{/* Footer Section */}
			<Box mt='auto'>
				{isAuthenticated && (
					<VStack
						w='full'
						px={5}
						py={4}
						my={2}
						bg='#7A50764D'
						rounded='2xl'
						border='1px solid #B55CFF'>
						<VStack alignItems='flex-start' w='100%' mb={2}>
							<HStack>
								<Text fontSize='xs' fontWeight='bold'>
									500
								</Text>
								<Text fontSize='xs'>Tokens Used</Text>
							</HStack>

							<HStack>
								<Text fontSize='xs' fontWeight='bold'>
									500
								</Text>
								<Text fontSize='xs'>Tokens Left</Text>
							</HStack>
						</VStack>

						<ProgressRoot
							colorPalette='teal'
							defaultValue={70}
							maxW='sm'
							size='sm'
							w='100%'>
							<HStack>
								<ProgressValueText>70%</ProgressValueText>
								<ProgressBar flex='1' rounded='full' />
							</HStack>
						</ProgressRoot>
					</VStack>
				)}

				<VStack gap={2} px={2}>
					<HStack alignSelf='flex-start'>
						<EarnReferModal />
					</HStack>
					<HStack alignSelf='flex-start'>
						<Link to='#'>
							<Box display='flex' alignItems='center'>
								<LuMessageCircle style={{ marginRight: "8px" }} />
								Support
							</Box>
						</Link>
					</HStack>
					<HStack alignSelf='flex-start'>
						<Link to='/pricing-plans'>
							<Box display='flex' alignItems='center'>
								<BsStars style={{ marginRight: "8px" }} />
								Pricing Plans
							</Box>
						</Link>
					</HStack>
				</VStack>
			</Box>
		</Box>
	);
};

export default Sidebar;
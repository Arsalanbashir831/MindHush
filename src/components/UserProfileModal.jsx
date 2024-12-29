import React from "react";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogHeader,
	DialogRoot,
	DialogBody,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FiMoreVertical } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";
import { MenuItem } from "./ui/menu";
import TokensBox from "./TokensBox";
import { Link, useNavigate } from "react-router";

const UserProfileModal = () => {
	const { logout, profile } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<DialogRoot size='md' placement='center'>
			<DialogTrigger asChild>
				<MenuItem value='profile' cursor='pointer' py={0}>
					<Button variant='plain' p={0} fontWeight='normal'>
						<LuUser />
						Profile
					</Button>
				</MenuItem>
			</DialogTrigger>
			<DialogContent
				bg='secondary.50'
				borderRadius='3xl'
				p={0}
				overflow='hidden'>
				<DialogHeader p={0}>
					<Box position='relative' w='full'>
						{/* Profile Image and Name Section */}
						<HStack gap={4} pt={8} pb={6} px={6} alignItems='flex-end'>
							<Box
								borderRadius='full'
								border='2px solid'
								borderColor='white'
								overflow='hidden'
								w='150px'
								h='150px'>
								<Image src='/avatar.png' alt='Profile' w='full' />
							</Box>
							<VStack alignItems='flex-start'>
								<Text
									fontSize='3xl'
									color='white'
									fontWeight='semibold'
									mb={4}
									textShadow='1px 1px 16px #FFFFFFa1'>
									{profile?.first_name + " " + profile?.last_name}
								</Text>

								<Text color='whiteAlpha.700' fontSize='xs' fontWeight='bold'>
									ABOUT ME
								</Text>

								<VStack align='start'>
									<HStack>
										<Text color='whiteAlpha' fontWeight='bold' fontSize='xs'>
											Username:
										</Text>
										<Text color='white' fontSize='xs'>
											{profile?.first_name + " " + profile?.last_name}
										</Text>
									</HStack>

									<HStack>
										<Text color='whiteAlpha' fontWeight='bold' fontSize='xs'>
											Email:
										</Text>
										<Text color='white' fontSize='xs'>
											{profile?.email}
										</Text>
									</HStack>

									<HStack>
										<Text color='whiteAlpha' fontWeight='bold' fontSize='xs'>
											Subscription Plan:
										</Text>
										<Text color='white' fontSize='xs'>
											{profile?.is_premium ? "Premium" : "Free"} 
										</Text>
									</HStack>
								</VStack>
							</VStack>
						</HStack>

						{/* More Options Button */}
						<Box position='absolute' top={4} right={4}>
							<Button variant='ghost' p={2}>
								<FiMoreVertical size={24} color='white' />
							</Button>
						</Box>
					</Box>
				</DialogHeader>

				<DialogBody p={0}>
					{/* User Info Content */}
					<Box p={6} border='1px solid white' borderLeft={0} borderRight={0}>
						<HStack mb={4} gap={10}>
							<TokensBox />
							{!profile?.is_premium && (
								<VStack gap={2} px={2} w='100%'>
								<Text color='whiteAlpha' fontSize='lg'>
									Limit Exceeded?
								</Text>
								<Link to='/pricing-plans' style={{ width: "100%" }}>
									<Button
										size='sm'
										bg='primary'
										color='white'
										rounded='lg'
										w='100%'>
										Upgrade
									</Button>
								</Link>
							</VStack>
							)}
							
						</HStack>
					</Box>

					{/* Log Out Button */}
					<Box p={6} pt={0}>
						<Button
							variant='link'
							color='red'
							px={0}
							_hover={{ color: "red.600" }}
							onClick={handleLogout}>
							Log Out
						</Button>
					</Box>
				</DialogBody>
			</DialogContent>
		</DialogRoot>
	);
};

export default UserProfileModal;

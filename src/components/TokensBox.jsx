import { HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { ProgressRoot, ProgressValueText, ProgressBar } from "./ui/progress";
import { useAuth } from "@/context/AuthContext";

export default function TokensBox() {
	const { profile } = useAuth();
	console.log(profile);
	return (
		<VStack
			w='full'
			p={3}
			my={2}
			bg='#7A50764D'
			rounded='2xl'
			border='1px solid #602376'>
			<VStack alignItems='flex-start' w='100%' mb={2}>
				<HStack>
					<Text fontSize='xs' fontWeight='bold'>
						{profile?.credits_used_today}
					</Text>
					<Text fontSize='xs'>Tokens Used</Text>
				</HStack>
				{!profile?.is_premium && (
					<HStack>
					<Text fontSize='xs' fontWeight='bold'>
						{profile?.daily_limit - profile?.credits_used_today > 0 ? profile?.daily_limit - profile?.credits_used_today : 0}
					</Text>
					<Text fontSize='xs'>Tokens Left</Text>
				</HStack>
				)}
				
			</VStack>
			
			{!profile?.is_premium && (
			<ProgressRoot
				colorPalette='teal'
				defaultValue={(profile?.credits_used_today / profile?.daily_limit) * 100 < 100 ? (profile?.credits_used_today / profile?.daily_limit) * 100 : 100}
				maxW='sm'
				size='xs'
				w='100%'>
				<HStack>
					<ProgressValueText>{(profile?.credits_used_today / profile?.daily_limit) * 100 < 100 ? (profile?.credits_used_today / profile?.daily_limit) * 100 : 100}%</ProgressValueText>
					<ProgressBar flex='1' rounded='full'  />
				</HStack>
			</ProgressRoot>
			)}
		</VStack>
	);
}

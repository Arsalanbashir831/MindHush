import { HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ProgressRoot, ProgressValueText, ProgressBar } from "./ui/progress";

import { useRecoilValue } from "recoil";
import { userState } from "@/atom/state";

export default function TokensBox() {
	// const { profile } = useAuth();
	const profile = useRecoilValue(userState)
	const [cooldownTimeLeft, setCooldownTimeLeft] = useState(null);


	useEffect(() => {
		
		if (profile?.reset_cooldown) {
			const calculateTimeLeft = () => {
				const now = new Date();
				const resetCooldown = new Date(profile.reset_cooldown);
				const timeLeft = resetCooldown - now;

				if (timeLeft > 0) {
					const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
					const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
					const seconds = Math.floor((timeLeft / 1000) % 60);

					setCooldownTimeLeft(
						`${hours.toString().padStart(2, "0")}:${minutes
							.toString()
							.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
					);
				} else {
					setCooldownTimeLeft(null);
				}
			};

			// Initialize and update every second
			calculateTimeLeft();
			const timer = setInterval(calculateTimeLeft, 1000);

			// Cleanup on component unmount
			return () => clearInterval(timer);
		}
	
	}, [profile?.reset_cooldown ]);

	return (
		<>
			{!profile?.is_premium && (
				<VStack
					w="full"
					p={3}
					my={2}
					bg="#7A50764D"
					rounded="2xl"
					border="1px solid #602376"
				>
					{/* If cooldown timer is active, show only the reset timer */}
					{cooldownTimeLeft ? (
						<Text fontSize="sm" color="red.500" fontWeight="bold">
							Next Reset In: {cooldownTimeLeft}
						</Text>
					) : (
						// Otherwise, show credit usage details
						<>
							<VStack alignItems="flex-start" w="100%" mb={2}>
								<HStack>
									<Text fontSize="xs" fontWeight="bold">
										{profile?.credits_used_today}
									</Text>
									<Text fontSize="xs">Tokens Used</Text>
								</HStack>

								<HStack>
									<Text fontSize="xs" fontWeight="bold">
										{profile?.daily_limit - profile?.credits_used_today > 0
											? profile?.daily_limit - profile?.credits_used_today
											: 0}
									</Text>
									<Text fontSize="xs">Tokens Left</Text>
								</HStack>
							</VStack>

							<ProgressRoot
								colorPalette="teal"
								defaultValue={
									(profile?.credits_used_today / profile?.daily_limit) * 100 < 100
										? (profile?.credits_used_today / profile?.daily_limit) * 100
										: 100
								}
								maxW="sm"
								size="xs"
								w="100%"
							>
								<HStack>
									<ProgressValueText>
										{(profile?.credits_used_today / profile?.daily_limit) * 100 < 100
											? (profile?.credits_used_today / profile?.daily_limit) * 100
											: 100}
										%
									</ProgressValueText>
									<ProgressBar rounded="full" />
								</HStack>
							</ProgressRoot>
						</>
					)}
				</VStack>
			)}
		</>
	);
}

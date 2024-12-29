import React, { useEffect } from "react";
import { Box, Button, HStack, Text, VStack, Flex } from "@chakra-ui/react";
import { apiCallerAuthPost } from "@/api/ApiCaller";
import { useAuth } from "@/context/AuthContext";

const PriceCard = ({ title, price, description, isPopular, originalPrice, planId, isSelected }) => {
    const { profile, isAuthenticated, token, updateProfile } = useAuth();
	useEffect(() => {
		updateProfile(token);
	}, [])
    // Function to handle subscription initiation
    const handleSubscribe = async () => {
        if (!token) {
            alert("You need to be logged in to subscribe.");
            return;
        }

        try {
            // Call the create checkout session API
            const response = await apiCallerAuthPost("/api/billing/create-checkout-session/", {}, token);

            if (response.status === 200 && response.data?.url) {
                // Redirect to Stripe's checkout page
                window.location.href = response.data.url;
            } else {
                alert("Failed to initiate the subscription. Please try again.");
            }
        } catch (error) {
            alert("An error occurred while trying to subscribe. Please try again.");
        }
    };

    // Function to handle subscription cancellation
    const handleCancelSubscription = async () => {
        if (!token) {
            alert("You need to be logged in to cancel the subscription.");
            return;
        }

        try {
            // Call the cancel subscription API
            const response = await apiCallerAuthPost("/api/billing/cancel-subscription/", {}, token);

            if (response.status === 200) {
                alert("Your subscription has been successfully cancelled.");
            } else {
                alert("Failed to cancel the subscription. Please try again.");
            }
        } catch (error) {
            alert("An error occurred while trying to cancel the subscription. Please try again.");
        }
    };

    return (
        <Box
            p={6}
            maxW={{ base: "full", sm: "sm" }}
            borderRadius="2xl"
            bg={isSelected ? "#7A50764D" : isPopular ? "#7A50764D" : "secondary.40"}
            border={isSelected || isPopular ? "1px solid #602376" : "none"}
            position="relative"
            width={{ base: "100%", sm: "300px" }}
        >
            {isSelected && (
                <Text
                    position="absolute"
                    top="-15px"
                    left="50%"
                    transform="translateX(-50%)"
                    color="white"
                    fontSize={{ base: "xs", sm: "sm" }}
                    fontWeight="bold"
                    bg="#5A3755"
                    px={3}
                    py={1}
                    borderRadius="full"
                >
                    SELECTED
                </Text>
            )}

            {isPopular && !isSelected && (
                <Text
                    position="absolute"
                    top="-15px"
                    left="50%"
                    transform="translateX(-50%)"
                    color="white"
                    fontSize={{ base: "xs", sm: "sm" }}
                    fontWeight="bold"
                    bg="#5A3755"
                    px={3}
                    py={1}
                    borderRadius="full"
                >
                    POPULAR
                </Text>
            )}

            <VStack align="stretch">
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold" color="white">
                    {title}
                </Text>
                <HStack alignItems="center" spaceX={3}>
                    <Text fontSize={{ base: "4xl", md: "5xl" }} fontWeight="bold" color="white">
                        ${price}
                    </Text>
                    {originalPrice && (
                        <Text fontSize={{ base: "lg", md: "2xl" }} color="gray.400" textDecoration="line-through">
                            ${originalPrice}
                        </Text>
                    )}
                </HStack>
                <Text fontSize={{ base: "sm", md: "md" }} color="gray.400">
                    per month, paid {price === "0.00" ? "nothing" : "monthly"}
                </Text>
                <Button
                    bg={isSelected ? "#4A4A4A" : isPopular ? "#61395BD1" : "secondary.30"}
                    color="white"
                    size="lg"
                    rounded="full"
                    my={2}
                    onClick={isSelected ? null : price === "0.00" ? handleCancelSubscription : handleSubscribe}
                    isDisabled={isSelected}
                    _hover={!isSelected && { bg: isPopular ? "#7A50764D" : "secondary.50" }}
                >
                    {isSelected
                        ? "Current Plan"
                        : price === "0.00"
                        ? "Cancel Subscription"
                        : "Subscribe"}
                </Button>
                <Text fontSize={{ base: "xs", md: "sm" }} color="gray.400">
                    {description}
                </Text>
            </VStack>
        </Box>
    );
};

export default function PricingCards({ pricingPlans }) {
    const { profile } = useAuth(); // Get user profile to determine if the user is on the premium plan
    const isPremium = profile?.is_premium;

    return (
        <Flex gap={8} wrap="wrap" justify="center" maxWidth="100%" p={4}>
            {pricingPlans.map((plan, index) => (
                <PriceCard
                    key={index}
                    {...plan}
                    isSelected={isPremium ? plan.title === "preemium" : plan.title === "Free Plan"}
                />
            ))}
        </Flex>
    );
}

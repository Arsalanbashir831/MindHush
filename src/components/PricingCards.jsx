import React, { useEffect, useState } from "react";
import { Box, Button, HStack, Text, VStack, Flex } from "@chakra-ui/react";
import { apiCallerAuthPost } from "@/api/ApiCaller";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { authState, userState } from "@/atom/state";
import { Switch } from "antd";

const PriceCard = ({
  title,
  price,
  description,
  isPopular,
  originalPrice,
  planId,
  isSelected,
  isAnnual,
  subscriptionType,
}) => {
  const token = localStorage.getItem("authToken");
  const isAuthenticated = useRecoilValue(authState);
  const profile = useRecoilValue(userState);
  const navigation = useNavigate();

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      navigation("/login");
    } else {
      try {
        const response = await apiCallerAuthPost(
          "/api/billing/create-checkout-session/",
          {},
          token
        );
        if (response.status === 200 && response.data?.url) {
          window.location.href = response.data.url;
        } else {
          alert("Failed to initiate the subscription. Please try again.");
        }
      } catch (error) {
        alert("An error occurred while trying to subscribe. Please try again.");
      }
    }
  };
const handleSubscribeAnnually= async ()=>{
    if (!isAuthenticated) {
        navigation("/login");
      } else {
        try {
          const response = await apiCallerAuthPost(
            "/api/billing/create-yearly-checkout-session/",
            {},
            token
          );
          if (response.status === 200 && response.data?.url) {
            window.location.href = response.data.url;
          } else {
            alert("Failed to initiate the subscription. Please try again.");
          }
        } catch (error) {
          alert("An error occurred while trying to subscribe. Please try again.");
        }
      }
}
  // Function to handle subscription cancellation
  const handleCancelSubscription = async () => {
    if (!isAuthenticated) {
      navigation("/login");
    } else {
      try {
        // Call the cancel subscription API
        const response = await apiCallerAuthPost(
          "/api/billing/cancel-subscription/",
          {},
          token
        );

        if (response.status === 200) {
          alert("Your subscription has been successfully cancelled.");
        } else {
          alert("Failed to cancel the subscription. Please try again.");
        }
      } catch (error) {
        alert(
          "An error occurred while trying to cancel the subscription. Please try again."
        );
      }
    }
  };
console.log('testing',subscriptionType==='monthly');

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
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="semibold"
          color="white"
        >
          {title}
        </Text>
        <HStack alignItems="center" spaceX={3}>
          <Text
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="bold"
            color="white"
          >
            ${price}
          </Text>
          {originalPrice && (
            <Text
              fontSize={{ base: "lg", md: "2xl" }}
              color="gray.400"
              textDecoration="line-through"
            >
              ${originalPrice}
            </Text>
          )}
        </HStack>
        <Text fontSize={{ base: "sm", md: "md" }} color="gray.400">
          per month, paid {price === "0.00" ? "nothing" :isAnnual?'Annually':'Monthly'}
        </Text>
       {isPopular &&(<>
     
            <Button
              bg={
                isSelected
                  ? "#4A4A4A"
                  : isPopular
                  ? "#61395BD1"
                  : "secondary.30"
              }
              color="white"
              size="lg"
              rounded="full"
              my={2}
              onClick={
                profile?.is_premium && subscriptionType==profile.subscription_type?  handleCancelSubscription : subscriptionType==='monthly'? handleSubscribe:handleSubscribeAnnually
              }
              isDisabled={isSelected}
              _hover={
                !isSelected && { bg: isPopular ? "#7A50764D" : "secondary.50" }
              }
            >
            
              {profile?.is_premium && profile.subscription_type===subscriptionType ?'Downgrade Subscription':'Subscribe'}
            </Button>
          </>)}
        {/* {isPopular &&!isAnnual && (
          <>
            <Button
              bg={
                isSelected
                  ? "#4A4A4A"
                  : isPopular
                  ? "#61395BD1"
                  : "secondary.30"
              }
              color="white"
              size="lg"
              rounded="full"
              my={2}
              onClick={
                profile?.is_premium ? handleCancelSubscription : handleSubscribe
              }
              isDisabled={isSelected}
              _hover={
                !isSelected && { bg: isPopular ? "#7A50764D" : "secondary.50" }
              }
            >
              {profile?.is_premium ? "Downgrade Subscription" : "Subscribe"}
            </Button>
          </>
        )} */}

        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.400">
          {description}
        </Text>
      </VStack>
    </Box>
  );
};

export default function PricingCards({ pricingPlans }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const profile = useRecoilValue(authState);
  const isPremium = profile?.is_premium;
  const filteredPlans = pricingPlans.filter((plan) => 
    plan.type === "free" || (isAnnual ? plan.type === "yearly" : plan.type === "monthly")
  );
  
  return (
    <>
      <HStack>
        <Text> Monthly</Text>
        <Switch
          size="lg"
          isChecked={isAnnual}
          onChange={() => setIsAnnual(!isAnnual)}
          colorScheme="purple"
        />
        <Text>Annually</Text>
      </HStack>

      <Flex gap={8} wrap="wrap" justify="center" maxWidth="100%" p={4}>
        {filteredPlans.map((plan, index) => (
          <PriceCard
            subscriptionType={plan.type}
            isAnnual={isAnnual}
            key={index}
            {...plan}
            isSelected={
              isPremium ? plan.title === "preemium" : plan.title === "Free Plan"
            }
          />
        ))}
      </Flex>
    </>
  );
}

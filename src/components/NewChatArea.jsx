import React, { useState } from "react";
import { Box, Text, SimpleGrid, VStack, Badge, Image, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { apiCallerAuthPost } from "@/api/ApiCaller";
import { useAuth } from "@/context/AuthContext";
import InputArea from "./InputArea";

export default function NewChat({ isDrawer }) {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);

    const categories = [
        { name: "Parenting", icon: "/icons/parenting_icon.svg", prompt: "How to be a better parent?" },
        { name: "Mental Health", icon: "/icons/mental_health_icon.svg", prompt: "Tips for improving mental health?" },
        { name: "Technology", icon: "/icons/technology_icon.svg", prompt: "Latest trends in technology?" },
        { name: "Financial", icon: "/icons/financial_icon.svg", prompt: "How to save money effectively?" },
        { name: "Identity", icon: "/icons/user_icon.svg", prompt: "How to discover my true self?" },
    ];

    const handlePromptSubmit = async (prompt) => {
        if (!prompt.trim()) {
            alert("Please enter a prompt.");
            return;
        }

        setIsCreating(true);

        try {
            // Create a new chat
            const createChatResponse = await apiCallerAuthPost(
                "/api/chats/create/",
                { name: prompt.substring(0, 50) },
                token
            );

            if (createChatResponse.status === 201) {
                const newChatId = createChatResponse.data.id;

                // Add the first message to the chat
              const response =  await apiCallerAuthPost(
                    `/api/chats/${newChatId}/messages/add/`,
                    { content: prompt },
                    token
                )
				if (response.status===201) {
					navigate(`/c/${newChatId}`); // Redirect to the newly created chat
				}else{
					alert('Your Daily Limit Exceeds please get your subscription for unlimited use')
					navigate('/pricing-plans')
				}
                
            } else {
                throw new Error(createChatResponse.data?.detail || "Failed to create chat.");
            }
        } catch (error) {
            console.error("Error creating chat:", error);
            alert("Failed to create chat. Please try again.");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <VStack w="full" my="auto">
            {/* Welcome Text */}
            
			{isCreating ? <Spinner size="lg" color="teal.500" />:<>

 {/* Search Input */}
 <Text fontSize="3xl" fontWeight="light" textAlign="center" lineHeight={1.2}>
                How can I help you <br /> today?
            </Text>
 <InputArea
                // isLoading={isCreating}
                onSubmitClick={handlePromptSubmit} // Pass handling logic
            />

            {/* Categories */}
            <SimpleGrid
                columns={{ base: 2, md: 3, lg: 5 }}
                gapY={6}
                gapX={4}
                mt={2}
                pb={2}
                maxW={{ base: "xs", sm: "sm", md: "3xl" }}
                display={{ base: "flex", md: "grid" }}
                flexWrap="nowrap"
                overflowX={{ base: "auto", md: "unset" }}
                scrollSnapType="x mandatory"
                css={{
                    "&::-webkit-scrollbar": {
                        height: "4px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#B55CFF",
                        borderRadius: "10px",
                    },
                }}
            >
                {categories.map((category) => (
                    <Box
                        key={category.name}
                        minW={{ base: "30%", md: "unset" }}
                        scrollSnapAlign="start"
                        onClick={() => handlePromptSubmit(category.prompt)} // Handle category click
                        cursor="pointer"
                    >
                        <VStack gapY={2}>
                            <Box
                                bg="gray.800"
                                p={4}
                                borderRadius="xl"
                                border="1px solid #424242"
                                _hover={{ bg: "#1f1f1f" }}
                                position="relative"
                            >
                                {category.isPro && (
                                    <Badge
                                        position="absolute"
                                        top={0}
                                        left={0}
                                        variant="solid"
                                        bg="#424242"
                                        fontSize="xx-small"
                                        roundedBottomLeft={0}
                                        roundedBottomRight="xl"
                                        roundedTopLeft="xl"
                                        roundedTopRight={0}
                                    >
                                        <Box
                                            display="inline-block"
                                            backgroundImage="linear-gradient(to right, #B55CFF, #5D8CFA)"
                                            backgroundClip="text"
                                            color="transparent"
                                        >
                                            Pro
                                        </Box>
                                    </Badge>
                                )}
                                <Image src={category.icon} alt={category.name} w={5} h={5} />
                            </Box>
                            <Text fontSize="sm" textAlign="center">
                                {category.name}
                            </Text>
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>
			</>}
           

          
        </VStack>
    );
}

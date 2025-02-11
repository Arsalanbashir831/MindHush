import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Badge, Image, Spinner, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { apiCallerAuthPost } from "@/api/ApiCaller";
import { useAuth } from "@/context/AuthContext";
import InputArea from "./InputArea";

export default function NewChat({ isDrawer }) {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);

    const prompts = {
        Parenting: [
            "How do I balance my role as a parent with my personal needs and career aspirations?",
            "How can I prepare my child to face the challenges and opportunities of the future?",
            "How can I show my parents that I appreciate them, even when we don’t agree?",
            "What boundaries do I need to set with my parent(s) to protect my emotional well-being?"
        ],
        MentalHealth: [
            "When I feel overwhelmed, what strategies can I use to regain control?",
            "I feel like I have a lot of negative thoughts. Can you help me reframe them into something more positive?",
            "What are some ways I can understand my emotions better and track my mental health over time?",
            "I’m facing a tough situation and don’t know how to deal with it. Can you guide me through coping strategies?"
        ],
        Financial: [
            "I’m struggling financially.",
            "I feel overwhelmed by my finances. How can I regain control and feel less stressed?",
            "How can I stop comparing my financial situation to others and focus on my own progress?",
            "I feel guilty spending money on myself."
        ],
        Identity: [
            "I have an identity crisis.",
            "I feel like my gender does not represent me.",
            "What are some ways I can better understand my authentic self during this period of change?",
            "How can I explore my identity?"
        ]
    };

    const categories = [
        { name: "Parenting", icon: "/icons/parenting_icon.svg", prompts: prompts.Parenting, label: "Parenting" },
        { name: "MentalHealth", icon: "/icons/mental_health_icon.svg", prompts: prompts.MentalHealth, label: "Mental Health" },
        { name: "Financial", icon: "/icons/financial_icon.svg", prompts: prompts.Financial, label: "Financial" },
        { name: "Identity", icon: "/icons/user_icon.svg", prompts: prompts.Identity, label: "Identity" }
    ];

    const [randomIndexes, setRandomIndexes] = useState({});

    useEffect(() => {
        const initialIndexes = {};
        categories.forEach((category) => {
            initialIndexes[category.name] = Math.floor(Math.random() * category.prompts.length);
        });
        setRandomIndexes(initialIndexes);
    }, []);

    const getRandomPrompt = (categoryName) => {
        const categoryPrompts = prompts[categoryName];
        if (!categoryPrompts || categoryPrompts.length === 0) return "How can I help you today?";

        const newIndex = Math.floor(Math.random() * categoryPrompts.length);
        setRandomIndexes((prevIndexes) => ({
            ...prevIndexes,
            [categoryName]: newIndex
        }));

        return categoryPrompts[newIndex];
    };

    const handlePromptSubmit = async (prompt) => {
        if (!prompt.trim()) {
            alert("Please enter a prompt.");
            return;
        }

        setIsCreating(true);

        try {
            const createChatResponse = await apiCallerAuthPost(
                "/api/chats/create/",
                { name: prompt.substring(0, 50) },
                token
            );

            if (createChatResponse.status === 201) {
                const newChatId = createChatResponse.data.id;

                const response = await apiCallerAuthPost(
                    `/api/chats/${newChatId}/messages/add/`,
                    { content: prompt },
                    token
                );

                if (response.status === 201) {
                    window.location.href = `/c/${newChatId}`;
                } else {
                    alert("Your Daily Limit Exceeds. Please get a subscription for unlimited use.");
                    navigate("/pricing-plans");
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
        <Flex
            minHeight="100vh"
            align="center"
            justify="center"
            py={{ base: 6, md: 8 }}
            px={{ base: 4, md: 8 }}
            bg="gray.900"
            w="full"
        >
            <VStack w="full" maxW="600px" spacing={6}>
                {isCreating ? (
                    <Spinner size="lg" color="teal.500" />
                ) : (
                    <>
                        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="light" textAlign="center" color="white">
                            How can I help you today?
                        </Text>

                        <InputArea onSubmitClick={handlePromptSubmit} />

                        <Flex
                            w="full"
                            overflowX="auto"
                            flexWrap={{ base: "nowrap", md: "wrap" }}
                            justify={{ base: "flex-start", md: "center" }}
                            scrollSnapType="x mandatory"
                            gap={4}
                            css={{
                                "&::-webkit-scrollbar": {
                                    height: "4px"
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    background: "#B55CFF",
                                    borderRadius: "10px"
                                }
                            }}
                        >
                            {categories.map((category) => (
                                <Box
                                    key={category.name}
                                    minW={{ base: "140px", sm: "160px", md: "200px" }}
                                    maxW="200px"
                                    flexShrink={0}
                                    p={3}
                                    onClick={() => handlePromptSubmit(getRandomPrompt(category.name))}
                                    cursor="pointer"
                                    textAlign="center"
                                >
                                    <VStack gap={2} align="center">
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
                                            <Image src={category.icon} alt={category.name} w={8} h={8} />
                                        </Box>
                                        <Text fontSize="sm" textAlign="center" color="white">
                                            {category.label}
                                        </Text>
                                    </VStack>
                                </Box>
                            ))}
                        </Flex>
                    </>
                )}
            </VStack>
        </Flex>
    );
}

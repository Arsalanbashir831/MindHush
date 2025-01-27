import { useEffect, useState } from "react";
import { Box, HStack, Image } from "@chakra-ui/react";
import Lottie from "lottie-react";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ message, isUser, isAIResponseLoading, messageRef }) => {
    const [animationData, setAnimationData] = useState(null);

    // ✅ Fetch Lottie JSON from `public/` when the component mounts
    useEffect(() => {
        fetch("/typing_animation.json")
            .then((response) => response.json())
            .then((data) => setAnimationData(data))
            .catch((error) => console.error("Error loading Lottie animation:", error));
    }, []);

    // Ensure the message is a valid string and properly formatted
    const sanitizedMessage = typeof message === "string" ? message.trim() : String(message || "");

    return (
        <HStack
            w="full"
            alignItems="flex-start"
            justifyContent={isUser ? "flex-end" : "flex-start"}
            spacing={4} // Ensures proper spacing between elements
            ref={messageRef} // ✅ Assigns ref to the last message dynamically
        >
            {/* AI Avatar */}
            {!isUser && (
                <Image
                    src="/logo2.jpg"
                    alt="AI avatar"
                    boxSize="40px"
                    borderRadius="full"
                    ml={2}
                />
            )}

            {/* AI/User Message Bubble */}
            <Box
                maxW="40%"
                color="white"
                px={4}
                py={3}
                bg={isUser ? "#7A50764D" : "#FFFFFF1A"}
                borderRadius="2xl"
                position="relative"
                minH="40px"
                textAlign="left"
            >
                {isAIResponseLoading && !isUser ? (
                    animationData ? (
                        <Lottie animationData={animationData} style={{ width: 30, height: 30 }} />
                    ) : (
                        "Loading..."
                    )
                ) : (
                    <ReactMarkdown>{sanitizedMessage}</ReactMarkdown>
                )}
            </Box>

            {/* User Avatar */}
            {isUser && (
                <Image
                    src="/user_avatar.png"
                    alt="User avatar"
                    boxSize="40px"
                    borderRadius="full"
                    mr={2}
                />
            )}
        </HStack>
    );
};

export default ChatMessage;

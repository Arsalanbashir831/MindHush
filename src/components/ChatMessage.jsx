import { Box, HStack, Text, Image } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ message, isUser, time }) => {
    // Ensure the message is a valid string
    const sanitizedMessage = typeof message === "string" ? message.trim() : String(message || "");


    return (
        <HStack
            w="full"
            alignItems="flex-start"
            justifyContent={isUser ? "flex-end" : "flex-start"}
        >
            {!isUser && (
                <Image
                    src="/logo2.jpg"
                    alt="AI avatar"
                    boxSize="40px"
                    borderRadius="full"
                    ml={2}
                />
            )}
            <Box
                maxW="80%"
                color="white"
                px={3}
                py={2}
                bg={isUser ? "#7A50764D" : "#FFFFFF1A"}
                borderRadius="2xl"
                position="relative"
            >
                <ReactMarkdown>{sanitizedMessage}</ReactMarkdown>
            </Box>

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

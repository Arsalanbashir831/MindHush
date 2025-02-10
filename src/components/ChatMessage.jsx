import { useEffect, useState } from "react";
import { Box, HStack, Image, useBreakpointValue } from "@chakra-ui/react";
import Lottie from "lottie-react";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ message, isUser, isAIResponseLoading, messageRef }) => {
    const [animationData, setAnimationData] = useState(null);

    // ✅ Responsive styling
    const maxWidth = useBreakpointValue({ base: "85%", sm: "75%", md: "60%", lg: "50%" });
    const fontSize = useBreakpointValue({ base: "14px", sm: "15px", md: "16px", lg: "17px" });
    const paddingX = useBreakpointValue({ base: 3, sm: 4 }); // Adjust padding for small screens

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
                    src="/gradient_logo.png"
                    width={'40px'}
                    height={'65px'}
                    alt="AI avatar"
                    //  boxSize="44px"
                    borderRadius="full"
                    ml={0}
                />
            )}

            {/* AI/User Message Bubble */}
            <Box
                maxW={maxWidth}
                color="white"
                px={paddingX}
                py={3}
                bg={isUser ? "#7A50764D" : "#FFFFFF1A"}
                borderRadius="2xl"
                position="relative"
                minH="40px"
                textAlign="left"
                fontSize={fontSize} // ✅ Dynamically adjust font size
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
                    src="/profile_img_improve.png"
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

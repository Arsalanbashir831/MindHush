import { useState, useEffect, useRef } from "react";
import { VStack, Flex, Box, Spinner, Center, Text, useBreakpointValue } from "@chakra-ui/react";
import { useParams, useLocation, useNavigate } from "react-router";
import ChatMessage from "./ChatMessage";
import InputArea from "./InputArea";
import { apiCallerAuthPost, apiCallerAuthGet } from "@/api/ApiCaller";
import { useAuth } from "@/context/AuthContext";
import { useRecoilState } from "recoil";
import { refreshState } from "@/atom/state";

const ChattingArea = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAIResponseLoading, setIsAIResponseLoading] = useState(false);
    const lastMessageRef = useRef(null);
    const [refresh, setRefresh] = useRecoilState(refreshState);

    // Responsive height for chat container
    const chatHeight = useBreakpointValue({ base: "82vh", md: "90vh" });

    // Auto-scroll to last message
    const scrollToBottom = () => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Fetch chat messages
    const fetchMessages = async (chatId) => {
        setIsLoading(true);
        try {
            const response = await apiCallerAuthGet(`/api/chats/${chatId}/messages/`, token);
            if (response.status === 200) {
                const formattedMessages = response.data.map((msg) => ({
                    message: msg.content,
                    isUser: !msg.is_system_message,
                }));
                setMessages(formattedMessages);
            } else {
                throw new Error("Failed to fetch messages");
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            setChatId(id);
            fetchMessages(id);
        } else if (state && !chatId && !isCreatingChat) {
            const createChat = async () => {
                setIsCreatingChat(true);
                try {
                    const createChatResponse = await apiCallerAuthPost(
                        "/api/chats/create/",
                        { name: state.substring(0, 50) },
                        token
                    );

                    if (createChatResponse.status === 201) {
                        const newChatId = createChatResponse.data.id;
                        setChatId(newChatId);

                        const addMessageResponse = await apiCallerAuthPost(
                            `/api/chats/${newChatId}/messages/add/`,
                            { content: state },
                            token
                        );

                        setMessages([
                            { message: addMessageResponse.data.content, isUser: true },
                            { message: addMessageResponse.data.ai_response, isUser: false },
                        ]);

                        navigate(`/c/${newChatId}`);
                    } else {
                        throw new Error("Failed to create chat");
                    }
                } catch (error) {
                    console.error("Error creating chat:", error);
                } finally {
                    setIsCreatingChat(false);
                }
            };

            createChat();
        }
    }, [id, state, chatId, token, navigate, isCreatingChat]);

    const onSubmitClick = async (newMessage) => {
        if (!chatId) {
            alert("Chat is not properly initialized. Please try again.");
            return;
        }

        setMessages((prev) => [...prev, { message: newMessage, isUser: true }]);

        const dummyId = `dummy-${Date.now()}`;
        setMessages((prev) => [
            ...prev,
            { id: dummyId, message: "", isUser: false, isAIResponseLoading: true }
        ]);
        setIsAIResponseLoading(true);

        try {
            const addMessageResponse = await apiCallerAuthPost(
                `/api/chats/${chatId}/messages/add/`,
                { content: newMessage },
                token
            );

            if (addMessageResponse.status === 201) {
                setRefresh(!refresh);
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === dummyId
                            ? { message: addMessageResponse.data.ai_response, isUser: false }
                            : msg
                    )
                );
                setIsAIResponseLoading(false);
            } else {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === dummyId
                            ? { message: "You have exceeded your daily credits. Try again tomorrow.", isUser: false }
                            : msg
                    )
                );
                setIsAIResponseLoading(false);
            }
        } catch (error) {
            console.error("Error adding message to chat:", error);
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === dummyId
                        ? { message: "Something went wrong. Please try again.", isUser: false }
                        : msg
                )
            );
            setIsAIResponseLoading(false);
        }
    };

    return (
        <Flex
            flexDirection="column"
            height={chatHeight}
            justifyContent="end"
            w="full"

             h={'90vh'}
            color="white"
            px={{ base: 2, md: 4 }} // Less padding on mobile
            // pb={{ base: 2, md: 4 }} // Adjust bottom padding
        >
            {isLoading ? (
                <Center h="100%">
                    <Spinner size="xl" color="teal.500" />
                </Center>
            ) : (
                <>
                    <VStack
                        spacing={3}
                        overflowY="auto"
                        w="full"
                        h="100%"
                        pr={{ base: 1, md: 2 }} // Smaller padding for mobile
                        pb={4}
                    >
                        {messages.map((msg, index) => (
                            <ChatMessage
                                key={index}
                                message={msg.message}
                                isUser={msg.isUser}
                                isAIResponseLoading={msg.isAIResponseLoading || false}
                                messageRef={index === messages.length - 1 ? lastMessageRef : null}
                            />
                        ))}
                    </VStack>

                    <Box w="full" pt={{ base: 1, md: 2 }} zIndex={10}>
                        <InputArea onSubmitClick={onSubmitClick} />
                    </Box>
                </>
            )}

            {/* Disclaimer Message */}
            <Text
                color="gray.400"
                fontStyle="italic"
                textAlign="center"
                fontSize={{ base: "xs", md: "sm" }} // Smaller text on mobile
                mt={2}
            >
                MindHush.ai is not a licensed professional. For urgent or serious concerns, please seek assistance from a qualified expert.
            </Text>
        </Flex>
    );
};

export default ChattingArea;

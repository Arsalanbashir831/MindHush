import { useState, useEffect, useRef } from "react";
import { VStack, Flex, Box, Spinner, Center } from "@chakra-ui/react";
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
    const { token  } = useAuth(); 

    const [messages, setMessages] = useState([]);
    const [chatId, setChatId] = useState(null);
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAIResponseLoading, setIsAIResponseLoading] = useState(false);
    const lastMessageRef = useRef(null); // ✅ Reference to last message
const [refresh , setRefresh] = useRecoilState(refreshState)
    // ✅ Auto-scroll to the last message
    const scrollToBottom = () => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]); // ✅ Scrolls on new messages

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

        // Add a dummy AI message for loading animation
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
                setRefresh(!refresh)
                setMessages((prev) =>
                    prev.map((msg, index) =>
                        msg.id === dummyId
                            ? { message: addMessageResponse.data.ai_response, isUser: false }
                            : msg
                    )
                );
                setIsAIResponseLoading(false);
            } else {
                setMessages((prev) =>
                    prev.map((msg, index) =>
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
                prev.map((msg, index) =>
                    msg.id === dummyId
                        ? { message: "Something went wrong. Please try again.", isUser: false }
                        : msg
                )
            );
            setIsAIResponseLoading(false);
        }
    };

    return (
        <Flex flexDirection="column" height="90vh" justifyContent={'end'} w="full" color="white" p={4}>
            {isLoading ? (
                <Center h="100%">
                    <Spinner size="xl" color="teal.500" />
                </Center>
            ) : (
                <>
                    <VStack spacing={4} overflowY="auto" w="full" h="100%" pr={2} pb={5}>
                        {messages.map((msg, index) => (
                            <ChatMessage
                                key={index}
                                message={msg.message}
                                isUser={msg.isUser}
                                isAIResponseLoading={msg.isAIResponseLoading || false}
                                messageRef={index === messages.length - 1 ? lastMessageRef : null} // ✅ Assign last message ref
                            />
                        ))}
                    </VStack>

                    <Box w="full" pt={0} zIndex={10}>
                        <InputArea onSubmitClick={onSubmitClick} />
                    </Box>
                </>
            )}
        </Flex>
    );
};

export default ChattingArea;

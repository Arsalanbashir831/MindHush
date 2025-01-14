import React from "react";
import { Box, VStack, HStack, Button, Text } from "@chakra-ui/react";
import { BsChatSquareText, BsStars, BsThreeDotsVertical } from "react-icons/bs";
import { LuPlus, LuMessageCircle } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import { MdFeedback } from "react-icons/md";
import { Dropdown, Menu, Modal, message } from "antd";
import Logo from "./Logo";
import TokensBox from "./TokensBox";
import ReactDOM from "react-dom";

const Sidebar = ({ categorizedChats, activeChat, setActiveChat }) => {
    const navigate = useNavigate();

    
	const handleRenameChat = (chatId, currentName) => {
		Modal.confirm({
			title: <span style={{ color: "white" }}>Rename Chat</span>,
			content: (
				<input
					type="text"
					defaultValue={currentName}
					id="rename-chat-input"
					style={{
						width: "100%",
						padding: "8px",
						marginTop: "8px",
						backgroundColor: "#333", // Dark input background
						color: "white",           // White text
						border: "1px solid #555", // Slight border for visibility
						borderRadius: "5px"
					}}
				/>
			),
			className: "dark-modal ", // Apply custom dark theme class
			okText: "Rename",
			cancelText: "Cancel",
			okButtonProps: { style: { backgroundColor: "purple", borderColor: "purple" } }, // Blue confirm button
			cancelButtonProps: { style: { backgroundColor: "#444", color: "white", borderColor: "#666" } }, // Dark cancel button
			onOk: () => {
				const newName = document.getElementById("rename-chat-input")?.value.trim();
				if (newName) {
					console.log(`Renaming chat ${chatId} to ${newName}`);
					message.success("Chat renamed successfully!");
					// TODO: Add API call for renaming
				}
			}
		});
	};

    const handleDeleteChat = (chatId) => {
        Modal.confirm({
            title: "Are you sure?",
            content: "This action cannot be undone.",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: () => {
                console.log(`Deleting chat ${chatId}`);
                message.success("Chat deleted successfully!");
                // TODO: Add API call for deleting chat
            },
        });
    };

    const handleReportChat = (chatId) => {
        console.log(`Reporting chat ${chatId}`);
        message.success("Chat reported successfully!");
        // TODO: Add API call for reporting chat
    };

    return (
        <Box
            alignSelf="flex-start"
            h="100vh"
            w={{ base: "100%", md: "350px" }}
            bg="linear-gradient(to right, #222529, #282A2F)"
            p={4}
            display="flex"
            flexDirection="column"
        >
            {/* Header Section */}
            <VStack align="stretch" spacing={4} flexShrink={0}>
                {/* Logo */}
                <Logo />

                {/* New Chat Button */}
                <Button
                    variant="outline"
                    border="1px solid #616161"
                    rounded="2xl"
                    mt={10}
                    onClick={() => navigate("/c/new", { state: "Hello, I need help!" })}
                >
                    <LuPlus style={{ marginRight: "2px" }} />
                    Start New
                </Button>
            </VStack>

            {/* Chat List Section */}
            <VStack align="stretch" overflowY="auto" flex="1" spacing={0} mt={4}>
                {Object.entries(categorizedChats).map(
                    ([category, chats]) =>
                        chats.length > 0 && (
                            <Box key={category}>
                                <Text fontSize="sm" color="gray.400" mt={4}>
                                    {category}
                                </Text>
                                {chats.map((chat) => (
                                    <HStack  key={chat.id} justify="space-between" w="full">
                                        {/* Chat Button */}
                                        <Button 
                                            variant="ghost"
                                            justifyContent="flex-start"
                                            bg={activeChat === chat.id ? "gray.900" : "#25282C"}
                                            size="sm"
                                            w={'80%'}
                                            rounded="xl"
                                            my={1}
                                            onClick={() => {
                                                setActiveChat(chat.id);
                                                navigate(`/c/${chat.id}`);
                                            }}
                                        >
                                            <BsChatSquareText />
                                            <Text textAlign={'left'} truncate flex="1" isTruncated>
                                                {chat.name}
                                            </Text>
                                        </Button>

                                        {/* Three-Dot Menu (Ant Design Dropdown) */}
										<Dropdown
    overlay={
        <Menu
            theme="dark"
            style={{
                backgroundColor: "#1E1E1E",  // Dark background
                color: "white",             // White text
                borderRadius: "8px",        // Rounded corners
                border: "1px solid #333"    // Slight border for better visibility
            }}
        >
            <Menu.Item 
                onClick={() => handleRenameChat(chat.id, chat.name)} 
                style={{ color: "#ddd", padding: "8px 16px" }}
            >
                📝 Rename
            </Menu.Item>
            <Menu.Item 
                onClick={() => handleDeleteChat(chat.id)} 
                danger 
                style={{ color: "#ff4d4f", padding: "8px 16px" }}
            >
                🗑️ Delete
            </Menu.Item>
            <Menu.Item 
                onClick={() => handleReportChat(chat.id)} 
                style={{ color: "#FFA500", padding: "8px 16px" }}
            >
                ⚠️ Report
            </Menu.Item>
        </Menu>
    }
    trigger={["click"]}
    placement="bottomRight"
>
    <Button 
        variant="ghost" 
        size="sm" 
        _hover={{ bg: "gray.700" }}  // Dark hover effect
    >
        <BsThreeDotsVertical color="white" />
    </Button>
</Dropdown>

                                    </HStack>
                                ))}
                            </Box>
                        )
                )}
            </VStack>

            {/* Footer Section */}
            <Box mt="auto">
                <TokensBox />

                <VStack gap={2} px={2}>
                    <HStack alignSelf="flex-start">
                        <Box display="flex" alignItems="center">
                            <MdFeedback style={{ marginRight: "8px" }} />
                            Feedback
                        </Box>
                    </HStack>
                    <HStack alignSelf="flex-start">
                        <Link to="#">
                            <Box display="flex" alignItems="center">
                                <LuMessageCircle style={{ marginRight: "8px" }} />
                                Support
                            </Box>
                        </Link>
                    </HStack>
                    <HStack alignSelf="flex-start">
                        <Link to="/pricing-plans">
                            <Box display="flex" alignItems="center">
                                <BsStars style={{ marginRight: "8px" }} />
                                Pricing Plans
                            </Box>
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Box>
    );
};

export default Sidebar;

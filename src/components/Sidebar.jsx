import React from "react";
import { Box, VStack, HStack, Button, Text } from "@chakra-ui/react";
import { BsChatSquareText, BsStars, BsThreeDotsVertical } from "react-icons/bs";
import { LuPlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import { MdDelete, MdEdit, MdFeedback, MdReport } from "react-icons/md";
import { Dropdown, Flex, Menu, Modal, message } from "antd";
import Logo from "./Logo";
import TokensBox from "./TokensBox";
import { apiCallerAuthPost, apiCallerPost } from "@/api/ApiCaller";
import { useRecoilValue } from "recoil";
import { userState } from "@/atom/state";

const Sidebar = ({ categorizedChats, activeChat, setActiveChat, refresh, setRefresh }) => {
  const navigate = useNavigate();
  const profile = useRecoilValue(userState);

  const handleRenameChat = (chatId, currentName) => {
    let newName = currentName;
    Modal.confirm({
      title: <span style={{ color: "white" }}>Rename Chat</span>,
      content: (
        <input
          type="text"
          defaultValue={currentName}
          onChange={(e) => (newName = e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "8px",
            backgroundColor: "#333",
            color: "white",
            border: "1px solid #555",
            borderRadius: "5px",
          }}
        />
      ),
      className: "dark-modal",
      okText: "Rename",
      cancelText: "Cancel",
      onOk: async () => {
        if (newName.trim()) {
          await apiCallerAuthPost(`/api/chats/${chatId}/rename/`, { name: newName }, localStorage.getItem("authToken"))
            .then(() => {
              message.success("Chat renamed successfully!");
              setRefresh(!refresh);
            })
            .catch(() => message.error("Something went wrong"));
        }
      },
    });
  };

  const handleDeleteChat = (chatId) => {
    Modal.confirm({
      title: <span style={{ color: "white" }}>Delete Chat</span>,
      content: <span style={{ color: "white" }}>This action cannot be undone.</span>,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      className: "dark-modal",
      onOk: async () => {
        await apiCallerAuthPost(`/api/chats/delete/`, { chat_id: chatId }, localStorage.getItem("authToken"))
          .then(() => {
            message.success("Chat deleted successfully!");
            setRefresh(!refresh);
          })
          .catch(() => message.error("Something went wrong"));
      },
    });
  };

  const handleReportChat = (chatId) => {
    let reason = "";
    Modal.confirm({
      title: <span style={{ color: "white" }}>Reason for Reporting</span>,
      content: (
        <input
          type="text"
          placeholder="Enter reason..."
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "8px",
            backgroundColor: "#333",
            color: "white",
            border: "1px solid #555",
            borderRadius: "5px",
          }}
          onChange={(e) => (reason = e.target.value)}
        />
      ),
      className: "dark-modal",
      okText: "Report",
      onOk: async () => {
        if (!reason.trim()) return message.error("Please provide a reason.");
        const response = await apiCallerPost("/api/report/", { user_id: profile.id, chat_id: chatId, reason });
        response.status === 201 ? message.success("Chat reported successfully!") : message.error("Failed to report.");
      },
    });
  };

  return (
    <Box
      h="100vh"
      w={{ base: "100%", md: "350px" }}
      bg="linear-gradient(to right, #222529, #282A2F)"
      p={4}
      display="flex"
      flexDirection="column"
    >
      {/* Logo + Start New Chat */}
      <VStack align="stretch" pt={4} spacing={4} flexShrink={0}>
        <Logo />
        <Button
          variant="outline"
          border="1px solid #616161"
          rounded="2xl"
          mt={4}
          color="white"
          onClick={() => navigate("/c/new", { state: "Hello, I need help!" })}
        >
          <LuPlus style={{ marginRight: "5px" }} />
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
                  <HStack key={chat.id} justify="space-between" w="full">
                    {/* Chat Button */}
                    <Button
                      variant="ghost"
                      justifyContent="flex-start"
                      bg={activeChat === chat.id ? "gray.900" : "#25282C"}
                      size="sm"
                      w="80%"
                      rounded="xl"
                      my={1}
                      onClick={() => {
                        setActiveChat(chat.id);
                        navigate(`/c/${chat.id}`);
                      }}
                    >
                      <BsChatSquareText />
                      <Text color="white" textAlign="left" truncate flex="1" isTruncated>
                        {chat.name}
                      </Text>
                    </Button>

                    {/* Dropdown Menu - FIXED FOR MOBILE */}
                    <Dropdown
                      overlay={
                        <Menu
                          theme="dark"
                          style={{
                            backgroundColor: "#1E1E1E",
                            color: "white",
                            borderRadius: "8px",
                            border: "1px solid #333",
                          }}
                        >
                          <Menu.Item onClick={() => handleRenameChat(chat.id, chat.name)} style={{ color: "#ddd" }}>
                            <Flex align="center" gap={5}>
                              <MdEdit /> Rename
                            </Flex>
                          </Menu.Item>
                          <Menu.Item onClick={() => handleDeleteChat(chat.id)} style={{ color: "#ff4d4f" }}>
                            <Flex align="center" gap={5}>
                              <MdDelete size={15} /> Delete
                            </Flex>
                          </Menu.Item>
                          <Menu.Item onClick={() => handleReportChat(chat.id)} style={{ color: "#FFA500" }}>
                            <Flex align="center" gap={5}>
                              <MdReport size={15} /> Report
                            </Flex>
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                      placement="bottomRight"
                      getPopupContainer={(trigger) => trigger.parentElement} // Ensures dropdown stays within sidebar
                    >
                      <Button variant="ghost" size="sm" _hover={{ bg: "gray.700" }}>
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
        <VStack justifyContent={'start'} alignItems={'start'} gap={2} px={2}>
          <Link to="/feedback">
            <HStack>
              <MdFeedback />
              <Text>Feedback</Text>
            </HStack>
          </Link>
          <Link to="/pricing-plans">
            <HStack>
              <BsStars />
              <Text>Pricing Plans</Text>
            </HStack>
          </Link>
        </VStack>
      </Box>
    </Box>
  );
};

export default Sidebar;

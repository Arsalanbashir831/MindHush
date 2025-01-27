import React from "react";
import { Box, VStack, HStack, Button, Text } from "@chakra-ui/react";
import { BsChatSquareText, BsStars, BsThreeDotsVertical } from "react-icons/bs";
import { LuPlus, LuMessageCircle } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import { MdDelete, MdEdit, MdFeedback, MdReport } from "react-icons/md";
import { Dropdown, Flex, Menu, Modal, message } from "antd";
import Logo from "./Logo";
import TokensBox from "./TokensBox";
import { apiCallerAuthPost, apiCallerPost } from "@/api/ApiCaller";
import { useRecoilValue } from "recoil";
import { userState } from "@/atom/state";

const Sidebar = ({
  categorizedChats,
  activeChat,
  setActiveChat,
  refresh,
  setRefresh,
}) => {
  const navigate = useNavigate();
const profile = useRecoilValue(userState)
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
            color: "white", // White text
            border: "1px solid #555", // Slight border for visibility
            borderRadius: "5px",
          }}
        />
      ),
      className: "dark-modal ", // Apply custom dark theme class
      okText: "Rename",
      cancelText: "Cancel",
      okButtonProps: {
        style: { backgroundColor: "purple", borderColor: "purple" },
      }, // Blue confirm button
      cancelButtonProps: {
        style: { backgroundColor: "#444", color: "white", borderColor: "#666" },
      }, // Dark cancel button
      onOk: async () => {
        const token = localStorage.getItem("authToken");
        const newName = document
          .getElementById("rename-chat-input")
          ?.value.trim();
        if (newName) {
          await apiCallerAuthPost(
            `/api/chats/${chatId}/rename/`,
            {
              name: newName,
            },
            token
          )
            .then((data) => {
              if (data) {
                console.log(`Renaming chat ${chatId} to ${newName}`);
                message.success("Chat renamed successfully!");
                // TODO: Add API call for renaming
                setRefresh(!refresh);
              }
            })
            .catch((e) => {
              message.error("Something went wrong");
            });
        }
      },
    });
  };

  const handleDeleteChat = (chatId) => {
    Modal.confirm({
      title: <span style={{ color: "white" }}>Delete Chat</span>,
      content: (
        <span style={{ color: "white" }}>This action cannot be undone.</span>
      ),
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      className: "dark-modal ",
      okButtonProps: {
        style: { backgroundColor: "red", color: "white", borderColor: "red" },
      }, // Blue confirm button
      cancelButtonProps: {
        style: { backgroundColor: "#444", color: "white", borderColor: "#666" },
      }, // Dark cancel button
      onOk: async () => {
        const token = localStorage.getItem("authToken");
        await apiCallerAuthPost(
          `/api/chats/delete/`,
          {
            chat_id: chatId,
          },
          token
        )
          .then((data) => {
            if (data) {
              //    console.log(`Renaming chat ${chatId} to ${newName}`);
              message.success("Chat deleted successfully!");
              // TODO: Add API call for renaming
              setRefresh(!refresh);
            }
          })
          .catch((e) => {
            message.error("Something went wrong");
          });
      },
    });
  };

  const handleReportChat = (chatId) => {
    let reason = ""; // To store the input value
  
    Modal.confirm({
      title: <span style={{ color: "white" }}>What is the Reason to Report?</span>,
      content: (
        <input
          type="text"
          placeholder="Enter reason for reporting..."
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "8px",
            backgroundColor: "#333",
            color: "white",
            border: "1px solid #555",
            borderRadius: "5px",
          }}
          onChange={(e) => (reason = e.target.value)} // Capture input value
        />
      ),
      className: "dark-modal",
      okText: "Report",
      cancelText: "Cancel",
      okButtonProps: {
        style: { backgroundColor: "orange", borderColor: "orange" },
      },
      cancelButtonProps: {
        style: { backgroundColor: "#444", color: "white", borderColor: "#666" },
      },
      onOk: async () => {
        if (!reason.trim()) {
          message.error("Please provide a reason for reporting.");
          return Promise.reject(); // Prevent modal from closing
        }
  
        const response = await apiCallerPost('/api/report/',{
            "user_id": profile.id,
    "chat_id": chatId,
    "reason": reason
        })
      console.log(response);
      
        
        if (response.status===201) {
            message.success("Chat reported successfully!");
        }else{
            message.error("Failed to report chat. Please try again later.");
        }
     
      },
    });
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
      <VStack align="stretch" spacing={4} flexShrink={0}>
        <Logo />

        <Button
          variant="outline"
          border="1px solid #616161"
          rounded="2xl"
          mt={10}
          onClick={() => navigate("/c/new", { state: "Hello, I need help!" })}
          color={'white'}
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
                  <HStack key={chat.id} justify="space-between" w="full">
                    {/* Chat Button */}
                    <Button
                      variant="ghost"
                      justifyContent="flex-start"
                      bg={activeChat === chat.id ? "gray.900" : "#25282C"}
                      size="sm"
                      w={"80%"}
                      rounded="xl"
                      my={1}
                      onClick={() => {
                        setActiveChat(chat.id);
                        navigate(`/c/${chat.id}`);
                      }}
                    >
                      <BsChatSquareText />
                      <Text color={'white'} textAlign={"left"} truncate flex="1" isTruncated>
                        {chat.name}
                      </Text>
                    </Button>

                    {/* Three-Dot Menu (Ant Design Dropdown) */}
                    <Dropdown
                      overlay={
                        <Menu
                          theme="dark"
                          style={{
                            backgroundColor: "#1E1E1E", // Dark background
                            color: "white", // White text
                            borderRadius: "8px", // Rounded corners
                            border: "1px solid #333", // Slight border for better visibility
                          }}
                        >
                          <Menu.Item
                            onClick={() => handleRenameChat(chat.id, chat.name)}
                            style={{ color: "#ddd", padding: "8px 16px" }}
                          >
                            <Flex align="center" gap={5}>
                              <MdEdit /> Rename
                            </Flex>
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => handleDeleteChat(chat.id)}
                            style={{ color: "#ff4d4f", padding: "8px 16px" }}
                          >
                            <Flex align="center" gap={5}>
                              <MdDelete size={15} /> Delete
                            </Flex>
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => handleReportChat(chat.id)}
                            style={{ color: "#FFA500", padding: "8px 16px" }}
                          >
                            <Flex align="center" gap={5}>
                              <MdReport size={15} /> Report
                            </Flex>
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                      placement="bottomRight"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        _hover={{ bg: "gray.700" }} // Dark hover effect
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
            <Link to="/feedback">
              <Box display="flex" alignItems="center">
                <MdFeedback style={{ marginRight: "8px" }} />
                Feedback
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

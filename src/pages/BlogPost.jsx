import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  IconButton,
  Flex,
  Container,
  Button,
} from "@chakra-ui/react";
import { FaCaretLeft } from "react-icons/fa";

import { apiCallerGet, BASE_URL } from "@/api/ApiCaller";
import FooterSection from "@/components/FooterSection";
import DOMPurify from "dompurify"; // Import DOMPurify for safe HTML rendering
import { useNavigate, useParams } from "react-router";

const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the blog ID from the URL

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await apiCallerGet(`/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  return (
    <Box bg="#09090C" color="white" minH="100vh" h="100vh" overflowY="auto">
	   <Flex position={'fixed'} width={'95%'} justify="space-between" align="center" my={6} mx={10}>
          <IconButton
            aria-label="Go back"
            variant="ghost"
            color="white"
            fontSize="xl"
            rounded="full"
            _hover={{ bg: "whiteAlpha.200" }}
            onClick={() => navigate("/")}
            icon={<FaCaretLeft color="white" />}
          > BACK</IconButton>
		 <Button onClick={()=>window.location.href='/c/new'} bg={'teal.600'} color={'white'}> Chat with Aira</Button>
        </Flex>

      {/* Main Container */}
      <Container p={6} maxW={{ base: "100%", md: "breakpoint-lg" }}>
        {/* Back Button */}
     
        {/* Blog Content */}
        <VStack spacing={8} align="center">
          {/* Blog Header */}
          <Box textAlign="center">
          
            <Heading size="2xl" fontSize="34px" fontWeight="bold" mb={2}>
              {blog?.title}
            </Heading>
          </Box>

          {/* Blog Image */}
          {blog?.image && (
            <Box w="full" mt={2} mb={10}>
              <Image
                src={`${BASE_URL}/${blog.image}`}
                alt="Blog Cover"
                borderRadius="md"
                objectFit="cover"
                w="full"
              />
            </Box>
          )}

          {/* Blog Content with HTML Rendering */}
          {blog?.content && (
            <Box
              w="full"
              color="gray.300"
              fontSize="md"
              lineHeight="tall"
              textAlign="left"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.content), // Prevents XSS attacks
              }}
            />
          )}
        </VStack>
      </Container>

      {/* Footer Section */}
      <FooterSection />
    </Box>
  );
};

export default BlogPost;

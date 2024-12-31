import React, { useEffect, useState } from "react";
import {
	Box,
	Heading,
	Text,
	Flex,
	IconButton,
	Image,
	VStack,
	Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import axios from "axios"; // Assuming axios is installed
import { apiCallerGet, BASE_URL } from "@/api/ApiCaller";

const BlogCard = ({ image, title, number }) => {
	const navigate = useNavigate();

	return (
		<Box
			position="relative"
			flex="0 0 auto"
			maxW={{ base: "100%", md: "48%" }}
			mb={{ base: 8, md: 0 }}
			cursor="pointer"
			transition="transform 0.2s"
			_hover={{ transform: "scale(1.02)" }}
			onClick={() => navigate(`/blogs/${number}`)}
		>
			<Image
				src={`${BASE_URL+`/`+image}`}
				alt={title}
				height={{ base: "250px", md: "350px" }}
				width="100%"
				objectFit="cover"
				borderRadius="lg"
			/>
			<VStack
				position="absolute"
				bottom={4}
				left={4}
				align="flex-start"
				spacing={1}
			>
				<Text color="white" fontSize={{ base: "sm", md: "lg" }}>
					Blog {number}
				</Text>
				<Text color="white" fontSize={{ base: "md", md: "lg" }} noOfLines={2}>
					{title}
				</Text>
			</VStack>
		</Box>
	);
};

const BlogsSection = () => {
	const [blogs, setBlogs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	// Fetch blogs from the API
	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const response = await apiCallerGet('/api/blogs/')
				setBlogs(response.data.blogs); // Assuming the API returns blogs in `data.blogs`
			} catch (error) {
				console.error("Error fetching blogs:", error);
				alert("Failed to fetch blogs. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		};

		fetchBlogs();
	}, []);

	if (isLoading) {
		return (
			<Flex alignItems="center" justifyContent="center" height="100vh">
				<Spinner size="xl" color="white" />
			</Flex>
		);
	}

	return (
		<Box bg="black" py={{ base: 8, md: 16 }} px={{ base: 4, md: 8 }}>
			{/* Heading and Button */}
			<Flex
				maxW="7xl"
				mx="auto"
				mb={0}
				alignItems="center"
				justifyContent="space-between"
				textAlign={{ base: "center", md: "left" }}
			>
				<Heading color="white" fontSize={{ base: "2xl", md: "3xl" }} flex="1">
					BLOGS
				</Heading>
				<IconButton
					aria-label="View all blogs"
					variant="ghost"
					colorScheme="whiteAlpha"
					size="lg"
					_hover={{ transform: "translateX(4px)" }}
					transition="transform 0.2s"
					onClick={() => navigate("/blogs")} // Assuming "/blogs" is the route for all blogs
				>
					<Image src="/icons/arrow_right_icon.svg" alt="Arrow right" w={10} />
				</IconButton>
			</Flex>

			{/* Blog Cards */}
			<Box
				maxW="7xl"
				mx="auto"
				overflowX="auto"
				px={2}
				py={4}
				css={{
					"&::-webkit-scrollbar": {
						display: "none",
					},
				}}
			>
				<Flex gap={4} justifyContent="space-between" flexDirection="row">
					{blogs.map((blog) => (
						<BlogCard
							key={blog.id}
							image={blog.image}
							title={blog.title}
							number={blog.id}
						/>
					))}
				</Flex>
			</Box>
		</Box>
	);
};

export default BlogsSection;

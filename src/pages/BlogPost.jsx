import React, { useEffect, useState } from "react";
import {
	Box,
	Heading,
	Text,
	VStack,
	Image,
	HStack,
	IconButton,
	Flex,
	Container,
	Input,
} from "@chakra-ui/react";
import { FaCaretLeft } from "react-icons/fa";
import { InputGroup } from "@/components/ui/input-group";
import { LuSearch } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import { apiCallerGet, BASE_URL } from "@/api/ApiCaller";

const BlogPost = () => {
	const [blog, setBlog] = useState(null)
	const navigate = useNavigate();
	const { id } = useParams(); // Get the blogId from the URL
	
	// console.log(id);
	function formatDate(dateString) {
		const date = new Date(dateString); // Parse the date string
		const day = String(date.getDate()).padStart(2, '0'); // Get day with leading zero
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month with leading zero
		const year = date.getFullYear(); // Get year
		return `${day}-${month}-${year}`; // Format as dd-mm-year
	}
	
	useEffect(()=>{
		const fetchBlog = async()=>{
			await apiCallerGet(`/api/blogs/${id}`).then((data)=>{
				console.log(data.data);
				
				setBlog(data.data)
			}).catch((e)=>{console.log(e);
			})
		}
		fetchBlog()
	},[])
	return (
		<Box bg='#09090C' color='white' minH='100vh' h='100vh' overflowY='auto'>
			{/* Main Container */}
			<Container
				p={6}
				maxW={{
					base: "100%",
					md: "breakpoint-lg",
				}}>
				{/* Back Button and Search */}
				<Flex justify='space-between' align='center' mb={6}>
					<IconButton
						aria-label='Go back'
						variant='ghost'
						color='white'
						fontSize='xl'
						rounded='full'
						_hover={{ bg: "whiteAlpha.200" }}
						onClick={() => navigate("/")}>
						<FaCaretLeft />
					</IconButton>
					
				</Flex>

				{/* Blog Content */}
				<VStack spacing={8} align='center'>
					{/* Blog Header */}
					<Box>
						<Text fontSize='sm' textAlign='center' opacity={0.7} mb={1}>
							Blog - {blog?.id} •  {formatDate(blog?.uploaded_at) }
						</Text>
						<Heading size='lg' fontWeight='bold' textAlign='center' mb={2}>
							{blog?.title}
						</Heading>
						<HStack align='center' justify='center' gap={4} mt={10}>
							<Image
								src='/avatar.png'
								alt='Author'
								w='10'
								h='10'
								borderRadius='full'
							/>
							<VStack align='start' spacing={0}>
								<Text fontWeight='bold' fontSize='md'>
									ADMIN
								</Text>
								
							</VStack>
						</HStack>
					</Box>

					{/* Blog Image */}
					<Box w='full' mt={2} mb={10}>
						<Image
							src={BASE_URL+"/"+blog?.image}
							alt='Blog Content'
							borderRadius='md'
							objectFit='cover'
							w='full'
						/>
					</Box>

					{/* Blog Content Text */}
					<Text lineHeight='tall' fontSize='md' color='gray.300'>
						{blog?.content}
					</Text>
				</VStack>

				{/* Footer */}
				<Box textAlign='center' mt={20} fontSize='sm' opacity={0.6}>
					Copyright © 2021 - Written By Nauval
				</Box>
			</Container>
		</Box>
	);
};

export default BlogPost;

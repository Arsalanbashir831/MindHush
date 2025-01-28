
import { BASE_URL } from "@/api/ApiCaller";
import { Box, VStack ,Text,Image} from "@chakra-ui/react";
import { useNavigate } from "react-router";

export const BlogCard = ({ image, title, number }) => {
	const navigate = useNavigate();

	return (
		<Box
			position="relative"
			flex="0 0 auto"
			maxW={{ base: "100%", md: "100%" }}
			mb={{ base: 8, md: 0 }}
			cursor="pointer"
			transition="transform 0.2s"
			_hover={{ transform: "scale(1.02)" }}
			onClick={() => navigate(`/blogs/${number}?${title}`)}
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
				
				<Text color="white" fontSize={{ base: "md", md: "lg" }} noOfLines={2}>
					{title}
				</Text>
			</VStack>
		</Box>
	);
};
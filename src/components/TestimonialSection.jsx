import React, { useState } from "react";
import {
	Box,
	Flex,
	Heading,
	Text,
	HStack,
	IconButton,
	AspectRatio,
	VStack,
	Image,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
	{
		id: 1,
		quote:
			"It’s affordable, easy to use, and genuinely helpful. I recommend it to anyone struggling",
		author: "Bruce",
		role: "Professional",
		videoUrl: "/path-to-video-1.mp4",
		imgUrl: "/testimonials/testimonial-1.jpg",
	},
	{
		id: 2,
		quote:
			"MindHush taught me how to handle my stress better and even set boundaries in relationships.",
		author: "Andrew",
		role: "User",
		videoUrl: "/path-to-video-2.mp4",
		imgUrl: "/testimonials/testimonial-2.jpg",
	},
	{
		id: 3,
		quote:
			"I never thought AI could be so helpful with emotional support. Aira is amazing!",
		author: "Fatima",
		role: "User",
		videoUrl: "/path-to-video-2.mp4",
		imgUrl: "/testimonials/testimonial-2.jpg",
	},
	{
		id: 4,
		quote:
			"Aira helped me look at my emotions differently and gave me clarity.",
		author: "Sarah",
		role: "User",
		videoUrl: "/path-to-video-2.mp4",
		imgUrl: "/testimonials/testimonial-2.jpg",
	},
];

const TestimonialSlider = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		if (currentSlide < testimonials.length - 1) {
			setCurrentSlide((prev) => prev + 1);
		}
	};

	const prevSlide = () => {
		if (currentSlide > 0) {
			setCurrentSlide((prev) => prev - 1);
		}
	};

	return (
		<Box
			py={[8, 16]}
			px={[4, 8]}
			id='testimonials'
			position='relative'
			w={["100%", "2/3"]}
			mx='auto'>
			<Box bg='#040608' p={[6, 12]} rounded='xl' position='relative'>
				<Image
					src='/stars_bg.svg'
					alt=''
					position='absolute'
					top={20}
					left='50%'
					transform='translate(-50%, -50%)'
					zIndex={0}
				/>
				{/* Section Heading */}
				<Heading
					mb={[6, 12]}
					color='white'
					fontSize={["2xl", "4xl"]}
					textAlign='center'>
					What our{" "}
					<Text
						as='span'
						bg='linear-gradient(90deg, #9E3C90 0%, #008080 100%)'
						bgClip='text'>
						users say
					</Text>
				</Heading>

				{/* Slider Content */}
				<Flex
					alignItems='center'
					justifyContent='center'
					position='relative'
					bg='#09090C'
					p={[4, 6]}
					rounded='xl'
					direction={{ base: "column", md: "row-reverse" }}
					gap={8}>
					{/* Text on Left */}
					<VStack
						align='flex-start'
						p={4}
						borderRadius='lg'
						spacing={4}
						textAlign={["center", "left"]}>
						<Text color='gray.400' fontSize={["md", "lg"]}>
							<Image src='/icons/quotes_icon.svg' alt='Quote' w={8} mb={2} />
							{testimonials[currentSlide].quote}
						</Text>
						<VStack
							align={["center", "flex-start"]}
							flex='1'
							gap={0}
							mb={2}
							w='full'>
							<Text color='gray.500' fontSize={["sm", "md"]}>
								{testimonials[currentSlide].author}
							</Text>
							<Text color='gray.500' fontSize={["xs", "sm"]}>
								{testimonials[currentSlide].role}
							</Text>
						</VStack>

						{/* Navigation Buttons */}
						<HStack justify={["center", "flex-start"]} w='full'>
							<IconButton
								aria-label='Previous Slide'
								onClick={prevSlide}
								disabled={currentSlide === 0}
								size={["xs", "sm"]}
								rounded='full'>
								<FaChevronLeft />
							</IconButton>
							<IconButton
								aria-label='Next Slide'
								onClick={nextSlide}
								disabled={currentSlide === testimonials.length - 1}
								size={["xs", "sm"]}
								colorScheme='teal'
								rounded='full'>
								<FaChevronRight />
							</IconButton>
						</HStack>
					</VStack>
				</Flex>
			</Box>
		</Box>
	);
};

export default TestimonialSlider;

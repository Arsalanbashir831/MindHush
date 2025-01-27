import React from "react";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

const PrivacyPolicy = () => {
	return (
		<Container maxW="container.md" py={10} bg="gray.900" color="gray.300">
			<VStack spacing={6} align="start">
				<Heading size="xl" color="purple.300">
					Privacy Policy
				</Heading>

				<Text fontSize="md">
					Effective Date: 1 February 2025
				</Text>

				<Text fontSize="md">
					MindHush.ai ("we," "our," or "us") values your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your information when you use our AI mental health chatbot and related services ("Services"). By using the Services, you consent to the practices described in this Privacy Policy.
				</Text>

				<Box>
					<Heading size="md" color="purple.300">
						1. Information We Collect
					</Heading>
					<Text fontSize="md" mt={2}>
						1.1. Personal Data Provided by You:
					</Text>
					<Text fontSize="md" ml={4}>
						- Name, email address, or other contact information if voluntarily provided.
					</Text>
					<Text fontSize="md" ml={4}>
						- Information shared during your interactions with the chatbot, such as text-based responses.
					</Text>
					<Text fontSize="md" mt={2}>
						1.2. Automatically Collected Data:
					</Text>
					<Text fontSize="md" ml={4}>
						- Device information, such as IP address, operating system, and browser type.
					</Text>
					<Text fontSize="md" ml={4}>
						- Usage data, including timestamps and interaction logs.
					</Text>
					<Text fontSize="md" mt={2}>
						1.3. Sensitive Data:
					</Text>
					<Text fontSize="md" ml={4}>
						The chatbot may process sensitive information related to mental health if provided by you. However, we strongly encourage you not to share any information that could personally identify you.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						2. How We Use Your Information
					</Heading>
					<Text fontSize="md" mt={2}>
						- To provide, personalize, and improve the Services.
					</Text>
					<Text fontSize="md" mt={2}>
						- To analyze user interactions and improve chatbot performance.
					</Text>
					<Text fontSize="md" mt={2}>
						- To comply with legal obligations and enforce our Terms of Service.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						3. Data Sharing and Disclosure
					</Heading>
					<Text fontSize="md" mt={2}>
						We do not share, sell, or rent your personal data with any third parties unless required by law. Specific instances where data may be disclosed include:
					</Text>
					<Text fontSize="md" ml={4}>
						- Legal Compliance: To comply with applicable laws, regulations, or legal processes, such as court orders or government requests.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						4. Global Data Transfers
					</Heading>
					<Text fontSize="md" mt={2}>
						Your data may be transferred to and processed in countries outside your home country. These countries may not have the same level of data protection as your jurisdiction. To protect your data, we use safeguards such as encryption, anonymization, and compliance with applicable legal standards.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						5. Data Retention
					</Heading>
					<Text fontSize="md" mt={2}>
						We retain your data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy or comply with legal obligations. When data is no longer needed, it will be securely deleted or anonymized.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						6. Your Privacy Rights
					</Heading>
					<Text fontSize="md" mt={2}>
						Depending on your location, you may have the right to request:
					</Text>
					<Text fontSize="md" ml={4}>
						- Data Access: Obtain a copy of your personal data.
					</Text>
					<Text fontSize="md" ml={4}>
						- Data Deletion: Request deletion of your personal data, subject to legal or contractual restrictions.
					</Text>
					<Text fontSize="md" mt={2}>
						To exercise these rights, please contact us at <b>contact@mindhush.ai</b>. We will respond within the timeframe required by applicable law.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						7. Changes to This Privacy Policy
					</Heading>
					<Text fontSize="md" mt={2}>
						We may update this Privacy Policy from time to time. Changes will be posted on this page, and the "Effective Date" at the top will be updated. Continued use of the Services after updates constitutes acceptance of the revised Privacy Policy.
					</Text>
				</Box>

				<Text fontSize="sm" color="gray.500">
					Last updated: 1 February 2025
				</Text>
			</VStack>
		</Container>
	);
};

export default PrivacyPolicy;

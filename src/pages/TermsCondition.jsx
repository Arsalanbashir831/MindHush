import React from "react";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

const TermsCondition = () => {
	return (
		<Container maxW="container.md" py={10} bg="gray.900"  color="gray.300">
			<VStack spacing={6} align="start" >
				<Heading size="xl" color="purple.300">
					Terms and Conditions
				</Heading>

				<Text fontSize="md">
					Welcome to <b>MindHush</b>. These Terms and Conditions outline the rules and regulations for using our application. 
					By accessing or using MindHush, you agree to be bound by these terms. If you do not agree, please do not use our services.
				</Text>

				<Box>
					<Heading size="md" color="purple.300">
						1. Acceptance of Terms
					</Heading>
					<Text fontSize="md">
						By creating an account or using MindHush, you acknowledge that you have read, understood, and agree to comply with these terms.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						2. User Responsibilities
					</Heading>
					<Text fontSize="md">
						You agree to use MindHush responsibly and legally. You must not misuse, abuse, or attempt to exploit our services for unlawful purposes.
					</Text>
				</Box>

				{/* <Box>
					<Heading size="md" color="purple.300">
						3. Privacy Policy
					</Heading>
					<Text fontSize="md">
						We are committed to protecting your privacy. Please read our{" "}
						<a href="/privacy-policy" style={{ color: "#D6BCFA" }} target="_blank" rel="noopener noreferrer">
							Privacy Policy
						</a>{" "}
						to understand how we handle your data.
					</Text>
				</Box> */}

				<Box>
					<Heading size="md" color="purple.300">
						4. Account Security
					</Heading>
					<Text fontSize="md">
						You are responsible for maintaining the confidentiality of your account credentials. Any unauthorized use of your account must be reported to us immediately.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						5. Prohibited Activities
					</Heading>
					<Text fontSize="md">
						Users must not engage in activities such as hacking, spamming, spreading malware, or any activity that disrupts the normal functioning of MindHush.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						6. Termination of Services
					</Heading>
					<Text fontSize="md">
						We reserve the right to suspend or terminate your access to MindHush at any time if you violate these terms.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						7. Changes to Terms
					</Heading>
					<Text fontSize="md">
						We may update these Terms and Conditions from time to time. Continued use of MindHush means you accept the revised terms.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						8. Contact Us
					</Heading>
					<Text fontSize="md">
						If you have any questions about these terms, please contact us at <b>support@mindhush.com</b>.
					</Text>
				</Box>

				<Text fontSize="sm" color="gray.500">
					Last updated: January 2025
				</Text>
			</VStack>
		</Container>
	);
};

export default TermsCondition;

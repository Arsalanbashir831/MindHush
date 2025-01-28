import React from "react";
import { Box, Container, Heading, Text, VStack, Link } from "@chakra-ui/react";
import FooterSection from "@/components/FooterSection";

const TermsCondition = () => {
	return (
		<>

		
		<Container maxW="container.md" py={10} color="gray.300" >
			<VStack spacing={6} align="start">
				<Heading size="xl" color="purple.300">
					Terms and Services
				</Heading>

				<Text fontSize="md">
					Effective Date: 1 February 2025
				</Text>

				<Text fontSize="md">
					Welcome to MindHush.ai, an AI-powered mental health support tool. These Terms and Services ("Terms") govern your use of our chatbot and related services ("Services"). By using the Services, you agree to these Terms. If you do not agree, please discontinue using the Services immediately.
				</Text>

				<Box>
					<Heading size="md" color="purple.300">
						1. Disclaimer of Professional Advice
					</Heading>
					<Text fontSize="md" mt={2}>
						1.1. Not a Substitute for Professional Help: The Services are designed for informational and support purposes only and do not constitute professional medical, psychological, or therapeutic advice. Always consult a licensed healthcare professional for any mental health or medical concerns.
					</Text>
					<Text fontSize="md" mt={2}>
						1.2. Emergency Situations: The Services are not suitable for crisis or emergency situations. If you are experiencing an emergency, please contact local emergency services or a crisis hotline immediately.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						2. User Eligibility
					</Heading>
					<Text fontSize="md" mt={2}>
						2.1. Age Requirement: You must be at least 18 years old or have the consent of a parent or guardian to use the Services.
					</Text>
					<Text fontSize="md" mt={2}>
						2.2. Location Restrictions: Use of the Services may be restricted in some jurisdictions. It is your responsibility to ensure compliance with local laws.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						3. Compliance with Privacy Laws
					</Heading>
					<Text fontSize="md" mt={2}>
						3.1. Global Privacy Compliance: The Services are designed to comply with applicable global privacy laws to the extent possible, including GDPR, CCPA, PDPA, and similar laws.
					</Text>
					<Text fontSize="md" mt={2}>
						3.2. Regional Restrictions: Certain features or data processing activities may not be available in all countries due to local regulatory requirements. Users should review local laws before using the Services.
					</Text>
					<Text fontSize="md" mt={2}>
						3.3. Data Security: While we implement reasonable security measures to protect your data, we cannot guarantee absolute security. Use the Services at your own risk.
					</Text>
					<Text fontSize="md" mt={2}>
						3.4. User Consent: By using the Services, you consent to the collection, processing, and storage of your data as outlined in our Privacy Policy.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						4. Limitation of Liability
					</Heading>
					<Text fontSize="md" mt={2}>
						4.1. No Warranty: The Services are provided "as is" without any warranties, express or implied. We do not guarantee the accuracy, reliability, or suitability of the information provided.
					</Text>
					<Text fontSize="md" mt={2}>
						4.2. Liability Cap: To the maximum extent permitted by law, MindHush.ai shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Services.
					</Text>
					<Text fontSize="md" mt={2}>
						4.3. Indemnity: You agree to indemnify and hold harmless MindHush.ai and its employees from any claims, damages, or expenses arising from your use of the Services or violation of these Terms.
					</Text>
				</Box>

				<Box>
					<Heading size="md" color="purple.300">
						5. Contact Information
					</Heading>
					<Text fontSize="md" mt={2}>
						If you have any questions about these Terms, please contact us at <b>contact@mindhush.ai</b>.
					</Text>
				</Box>

				<Text fontSize="sm" color="gray.500">
					Last updated: 1 February 2025
				</Text>
			</VStack>
			
		</Container>
		<FooterSection/>
		</>
	);
};

export default TermsCondition;

import React, { useState } from "react";
import { Text, HStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
	DialogContent,
	DialogHeader,
	DialogRoot,
	DialogBody,
} from "@/components/ui/dialog";
import { apiCallerAuthPost, apiCallerPost } from "@/api/ApiCaller";

const RenewSubscriptionModal = ({ autoOpen = false }) => {
	const [isOpen, setIsOpen] = useState(autoOpen);
	const [isLoading, setIsLoading] = useState(false);

	const handleConfirm = async () => {
		setIsLoading(true);
		const token = localStorage.getItem("authToken");
		try {
			let response;
			if (token) {
				response = await apiCallerAuthPost(
					"/api/billing/renew-subscription/",
					{},
					token
				);
			} else {
				response = await apiCallerPost("/api/billing/renew-subscription/", {});
			}
			console.log("Renew subscription response:", response);
			// Optionally add further handling (e.g. notifications)
		} catch (error) {
			console.error("Error renewing subscription", error);
		} finally {
			setIsLoading(false);
			setIsOpen(false);
		}
	};

	return (
		<DialogRoot open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>Renew Subscription</DialogHeader>
				<DialogBody>
					<Text mb={4}>
						Your subscription has expired. Would you like to renew it?
					</Text>
					<HStack spacing={4} justifyContent="flex-end">
						<Button variant="outline" onClick={() => setIsOpen(false)}>
							Close
						</Button>
						<Button onClick={handleConfirm} isLoading={isLoading}>
							Confirm
						</Button>
					</HStack>
				</DialogBody>
			</DialogContent>
		</DialogRoot>
	);
};

export default RenewSubscriptionModal;

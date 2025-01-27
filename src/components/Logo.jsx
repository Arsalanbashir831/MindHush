import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router";

export default function Logo() {
	return (
		<Box alignSelf='flex-start' w='150px' >
			<Link to='/'>
				<Image width={'100%'} height={'100%'} src='/mindhushLogo.svg' alt='Company Logo' />
			</Link>
		</Box>
	);
}

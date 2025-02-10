import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router";
import { Flex } from "antd";

export default function Logo() {
	return (
		<Box alignSelf='flex-start'   >
			<Link to='/'>
				<Flex dir="col" align="center" gap={10}>
				<Image width={'60px'} height={'80px'} src='/mindhush_logo_new_improved.png' alt='Company Logo' />
				<Text fontWeight={'bold'} fontSize={'xl'}>MINDHUSH</Text>
				</Flex>
				
			</Link>
		</Box>
	);
}

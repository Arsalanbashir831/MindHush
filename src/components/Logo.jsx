import React from "react";
import { Box, Image, Text, HStack } from "@chakra-ui/react";
import { Link } from "react-router"; // Fixed import

export default function Logo() {
  return (
    <Box alignSelf="flex-start">
      <Link to="/">
        <HStack
          spacing={2}
          align="center"
          flexDirection={{ base: "column", md: "row" }} // Vertical for mobile, horizontal for desktop
          textAlign={{ base: "center", md: "left" }} // Center align text on mobile
        >
          <Image 
            w={{ base: "80px", md: "80px" }} 
            h="130px" 
            src="/gradient_logo.png" 
            alt="Company Logo" 
          />
          <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>MINDHUSH</Text>
        </HStack>
      </Link>
    </Box>
  );
}

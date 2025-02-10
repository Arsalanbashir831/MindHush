import React from "react";
import { Box, Image, Text, VStack, HStack } from "@chakra-ui/react";
import { Link } from "react-router"; // Fixed import

export default function Logo() {
  return (
    <Box alignSelf="flex-start">
      <Link to="/">
        {/* Mobile View: Stack logo and text vertically */}
        <VStack 
          spacing={2} 
          align="center" 
          display={{ base: "flex", md: "none" }} 
        >
          <Image 
            width={{ base: "50px", md: "60px" }} 
            height={{ base: "70px", md: "80px" }} 
            src="/mindhush_logo_new_improved.png" 
            alt="Company Logo" 
          />
          <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>MINDHUSH</Text>
        </VStack>

        {/* Desktop View: Arrange logo and text in a row */}
        <HStack 
          spacing={4} 
          align="center" 
          display={{ base: "none", md: "flex" }} 
        >
          <Image 
            width={{ base: "50px", md: "60px" }} 
            height={{ base: "70px", md: "80px" }} 
            src="/mindhush_logo_new_improved.png" 
            alt="Company Logo" 
          />
          <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>MINDHUSH</Text>
        </HStack>
      </Link>
    </Box>
  );
}

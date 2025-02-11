import React from "react";
import { Box, Image, Text, HStack } from "@chakra-ui/react";
import { Link } from "react-router"; // Fixed import

export default function Logo() {
  return (
    <Box alignSelf="flex-start">
      <Link to="/">
        <HStack
          spacing={2}
          align="flex-start"
          flexDirection={{ base: "column", md: "row" }} // Vertical for mobile, horizontal for desktop
          textAlign={{ base: "center", md: "left" }} // Center align text on mobile
        >
          <Image 
          w={'200px'}
           h={'100px'}
            src="/MIND_HUSH_LOGO_FINAL_ WIDE WHITE TEXT.png" 
            alt="Company Logo" 
          />
          {/* <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>MINDHUSH</Text> */}
        </HStack>
      </Link>
    </Box>
  );
}

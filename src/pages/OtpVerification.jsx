import React, { useState, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  Center,
  HStack,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { apiCallerPost } from "@/api/ApiCaller";

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const location = useLocation();
  const navigation = useNavigate();
  const [searchParams] = useSearchParams();

  const emailFromState = location.state?.email;
  const emailFromQuery = searchParams.get("email");
  const email = emailFromState || emailFromQuery;
  const isNew = searchParams.get("isNew") === "true"; // Convert to boolean

  const handleChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return; // Only allow numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input if value is entered
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    console.log(emailFromQuery)
    if (!email) {
      alert("Email is missing. Please try again.");
      return;
    }


    try {
      if (isNew) {
        await apiCallerPost("/api/users/verify-otp/", {
          email: email,
          otp: otp.join(""),
        });
        navigation("/login");
      } else {
        navigation("/reset-password", {
          state: { email: email, otp: otp.join("") },
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <Center
      minH="100vh"
      bgGradient="linear(to-r, rgba(255,255,255,0.1), rgba(0,0,0,0.3))"
    >
      <Box
        maxW={{ base: "90%", sm: "400px" }}
        w="full"
        p={8}
        bg="rgba(255, 255, 255, 0.15)"
        borderRadius="lg"
        boxShadow="lg"
        backdropFilter="blur(10px)"
      >
        <VStack spacing={6} align="stretch">
          <Heading as="h2" size="lg" color="white" textAlign="center">
            Verify OTP
          </Heading>
          <Text color="gray.300" fontSize="sm" textAlign="center">
            Enter the 6-digit code sent to your email to verify your account.
          </Text>

          <HStack spacing={2} justify="center">
            {otp.map((value, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                textAlign="center"
                bg="rgba(255, 255, 255, 0.1)"
                border="none"
                color="white"
                _placeholder={{ color: "gray.400" }}
                _focus={{ bg: "rgba(255, 255, 255, 0.2)" }}
                width="40px"
                height="40px"
                fontSize="lg"
                borderRadius="md"
              />
            ))}
          </HStack>

          <Button
           bg={'primary'}
            _hover={{ bgGradient: "linear(to-r, purple.500, purple.700)" }}
            color="white"
            size="lg"
            onClick={handleSubmit}
          >
            Verify OTP
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default OtpVerification;

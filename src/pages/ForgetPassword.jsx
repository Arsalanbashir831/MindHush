import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  Center,
  Stack,
  Spinner,
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { apiCallerPost } from '@/api/ApiCaller';
import { useNavigate } from 'react-router';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
const navigation = useNavigate()
  const handleSendOTPRequest = async () => {
    if (!email.trim()) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await apiCallerPost('api/users/request-password-reset/', {
        email: email.trim(),
      });
      
      if (response?.status === 200) {
        setMessage('Reset instructions sent to your email.');
        navigation('/otp-verification',{state:{email:email}})
    
      } else {
        setMessage('Failed to send reset instructions. Please try again.');
      }
    } catch (error) {
      console.error('Error sending reset instructions:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center minH="100vh" bgGradient="linear(to-r, rgba(255,255,255,0.1), rgba(0,0,0,0.3))">
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
            Reset Your Password
          </Heading>
          <Text color="gray.300" fontSize="sm" textAlign="center">
            Enter your email address below, and we will send you instructions to reset your password.
          </Text>

          <Stack spacing={4}>
            <Field label="Email Address">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="rgba(255, 255, 255, 0.1)"
                border="none"
                color="white"
                _placeholder={{ color: "gray.400" }}
                _focus={{ bg: "rgba(255, 255, 255, 0.2)" }}
              />
            </Field>
          </Stack>
{isLoading ? <> <Spinner/> </>:<>
    <Button
           bg='primary' color='white'
            onClick={handleSendOTPRequest}
            isLoading={isLoading}
          >
           Send OTP
          </Button>

</>}
         

          {message && (
            <Text color="gray.300" fontSize="sm" textAlign="center">
              {message}
            </Text>
          )}

          <Text color="gray.400" fontSize="xs" textAlign="center">
            If you remember your password, <a href="/login" style={{ color: "white", textDecoration: "underline" }}>Login here</a>.
          </Text>
        </VStack>
      </Box>
    </Center>
  );
};

export default ForgetPassword;

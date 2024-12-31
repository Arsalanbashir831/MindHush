import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  Center,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';
import { apiCallerPost } from '@/api/ApiCaller';

const ResetPassword = () => {
  const location = useLocation();
  const navigation = useNavigate()
  const { email, otp } = location.state;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    
    if (!newPassword || !confirmPassword) {
      setMessage('Both fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await apiCallerPost('/api/users/reset-password/', {
        email,
        otp,
        new_password: newPassword,
      });

      if (response?.status === 200) {
        setMessage('Password reset successfully. You can now log in.');
        navigation('/login')
      } else {
        setMessage('Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
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
            Enter and confirm your new password below.
          </Text>

          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            bg="rgba(255, 255, 255, 0.1)"
            border="none"
            color="white"
            _placeholder={{ color: "gray.400" }}
            _focus={{ bg: "rgba(255, 255, 255, 0.2)" }}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            bg="rgba(255, 255, 255, 0.1)"
            border="none"
            color="white"
            _placeholder={{ color: "gray.400" }}
            _focus={{ bg: "rgba(255, 255, 255, 0.2)" }}
          />

          <Button
          bg={'primary'} color={'white'}
            onClick={handleResetPassword}
            isLoading={isLoading}
          >
            Reset Password
          </Button>

          {message && (
            <Text color="gray.300" fontSize="sm" textAlign="center">
              {message}
            </Text>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default ResetPassword;

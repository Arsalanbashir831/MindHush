import React, { useState } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { PasswordInput } from "@/components/ui/password-input";
import { LuKey, LuMail, LuUser } from "react-icons/lu";
import { Field } from "@/components/ui/field";
import { Link, useNavigate } from "react-router";
import { Checkbox, message } from "antd"; // Ant Design Checkbox and Message (Toast)
import Logo from "@/components/Logo";
import { apiCallerPost } from "@/api/ApiCaller";

const SignUpPage = () => {
  const navigate = useNavigate();
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const formWidth = useBreakpointValue({ base: "100%", md: "40%" });

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [isChecked, setIsChecked] = useState(false); // Checkbox state
  const [isLoading, setIsLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!isChecked) {
      message.error(
        "Please agree to the terms & conditions before proceeding."
      );
      return;
    }

    setIsLoading(true);

    const { email, password, first_name, last_name } = formData;
    if (!email || !password || !first_name || !last_name) {
      message.error("Please fill in all the required fields.");
      setIsLoading(false);
      return;
    }

    const body = { email, password, first_name, last_name };

    try {
      const response = await apiCallerPost("/api/users/register/", body);
      if (response.status === 201) {
        message.success("Registration successful!");
        await apiCallerPost("/api/users/resend-otp/", { email }).then(() => {
          navigate(`/otp-verification?isNew=true&email=${email}`);
        });
      } else {
        if (response.data.password) {
          throw new Error(response?.data.password[0]);
        } else if (response.data.email) {
          throw new Error(response?.data.email[0]);
        } else {
          throw new Error("Registeration failed because of server error");
        }
      }
    } catch (err) {
      message.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="100vw" h="100vh" p={0} position="relative">
      <Flex h="full" direction={flexDirection} align="center" justify="center">
        <Box alignSelf="flex-start" w="150px">
          <Logo />
        </Box>
        {/* Left side with form */}
        <Box w={formWidth} p={{ base: 6, md: 8 }} my="auto">
          <VStack maxW="400px" mx="auto" gapY={10}>
            <VStack align="stretch" w="full">
              {/* Form Header */}
              <Box textAlign="left">
                <Heading
                  color="white"
                  fontSize={{ base: "2xl", md: "4xl" }}
                  mb={2}
                >
                  Create an Account 👋
                </Heading>
                <Text color="gray.400" fontSize={{ base: "sm", md: "md" }}>
                  Kindly fill in your details to create an account
                </Text>
              </Box>

              {/* Form Fields */}
              <VStack gapY={4} align="stretch">
                <Field label="Your first name" required>
                  <InputGroup
                    flex="1"
                    startElement={<LuUser />}
                    w="full"
                    size="lg"
                  >
                    <Input
                      name="first_name"
                      type="text"
                      placeholder="Enter your first name"
                      size="lg"
                      variant="filled"
                      bg="secondary.50"
                      border="1px solid #8692A6"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Field>

                <Field label="Last Name" required>
                  <InputGroup
                    flex="1"
                    startElement={<LuUser />}
                    w="full"
                    size="lg"
                  >
                    <Input
                      name="last_name"
                      type="text"
                      placeholder="Enter your last name"
                      size="lg"
                      variant="filled"
                      bg="secondary.50"
                      border="1px solid #8692A6"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Field>

                <Field label="Email address" required>
                  <InputGroup
                    flex="1"
                    startElement={<LuMail />}
                    w="full"
                    size="lg"
                  >
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      size="lg"
                      variant="filled"
                      bg="secondary.50"
                      border="1px solid #8692A6"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Field>

                <Field label="Create a password" required>
                  <InputGroup
                    flex="1"
                    startElement={<LuKey />}
                    w="full"
                    size="lg"
                  >
                    <PasswordInput
                      name="password"
                      placeholder="Password"
                      size="lg"
                      variant="filled"
                      bg="secondary.50"
                      border="1px solid #8692A6"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Field>

                {/* Checkbox (Ant Design) */}
                <Checkbox
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  style={{
                    color: "gray",
                    alignSelf: "flex-start",
                    fontSize: "14px",
                  }}
                >
                  I agree to{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#805AD5" }}
                  >
                    Terms and Conditions
                  </a>
                  &
                  <a
                    href="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#805AD5" }}
                  >
                    Privacy Policy
                  </a>
                </Checkbox>

                {/* Register Button */}
                <Button
                  w="full"
                  size="lg"
                  color="white"
                  border="none"
                  bg="linear-gradient(to right, #7B2C97, #008080)"
                  _hover={{
                    opacity: 0.9,
                  }}
                  mt={2}
                  isLoading={isLoading}
                  onClick={handleSubmit}
                >
                  Register Account
                </Button>
              </VStack>
            </VStack>
          </VStack>
        </Box>

        <Box
          w={{ base: "100%", md: "60%" }}
          h="full"
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Image
            src="/signup-bg.png"
            alt="Sign-in Illustration"
            objectFit="cover"
            w="full"
            h="full"
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default SignUpPage;

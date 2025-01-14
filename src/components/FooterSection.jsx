import React from "react";
import {
  Box,
  Container,
  Grid,
  VStack,
  HStack,
  Text,
  Link,
  IconButton,
  Image,
  Heading,
} from "@chakra-ui/react";
import { BiLogoTiktok } from "react-icons/bi";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import Logo from "./Logo";
import { BsYoutube } from "react-icons/bs";

const FooterSection = () => {
  return (
        <Box bg="rgba(0, 24, 24, 0.95)" py={{ base: 12, md: 10 }}>
          <Container maxW="7xl">
            <Grid
              templateColumns={{ base: "1fr", md: "1.25fr 1fr" }}
              gap={{ base: 8, md: 16 }}
            >
              <Box>
                <Logo />
                <Text color="gray.400" mb={8} maxW="400px">
                  Your Path to Peace of Mind Starts Here.
                </Text>
                <VStack align="flex-start" spacing={4} mt={16}>
                  <HStack gap={2}>
                    <IconButton
                      aria-label="TikTok"
                      variant="ghost"
                      color="white"
                      rounded="full"
                      _hover={{ bg: "whiteAlpha.200" }}
                    >
                      <BiLogoTiktok
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          padding: "10px",
                          width: "40px",
                          height: "40px",
                          borderRadius: "100%",
                        }}
                      />
                    </IconButton>
                    <IconButton
                      aria-label="Instagram"
                      variant="ghost"
                      color="white"
                      rounded="full"
                      _hover={{ bg: "whiteAlpha.200" }}
                    >
                      <Image src="/icons/instagram_icon.svg" alt="Instagram" />
                    </IconButton>
                    <IconButton
                      aria-label="Youtube"
                      variant="ghost"
                      color="white"
                      rounded="full"
                      _hover={{ bg: "whiteAlpha.200" }}
                    
                    >
                       <Image src="/icons/youtube_icon.svg" alt="Youtube" />
                    </IconButton>
                  </HStack>
                </VStack>
              </Box>
  
            
              <Box>
               
                <HStack
                  gap={8}
                  mb={4}
                  justify={{ base: "center", md: "flex-start" }}
                  flexWrap="wrap"
                >
                  <Link
                    color="gray.400"
                    _hover={{ color: "white" }}
                    href="#our-mission"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    About
                  </Link>
                  <Link
                    color="gray.400"
                    _hover={{ color: "white" }}
                    href="#testimonials"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Testimonials
                  </Link>
                  <Link
                    color="gray.400"
                    _hover={{ color: "white" }}
                    href="#pricing"
                    fontSize={{ base: "sm", md: "md" }}
                  >
                    Pricing
                  </Link>
                </HStack>
  
                {/* Contact Section */}
                <VStack align="flex-start" gap={8}>
                  <Box>
                    <Heading
                      color="white"
                      fontSize={{ base: "lg", md: "2xl" }}
                      mb={4}
                    >
                      Contact Us
                    </Heading>
                    {/* <Text color='gray.400'>+1 (999) 888-77-66</Text> */}
                    <Text color="gray.400">hello@mindhush.ai</Text>
                  </Box>
                </VStack>
              </Box>
            </Grid>
  
            {/* Copyright */}
            <VStack
              alignItems="center"
              justifyContent="center"
              gap={0}
              color="#8F9FA3"
              fontSize="sm"
              mt={16}
            >
              <Text>© {new Date().getFullYear()} — Copyright</Text>
              <Text ml={4}>All Rights reserved</Text>
            </VStack>
          </Container>
        </Box>
  );
};

export default FooterSection;

import React, { useEffect, useState } from "react";
import { apiCallerGet } from "@/api/ApiCaller";
import { Row, Col, Typography, Spin } from "antd";
import { BlogCard } from "@/components/BlogCard";
import { HStack, Box } from "@chakra-ui/react";
import AuthButtons from "@/components/AuthButtons";
import Logo from "@/components/Logo";

const { Title } = Typography;

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiCallerGet("/api/blogs");
        if (response.status === 200) {
          console.log(response.data.blogs);
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Box  color="white">
      <HStack justifyContent="space-between" alignItems="center" p={4}>
        <Logo />
        <AuthButtons />
      </HStack>
      <Box px={4} py={8}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "30px", color: "white" }}>
          Blogs
        </Title>
        <Row gutter={[24, 32]} >
          {blogs?.map((blog) => (
            <Col xs={24} sm={12} md={8} lg={6} key={blog.id}>
              <BlogCard key={blog.id} image={blog.image} title={blog.title} number={blog.id} />
            </Col>
          ))}
        </Row>
      </Box>
    </Box>
  );
};

export default BlogList;

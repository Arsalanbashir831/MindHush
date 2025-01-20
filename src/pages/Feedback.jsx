import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import Logo from "@/components/Logo";
import { useRecoilValue } from "recoil";
import { userState } from "@/atom/state";
import { apiCallerPost } from "@/api/ApiCaller";

const { TextArea } = Input;
const { Title } = Typography;

const Feedback = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
const profile = useRecoilValue(userState)
  const handleSubmit = async (values) => {
    const { feedback } = values;

    try {
      setLoading(true);

      // Simulate API call
     const response= await apiCallerPost('/api/feedback/',{
         "user_id": profile.id,
    "feedback": feedback
      })
      if (response.status===201) {
        message.success("Your feedback has been submitted successfully!");
        form.resetFields(); // Reset form fields after successful submission
      }
    //   console.log("User Feedback:", { feedback });

    
    } catch (error) {
      console.error("Error submitting feedback:", error);
      message.error("Failed to submit feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        backgroundColor: "#1f1f1f",
        color: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
      bodyStyle={{ padding: "30px" }}
    >
    <Logo/>
      <Title level={3} style={{ color: "#fff", textAlign: "center" }}>
        User Feedback
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: "20px" }}
      >
       
        <Form.Item
          label={<span style={{ color: "#fff" }}>Your Feedback</span>}
          name="feedback"
          rules={[
            { required: true, message: "Please provide your feedback!" },
          ]}
        >
          <TextArea
         
            rows={4}
            style={{
              backgroundColor: "#333",
              color: "#fff",
              border: "1px solid #555",
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{
              width: "100%",
              backgroundColor: "teal",
              borderColor: "teal",
            }}
          >
            Submit Feedback
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Feedback;

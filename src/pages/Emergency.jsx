import React, { useState } from "react";
import { Input, Table, Card, Typography, ConfigProvider, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons"; // Ant Design Back Icon
import { EMERGENCY_CONTACTLIST, RegionalLines } from "@/constants";
import { useNavigate } from "react-router";

const { Title } = Typography;
const { Search } = Input;

const Emergency = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate(); // React Router's navigate hook

  // Filter the emergency contact list based on the search query
  const filteredContacts = EMERGENCY_CONTACTLIST.filter((contact) =>
    contact.country.toLowerCase().includes(searchText.toLowerCase())
  );

  // Columns for the Ant Design Table
  const columns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (text) => <strong style={{ color: "#fff" }}>{text}</strong>,
    },
    {
      title: "General Emergency",
      dataIndex: "generalEmergency",
      key: "generalEmergency",
      render: (value) =>
        typeof value === "object"
          ? Object.entries(value)
              .map(([key, val]) => `${key}: ${val}`)
              .join(", ")
          : value,
    },
    {
      title: "Suicide Prevention",
      dataIndex: "suicidePrevention",
      key: "suicidePrevention",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#1f1f1f",
          colorTextBase: "#fff",
          colorBorder: "#444",
          colorPrimary: "#1890ff",
        },
      }}
    >
     <div style={{padding:10}}>

    
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)} // Navigate back to the previous page
          style={{
            color: "#1890ff",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        >
          Go Back
        </Button>
        <Title level={2} style={{ textAlign: "center", color: "#fff" }}>
          Emergency Contact Numbers
        </Title>
        <Search
          placeholder="Search by country"
          enterButton
          size="large"
          onSearch={(value) => setSearchText(value)}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            marginBottom: "20px",
            backgroundColor: "#333",
            borderColor: "#555",
            color: "#fff",
          }}
        />
        <Table
          columns={columns}
          dataSource={filteredContacts.map((item, index) => ({
            key: index,
            ...item,
          }))}
          pagination={{ pageSize: 10 }}
          bordered
          style={{
            backgroundColor: "#333",
          }}
          rowClassName={() => "dark-row"}
        />
        <div style={{ marginTop: "20px", color: "#fff" }}>
          <Title level={4} style={{ color: "#fff" }}>
            Regional/International Lines:
          </Title>
          <ul>
            {Object.entries(RegionalLines).map(([region, line]) => (
              <li key={region} style={{ marginBottom: "8px" }}>
                <strong>{region}:</strong> {line}
              </li>
            ))}
          </ul>
        </div>
        </div>
    </ConfigProvider>
  );
};

export default Emergency;

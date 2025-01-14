import React, { useState } from "react";
import { InputGroup } from "./ui/input-group";
import { LuArrowUp } from "react-icons/lu";
import { IconButton, Input, Spinner } from "@chakra-ui/react";

export default function InputArea({
    isLoading = false,
    widthOnSS = "md",
    widthOnLS = "full",
    onSubmitClick, // Delegate submission logic to the parent
}) {
    const [value, setValue] = useState("");

    const handleSendMessage = () => {
        if (value.trim() === "") return; // Prevent empty submissions
        onSubmitClick(value);
        setValue(""); // Clear the input field
    };

    return (
        <>
           
                <InputGroup
                    flex="1"
                    w="full"
                    maxW={{ base: widthOnSS, md: widthOnLS }}
                    endElement={
                        <IconButton
                            variant="plain"
                            bg="primary"
                            rounded="full"
                            size="xs"
                            onClick={handleSendMessage}
                            isLoading={isLoading} // Show spinner during loading
                            aria-label="Send Message"
                        >
                            <LuArrowUp size={30} />
                        </IconButton>
                    }
                >
                    <Input
                        placeholder="Type your message ..."
                        size="lg"
                        value={value}
                        onChange={(e) => setValue(e.target.value)} // Update input state
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSendMessage(); // Submit on Enter
                        }}
                        maxW={{ base: widthOnSS, md: widthOnLS }}
                        rounded="full"
                        bg="gray.800"
                        border="1px solid"
                        borderColor="#B55CFF"
                        _hover={{ borderColor: "purple.400" }}
                        _focus={{ borderColor: "purple.300" }}
                    />
                </InputGroup>
           
        </>
    );
}

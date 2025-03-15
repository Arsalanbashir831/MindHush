import React from "react";
import { Float, HStack, Text } from "@chakra-ui/react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import {
	MenuContent,
	MenuItem,
	MenuRoot,
	MenuTrigger,
} from "@/components/ui/menu";
import { FaCaretDown } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import UserProfileModal from "./UserProfileModal";
import { useRecoilValue } from "recoil";
import { authState, userState } from "@/atom/state";

export default function AuthButtons() {
	const isAuthenticated = useRecoilValue(authState);
	const profile = useRecoilValue(userState);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("profile");
		navigate("/login");
	};

	return (
		<HStack gap={{ base: 0, md: 4 }}>
			{isAuthenticated ? (
				<>
					<div style={{ position: "relative", display: "inline-block" }}>
						<img
							src="/profile_img_improve.png"
							alt={`${profile?.first_name} ${profile?.last_name}`}
							style={{
								width: "40px",
								height: "40px",
								borderRadius: "50%",
								objectFit: "cover",
							}}
						/>
						<Float placement="bottom-end" offsetX="2" offsetY="1">
							<div
								style={{
									width: "8px",
									height: "8px",
									backgroundColor: "green",
									borderRadius: "50%",
									border: "1px solid white",
									position: "absolute",
									bottom: 0,
									right: 0,
								}}></div>
						</Float>
					</div>
					<Text display={{ base: "none", md: "block" }} color="white">
						{profile?.first_name + " " + profile?.last_name}
					</Text>
					<MenuRoot>
						<MenuTrigger asChild>
							<Button variant="plain" size="sm">
								<FaCaretDown color="white" />
							</Button>
						</MenuTrigger>
						<MenuContent minW="10rem">
							<UserProfileModal />
							<MenuItem
								value="logout"
								cursor="pointer"
								onClick={handleLogout}
								py={2}>
								<LuLogOut />
								Logout
							</MenuItem>
						</MenuContent>
					</MenuRoot>
				</>
			) : (
				<>
					<Link to="/signup">
						<Button size="xs" bg="primary" color="white" rounded="lg">
							Sign Up
						</Button>
					</Link>
					<Link to="/login">
						<Button size="xs" bg="primary" color="white" rounded="lg">
							Login
						</Button>
					</Link>
				</>
			)}
		</HStack>
	);
}

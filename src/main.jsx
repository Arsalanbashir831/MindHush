import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")).render(
	<StrictMode>
	<RecoilRoot>
		<Provider>
			{/* <AuthProvider> */}
				<BrowserRouter>
					<App />
				</BrowserRouter>
			{/* </AuthProvider> */}
		</Provider>
	</RecoilRoot>
	</StrictMode>
);

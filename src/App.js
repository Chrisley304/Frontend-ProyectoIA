import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid } from "@nextui-org/react";
import {Sidebar} from "./components/Sidebar/Sidebar"
import {Dashboard} from "./pages/Dashboard/Dashboard"
import {Page} from "./components/Page/Page"

function App() {
    return (
		<BrowserRouter>
			<Sidebar/>
			<Page>
				<Routes>
					<Route path="/" element={<Dashboard />} />
				</Routes>
			</Page>
		</BrowserRouter>
    );
}

export default App;

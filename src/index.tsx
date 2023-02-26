import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import Modal from "./components/modal/Modal";
import { QueryClient, QueryClientProvider } from "react-query";

if (process.env.NODE_ENV === "development") {
    const { worker } = require("./mocks/browser");
    worker.start();
}
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const Wrap = ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <Wrap>
                <Modal />
                <App />
            </Wrap>
        </RecoilRoot>
    </React.StrictMode>
);

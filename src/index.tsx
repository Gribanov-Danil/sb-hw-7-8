import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./app/app"

const rootElement = document.getElementById("root")

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
)
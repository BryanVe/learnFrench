import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import "@mantine/core/styles.css"
import "@mantine/charts/styles.css"
import "@mantine/carousel/styles.css"
import { MantineProvider } from "@mantine/core"
import theme from "./theme"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
)

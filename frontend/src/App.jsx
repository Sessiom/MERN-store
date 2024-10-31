import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Createpage from "./pages/createpage"
import Homepage from "./pages/homepage"
import Navbar from "./components/navbar"

function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/create" element={<Createpage/>} />
      </Routes>
    </Box>
  )
}

export default App

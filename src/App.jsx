import Footer from "./components/Footer"
import MarketOverview from "./components/MarketOverview"
import Table from "./components/Table"
import Navbar from "./components/Navbar"
import { BrowserRouter } from "react-router-dom"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <MarketOverview />
        <Table />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App

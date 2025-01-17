// import Table from "./components/Table"
// import MarketOverview from "./components/MarketOverview"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { DexProvider } from "./context/dexContext"
import Pool from "./pages/pool"
import { Routes, Route } from "react-router-dom"
import Defi from "./pages/defi"

function App() {

  return (
    <>
      <DexProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Defi/>}/>
          <Route path="/pools/:address" element={<Pool />}/>
        </Routes>
        {/* <MarketOverview /> */}
        {/* <Table/> */}
        <Footer />
      </DexProvider>
    </>
  )
}

export default App

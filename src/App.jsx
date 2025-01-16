import Footer from "./components/Footer"
import MarketOverview from "./components/MarketOverview"
import Table from "./components/Table"
import Navbar from "./components/Navbar"
import { DexProvider } from "./context/dexContext"

function App() {

  return (
    <>
      <DexProvider>
        <Navbar />
        <MarketOverview />
        <Table />
        <Footer />
      </DexProvider>
    </>
  )
}

export default App

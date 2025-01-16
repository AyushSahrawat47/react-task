import Table from "./components/Table"
import MarketOverview from "./components/MarketOverview"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { DexProvider } from "./context/dexContext"
// import Defi from "./pages/defi"

function App() {

  return (
    <>
      <DexProvider>
        <Navbar />
        <MarketOverview />
        <Table/>
        <Footer />
      </DexProvider>
    </>
  )
}

export default App

import './App.css'
import { SiteCard } from './components/SiteCard'

function App() {
  return (
    <main className="bg-background-950 min-h-screen">
      <div className="container py-4">
        <h1 className="text-3xl font-bold text-white">Status Page</h1>
        <div className="grid auto-rows-fr grid-cols-3  gap-4 p-4">
          <SiteCard />
        </div>
      </div>
    </main>
  )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'
import { SiteCard } from './components/SiteCard'
import IWebsite from './interfaces/IWebsite'
import IStatusCheck from './interfaces/IStatusCheck'

interface IData {
  Website: IWebsite,
  StatusChecks: IStatusCheck[]
}

function App() {
  // Write an api call
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('/api/v1/status')
      .then((response) => response.json())
      .then((data) => setData(data))
  }, [])

  return (
    <main className="bg-background-950 min-h-screen">
      <div className="container py-4">
        <h1 className="text-3xl font-bold text-white">Status Page</h1>
        <div className="grid auto-rows-fr grid-cols-1 md:grid-cols-3  gap-4 p-4">
          {
            data.map((site: IData) => (
              <SiteCard key={site.Website.WebsiteID} data={site} />
            ))
          }
        </div>
      </div>
    </main>
  )
}

export default App

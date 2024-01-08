import { useEffect, useState } from 'react'
import './App.css'
import { SiteCard } from './components/SiteCard'
import IStatusCheck from './interfaces/IStatusCheck'
import { SkeletonCard } from './components/SkeletonCard'

interface IData {
  Website: {
    website_id: number
    website_name: string
    website_url: string
  }
  StatusCheck: IStatusCheck,
  average_response_time: number
}


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  useEffect(() => {
    setIsLoading(true)
    fetch('/api/v1/status')
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
  }, [])

  return (
    <main className="min-h-screen bg-background-950">
      <div className="container py-4">
        <h1 className="text-3xl font-bold text-white">Status Page</h1>
        <div className="grid auto-rows-fr grid-cols-1 gap-4  p-4 md:grid-cols-3">
          {isLoading && <SkeletonCards />}
          {data.map((site: IData) => (
            <SiteCard
              key={site.Website.website_id}
              data={site}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

function SkeletonCards() {
  return (
    <>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </>
  )
}

export default App

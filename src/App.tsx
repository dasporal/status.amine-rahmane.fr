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
  StatusCheck: IStatusCheck
  average_response_time: number
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const setCache = (key: string, value: IData, ttl: number) => {
    const now = new Date()
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  const getCache = (key: string) => {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }

  const [data, setData] = useState([])

  useEffect(() => {
    const cachedData = getCache('statusData')
    if (cachedData) {
      setData(cachedData)
      setIsLoading(false)
    } else {
      fetch('/api/v1/status')
        .then((response) => response.json())
        .then((fetchedData) => {
          setCache('statusData', fetchedData, 3600000)
          setData(fetchedData)
          setIsLoading(false)
        })
    }
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

function SkeletonCards({ number = 6 }: { number?: number }) {
  return (
    <>
      {Array.from({ length: number }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  )
}

export default App

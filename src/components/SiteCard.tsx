import { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card'
import IStatusCheck from '@/interfaces/IStatusCheck'

interface IData {
  Website: {
    website_id: number
    website_name: string
    website_url: string
  }
  StatusCheck: IStatusCheck,
  average_response_time: number
}

export function SiteCard({ data }: { data: IData }) {
  const [status, setStatus] = useState({
    text: 'Offline',
    color: 'text-red-500',
  })

  useEffect(() => {
    if (
      data.StatusCheck.StatusCode >= 200 &&
      data.StatusCheck.StatusCode <= 299
    ) {
      setStatus({ text: 'Online', color: 'text-green-500' })
    } else if (
      data.StatusCheck.StatusCode >= 400 &&
      data.StatusCheck.StatusCode <= 499
    ) {
      setStatus({ text: 'Website not foud', color: 'text-red-500' })
    } else {
      setStatus({ text: 'Offline', color: 'text-red-500' })
    }
  }, [data])

  return (
    <Card className="flex flex-col justify-around hover:bg-background-900">
      <a href={data.Website.website_url}>
        <CardHeader>
          <CardTitle>{data.Website.website_name}</CardTitle>
          <CardDescription
            className={`flex gap-4 font-semibold ${status.color}`}>
            {status.text}
            {data.average_response_time > 1000 && (
              <span className="text-orange-500">Performance degraded</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Average response time today: {data.average_response_time}ms</p>
          <p>Last Reponse: {data.StatusCheck.Status}</p>
        </CardContent>
      </a>
    </Card>
  )
}

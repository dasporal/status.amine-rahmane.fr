import { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card'

export function SiteCard({ data }) {
  const [status, setStatus] = useState({
    text: 'Offline',
    color: 'text-red-500',
  })
  const [averageResponseTime, setAverageResponseTime] = useState(0)

  useEffect(() => {
    const totalResponseTime = data.StatusChecks.reduce((acc, check) => acc + check.ResponseTime, 0);
    const avgResponseTime = totalResponseTime / data.StatusChecks.length;
    setAverageResponseTime(Math.trunc(avgResponseTime));


    if (
      data.StatusChecks[0].StatusCode >= 200 &&
      data.StatusChecks[0].StatusCode <= 299
    ) {
      setStatus({ text: 'Online', color: 'text-green-500' })
    } else if (
      data.StatusChecks[0].StatusCode >= 400 &&
      data.StatusChecks[0].StatusCode <= 499
    ) {
      setStatus({ text: 'Website not foud', color: 'text-red-500' })
    } else {
      setStatus({ text: 'Offline', color: 'text-red-500' })
    }
  }, [data])

  return (
    <Card className="hover:bg-background-900">
      <a href={data.Website.Url}>
        <CardHeader>
          <CardTitle>{data.Website.Name}</CardTitle>
          <CardDescription className={`flex gap-4 font-semibold ${status.color}`}>
            {status.text}
            {averageResponseTime > 1000 && (<span className='text-orange-500'>Performance degraded</span>)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Average response time today: {averageResponseTime}ms</p>
          <p>Last Reponse: {data.StatusChecks[0].Status}</p>
        </CardContent>
      </a>
    </Card>
  )
}

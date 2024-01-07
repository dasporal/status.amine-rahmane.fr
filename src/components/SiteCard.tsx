import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card'

export function SiteCard() {
  return (
    <Card className="hover:bg-background-900">
      <a href="https://amine-rahmane.fr">
        <CardHeader>
          <CardTitle>Amine Rahmane</CardTitle>
          <CardDescription className="font-semibold text-green-500">
            Online
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Average response time today: 340ms</p>
          <p>Last Reponse: 200 OK</p>
        </CardContent>
      </a>
    </Card>
  )
}

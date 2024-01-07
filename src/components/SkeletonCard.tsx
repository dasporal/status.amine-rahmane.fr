import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from './ui/card'
import { Skeleton } from './ui/skeleton'

export function SkeletonCard() {
  return (
    <Card className="flex flex-col justify-around hover:bg-background-900">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4 w-1/2" />
        </CardTitle>
        <CardDescription className={`flex gap-4`}>
          <Skeleton className="h-4 w-1/4" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  )
}

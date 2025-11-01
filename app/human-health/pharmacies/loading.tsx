import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PharmaciesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50/20 to-blue-50/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-28" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-64 mb-4" />
                    <div className="flex gap-4 mb-3">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-48">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

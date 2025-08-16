"use client"

import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Dot } from 'lucide-react';
type ChartDataItem = {
  date: string
  total: number
  success: number
  pending: number
}

const dummyData: ChartDataItem[] = [
  { date: "2025-08-01", total: 12, success: 9, pending: 3 },
  { date: "2025-08-02", total: 18, success: 15, pending: 3 },
  { date: "2025-08-03", total: 20, success: 18, pending: 2 },
  { date: "2025-08-04", total: 25, success: 20, pending: 5 },
  { date: "2025-08-05", total: 22, success: 21, pending: 1 },
  { date: "2025-08-06", total: 30, success: 28, pending: 2 },
  { date: "2025-08-07", total: 27, success: 25, pending: 2 },
]

export default function ChartAreaClient({ chartData = dummyData }: { chartData?: ChartDataItem[] }) {
  return (
    <Card className="w-full p-4 mb-10"> 
      <CardHeader>
        <CardTitle>Status Of Documents Processed</CardTitle>
        <CardDescription>Total per day</CardDescription>
        <div className="flex gap-4 mt-2 text-sm text-gray-500">
        <div className="font-bold"><Dot color="#08f750"/> Successfully Generated</div>
        <div className="font-bold"><Dot color="#f0e805"/> Pending Generation</div>
        <div className="font-bold"><Dot color="#f2f1e9"/> Total Docs Generated</div>
        </div>
      </CardHeader>

    
      <div className="w-full h-72">
        <ChartContainer
          className="relative w-full h-full"
          config={{
            total: { label: "Total Docs", color: "#ffffff" },
            success: { label: "Success", color: "#ffffff" },
            pending: { label: "Pending", color: "#ffffff" },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area dataKey="total" stroke="#ffffff" fill="#ffffff" fillOpacity={0.4} />
              <Area dataKey="success" stroke="#ffffff" fill="#22c55e" fillOpacity={0.4} />
              <Area dataKey="pending" stroke="#ffffff" fill="#fcd34d" fillOpacity={0.4} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  )
}

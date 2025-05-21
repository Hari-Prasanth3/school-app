"use client";

import { useState, useEffect } from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

type MeasurementDataPoint = {
  month: string;
  height: number;
  weight: number;
};

// Sample data - would come from API in a real app
const generateChartData = (timeRange: string): MeasurementDataPoint[] => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  const result: MeasurementDataPoint[] = [];
  
  let numMonths = 3; // default
  
  if (timeRange === "1month") numMonths = 1;
  if (timeRange === "3months") numMonths = 3;
  if (timeRange === "6months") numMonths = 6;
  if (timeRange === "1year") numMonths = 12;
  
  for (let i = 0; i < numMonths; i++) {
    const month = new Date(now);
    month.setMonth(now.getMonth() - (numMonths - 1 - i));
    
    // Base values with some randomization
    const baseHeight = 130 + i * 0.7; // Small increase each month
    const baseWeight = 40 + i * 0.2; // Small increase each month
    
    // Add random noise
    const height = baseHeight + (Math.random() * 0.6 - 0.3);
    const weight = baseWeight + (Math.random() * 0.4 - 0.2);
    
    result.push({
      month: monthNames[month.getMonth()],
      height: Number(height.toFixed(1)),
      weight: Number(weight.toFixed(1))
    });
  }
  
  return result;
};

interface MeasurementChartProps {
  timeRange: string;
}

export function MeasurementChart({ timeRange }: MeasurementChartProps) {
  const [data, setData] = useState<MeasurementDataPoint[]>([]);
  const [chartType, setChartType] = useState<"both" | "height" | "weight">("both");
  
  useEffect(() => {
    setData(generateChartData(timeRange));
  }, [timeRange]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border rounded-md shadow-sm">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name === "height" ? "Height: " : "Weight: "}
              {entry.value} {entry.name === "height" ? "cm" : "kg"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <TabsList className="h-8">
          <TabsTrigger 
            value="both" 
            className={chartType === "both" ? "bg-primary text-primary-foreground" : ""} 
            onClick={() => setChartType("both")}
          >
            Both
          </TabsTrigger>
          <TabsTrigger 
            value="height" 
            className={chartType === "height" ? "bg-primary text-primary-foreground" : ""} 
            onClick={() => setChartType("height")}
          >
            Height
          </TabsTrigger>
          <TabsTrigger 
            value="weight" 
            className={chartType === "weight" ? "bg-primary text-primary-foreground" : ""} 
            onClick={() => setChartType("weight")}
          >
            Weight
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis 
              yAxisId="left" 
              stroke="hsl(var(--chart-1))" 
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
              hide={chartType === "weight"}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="hsl(var(--chart-2))" 
              domain={['dataMin - 0.2', 'dataMax + 0.2']}
              hide={chartType === "height"}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {(chartType === "both" || chartType === "height") && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="height"
                stroke="hsl(var(--chart-1))"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            )}
            {(chartType === "both" || chartType === "weight") && (
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="weight" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
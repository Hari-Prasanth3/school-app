"use client";

import { useState } from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ReferenceLine 
} from "recharts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";

interface Measurement {
  date: string;
  height: number;
  weight: number;
}

interface GrowthChartProps {
  measurements: Measurement[];
}

export function GrowthChart({ measurements }: GrowthChartProps) {
  const [metric, setMetric] = useState<"height" | "weight" | "both">("both");
  const [timeRange, setTimeRange] = useState<string>("6m");

  // Process data for the chart
  const chartData = [...measurements]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(m => ({
      date: new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      height: m.height,
      weight: m.weight,
      bmi: Number((m.weight / ((m.height / 100) ** 2)).toFixed(1))
    }));

  // Filter data by time range
  let filteredData = chartData;
  if (timeRange !== "all") {
    const now = new Date();
    let months = 6;
    
    if (timeRange === "3m") months = 3;
    if (timeRange === "6m") months = 6;
    if (timeRange === "1y") months = 12;
    
    const cutoffDate = new Date(now.setMonth(now.getMonth() - months));
    
    filteredData = chartData.filter(item => 
      new Date(measurements.find(m => 
        new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) === item.date
      )?.date || "") >= cutoffDate
    );
  }

  // Reference values (simplified for example)
  // These would typically come from standardized growth charts
  const heightReference = { min: 135, target: 142, max: 148 };
  const weightReference = { min: 30, target: 35, max: 40 };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border rounded-md shadow-sm">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any) => (
            <p key={entry.name} style={{ color: entry.color }} className="text-sm">
              {entry.name === "height" 
                ? "Height: " + entry.value + " cm"
                : entry.name === "weight"
                ? "Weight: " + entry.value + " kg"
                : "BMI: " + entry.value
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 justify-between">
        <ToggleGroup type="single" value={metric} onValueChange={(value) => setMetric(value as any)}>
          <ToggleGroupItem value="both">Both</ToggleGroupItem>
          <ToggleGroupItem value="height">Height</ToggleGroupItem>
          <ToggleGroupItem value="weight">Weight</ToggleGroupItem>
        </ToggleGroup>
        
        <TabsList>
          <TabsTrigger value="3m" onClick={() => setTimeRange("3m")}>
            3 Months
          </TabsTrigger>
          <TabsTrigger value="6m" onClick={() => setTimeRange("6m")}>
            6 Months
          </TabsTrigger>
          <TabsTrigger value="1y" onClick={() => setTimeRange("1y")}>
            1 Year
          </TabsTrigger>
          <TabsTrigger value="all" onClick={() => setTimeRange("all")}>
            All
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
            />
            
            {(metric === "both" || metric === "height") && (
              <YAxis 
                yAxisId="height" 
                orientation="left"
                domain={['auto', 'auto']}
                stroke="hsl(var(--chart-1))"
                label={{ 
                  value: 'Height (cm)', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { fill: 'hsl(var(--muted-foreground))' }
                }}
              />
            )}
            
            {(metric === "both" || metric === "weight") && (
              <YAxis 
                yAxisId="weight" 
                orientation="right"
                domain={['auto', 'auto']}
                stroke="hsl(var(--chart-2))"
                label={{ 
                  value: 'Weight (kg)', 
                  angle: 90, 
                  position: 'insideRight',
                  style: { fill: 'hsl(var(--muted-foreground))' }
                }}
              />
            )}
            
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {(metric === "both" || metric === "height") && (
              <>
                <Line 
                  yAxisId="height"
                  type="monotone" 
                  dataKey="height" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={2}
                  dot={{ strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <ReferenceLine 
                  yAxisId="height" 
                  y={heightReference.target} 
                  stroke="hsl(var(--chart-1))" 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: 'Target',
                    position: 'insideBottomLeft',
                    style: { fill: 'hsl(var(--chart-1))' }
                  }} 
                />
              </>
            )}
            
            {(metric === "both" || metric === "weight") && (
              <>
                <Line 
                  yAxisId="weight"
                  type="monotone" 
                  dataKey="weight" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  dot={{ strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <ReferenceLine 
                  yAxisId="weight" 
                  y={weightReference.target} 
                  stroke="hsl(var(--chart-2))" 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: 'Target',
                    position: 'insideBottomRight',
                    style: { fill: 'hsl(var(--chart-2))' }
                  }} 
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
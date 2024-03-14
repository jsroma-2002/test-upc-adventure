"use client";
import { Card } from "@/components/ui/card";
import { Adventure } from "@/interfaces/entities/adventure";
import { useSave } from "@/providers/save-provider";
import { GetAventure } from "@/services/new/adventure-service";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function FeedbackPage() {
  const [adventure, setAdventure] = useState<Adventure | null>(null);

  const { save } = useSave();

  useEffect(() => {
    setAdventure(GetAventure(save.difficulty));
  }, [save]);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="h-screen w-screen flex gap-4 p-4 items-center justify-center">
      {adventure ? (
        <Card className="p-8">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {adventure.title}
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            {adventure.description}
          </p>
          <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Objetivos
          </h3>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Estos son tus objetivos:
          </p>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            {adventure.objectives.map((objective) => (
              <li key={objective.id}>{objective.name}</li>
            ))}
          </ul>
        </Card>
      ) : (
        <h1>Loading...</h1>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="pv"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="uv"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

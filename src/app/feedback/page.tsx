"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSave } from "@/providers/save-provider";
import { LoadSave } from "@/services/shared/storage-service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function FeedbackPage() {
  const { save, setSave } = useSave();

  useEffect(() => {
    const savedGame = LoadSave();
    if (savedGame) {
      setSave(savedGame);
    }
  }, [setSave, save.difficulty]);

  const router = useRouter();

  //generate some data from the adventure objectives
  console.log(save);

  const saveData = save.objectives.map((objective) => ({
    name: objective.name,
    //differences between the create time and the objective's end time in minutes
    segundos: objective.endTime
      ? Math.floor(
          (new Date(objective.endTime).getTime() -
            new Date(objective.createdAt).getTime()) /
            1000
        )
      : 0,
    amt: Math.floor(Math.random() * 1000),
  }));

  return (
    <div className="h-screen w-screen flex gap-4 p-4 items-center justify-center">
      <Card className="p-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Feedback
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Aquí podrás ver tu progreso en el juego.
        </p>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          Objetivos
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Estos son tus objetivos:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          {save.objectives.map((objective) => (
            <li key={objective.id}>{objective.name}</li>
          ))}
        </ul>
        <Button onClick={() => router.push("/")}>Volver al inicio</Button>
      </Card>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={saveData}
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
          <Tooltip
            cursor={{ fill: "transparent" }}
            wrapperStyle={{ backgroundColor: "#fff", border: "none" }}
            contentStyle={{ backgroundColor: "#fff", border: "none" }}
          />
          <Legend />
          <Bar dataKey="segundos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

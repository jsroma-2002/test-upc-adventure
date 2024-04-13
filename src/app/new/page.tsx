"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { seedItems } from "@/data/seed/items";
import { Difficulty } from "@/interfaces/entities/save";
import { useSave } from "@/providers/save-provider";
import { GetObjectives } from "@/services/new/objectives-service";
import { SaveDataToLocalStorage } from "@/services/shared/storage-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const items = [
  {
    id: "1",
    label: "Plataforma Web",
  },
  {
    id: "2",
    label: "Uso de servicios de la institución",
  },
  {
    id: "3",
    label: "Procesos de la institución",
  },
  {
    id: "4",
    label: "Areas de la institución",
  },
] as const;

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "El nombre es muy corto",
    })
    .max(50, {
      message: "El nombre es muy largo",
    }),
  difficulty: z.enum([Difficulty.EASY, Difficulty.MEDIUM, Difficulty.HARD], {
    required_error: "Debes seleccionar una dificultad",
  }),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Debes seleccionar al menos una temática.",
  }),
});

export default function NewPage() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      difficulty: undefined,
      items: [],
    },
  });

  const router = useRouter();

  const { setSave } = useSave();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const currentSave = {
      positionX: "0",
      positionY: "0",
      difficulty: values.difficulty as Difficulty,
      username: values.username,
      items: [
        seedItems.find((item) => item.id === "3")!,
        seedItems.find((item) => item.id === "6")!,
      ],
      objectives: GetObjectives(values.difficulty as Difficulty),
      topics: values.items,
      userCode: `u2024${Math.random().toString().slice(-5)}`,
      password: Math.random().toString(36).slice(-8),
    };

    SaveDataToLocalStorage(currentSave);

    setSave(currentSave);

    router.push("/new/adventure");
  }

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Configura tu aventura</CardTitle>
          <CardDescription>Edita las opciones de tu aventura.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormDescription>
                      Este es tu nombre de personaje.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dificultad</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un nivel de dificultad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Difficulty.EASY}>Fácil</SelectItem>
                        <SelectItem value={Difficulty.MEDIUM}>Medio</SelectItem>
                        <SelectItem value={Difficulty.HARD}>Difícil</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      La dificultad determinara la cantidad de objetivos a
                      completar y su complejidad.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Temas a reforzar
                      </FormLabel>
                      <FormDescription>
                        Selecciona las temáticas que quieras reforzar mediante
                        la aventura.
                      </FormDescription>
                    </div>
                    {items.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Confirmar</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useSave } from "@/providers/save-provider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import AuthDialog from "./auth-dialog";

interface DeskDialogProps {
  disableKeyboard: () => void;
  completeObjective: (objective: string) => void;
}

export default function DeskDialog({
  disableKeyboard,
  completeObjective,
}: DeskDialogProps) {
  const results = [
    "https://aulavirtual.upc.edu.pe/",
    "https://mi.upc.edu.pe/",
    "https://intranet.upc.edu.pe/",
  ];

  const [search, setSearch] = useState<string>("");

  const [searchResults, setSearchResults] = useState<string[]>([]);

  const { save, setSave } = useSave();

  useEffect(() => {
    //includes all results
    if (
      searchResults.includes(results[0]) &&
      searchResults.includes(results[1]) &&
      searchResults.includes(results[2])
    ) {
      completeObjective("12");
    }
  }, [searchResults]);

  const [openMail, setOpenMail] = useState<boolean>(false);

  const [authenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          disableKeyboard();
        }

        if (!open) {
          disableKeyboard();
        }
      }}
    >
      <DialogTrigger asChild>
        <Image
          className="fixed left-[30vw] top-80 hover:scale-105 transition-all cursor-pointer"
          src={"/desk/desk.svg"}
          alt={"Desk"}
          width={150}
          height={150}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Plataforma UPC</DialogTitle>
          <DialogDescription>
            Hola estudiante, ¿en qué plataforma deseas ingresar?. Ingresa la URL
            correspondiente y presiona buscar para ingresar a las plataformas de
            la UPC.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex w-96 max-w-sm items-center space-x-2"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setOpenMail(false);
            const inputElement = e.currentTarget
              .elements[0] as HTMLInputElement;
            if (inputElement.value === results[0]) {
              setSearchResults([...searchResults, inputElement.value]);
              completeObjective("9");
            }
            if (inputElement.value === results[1]) {
              setSearchResults([...searchResults, inputElement.value]);
              completeObjective("11");
            }
            if (inputElement.value === results[2]) {
              setSearchResults([...searchResults, inputElement.value]);
              completeObjective("10");
            }
            setSearch(inputElement.value);
          }}
        >
          <Input type="text" placeholder="buscar..." />
          <Button type="submit">Buscar</Button>
          <Button
            onClick={() => {
              setOpenMail(true);
            }}
            type="button"
          >
            Ver correo
          </Button>
        </form>

        <div className="flex gap-2 items-center justify-center">
          {openMail && (
            <Card>
              <CardHeader>
                <CardTitle>Correo UPC</CardTitle>
                <CardDescription>
                  Correo institucional de la UPC
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <h1>Bienvenido a la UPC</h1>
                <br />
                <p>
                  Hola estudiante, bienvenido a la UPC. Esperamos que tengas una
                  excelente experiencia en nuestra universidad. Para ingresar a
                  tus clases debes utilizar las siguientes credenciales
                  (Recuerda cambiar tu contraseña para mayor seguridad):
                </p>
                <br />
                <p>
                  Usuario: {save.userCode} <br /> Contraseña: {save.password}
                </p>
                <Button className="max-w-24" onClick={() => setOpenMail(false)}>
                  Cerrar
                </Button>
              </CardContent>
            </Card>
          )}
          {search === results[0] &&
            (!authenticated ? (
              <AuthDialog
                username={save.userCode}
                password={save.password}
                onLogin={() => {
                  setAuthenticated(true);
                }}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Aula Virtual</CardTitle>
                  <CardDescription>Plataforma de clases de UPC</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-8">
                  <div className="flex flex-row gap-2">
                    <Button
                      onClick={() => {
                        completeObjective("14");
                      }}
                    >
                      Calificaciones
                    </Button>
                    <Button
                      onClick={() => {
                        completeObjective("15");
                      }}
                    >
                      Cursos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          {search === results[1] &&
            (!authenticated ? (
              <AuthDialog
                username={save.userCode}
                password={save.password}
                onLogin={() => {
                  setAuthenticated(true);
                }}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Mi UPC</CardTitle>
                  <CardDescription>
                    Plataforma personal del estudiante
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row gap-2">
                  <Button
                    onClick={() => {
                      completeObjective("13");
                    }}
                  >
                    Cursos y Horarios
                  </Button>
                </CardContent>
              </Card>
            ))}
          {search === results[2] &&
            (!authenticated ? (
              <AuthDialog
                username={save.userCode}
                password={save.password}
                onLogin={() => {
                  setAuthenticated(true);
                }}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Intranet</CardTitle>
                  <CardDescription>Plataforma de tramites UPC</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row gap-2">
                  <Button
                    onClick={() => {
                      completeObjective("2");
                      toast.success("Has reservado un libro");
                      setSave({
                        ...save,
                        items: [
                          ...save.items,
                          {
                            id: "2",
                            name: "Book",
                            image: "/items/book.svg",
                            positionX: 0,
                            positionY: 4,
                          },
                        ],
                      });
                    }}
                  >
                    Reservar Libro
                  </Button>
                  <Button
                    onClick={() => {
                      completeObjective("8");
                      toast.success("Has reservado una tablet");
                      setSave({
                        ...save,
                        items: [
                          ...save.items,
                          {
                            id: "5",
                            name: "Tablet",
                            image: "/items/tablet.svg",
                            positionX: 0,
                            positionY: 4,
                          },
                        ],
                      });
                    }}
                  >
                    Reservar Tablet
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

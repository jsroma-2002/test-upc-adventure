import { Character } from "@/interfaces/entities/character";
import { Message } from "@/interfaces/entities/message";
import { getCharacterByCoordinates } from "@/services/rooms/characters-service";
import { GetTeacherResponse } from "@/services/rooms/messages-service";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

interface CharacterDisplay {
  positionX: string;
  positionY: string;
  disableKeyboard: () => void;
  tutorialAction: (() => void) | null;
  completeObjetive: (id: string) => void;
}

export default function CharactersDisplay({
  positionX,
  positionY,
  disableKeyboard,
  tutorialAction,
  completeObjetive,
}: CharacterDisplay) {
  const characters = getCharacterByCoordinates(positionX, positionY);

  const initialMessages: Message[] = [
    new Message("1", "Hola, ¿cómo estás?", true),
  ];

  const [messages, setMessage] = useState(initialMessages);

  const [userInput, setUserInput] = useState("");

  const [showChat, setShowChat] = useState(false);

  const [teacher, setTeacher] = useState<Character | null>(null);

  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState<string[]>([]);

  function getResponse(input: string) {
    setLoading(true);

    GetTeacherResponse(teacher?.name || "", input).then((data) => {
      setMessage([
        ...messages,
        new Message(messages.length.toString(), input, false),
        new Message((messages.length + 1).toString(), data.response, true),
      ]);
      setLoading(false);
      setHistory([...history, data.tag]);

      const libraryTags = [
        "EncontrarBiblioteca",
        "ExistenciaBiblioteca",
        "EncontrarLibro",
        "ExistenciaLibros",
        "PrestarLibros",
        "ComoPrestarLibros",
        "LibrosDigitalesExistencia",
      ];

      const bookTags = [
        "EncontrarLibro",
        "ExistenciaLibros",
        "PrestarLibros",
        "ComoPrestarLibros",
        "CuantosLibrosPrestados",
        "CantidadLibros",
        "LibrosDigitalesExistencia",
        "EncontrarLibrosDigitales",
      ];

      if (data.tag === "ExistenciaBiblioteca") {
        completeObjetive("3");
      }

      if (data.tag === "FechasImportantes") {
        completeObjetive("16");
      }

      if (history.filter((tag) => libraryTags.includes(tag)).length >= 3) {
        completeObjetive("4");
      }

      if (history.filter((tag) => bookTags.includes(tag)).length > 0) {
        completeObjetive("6");
      }
    });
  }

  return (
    <>
      {characters.map((character) => (
        <Image
          key={character.id}
          src={character.image}
          alt={character.name}
          className="fixed top-32 left-40 cursor-pointer"
          width={400}
          height={300}
          onClick={() => {
            setShowChat(!showChat);
            setTeacher(character);
            disableKeyboard();
          }}
        />
      ))}
      {showChat && (
        <section className="w-1/2 right-0 flex flex-col backdrop-blur h-screen fixed p-8 place-content-between border-l">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={teacher?.profileImage}
                  alt="Foto Perfil Profesor"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <article>
                <CardTitle>{teacher?.name}</CardTitle>
                <CardDescription>{teacher?.description}</CardDescription>
              </article>
            </CardHeader>
          </Card>
          <ScrollArea className="h-5/6 py-4 flex flex-col">
            {messages.map((message) =>
              message.isExternal ? (
                <div className="w-full flex mb-2" key={message.id}>
                  <span className="p-2 border text-white bg-primary rounded-full px-4 w-fit">
                    <p className="w-fit">{message.content}</p>
                  </span>
                </div>
              ) : (
                <div className="w-full justify-end flex mb-2" key={message.id}>
                  <span className="p-2 borde border-accent bg-accent rounded-full px-4 w-fit place-content-end">
                    <p className="w-fit">{message.content}</p>
                  </span>
                </div>
              )
            )}
          </ScrollArea>
          <form className="flex  w-full items-center space-x-2">
            <Input
              defaultValue={userInput}
              className="w-2/4"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              type="text"
              placeholder="Mensaje..."
            />
            <Button
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                if (userInput !== "") {
                  getResponse(userInput);
                }
                setUserInput("");
              }}
              className="w-1/4"
              type="submit"
            >
              Enviar
            </Button>
            <Button
              onClick={() => {
                setShowChat(false);
                disableKeyboard();
                setMessage(initialMessages);
                if (tutorialAction !== null) {
                  tutorialAction();
                }
              }}
              className="w-1/4"
              variant={"destructive"}
            >
              Salir
            </Button>
          </form>
        </section>
      )}
    </>
  );
}

"use client";
import CharactersDisplay from "@/components/rooms/characters-display";
import TutorialItemsDialog from "@/components/tutorial/tutorial-items-dialog";
import TutorialObjectiveDialog from "@/components/tutorial/tutorial-objective-dialog";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Joyride, { ACTIONS, CallBackProps, Step } from "react-joyride";

interface item {
  name: string;
  image: string;
}

interface objective {
  name: string;
  description: string;
  completed: boolean;
}

const steps = [
  {
    target: "body",
    content: "Bienvenido a la sala de tutorial!",
    disableBeacon: true,
    placement: "center",
  },
  {
    target: "#firstStep",
    content: "Este es el botón de guardado, puedes guardar tu progreso",
    disableBeacon: true,
  },
  {
    target: "#secondStep",
    content:
      "Este es el menu de objetivos, puedes ver tus objetivos actuales y necesarios para completar la sala de tutorial",
    disableBeacon: true,
  },
  {
    target: "#thirdStep",
    content: "Este es el menu de items donde puedes ver tus items actuales",
    disableBeacon: true,
  },
  {
    target: "body",
    content: "Revisemos los objetivos para completar la sala de tutorial",
    disableBeacon: true,
    placement: "center",
  },
  {
    target: "#fourthStep",
    content: "Completemos el primer objetivo",
    disableBeacon: true,
  },
  {
    target: "#thirdStep",
    content: "Revisemos los items conseguidos",
    disableBeacon: true,
  },
  {
    target: "#thirdStep",
    content: "Ahora interactuemos con el personaje de la sala de tutorial",
    disableBeacon: true,
  },
  {
    target: "#thirdStep",
    content:
      "Excelente! Hemos completado los objetivos de la sala de tutorial!",
    disableBeacon: true,
    placement: "center",
  },
];

export default function StartPage() {
  const [items, setItems] = useState<item[]>([]);
  const [objectives, setObjectives] = useState<objective[]>([
    {
      name: "Obtén un item",
      description: "Obtén un libro dentro de la sala de tutorial",
      completed: false,
    },
    {
      name: "Interactúa con un personaje",
      description:
        "Inicia una conversación con el personaje de la sala de tutorial",
      completed: false,
    },
  ]);

  const [run, setRun] = useState(false);

  useEffect(() => {
    setRun(true);
  }, []);

  const [stepIndex, setStepIndex] = useState(0);

  const router = useRouter();

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, origin, status, type, lifecycle } = data;

    if (index === 4 && lifecycle === "complete") {
      setRun(false);
    }

    if (index === 5 && lifecycle === "complete") {
      setRun(false);
    }

    if (index === 6 && lifecycle === "complete") {
      setRun(false);
    }

    if (index === 7 && lifecycle === "complete") {
      setRun(false);
    }

    if (action === ACTIONS.NEXT && lifecycle === "complete") {
      setStepIndex(index + 1);
    }

    if (action === ACTIONS.NEXT && lifecycle === "complete" && index === 8) {
      router.push("/");
    }
  };

  return (
    <div>
      {run && (
        <Joyride
          callback={handleJoyrideCallback}
          steps={steps as Step[]}
          stepIndex={stepIndex}
          continuous
          run={run}
        />
      )}
      <main>
        <Image
          className="fixed w-full h-full -z-50"
          src={"/rooms/roomx2y1.svg"}
          alt={"Background Image"}
          width={1920}
          height={1080}
        />
        <CharactersDisplay
          tutorialAction={() => {
            setRun(true);
            setStepIndex(8);
          }}
          disableKeyboard={() => {}}
          positionX={"2"}
          positionY={"1"}
        />
        <div className="m-4">
          <Button id="firstStep">
            <Save className="mr-2 h-4 w-4" /> Guardar
          </Button>
        </div>
        <div id="secondStep" className="m-4">
          <TutorialObjectiveDialog
            onClose={() => {
              setRun(true);
              setStepIndex(5);
            }}
            save={{
              objectives: objectives,
            }}
          />
        </div>
        <div id="thirdStep" className="m-4">
          <TutorialItemsDialog
            onClose={() => {
              setRun(true);
              setStepIndex(7);
            }}
            save={{
              items: items,
            }}
          />
        </div>
        <Image
          id="fourthStep"
          className="fixed right-52 top-24 hover:scale-105 transition-all cursor-pointer animate-bounce"
          onClick={() => {
            setItems([{ name: "Libro", image: "/items/book.svg" }]);
            setRun(true);
            setStepIndex(6);
          }}
          src={"/items/book.svg"}
          alt={"Item"}
          width={100}
          height={100}
        />
      </main>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function TutorialPage() {
  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-1/2 h-full bg-black">
        <div className="h-full w-full flex items-center justify-center flex-col">
          <h1 className="text-center text-white mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-5xl">
            Mapa:
          </h1>
          <Image
            className="w-[65%]"
            width={500}
            height={500}
            src="/tutorial/minimap.svg"
            alt="Minimapa general"
          />
        </div>
      </div>
      <div className="w-1/2 h-full flex items-center flex-col justify-center gap-4 sm:px-16 lg:px-48 text-justify">
        <h1 className="text-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
          Tutorial
        </h1>
        <p className="text-lg font-normal lg:text-xl">
          Este proyecto consiste en un juego de aventura gráfica en el que
          deberás ir superando diferentes objetivos relacionados a los procesos
          y tramites de la universidad. Para ello deberás recorrer el mapa e
          interactuar con los diferentes personajes que te iras encontrando
        </p>
        <div className="p-4 text-sm text-primary rounded-lg bg-accent">
          <span className="font-medium">Consejo!</span> Para interactuar con los
          personajes deberás acercarte y hacer click sobre ellos.
        </div>
        <p className="text-lg font-normal lg:text-xl">
          Estos personajes tienen inteligencia artificial incorporada que te
          permitirá interactuar de una manera natural asi que no dudes en
          preguntarles! Para moverte por el mapa utiliza las teclas:
        </p>
        <span className="flex flex-row justify-center gap-3  mt-4">
          <kbd className="px-2 py-1.5 text-xs font-semibold  border rounded-lg ">
            W
          </kbd>
          <kbd className="px-2 py-1.5 text-xs font-semibold  border  rounded-lg ">
            A
          </kbd>
          <kbd className="px-2 py-1.5 text-xs font-semibold  border  rounded-lg ">
            S
          </kbd>
          <kbd className="px-2 py-1.5 text-xs font-semibold  border  rounded-lg ">
            D
          </kbd>
        </span>
        <p className="text-lg font-normal lg:text-xl mb-4">
          Finalmente si crees que necesitas más ayuda puedes iniciar el tutorial
          interactivo que te guiará paso a paso por el juego.
        </p>
        <span className="flex flex-row gap-4">
          <Button size={"lg"} variant={"default"}>
            Iniciar
          </Button>
          <Link href={"/"}>
            <Button size={"lg"} variant={"secondary"}>
              Volver
            </Button>
          </Link>
        </span>
      </div>
    </div>
  );
}

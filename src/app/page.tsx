import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-24">
      <div className="w-screen h-screen flex items-center flex-col justify-center">
        <h1 className="text-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl ">
          Aprende Jugando UPC
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 ">
          Hola, bienvenido a nuestro proyecto de aprendizaje de lineamientos
          universitarios. Sabias que entre el 15% y 25% de los alumnos
          universitarios desertan en el primer año de estudios. Uno de lo
          motivos de esta elevada deserción es la falta de adaptación de la
          secundaria a la universidad, pues el cambio brusco de lineamientos y
          normas académicas tiene un impacto negativo en el rendimiento
          estudiantil. Por este motivo hemos creado este juego para que puedas
          aprender de una manera divertida y amena adaptándote de la mejor forma
          posible a esta nueva etapa de tu vida. Esperamos puedas aprender mucho
          y disfrutar de este juego!
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link href={"/rooms?x=0&y=0"}>
            <Button size={"lg"}>Nueva Partida</Button>
          </Link>
          <Link href={"/rooms?x=1&y=1"}>
            <Button size={"lg"} variant={"secondary"}>
              Continuar
            </Button>
          </Link>
          <Link href={"tutorial"}>
            <Button size={"lg"} variant={"outline"}>
              Tutorial
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

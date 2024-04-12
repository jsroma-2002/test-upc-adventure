import { Adventure } from "@/interfaces/entities/adventure";
import { Difficulty } from "@/interfaces/entities/save";
import { GetObjectives } from "./objectives-service";

export async function GetAventure(
  level: Difficulty,
  topics: string[]
): Promise<Adventure> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const objectives = GetObjectives(level);

      resolve(
        new Adventure(
          "Aventuras en la UPC: Explorando el Mundo Universitario",
          "¡Bienvenido/a a la Universidad Peruana de Ciencias Aplicadas! Te encuentras en el inicio de tu viaje universitario, lleno de emocionantes desafíos y aprendizajes por descubrir. Tu misión es familiarizarte con los procesos y servicios de la universidad, mejorando tu experiencia estudiantil. En este escenario, te enfrentarás a la tarea de obtener recursos académicos y navegar por las plataformas de la UPC. Para ello, debes obtener un libro en la biblioteca, realizar consultas sobre información bibliográfica y acceder a las plataformas digitales de la universidad.",
          objectives
        )
      );
    }, 5000);
  });
}

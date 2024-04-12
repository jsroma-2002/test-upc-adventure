import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

interface AuthDialogProps {
  username: string;
  password: string;
  onLogin: () => void;
}

export default function AuthDialog({
  username,
  password,
  onLogin,
}: AuthDialogProps) {
  return (
    <Card className="p-4 flex items-center justify-center min-w-52">
      <CardContent>
        <form
          className="flex flex-col max-w-sm gap-4"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const inputUsername = e.currentTarget
              .elements[0] as HTMLInputElement;
            const inputPassword = e.currentTarget
              .elements[1] as HTMLInputElement;
            if (
              inputUsername.value === username &&
              inputPassword.value === password
            ) {
              onLogin();
            }
          }}
        >
          <Input type="text" placeholder="Código de Usuario" />
          <Input type="password" placeholder="Contraseña" />
          <Button type="submit">Iniciar Sesión</Button>
        </form>
      </CardContent>
    </Card>
  );
}

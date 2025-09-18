import { Button } from "@/components/ui/button"
import { ButtonHTMLAttributes } from "react"

type ButtonVariant = "default" | "link" | "secondary" | "destructive" | "outline" | "ghost";


type CustomButtonProps = {
  children: string;
  variant?: ButtonVariant; 
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function CustomButton({ children, ...props }: CustomButtonProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button {...props}>{children}</Button>
    </div>
  );
}

import { cn } from "@/lib/utils";

type FormErrorProps = {
  message?: string;
  className?: string;
};

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <p className={cn("mt-1 text-sm text-red-500", className)}>{message}</p>
  );
}

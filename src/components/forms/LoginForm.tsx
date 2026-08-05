import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { loginSchema } from "../../schemas/loginSchema";
import toast from "react-hot-toast";
import { loginApi } from "../../api/auth";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type LoginForm = {
  email: string;
  password: string;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ email, password }: LoginForm) => loginApi(email, password),
    onSuccess: (data) => {
      loginUser({ user: data.user, token: data.token });
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      if (error.message === "Invalid email or password") {
        toast.error("Invalid email or password");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const onSubmit = (data: LoginForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <Card className="w-full max-w-md rounded-2xl border-0 bg-white/90 shadow-2xl backdrop-blur">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
            🔒
          </div>

          <CardTitle className="text-3xl font-bold tracking-tight">
            Welcome Back
          </CardTitle>

          <CardDescription className="text-base text-muted-foreground">
            Sign in to continue to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* FIX 2: Ensure handleSubmit wraps onSubmit */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                autoComplete="email"
                {...register("email")}
                className="h-11 rounded-lg"
              />

              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>

                <button
                  type="button"
                  className="text-sm text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                {...register("password")}
                className="h-11 rounded-lg"
              />

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="h-11 w-full rounded-lg text-base font-semibold shadow-md transition hover:scale-[1.02] hover:shadow-lg"
            >
              {mutation.isPending ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                className="font-medium text-blue-600 transition hover:underline"
              >
                Create one
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

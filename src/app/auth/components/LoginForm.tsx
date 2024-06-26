"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons/social-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import GoogleAuthBtn from "./GoogleAuthBtn";
import { login } from "@/api/authenticationApi";
import { useFormSubmitter } from "../../services/formSubmit";
import RouteProtection from "@/utils/controllers/RouteProtection";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleAuthFormSubmits } = useFormSubmitter();

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    await handleAuthFormSubmits("login", { email, password });
    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-1 ">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Passsword"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
          <div className="forgot-pwd-wrapper w-fit text-xs text-muted-foreground underline  hover:cursor-pointer hover:text-secondary-foreground">
            <Link href={"/auth/recovery"}>
              <p>Forgot Passowrd ?</p>
            </Link>
          </div>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
      {/* <GoogleAuthBtn /> */}
    </div>
  );
}

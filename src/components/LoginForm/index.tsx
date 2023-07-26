import React, { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@geist-ui/core";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn(
        "credentials",
        {
          redirect: false,
          email: formValue.email,
          password: formValue.password,
          callbackUrl
        }
      );

      setLoading(false);
      if(!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormValue({...formValue, [name]: value});
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          required
          type="email"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          required
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Senha"
        />
      </div>

      <button type="submit" disabled={loading}>{loading ? "Carregando..." : "Entrar"}</button>
    </form>
  );
}

export default LoginForm;

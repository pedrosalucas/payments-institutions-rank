import React, { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { register } from "@/services/register";

const RegisterForm = () => {
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
      const res = await register(formValue);

      setLoading(false);
      if(!res?.error) {
        router.push(`/login?callbackUrl=${callbackUrl}`);
      } else {
        if(res?.error) {
          setError(res?.error);
        } else {
          setError("Erro ao cadastrar usuário.");
        }
      }
    } catch (err: any) {
      setError("Dados inválidos.");
      setLoading(false);
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

      <button type="submit" disabled={loading}>{loading ? "Carregando..." : "Cadastrar"}</button>
    </form>
  );
}

export default RegisterForm;

import React, { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from '@/styles/Perguntas.module.css'
import {FormElement, Input} from '@nextui-org/react'

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

  const handleChange = (e: ChangeEvent<FormElement>) => {
    const {name, value} = e.target;
    setFormValue({...formValue, [name]: value});
  }

  return (
    <div className={styles.flexmid}>
      <div className={styles.signin}>
        <Input
          required
          type="email"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          clearable
          label="Email"
          placeholder="Seu email...."
          size="xl" width="100%"
        />
        <Input.Password
          required
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          label="Senha"
          placeholder="Sua Senha...."
          size="xl" width="100%"
        />

        <button type="submit" onClick={handleSubmit} disabled={loading}>{loading ? "Carregando..." : "Entrar"}</button>
      </div>
    </div>
  );
}

export default LoginForm;

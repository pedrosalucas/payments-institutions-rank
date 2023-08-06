import React, { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from '@/styles/Auth.module.css';
import { register } from "@/services/register";
import {Button, FormElement, Input, Spacer} from '@nextui-org/react';

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

      console.log(res);
      setLoading(false);
      if(!res?.error) {
        // router.push(callbackUrl);
      } else {
        setError("invalid");
      }
    } catch (err: any) {
      setLoading(false);
      setError(err);
    }
  };

  const handleChange = (event: ChangeEvent<FormElement>) => {
    const {name, value} = event.target;
    setFormValue({...formValue, [name]: value});
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginbox}>
        <h1>Cadastro</h1>

        <form onSubmit={handleSubmit}>
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

          <Spacer y={1}/>
          <p>
            Já possui uma conta? <a href="../login"> Faça o Login.</a>
          </p>
          <Spacer y={1}/>

          <Button type="submit" size="lg" disabled={loading}>{loading ? "Carregando..." : "Cadastrar"}</Button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;

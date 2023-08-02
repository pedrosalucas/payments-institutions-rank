import React, { ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { register } from "@/services/register";
import {Button, FormElement, Input, Spacer} from '@nextui-org/react';
import styles from '@/styles/Auth.module.css';

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('/')

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

  const handleChange = (e: ChangeEvent<FormElement>) => {
    const {name, value} = e.target;
    setFormValue({...formValue, [name]: value});
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.loginbox}>
          <h1>Cadastro</h1>
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
          <Button  size='lg' disabled={loading}>{loading ? "Carregando..." : "Cadastrar"}</Button>
        </div>
      </div>

      
    </form>
  );
}

export default RegisterForm;

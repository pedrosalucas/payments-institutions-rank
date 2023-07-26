import React from 'react'
import styles from '@/styles/Perguntas.module.css'
import {Input, Spacer} from '@nextui-org/react'

export default function login() {
  return (
    <div className={styles.flexmid}>
      
      <div className={styles.signin}>
          <h2>Bem Vindo ao PIR</h2>
          <Input clearable label="Email" placeholder="Seu email...." size='xl' width='100%'/>
          <Input.Password label='Senha' placeholder='Sua Senha....' size='xl' width='100%'/>
      </div>
    </div>
  )
}

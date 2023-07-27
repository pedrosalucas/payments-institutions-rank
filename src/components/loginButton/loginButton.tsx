import React from 'react';
import Link from 'next/link';
import router from 'next/router';

const LoginButton = () => {
  return (
    <div>
      
    <a href="#" onClick={() => router.push('/login')}>Login</a>  
    <a> / </a>
    <a href="#" onClick={() => router.push('/cadastro')}>Cadastrar</a>
      
    </div>
  );
};

export default LoginButton;
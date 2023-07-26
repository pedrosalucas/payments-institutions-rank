import { Button, Text } from "@geist-ui/core";
import { useRouter } from "next/navigation";


const UnauthorizedMessage = () => {
  const router = useRouter();

  return (
    <div>
      <Text h1 style={{ letterSpacing: '0.6px', marginBottom: '30px' }}>
        <Text span >
          Você não tem autorização para acessar essa página.
        </Text>
      </Text>

      <Text h1 style={{ letterSpacing: '0.6px', marginBottom: '10px'}}>
        Realize o Login ou Cadastre-se:
      </Text>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Button onClick={() => router.push('/login')}>
          Login
        </Button>
        <Text h2 style={{ letterSpacing: '0.6px', margin: '0 10px 0' }}>ou</Text>
        <Button onClick={() => router.push('/register')}>
          Cadastro
        </Button>
      </div>
    </div>
  );
}

export default UnauthorizedMessage;
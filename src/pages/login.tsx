import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function Login() {
  const { data: session } = useSession();
  const router = useRouter()

  if(session) { router.push('/'); }

  return (
    <section>
      <LoginForm />
    </section>
  );
}

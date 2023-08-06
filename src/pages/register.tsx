import RegisterForm from "@/components/RegisterForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Register() {
  const { data: session } = useSession();
  const router = useRouter()

  if(session) { router.push('/'); }

  return (
    <section>
      <RegisterForm />
    </section>
  );
}

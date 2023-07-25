
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import RegisterForm from "@/components/RegisterForm";


export default function Register() {
    // const session = getServerSession(authOptions);
    // const user = session?.user;

    // {(user && user?.email) ? user?.email : "Not logged in"} 
  return (
    <section>
      <RegisterForm />
    </section>
  );
}

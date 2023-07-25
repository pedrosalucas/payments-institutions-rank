
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import LoginForm from "@/components/LoginForm";


export default function Login() {
    // const session = getServerSession(authOptions);
    // const user = session?.user;

    // {(user && user?.email) ? user?.email : "Not logged in"} 
  return (
    <section>
      <LoginForm />
    </section>
  );
}

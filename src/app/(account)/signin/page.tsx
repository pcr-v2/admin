import SigninForm from "@/app/(account)/signin/SigninForm";
import getMe from "@/app/(account)/signin/getMe";

export default function SigninPage() {
  const res = getMe();
  return <SigninForm />;
}

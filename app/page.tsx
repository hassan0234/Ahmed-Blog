import FormValidator from "@/components/clients/Form";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="container p-24">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <FormValidator />
      <h1>Hello</h1>
    </div>
  );
};

export default Page;

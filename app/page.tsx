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
    </div>
  );
};

export default Page;

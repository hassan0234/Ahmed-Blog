import { UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="container p-24">
      <h1>Dashboard</h1>
      <UserButton />
    </div>
  );
};

export default Page;

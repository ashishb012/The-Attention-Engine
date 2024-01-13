import { UserButton } from "@clerk/nextjs";
const LandingPage = () => {
  return (
    <div>
      <p>Landing Page</p>
      <UserButton afterSignOutUrl="/"></UserButton>
    </div>
  );
};
export default LandingPage;

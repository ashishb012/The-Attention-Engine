import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div>
      <p>Landing Page</p>
      <Button>C</Button>
      <UserButton afterSignOutUrl="/"></UserButton>
    </div>
  );
};
export default LandingPage;

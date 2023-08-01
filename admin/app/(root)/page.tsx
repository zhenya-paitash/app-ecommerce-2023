import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const SetupPage = () => (
  <div className="p-4">
    {/* <Button size="default" variant="destructive">Click me</Button> */}
    <UserButton afterSignOutUrl="/" />
    <h1 className="pt-8">This is protected route</h1>
  </div>
);

export default SetupPage;

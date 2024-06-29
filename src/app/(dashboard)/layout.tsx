import Navbar from "@/components/navbar";
// import { Sidebar } from "@/components/sidebar";
import { MobileSidebar } from "@/components/mobile-sidebar";
// import { checkSubscription } from "@/lib/subscription";
// import { getApiLimitCount } from "@/lib/api-limit";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  // const apiLimitCount = await getApiLimitCount();
  // const isPro = await checkSubscription();

  return (
    <div className="relative h-full">
      {/* <div className="h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80"> */}
      {/* <MobileSidebar /> */}
      {/* // isPro={isPro} apiLimitCount={apiLimitCount} */}

      {/* </div> */}
      <main className="pb-10 ">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

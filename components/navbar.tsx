import { UserButton } from '@clerk/nextjs';

import MobileSidebar from '@/components/mobile-sidebar';
import { getApiLimitCount } from '@/lib/api-limit';

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();

  return (
    <nav className="flex items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;

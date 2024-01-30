'use client';

import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="py-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-16 w-36 mr-4">
          <Image fill alt="pentaflow logo" src="/logo.svg" />
        </div>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button variant="outline" className="rounded">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;

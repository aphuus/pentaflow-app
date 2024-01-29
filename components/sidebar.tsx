'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { FreeCounter } from '@/components/free-counter';

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-primary'
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-primary'
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: 'text-primary'
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video',
    color: 'text-primary'
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: 'text-primary'
  },
  {
    label: 'Code Generation',
    icon: Code,
    href: '/code',
    color: 'text-primary'
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    color: 'text-primary'
  }
];

interface SidebarProps {
  apiLimitCount: number;
}

const Sidebar = ({ apiLimitCount }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-[5%] flex flex-col h-full bg-gray-900 text-white border-0">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className=" flex items-center mb-14">
          <div className="relative w-36 h-full mr-4 px-3">
            <Image width={643.55} height={135.68} alt="pentaflow logo" src="/logo.svg" />
          </div>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                'text-sm flex p-3 w-full justify-start font-medium cursor-pointer hover:text-secondary hover:bg-secondary/10 rounded transition',
                pathname === route.href ? 'text-white bg-white/10' : 'text-gray-400'
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={cn(
                    'h-5 w-5 mr-3',
                    pathname === route.href ? 'text-white' : route.color
                  )}
                />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;

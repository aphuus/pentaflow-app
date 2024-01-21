'use client';

import { ArrowRight, Code, Image, MessageSquare, Music, VideoIcon } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    href: '/conversation'
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    href: '/music'
  },
  {
    label: 'Image Generation',
    icon: Image,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    href: '/image'
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    href: '/video'
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    href: '/code'
  }
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="px-[5%]">
      <div className="mb-8 space-y-4">
        <h2 className="text-xl md:text-2xl font-medium text-center">Explore the power of AI</h2>
        <p className="text-muted-foreground text-sm md:text-md text-center">
          Chat with the smartest AI - Experience the power of Artificial Intelligence
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn('p-2 w-fit rounded', tool.bgColor)}>
                <tool.icon className={cn('w-4 h-4 md:w-6 md:h-6', tool.color)} />
              </div>
              <div className="font-regular">{tool.label}</div>
            </div>
            <ArrowRight className="w-4 h-4" />
          </Card>
        ))}
      </div>
    </div>
  );
}

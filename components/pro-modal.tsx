'use client';

import axios from 'axios';
import { useState } from 'react';
import { Check, Code, Image, MessageSquare, Music, VideoIcon, Zap } from 'lucide-react';

import { useProModal } from '@/hooks/use-pro-modal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    label: 'Image Generation',
    icon: Image,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  }
];

const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      console.log('[STRIPE_CLIENT_ERROR]: ', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-medium">
              Upgrade Pentaflow
              <Badge variant="premium" className="uppercase text-xs py-1">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-black font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="p-3 border-primary/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn('p-2 w-fit rounded', tool.bgColor)}>
                    <tool.icon className={cn('w-4 h-4', tool.color)} />
                  </div>
                  <div className="font-medium text-sm">{tool.label}</div>
                </div>
                <Check className="w-4 h-4 text-primary/60" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button onClick={onSubscribe} size="lg" className="w-full" variant="premium">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;

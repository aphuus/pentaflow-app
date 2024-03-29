'use client';

import axios from 'axios';
import * as z from 'zod';
import { MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import Heading from '@/components/heading';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/user-avatar';
import BotAvatar from '@/components/bot-avatar';
import { useProModal } from '@/hooks/use-pro-modal';

import { formSchema } from './constants';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const ConversationPage = () => {
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ''
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatMessage = {
        role: 'user',
        content: values.prompt
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/conversation', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error('Something went wrong!');
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="The most advanced conversation model with AI"
        icon={MessageSquare}
        iconColor="text-primary"
        bgColor="bg-primary/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        placeholder="Start your conversation..."
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <div>
              <Empty label="There are no conversations!" />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'p-6 w-full flex items-start gap-x-4 rounded',
                  message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted'
                )}
              >
                {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;

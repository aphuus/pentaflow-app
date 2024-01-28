'use client';

import axios from 'axios';
import * as z from 'zod';
import { Music } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

import Heading from '@/components/heading';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';

import { formSchema } from './constants';

const MusicPage = () => {
  const [music, setMusic] = useState<string>();
  const [spectrogram, setSpectrogram] = useState<string>();
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
      setMusic(undefined);
      setSpectrogram(undefined);

      const response = await axios.post('/api/music', values);

      setMusic(response.data.audio);
      setSpectrogram(response.data.spectrogram);

      form.reset();
    } catch (error: any) {
      // TODO: Open Pro Modal
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompt into audible music."
        icon={Music}
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
                        placeholder="Piano solo in E-minor scale..."
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
          {!music && !isLoading && (
            <div>
              <Empty label="No audible music generated!" />
            </div>
          )}
          {music && (
            <audio loop controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
          {spectrogram && (
            <div className="mt-8">
              <Image
                className="rounded"
                src={spectrogram}
                alt="Spectrogram"
                width={250}
                height={250}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;

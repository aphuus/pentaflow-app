import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const testimonials = [
  {
    name: 'John Doe',
    title: 'CEO & Co-Founder',
    image:
      'https://images.unsplash.com/photo-1639747279286-c07eecb47a0b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
  },
  {
    name: 'David Miller',
    title: 'Software Engineer',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
  },
  {
    name: 'Angelie Smith',
    title: 'Web Designer',
    image:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
  },
  {
    name: 'Anastasia Denisova',
    title: 'Social Media Marketer',
    image:
      'https://images.unsplash.com/photo-1521252659862-eec69941b071?q=80&w=1872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    quote: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
  }
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-semibold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name} className="bg-gray-800 border-none text-white">
            <CardHeader>
              <CardTitle className="flex gap-y-3 flex-col">
                <Image
                  width={150}
                  height={150}
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-lg">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">"{testimonial.quote}"</CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;

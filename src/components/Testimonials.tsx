
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "This scan revealed my photos on sites I never knew existed. I was able to get them removed quickly.",
    author: "Maria K.",
    role: "Digital Privacy Advocate",
    initials: "MK"
  },
  {
    quote: "As someone in the public eye, I need to know where my image appears. Past Scanner delivers precisely that.",
    author: "Thomas L.",
    role: "Content Creator",
    initials: "TL"
  },
  {
    quote: "Found my old accounts I'd completely forgotten about. Now my digital footprint is much cleaner.",
    author: "Sarah J.",
    role: "Cybersecurity Professional",
    initials: "SJ"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Users Are Saying</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Past Scanner has helped thousands secure their online presence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl p-8 bg-card border border-border hover:border-neon-purple/50 
                      hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300"
            >
              <div className="mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="36" className="text-neon-purple opacity-40">
                  <path fill="currentColor" d="M13.415.43c-2.523-.21-4.694.465-6.655 2.022C4.813 4.013 3.682 6.025 3.5 8.215c-.198 2.017.31 4.162 1.09 6.244 1.479 3.943 3.436 7.568 6.166 10.908a34.638 34.638 0 0011.043 9.196l2-.835c-1.975-2.103-3.65-4.542-5.01-7.18a22.477 22.477 0 01-2.396-8.4c-.257-4.27 1.12-8.085 3.92-10.785 3.448-3.318 8.257-4.384 12.914-4.735-1.781-1.169-3.166-1.835-4.723-2.1C27.121.453 25.654.22 24.182.108a40.478 40.478 0 00-10.767.322zm20.193 0c-2.524-.21-4.694.465-6.656 2.022-1.946 1.562-3.076 3.574-3.258 5.764-.198 2.017.31 4.162 1.09 6.244 1.48 3.943 3.436 7.568 6.167 10.908a34.635 34.635 0 0011.042 9.196l2-.835c-1.974-2.103-3.65-4.542-5.01-7.18a22.477 22.477 0 01-2.396-8.4c-.258-4.27 1.12-8.085 3.92-10.785 3.448-3.318 8.257-4.384 12.914-4.735-1.78-1.169-3.166-1.835-4.722-2.1-1.382-.265-2.85-.5-4.32-.61a40.485 40.485 0 00-10.77.321z"></path>
                </svg>
              </div>
              <p className="mb-8 text-lg">{testimonial.quote}</p>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3 border border-neon-purple/30">
                  <AvatarFallback className="bg-neon-purple/20 text-neon-purple">{testimonial.initials}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

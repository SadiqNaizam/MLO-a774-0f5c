import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { cn } from '@/lib/utils'; // Assuming utils.ts contains the cn function
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Form components from Shadcn UI for react-hook-form integration
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  // FormLabel, // Not rendered to match visual; placeholders are used as primary cues.
} from '@/components/ui/form';

// Zod schema for form validation
const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

// Infer TypeScript type from Zod schema
type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  className?: string;
  onLoginSuccess?: (data: LoginFormValues) => void;
  // onNavigateToSignUp?: () => void; // Optional: if sign up navigation is handled by parent
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onLoginSuccess }) => {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  // Initialize react-hook-form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsSubmitting(true);
    console.log("Login form submitted:", data);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      // On successful login:
      if (onLoginSuccess) {
        onLoginSuccess(data);
      }
      // Example: alert(`Login successful for ${data.username}`);
      // form.reset(); // Optionally reset form fields
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login errors (e.g., display error message to user)
      form.setError("root", { type: "server", message: "Invalid username or password." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpClick = React.useCallback(() => {
    // Placeholder action, could be passed as a prop e.g., onNavigateToSignUp()
    console.log("Navigate to sign up page");
  }, []);

  return (
    // This div represents the card itself, styled according to Layout Requirements
    <div className={cn(
      "w-[350px] p-8 bg-card text-card-foreground rounded-lg shadow-lg",
      className
    )}>
      <Form {...form}>
        {/* The form's internal layout: vertical flex with gaps */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Heading element */}
          <h1 className="text-3xl font-bold text-card-foreground">
            Log in
          </h1>
          
          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel className="sr-only">Username</FormLabel> */}
                <FormControl>
                  <Input 
                    type="text" 
                    placeholder="Username" 
                    {...field} 
                    // Ensure input background matches card, and placeholder color is correct.
                    // Default Shadcn styles for border and focus ring will use CSS variables.
                    className="bg-card placeholder:text-muted-foreground"
                  />
                </FormControl>
                <FormMessage className="text-destructive text-xs" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel className="sr-only">Password</FormLabel> */}
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    {...field} 
                    className="bg-card placeholder:text-muted-foreground"
                  />
                </FormControl>
                <FormMessage className="text-destructive text-xs" />
              </FormItem>
            )}
          />

          {/* Root form error message (e.g., for invalid credentials from server) */}
          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
          
          {/* CTA Button: Log in */}
          <Button 
            type="submit" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </Button>

          {/* Secondary Link: Sign up */}
          <div className="text-center">
            <Button
              variant="link"
              type="button" // Ensure it's not a submit button
              className="text-sm text-muted-foreground hover:text-primary p-0 h-auto"
              onClick={handleSignUpClick}
            >
              or, sign up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;

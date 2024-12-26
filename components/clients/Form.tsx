"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { formAction } from "@/actions/formAction";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email(),
  age: z
    .number()
    .min(18, {
      message: "You must be at least 18 years old.",
    })
    .optional(),
  MatricPass: z.boolean().default(false).optional(),
});

export default function FormValidator() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      MatricPass: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    interface Res {
      success: boolean;
      message: string;
    }
    const res: any = await formAction(values);
    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>This is your public email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  placeholder="age"
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? undefined : Number(e.target.value)
                    )
                  }
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>This is your public age.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="MatricPass"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>MatricPass</FormLabel>
              </div>
              <FormDescription>
                This is your public matric pass.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

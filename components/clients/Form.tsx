"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { formAction } from "@/actions/formAction";
import ImageUploader from "@/components/clients/imageKit/Upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Image from "./imageKit/Image";
import toast from "react-hot-toast";

const postFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content cannot exceed 5000 characters"),
});

type PostFormValues = z.infer<typeof postFormSchema>;

export function PostForm() {
  const [imageUrl, setImageUrl] = useState("");

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(data: PostFormValues) {
    try {
      const dataValues = { ...data, imageUrl };
      const res: any = await formAction(dataValues);
      if (!res.success) {
        throw new Error(res.message)
      }
      toast.success("Post created successfully!");
      form.reset();
      setImageUrl("");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const handleImageUpload = (filepath: any) => {
    setImageUrl(filepath);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl mx-auto p-6"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your post title"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your post content here..."
                    className="min-h-[200px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <ImageUploader onImageUpload={handleImageUpload} />
            {imageUrl && (
              <>
                <div className="relative aspect-auto w-full max-w-xl mx-auto overflow-hidden rounded-lg">
                  <Image
                    path={imageUrl}
                    alt="Uploaded image"
                    width={500}
                    height={500}
                    lqip={{ active: true, quality: 10, blur: 20 }}
                    className="object-cover"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full md:w-auto" size="lg">
          Create Post
        </Button>
      </form>
    </Form>
  );
}

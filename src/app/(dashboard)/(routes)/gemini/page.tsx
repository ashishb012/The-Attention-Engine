"use client";

import * as z from "zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useChat } from "ai/react";
import { FormEvent } from "react";

import { BotAvatar } from "@/components/bot-avatar";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { Empty } from "@/components/empty";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProModal } from "@/hooks/use-pro-modal";

import { formSchema } from "./constants";

export default function Chat() {
  const router = useRouter();
  const proModal = useProModal();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/gemini",
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      handleSubmit(e);
      form.reset();
    } catch (error: any) {
      console.log(error);
      if (error?.message === "Free trial has expired. Please upgrade to pro.") {
        proModal.onOpen();
      } else if (error?.message === "Google Gemini API Key not configured.") {
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  return (
    <div>
      <Heading
        title="Conversation"
        description="Gemini advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <div className="mt-4 space-y-4">
        {isLoading && (
          <div className="flex items-center justify-center w-full p-8 rounded-lg bg-muted">
            <Loader />
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <Empty label="No conversation started." />
        )}
        <div className="flex flex-col gap-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                message.role === "user"
                  ? "bg-white border border-black/10"
                  : "bg-muted"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <ReactMarkdown
                components={{
                  pre: ({ node, ...props }) => (
                    <div className="w-full p-2 my-2 overflow-auto rounded-lg bg-black/10">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code className="p-1 rounded-lg bg-black/10" {...props} />
                  ),
                }}
                className="overflow-hidden text-sm leading-7"
              >
                {message.content || ""}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              autoComplete="off"
              className="grid w-full grid-cols-12 gap-2 p-4 px-3 border border-black rounded-lg  md:px-6 focus-within:shadow-lg dark:border-white"
            >
              <FormField
                name="prompt"
                render={() => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        onChange={handleInputChange}
                        value={input}
                        autoCorrect="off"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="w-full col-span-12 text-white lg:col-span-2"
                type="submit"
                disabled={isLoading}
                size="icon"
                onSubmit={() => {
                  if (input === "") {
                    toast.error("Please enter a prompt.");
                  }
                }}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

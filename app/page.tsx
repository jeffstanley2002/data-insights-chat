"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Send, Bot, User, RefreshCw, BrainCircuit } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { DataSummary } from "@/components/data-summary";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading,error } = useChat({
    onError: (error) => {
      console.error('Chat Error:', error);
      // Show error toast or message
    },
  });
  const [showWelcome, setShowWelcome] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string| null>(null);

  const onSubmit = async (e: React.FormEvent)=> {
    e.preventDefault();
    setErrorMessage(null);

    if (!input.trim()) {
      setErrorMessage('Please enter a question');
      return;
    }

    try {
      await handleSubmit(e);
    } catch (error) {
      setErrorMessage('Failed to get response. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted">
      {/* Navigation Bar */}
      <nav className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="flex h-16 items-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="font-semibold">AI-Powered Data Insights</span>
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="flex-1 py-4 px-4">
        <Card className="mx-auto max-w-4xl border-none bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 p-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Student Insights Dashboard</h1>
            <p className="text-muted-foreground max-w-lg">
            Unlock actionable insights into student stress, mental health, and well-being using AI-powered analytics
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
            <Badge variant="outline">Academic Analytics</Badge>
            <Badge variant="outline">Mental Health Trends</Badge>
            <Badge variant="outline">Support Strategies</Badge>
            </div>
          </div>

          {/* Add DataSummary here */}
          <DataSummary />

          {/* Chat Interface */}
          <div className="p-4 md:p-6 space-y-4">
            {/* Welcome Message */}
            {showWelcome && messages.length === 0 && (
              <Card className="bg-primary/5 border-primary/10">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Bot className="h-8 w-8 text-primary" />
                    <h2 className="text-xl font-semibold">Welcome to Your AI-Powered Insights Companion</h2>
                    </div>
                  <p className="text-muted-foreground mb-4">
                  Explore patterns in student stress and mental health with AI. Start by asking questions like:
                  </p>
                  <div className="grid gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="h-6">1</Badge>
                      "What are the most common sources of academic stress?"
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="h-6">2</Badge>
                      "How many students rated their mental health below 5?"
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="h-6">3</Badge>
                      "What strategies are most used to manage stress?"
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="h-6">4</Badge>
                      "What support services do students want?"
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Messages */}
            <ScrollArea className="h-[500px] pr-4 rounded-lg">
              <div className="flex flex-col gap-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-3 ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {m.role !== "user" && (
                      <Avatar className="h-8 w-8 border bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] shadow-sm ${
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50"
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">{m.content}</div>
                    </div>
                    {m.role === "user" && (
                      <Avatar className="h-8 w-8 border bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && messages.length > 0 && (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </Avatar>
                    <div className="bg-muted/50 rounded-lg px-4 py-2 max-w-[80%] shadow-sm">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">
                {errorMessage}
              </div>
            )}

            {/* Input Form */}
            <div className="border-t pt-4 mt-4">
              <form
                onSubmit={onSubmit}
                className="flex items-center gap-2"
              >
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask AI to uncover trends in student well-being and stress patterns..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="shadow-sm"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Send
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

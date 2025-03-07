"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, Settings, LogOut, Info, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState([
    { id: 1, title: "Website design help", date: "Mar 5" },
    { id: 2, title: "JavaScript debugging", date: "Mar 4" },
    { id: 3, title: "React component structure", date: "Mar 3" },
  ])
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [router, user]);

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/");
  }

  const handleNewChat = () => {
    const newConversation = {
      id: conversations.length + 1,
      title: "New conversation",
      date: "Today",
    }
    setConversations([newConversation, ...conversations])
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-4">
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleNewChat}>
            <PlusCircle className="h-4 w-4" />
            New chat
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="px-4 py-2">
            <h2 className="text-sm font-medium text-muted-foreground mb-2">Recent conversations</h2>
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <Button key={conversation.id} variant="ghost" className="w-full justify-start text-left h-auto py-3">
                  <div>
                    <div className="font-medium text-sm truncate">{conversation.title}</div>
                    <div className="text-xs text-muted-foreground">{conversation.date}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                {user?.charAt(0)}
              </div>
              <div className="text-sm font-medium">{user}</div>
            </div>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Account
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  )
}

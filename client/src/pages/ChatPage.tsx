import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import ConversationItem from "@/components/ConversationItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PanelLeft, Search, Plus } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
}

export default function ChatPage({ userType }: { userType: "internal" | "client" }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeConversation, setActiveConversation] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");

  const mockConversations: Conversation[] = [
    {
      id: "1",
      title: "Investment Account Features",
      preview: "What are the key features of our premium investment...",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      title: "Compliance Review Fees",
      preview: "Can you explain the fee structure for internal...",
      timestamp: "Yesterday",
    },
    {
      id: "3",
      title: "Market Analysis Q4 2024",
      preview: "Provide a comprehensive market analysis...",
      timestamp: "3 days ago",
    },
  ];

  const mockMessages: Message[] = [
    {
      id: "1",
      role: "user",
      content: "What are the key features of our premium investment account?",
      timestamp: "2:34 PM",
    },
    {
      id: "2",
      role: "assistant",
      content: "Our premium investment account offers diversified portfolio management, low-fee index funds, automated rebalancing, and dedicated financial advisor access. You'll also get priority customer support and exclusive market insights.",
      timestamp: "2:34 PM",
    },
  ];

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
  };

  return (
    <div className="flex h-full" data-testid="page-chat">
      {showSidebar && (
        <div className="w-80 border-r flex flex-col bg-card">
          <div className="p-4 border-b space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Conversations</h2>
              <Button size="icon" variant="ghost" data-testid="button-new-conversation">
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search-conversations"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                {...conv}
                isActive={activeConversation === conv.id}
                onClick={() => setActiveConversation(conv.id)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!showSidebar && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowSidebar(true)}
                data-testid="button-toggle-sidebar"
              >
                <PanelLeft className="w-5 h-5" />
              </Button>
            )}
            <div>
              <h1 className="font-semibold">Investment Account Features</h1>
              <p className="text-xs text-muted-foreground">Active conversation</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {mockMessages.map((msg) => (
              <ChatMessage
                key={msg.id}
                role={msg.role}
                content={msg.content}
                timestamp={msg.timestamp}
                userType={userType}
              />
            ))}
          </div>
        </div>

        <ChatInput
          onSend={handleSendMessage}
          showAttachment={userType === "internal"}
        />
      </div>
    </div>
  );
}

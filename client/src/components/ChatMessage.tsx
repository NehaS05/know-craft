import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  userType?: "internal" | "client";
}

export default function ChatMessage({ role, content, timestamp, userType }: ChatMessageProps) {
  const isUser = role === "user";
  const isSystem = role === "system";

  if (isSystem) {
    return (
      <div className="mx-auto max-w-md text-center p-3 mb-4">
        <p className="text-sm text-muted-foreground italic">{content}</p>
        <p className="text-xs text-muted-foreground mt-1">{timestamp}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "mb-4 flex gap-3 max-w-2xl",
        isUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
      data-testid={`message-${role}`}
    >
      <Avatar className="w-10 h-10 flex-shrink-0">
        <AvatarFallback className={cn(
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl p-4",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-card border border-card-border rounded-bl-none"
          )}
        >
          <p className="text-lg leading-relaxed">{content}</p>
        </div>
        <div className="flex items-center gap-2 px-2">
          <p className="text-xs text-muted-foreground">{timestamp}</p>
          {isUser && userType && (
            <span className="text-xs uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {userType}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

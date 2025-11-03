import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

interface ConversationItemProps {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  isActive?: boolean;
  onClick: () => void;
}

export default function ConversationItem({
  id,
  title,
  preview,
  timestamp,
  isActive = false,
  onClick,
}: ConversationItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 border-b flex items-start gap-3 text-left transition-colors hover-elevate",
        isActive && "bg-accent"
      )}
      data-testid={`conversation-item-${id}`}
    >
      <MessageSquare className="w-5 h-5 mt-1 flex-shrink-0 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm mb-1 truncate">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{preview}</p>
        <p className="text-xs text-muted-foreground mt-1">{timestamp}</p>
      </div>
    </button>
  );
}

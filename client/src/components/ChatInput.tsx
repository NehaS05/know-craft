import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  showAttachment?: boolean;
}

export default function ChatInput({ onSend, isLoading = false, showAttachment = false }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="sticky bottom-0 p-4 border-t bg-background" data-testid="input-chat">
      <div className="max-w-4xl mx-auto relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question..."
          className="min-h-12 pr-24 resize-none"
          disabled={isLoading}
          data-testid="textarea-message"
        />
        <div className="absolute right-2 bottom-2 flex gap-2">
          {showAttachment && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => console.log("Attachment clicked")}
              data-testid="button-attachment"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
          )}
          <Button
            size="icon"
            onClick={handleSubmit}
            disabled={!message.trim() || isLoading}
            data-testid="button-send"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-right mt-1 max-w-4xl mx-auto">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}

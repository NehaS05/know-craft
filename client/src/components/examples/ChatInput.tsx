import ChatInput from "../ChatInput";

export default function ChatInputExample() {
  return (
    <div className="h-96 flex flex-col bg-background">
      <div className="flex-1" />
      <ChatInput
        onSend={(msg) => console.log("Message sent:", msg)}
        showAttachment={true}
      />
    </div>
  );
}

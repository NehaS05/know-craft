import ChatMessage from "../ChatMessage";

export default function ChatMessageExample() {
  return (
    <div className="p-6 space-y-4 bg-background">
      <ChatMessage
        role="user"
        content="What are the key features of our premium investment account?"
        timestamp="2:34 PM"
        userType="client"
      />
      <ChatMessage
        role="assistant"
        content="Our premium investment account offers diversified portfolio management, low-fee index funds, automated rebalancing, and dedicated financial advisor access. You'll also get priority customer support and exclusive market insights."
        timestamp="2:34 PM"
      />
      <ChatMessage
        role="user"
        content="Can you explain the fee structure for internal compliance reviews?"
        timestamp="3:15 PM"
        userType="internal"
      />
      <ChatMessage
        role="assistant"
        content="For internal compliance reviews, we follow a tiered structure: Basic reviews are $500, comprehensive audits are $2,000, and full regulatory assessments are $5,000. All fees include documentation and follow-up consultations."
        timestamp="3:15 PM"
      />
    </div>
  );
}

import ConversationItem from "../ConversationItem";
import { useState } from "react";

export default function ConversationItemExample() {
  const [activeId, setActiveId] = useState("1");

  return (
    <div className="w-80 bg-background border rounded-lg overflow-hidden">
      <ConversationItem
        id="1"
        title="Investment Account Features"
        preview="What are the key features of our premium investment..."
        timestamp="2 hours ago"
        isActive={activeId === "1"}
        onClick={() => setActiveId("1")}
      />
      <ConversationItem
        id="2"
        title="Compliance Review Fees"
        preview="Can you explain the fee structure for internal..."
        timestamp="Yesterday"
        isActive={activeId === "2"}
        onClick={() => setActiveId("2")}
      />
      <ConversationItem
        id="3"
        title="Market Analysis Q4 2024"
        preview="Provide a comprehensive market analysis for the fourth..."
        timestamp="3 days ago"
        isActive={activeId === "3"}
        onClick={() => setActiveId("3")}
      />
    </div>
  );
}

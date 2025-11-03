import AuditLogTable from "../AuditLogTable";

export default function AuditLogTableExample() {
  const mockLogs = [
    {
      id: "1",
      timestamp: "2024-11-03 14:32:15",
      user: "john.doe@nocraft.com",
      role: "internal",
      queryPreview: "What are the compliance requirements for Q4 2024?",
      responsePreview: "The Q4 2024 compliance requirements include updated KYC procedures, enhanced AML monitoring...",
    },
    {
      id: "2",
      timestamp: "2024-11-03 14:28:42",
      user: "client_acme_corp",
      role: "client",
      queryPreview: "How do I access my investment portfolio dashboard?",
      responsePreview: "You can access your investment portfolio dashboard by logging into your account...",
    },
    {
      id: "3",
      timestamp: "2024-11-03 14:15:33",
      user: "sarah.johnson@nocraft.com",
      role: "internal",
      queryPreview: "Generate a market analysis report for technology sector",
      responsePreview: "Technology Sector Analysis: The sector has shown strong growth with a 15% increase...",
    },
  ];

  return (
    <div className="p-6 bg-background">
      <AuditLogTable logs={mockLogs} onViewDetails={(id) => console.log("View details:", id)} />
    </div>
  );
}

import KnowledgeBaseUpload from "@/components/KnowledgeBaseUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Globe } from "lucide-react";

export default function KnowledgeBasePage() {
  const mockDocuments = [
    { id: "1", title: "Q4 2024 Compliance Guide", category: "Compliance", accessLevel: "Internal" },
    { id: "2", title: "Investment Product Catalog", category: "Products", accessLevel: "Client" },
    { id: "3", title: "Risk Management Procedures", category: "Operations", accessLevel: "Internal" },
    { id: "4", title: "Account Opening Guide", category: "Onboarding", accessLevel: "Client" },
  ];

  return (
    <div className="p-6 space-y-6" data-testid="page-knowledge-base">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Knowledge Base Management</h1>
        <p className="text-muted-foreground">Upload and manage documents for AI-powered responses</p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList>
          <TabsTrigger value="upload" data-testid="tab-upload">Upload Documents</TabsTrigger>
          <TabsTrigger value="manage" data-testid="tab-manage">Manage Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6 mt-6">
          <KnowledgeBaseUpload onUpload={(files) => console.log("Uploaded:", files)} />
        </TabsContent>

        <TabsContent value="manage" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {mockDocuments.map((doc) => (
              <Card key={doc.id} className="p-4 flex items-start justify-between gap-4" data-testid={`document-${doc.id}`}>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{doc.title}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">{doc.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {doc.accessLevel === "Internal" ? (
                        <Lock className="w-3 h-3" />
                      ) : (
                        <Globe className="w-3 h-3" />
                      )}
                      <span>{doc.accessLevel}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

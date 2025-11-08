import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { KnowledgeBase } from "@shared/schema";

export default function KnowledgeBasePage() {
  const [items, setItems] = useState<KnowledgeBase[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeBase | null>(null);
  const [formData, setFormData] = useState({
    projectName: "",
    clientName: "",
    uploadedFileName: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/knowledge-base");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch knowledge base items", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      uploadedFileName: selectedFile ? selectedFile.name : formData.uploadedFileName,
    };

    try {
      const url = editingItem ? `/api/knowledge-base/${editingItem.id}` : "/api/knowledge-base";
      const method = editingItem ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        toast({ title: "Success", description: `Item ${editingItem ? 'updated' : 'created'} successfully` });
        setIsDialogOpen(false);
        resetForm();
        fetchItems();
      } else {
        throw new Error("Failed to save item");
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to save item", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      const response = await fetch(`/api/knowledge-base/${id}`, { method: "DELETE" });
      if (response.ok) {
        toast({ title: "Success", description: "Item deleted successfully" });
        fetchItems();
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete item", variant: "destructive" });
    }
  };

  const handleEdit = (item: KnowledgeBase) => {
    setEditingItem(item);
    setFormData({
      projectName: item.projectName,
      clientName: item.clientName,
      uploadedFileName: item.uploadedFileName,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ projectName: "", clientName: "", uploadedFileName: "" });
    setSelectedFile(null);
    setEditingItem(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, uploadedFileName: file.name }));
    }
  };

  return (
    <div className="p-6 space-y-6" data-testid="page-knowledge-base">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Knowledge Base</h1>
          <p className="text-muted-foreground">Manage your project documents and files</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Upload New Data
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Item' : 'Upload New Data'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="fileUpload">File Upload</Label>
                <Input
                  id="fileUpload"
                  type="file"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                {formData.uploadedFileName && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Selected: {formData.uploadedFileName}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                {editingItem ? 'Update' : 'Save'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Uploaded File Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No data available. Click "Upload New Data" to add items.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.projectName}</TableCell>
                  <TableCell>{item.clientName}</TableCell>
                  <TableCell>{item.uploadedFileName}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
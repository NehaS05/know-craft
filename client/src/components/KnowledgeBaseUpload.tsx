import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, X } from "lucide-react";
import { useState } from "react";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
}

interface KnowledgeBaseUploadProps {
  onUpload: (files: File[]) => void;
}

export default function KnowledgeBaseUpload({ onUpload }: KnowledgeBaseUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = selectedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
    }));
    setFiles([...files, ...newFiles]);
    onUpload(selectedFiles);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-4" data-testid="component-knowledge-upload">
      <div className="min-h-48 border-2 border-dashed rounded-lg p-8 text-center hover-elevate transition-colors">
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Upload Knowledge Base Documents</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop files here, or click to browse
        </p>
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
          data-testid="input-file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="default" asChild>
            <span>Select Files</span>
          </Button>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <Card
              key={file.id}
              className="p-3 flex items-center justify-between gap-3"
              data-testid={`file-item-${file.id}`}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeFile(file.id)}
                data-testid={`button-remove-${file.id}`}
              >
                <X className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

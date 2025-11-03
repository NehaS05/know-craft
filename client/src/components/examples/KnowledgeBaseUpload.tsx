import KnowledgeBaseUpload from "../KnowledgeBaseUpload";

export default function KnowledgeBaseUploadExample() {
  return (
    <div className="p-6 max-w-2xl bg-background">
      <KnowledgeBaseUpload onUpload={(files) => console.log("Files uploaded:", files)} />
    </div>
  );
}

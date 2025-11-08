import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertKnowledgeBaseSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Knowledge Base routes
  app.get("/api/knowledge-base", async (req, res) => {
    try {
      const items = await storage.getKnowledgeBaseItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch knowledge base items" });
    }
  });

  app.post("/api/knowledge-base", async (req, res) => {
    try {
      const validatedData = insertKnowledgeBaseSchema.parse(req.body);
      const item = await storage.createKnowledgeBaseItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid data provided" });
    }
  });

  app.put("/api/knowledge-base/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertKnowledgeBaseSchema.partial().parse(req.body);
      const item = await storage.updateKnowledgeBaseItem(id, validatedData);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid data provided" });
    }
  });

  app.delete("/api/knowledge-base/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteKnowledgeBaseItem(id);
      if (!deleted) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete item" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

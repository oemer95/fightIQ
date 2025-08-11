import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFighterSchema, insertAnalysisSchema, insertTrainingSessionSchema, insertPerformanceDataSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Fighter routes
  app.get("/api/fighters", async (req, res) => {
    try {
      const fighters = await storage.getAllFighters();
      res.json(fighters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fighters" });
    }
  });

  app.get("/api/fighters/:id", async (req, res) => {
    try {
      const fighter = await storage.getFighter(req.params.id);
      if (!fighter) {
        return res.status(404).json({ message: "Fighter not found" });
      }
      res.json(fighter);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fighter" });
    }
  });

  app.post("/api/fighters", async (req, res) => {
    try {
      const validatedData = insertFighterSchema.parse(req.body);
      const fighter = await storage.createFighter(validatedData);
      res.status(201).json(fighter);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid fighter data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create fighter" });
    }
  });

  app.put("/api/fighters/:id", async (req, res) => {
    try {
      const validatedData = insertFighterSchema.partial().parse(req.body);
      const fighter = await storage.updateFighter(req.params.id, validatedData);
      if (!fighter) {
        return res.status(404).json({ message: "Fighter not found" });
      }
      res.json(fighter);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid fighter data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update fighter" });
    }
  });

  app.delete("/api/fighters/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteFighter(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Fighter not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete fighter" });
    }
  });

  // Analysis routes
  app.get("/api/fighters/:fighterId/analyses", async (req, res) => {
    try {
      const analyses = await storage.getAnalysesByFighter(req.params.fighterId);
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analyses" });
    }
  });

  app.get("/api/fighters/:fighterId/analysis/latest", async (req, res) => {
    try {
      const analysis = await storage.getLatestAnalysis(req.params.fighterId);
      if (!analysis) {
        return res.status(404).json({ message: "No analysis found for fighter" });
      }
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch latest analysis" });
    }
  });

  app.post("/api/analyses", async (req, res) => {
    try {
      const validatedData = insertAnalysisSchema.parse(req.body);
      const analysis = await storage.createAnalysis(validatedData);
      res.status(201).json(analysis);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid analysis data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create analysis" });
    }
  });

  // Training session routes
  app.get("/api/fighters/:fighterId/training", async (req, res) => {
    try {
      const sessions = await storage.getTrainingSessionsByFighter(req.params.fighterId);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch training sessions" });
    }
  });

  app.post("/api/training", async (req, res) => {
    try {
      const validatedData = insertTrainingSessionSchema.parse(req.body);
      const session = await storage.createTrainingSession(validatedData);
      res.status(201).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid training session data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create training session" });
    }
  });

  app.put("/api/training/:id", async (req, res) => {
    try {
      const validatedData = insertTrainingSessionSchema.partial().parse(req.body);
      const session = await storage.updateTrainingSession(req.params.id, validatedData);
      if (!session) {
        return res.status(404).json({ message: "Training session not found" });
      }
      res.json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid training session data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update training session" });
    }
  });

  // Performance data routes
  app.get("/api/fighters/:fighterId/performance", async (req, res) => {
    try {
      const performanceData = await storage.getPerformanceDataByFighter(req.params.fighterId);
      res.json(performanceData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch performance data" });
    }
  });

  app.post("/api/performance", async (req, res) => {
    try {
      const validatedData = insertPerformanceDataSchema.parse(req.body);
      const data = await storage.createPerformanceData(validatedData);
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid performance data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create performance data" });
    }
  });

  // Generate new analysis using ML models
  app.post("/api/fighters/:fighterId/analyze", async (req, res) => {
    try {
      const fighter = await storage.getFighter(req.params.fighterId);
      if (!fighter) {
        return res.status(404).json({ message: "Fighter not found" });
      }

      // Simulate AI analysis (in a real app, this would call ML models)
      const analysisData = {
        fighterId: req.params.fighterId,
        striking: Math.floor(Math.random() * 30) + 70, // 70-100
        grappling: Math.floor(Math.random() * 40) + 50, // 50-90
        cardio: Math.floor(Math.random() * 30) + 60, // 60-90
        defense: Math.floor(Math.random() * 30) + 65, // 65-95
        aggression: Math.floor(Math.random() * 35) + 60, // 60-95
        technique: Math.floor(Math.random() * 25) + 70, // 70-95
        overallScore: 0,
        strengths: [] as string[],
        weaknesses: [] as string[],
        recommendations: [] as string[]
      };

      // Calculate overall score
      analysisData.overallScore = Math.round(
        (analysisData.striking + analysisData.grappling + analysisData.cardio + 
         analysisData.defense + analysisData.aggression + analysisData.technique) / 6
      );

      // Generate strengths, weaknesses, and recommendations based on scores
      const skillsMap = {
        striking: analysisData.striking,
        grappling: analysisData.grappling,
        cardio: analysisData.cardio,
        defense: analysisData.defense,
        aggression: analysisData.aggression,
        technique: analysisData.technique
      };

      Object.entries(skillsMap).forEach(([skill, score]) => {
        if (score >= 80) {
          analysisData.strengths.push(`Excellent ${skill} performance`);
        } else if (score < 65) {
          analysisData.weaknesses.push(`${skill.charAt(0).toUpperCase() + skill.slice(1)} needs improvement`);
          analysisData.recommendations.push(`Focus on ${skill} training with additional sessions`);
        }
      });

      if (analysisData.strengths.length === 0) {
        analysisData.strengths.push("Balanced skill set across all areas");
      }

      if (analysisData.recommendations.length === 0) {
        analysisData.recommendations.push("Continue current training regimen with minor adjustments");
      }

      const analysis = await storage.createAnalysis(analysisData);
      res.status(201).json(analysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate analysis" });
    }
  });

  // Dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const fighters = await storage.getAllFighters();
      const allAnalyses = [];
      
      for (const fighter of fighters) {
        const analyses = await storage.getAnalysesByFighter(fighter.id);
        allAnalyses.push(...analyses);
      }

      const stats = {
        activeFighters: fighters.length,
        completedAnalyses: allAnalyses.length,
        avgImprovement: "+23%", // Simulated metric
        aiAccuracy: "94.2%" // Simulated metric
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

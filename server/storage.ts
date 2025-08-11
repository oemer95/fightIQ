import { 
  type Fighter, 
  type InsertFighter,
  type Analysis,
  type InsertAnalysis,
  type TrainingSession,
  type InsertTrainingSession,
  type PerformanceData,
  type InsertPerformanceData
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Fighter operations
  getFighter(id: string): Promise<Fighter | undefined>;
  getAllFighters(): Promise<Fighter[]>;
  createFighter(fighter: InsertFighter): Promise<Fighter>;
  updateFighter(id: string, fighter: Partial<InsertFighter>): Promise<Fighter | undefined>;
  deleteFighter(id: string): Promise<boolean>;

  // Analysis operations
  getAnalysis(id: string): Promise<Analysis | undefined>;
  getAnalysesByFighter(fighterId: string): Promise<Analysis[]>;
  getLatestAnalysis(fighterId: string): Promise<Analysis | undefined>;
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;

  // Training session operations
  getTrainingSessionsByFighter(fighterId: string): Promise<TrainingSession[]>;
  createTrainingSession(session: InsertTrainingSession): Promise<TrainingSession>;
  updateTrainingSession(id: string, session: Partial<InsertTrainingSession>): Promise<TrainingSession | undefined>;

  // Performance data operations
  getPerformanceDataByFighter(fighterId: string): Promise<PerformanceData[]>;
  createPerformanceData(data: InsertPerformanceData): Promise<PerformanceData>;
}

export class MemStorage implements IStorage {
  private fighters: Map<string, Fighter>;
  private analyses: Map<string, Analysis>;
  private trainingSessions: Map<string, TrainingSession>;
  private performanceData: Map<string, PerformanceData>;

  constructor() {
    this.fighters = new Map();
    this.analyses = new Map();
    this.trainingSessions = new Map();
    this.performanceData = new Map();
    this.seedData();
  }

  private seedData() {
    // Create sample fighters
    const fighter1: Fighter = {
      id: "1",
      name: "Alex Thompson",
      nickname: "Thunder",
      age: 27,
      weightClass: "Welterweight",
      weight: 170,
      reach: 74,
      record: "15-3-0",
      fightingStyle: "Striker",
      imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120"
    };

    const fighter2: Fighter = {
      id: "2",
      name: "Mike Rodriguez",
      nickname: "Storm",
      age: 29,
      weightClass: "Welterweight",
      weight: 170,
      reach: 72,
      record: "12-4-1",
      fightingStyle: "Grappler",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120"
    };

    const fighter3: Fighter = {
      id: "3",
      name: "Jake Williams",
      nickname: "Iron",
      age: 25,
      weightClass: "Lightweight",
      weight: 155,
      reach: 70,
      record: "18-2-0",
      fightingStyle: "Mixed",
      imageUrl: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120"
    };

    this.fighters.set("1", fighter1);
    this.fighters.set("2", fighter2);
    this.fighters.set("3", fighter3);

    // Create sample analysis for fighter 1
    const analysis1: Analysis = {
      id: "a1",
      fighterId: "1",
      striking: 85,
      grappling: 67,
      cardio: 72,
      defense: 78,
      aggression: 82,
      technique: 79,
      overallScore: 77,
      strengths: ["Exceptional striking accuracy", "Strong power in combinations", "Good distance management"],
      weaknesses: ["Ground defense needs work", "Cardio drops in later rounds", "Takedown defense"],
      recommendations: [
        "Focus on defensive grappling with 2 BJJ sessions per week",
        "Increase stamina with HIIT training 3x per week",
        "Work on combinations to maximize striking strength"
      ],
      createdAt: new Date().toISOString()
    };

    this.analyses.set("a1", analysis1);

    // Create sample training sessions
    const sessions = [
      {
        id: "t1",
        fighterId: "1",
        title: "Striking Technique",
        type: "striking",
        duration: 90,
        scheduledFor: new Date().toISOString(),
        completed: false
      },
      {
        id: "t2",
        fighterId: "1",
        title: "Grappling Defense",
        type: "grappling",
        duration: 120,
        scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        completed: false
      },
      {
        id: "t3",
        fighterId: "1",
        title: "Cardio & Conditioning",
        type: "cardio",
        duration: 60,
        scheduledFor: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false
      }
    ];

    sessions.forEach(session => this.trainingSessions.set(session.id, session));

    // Create sample performance data
    const performances = [
      { id: "p1", fighterId: "1", fightNumber: 1, performanceScore: 72, striking: 75, grappling: 65, cardio: 70, defense: 78 },
      { id: "p2", fighterId: "1", fightNumber: 2, performanceScore: 78, striking: 80, grappling: 68, cardio: 75, defense: 80 },
      { id: "p3", fighterId: "1", fightNumber: 3, performanceScore: 85, striking: 88, grappling: 70, cardio: 85, defense: 82 },
      { id: "p4", fighterId: "1", fightNumber: 4, performanceScore: 79, striking: 82, grappling: 72, cardio: 75, defense: 85 },
      { id: "p5", fighterId: "1", fightNumber: 5, performanceScore: 88, striking: 90, grappling: 75, cardio: 88, defense: 87 },
      { id: "p6", fighterId: "1", fightNumber: 6, performanceScore: 91, striking: 92, grappling: 78, cardio: 90, defense: 90 }
    ];

    performances.forEach(perf => this.performanceData.set(perf.id, perf));
  }

  async getFighter(id: string): Promise<Fighter | undefined> {
    return this.fighters.get(id);
  }

  async getAllFighters(): Promise<Fighter[]> {
    return Array.from(this.fighters.values());
  }

  async createFighter(insertFighter: InsertFighter): Promise<Fighter> {
    const id = randomUUID();
    const fighter: Fighter = { ...insertFighter, id };
    this.fighters.set(id, fighter);
    return fighter;
  }

  async updateFighter(id: string, updateData: Partial<InsertFighter>): Promise<Fighter | undefined> {
    const fighter = this.fighters.get(id);
    if (!fighter) return undefined;
    
    const updated = { ...fighter, ...updateData };
    this.fighters.set(id, updated);
    return updated;
  }

  async deleteFighter(id: string): Promise<boolean> {
    return this.fighters.delete(id);
  }

  async getAnalysis(id: string): Promise<Analysis | undefined> {
    return this.analyses.get(id);
  }

  async getAnalysesByFighter(fighterId: string): Promise<Analysis[]> {
    return Array.from(this.analyses.values()).filter(analysis => analysis.fighterId === fighterId);
  }

  async getLatestAnalysis(fighterId: string): Promise<Analysis | undefined> {
    const analyses = await this.getAnalysesByFighter(fighterId);
    return analyses.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())[0];
  }

  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const id = randomUUID();
    const analysis: Analysis = { 
      ...insertAnalysis, 
      id,
      createdAt: new Date().toISOString()
    };
    this.analyses.set(id, analysis);
    return analysis;
  }

  async getTrainingSessionsByFighter(fighterId: string): Promise<TrainingSession[]> {
    return Array.from(this.trainingSessions.values()).filter(session => session.fighterId === fighterId);
  }

  async createTrainingSession(insertSession: InsertTrainingSession): Promise<TrainingSession> {
    const id = randomUUID();
    const session: TrainingSession = { ...insertSession, id };
    this.trainingSessions.set(id, session);
    return session;
  }

  async updateTrainingSession(id: string, updateData: Partial<InsertTrainingSession>): Promise<TrainingSession | undefined> {
    const session = this.trainingSessions.get(id);
    if (!session) return undefined;
    
    const updated = { ...session, ...updateData };
    this.trainingSessions.set(id, updated);
    return updated;
  }

  async getPerformanceDataByFighter(fighterId: string): Promise<PerformanceData[]> {
    return Array.from(this.performanceData.values())
      .filter(data => data.fighterId === fighterId)
      .sort((a, b) => a.fightNumber - b.fightNumber);
  }

  async createPerformanceData(insertData: InsertPerformanceData): Promise<PerformanceData> {
    const id = randomUUID();
    const data: PerformanceData = { ...insertData, id };
    this.performanceData.set(id, data);
    return data;
  }
}

export const storage = new MemStorage();

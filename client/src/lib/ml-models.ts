// Mock AI/ML models for fighter analysis
// In a real application, this would interface with actual ML models or APIs

export interface FighterAnalysisInput {
  age: number;
  weight: number;
  reach: number;
  record: string; // "wins-losses-draws"
  fightingStyle: string;
  previousPerformance?: number[];
}

export interface AnalysisOutput {
  striking: number;
  grappling: number;
  cardio: number;
  defense: number;
  aggression: number;
  technique: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

// Simulate ML model for style classification
export function classifyFightingStyle(input: FighterAnalysisInput): AnalysisOutput {
  // Parse win rate from record
  const [wins, losses] = input.record.split('-').map(Number);
  const winRate = wins / (wins + losses || 1);

  // Generate scores based on fighting style and stats
  let striking = 70 + Math.random() * 25;
  let grappling = 60 + Math.random() * 30;
  let cardio = 65 + Math.random() * 25;
  let defense = 70 + Math.random() * 25;
  let aggression = 65 + Math.random() * 30;
  let technique = 70 + Math.random() * 25;

  // Adjust based on fighting style
  switch (input.fightingStyle.toLowerCase()) {
    case 'striker':
      striking += 15;
      technique += 10;
      grappling -= 10;
      break;
    case 'grappler':
      grappling += 20;
      striking -= 10;
      cardio += 5;
      break;
    case 'wrestler':
      grappling += 15;
      cardio += 10;
      striking -= 5;
      break;
    case 'mixed':
      // Balanced fighter
      striking += 5;
      grappling += 5;
      technique += 5;
      break;
  }

  // Adjust based on win rate
  const winBonus = winRate * 10;
  striking += winBonus;
  defense += winBonus;
  technique += winBonus;

  // Adjust based on age (peak performance around 25-30)
  const ageFactor = input.age < 25 ? 0.9 : input.age > 35 ? 0.85 : 1;
  cardio *= ageFactor;

  // Clamp values to 0-100
  striking = Math.min(100, Math.max(30, striking));
  grappling = Math.min(100, Math.max(30, grappling));
  cardio = Math.min(100, Math.max(30, cardio));
  defense = Math.min(100, Math.max(30, defense));
  aggression = Math.min(100, Math.max(30, aggression));
  technique = Math.min(100, Math.max(30, technique));

  const overallScore = Math.round((striking + grappling + cardio + defense + aggression + technique) / 6);

  // Generate insights based on scores
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];

  if (striking >= 80) strengths.push("Exceptional striking power and accuracy");
  if (grappling >= 80) strengths.push("Dominant ground game and submission skills");
  if (cardio >= 80) strengths.push("Outstanding cardiovascular endurance");
  if (defense >= 80) strengths.push("Excellent defensive awareness and timing");
  if (technique >= 80) strengths.push("Superior technical execution");

  if (striking < 60) {
    weaknesses.push("Striking game needs development");
    recommendations.push("Increase striking training with focus on combinations and timing");
  }
  if (grappling < 60) {
    weaknesses.push("Ground game requires improvement");
    recommendations.push("Add Brazilian Jiu-Jitsu sessions to improve grappling defense");
  }
  if (cardio < 65) {
    weaknesses.push("Cardiovascular endurance needs work");
    recommendations.push("Implement HIIT training 3x per week to boost stamina");
  }
  if (defense < 65) {
    weaknesses.push("Defensive positioning needs attention");
    recommendations.push("Focus on defensive drilling and reaction training");
  }

  // Add general recommendations
  if (recommendations.length === 0) {
    recommendations.push("Continue current training regimen with minor technique refinements");
  }

  if (strengths.length === 0) {
    strengths.push("Well-rounded skill development across all areas");
  }

  return {
    striking: Math.round(striking),
    grappling: Math.round(grappling),
    cardio: Math.round(cardio),
    defense: Math.round(defense),
    aggression: Math.round(aggression),
    technique: Math.round(technique),
    overallScore,
    strengths,
    weaknesses,
    recommendations,
  };
}

// Simulate performance prediction
export function predictPerformance(input: FighterAnalysisInput): number {
  const analysis = classifyFightingStyle(input);
  
  // Base prediction on overall score with some variance
  const variance = (Math.random() - 0.5) * 10; // ±5 points
  return Math.min(100, Math.max(0, analysis.overallScore + variance));
}

// Generate training recommendations based on weaknesses
export function generateTrainingPlan(analysis: AnalysisOutput): Array<{
  type: string;
  title: string;
  duration: number;
  priority: 'high' | 'medium' | 'low';
}> {
  const plan = [];

  if (analysis.striking < 70) {
    plan.push({
      type: 'striking',
      title: 'Striking Fundamentals',
      duration: 90,
      priority: 'high' as const,
    });
  }

  if (analysis.grappling < 70) {
    plan.push({
      type: 'grappling',
      title: 'Grappling Defense Training',
      duration: 120,
      priority: 'high' as const,
    });
  }

  if (analysis.cardio < 70) {
    plan.push({
      type: 'cardio',
      title: 'Cardiovascular Conditioning',
      duration: 60,
      priority: 'high' as const,
    });
  }

  // Add maintenance training for strengths
  if (analysis.striking >= 80) {
    plan.push({
      type: 'striking',
      title: 'Advanced Striking Combinations',
      duration: 75,
      priority: 'medium' as const,
    });
  }

  if (analysis.technique < 75) {
    plan.push({
      type: 'technique',
      title: 'Technical Refinement',
      duration: 90,
      priority: 'medium' as const,
    });
  }

  return plan;
}

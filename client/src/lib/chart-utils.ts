// Utility functions for chart configurations and data processing

export const chartColors = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)', 
  success: 'var(--success)',
  warning: 'var(--warning)',
  muted: 'var(--muted)',
};

export const getColorForScore = (score: number): string => {
  if (score >= 80) return chartColors.primary;
  if (score >= 70) return chartColors.success;
  if (score >= 60) return chartColors.warning;
  return chartColors.secondary;
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const formatFightLabel = (fightNumber: number): string => {
  return `Fight ${fightNumber}`;
};

export const radarChartConfig = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
        color: 'var(--muted-foreground)',
      },
      grid: {
        color: 'var(--border)',
      },
      pointLabels: {
        color: 'var(--foreground)',
        font: {
          size: 12,
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'var(--card)',
      titleColor: 'var(--card-foreground)',
      bodyColor: 'var(--card-foreground)',
      borderColor: 'var(--border)',
      borderWidth: 1,
    },
  },
};

export const lineChartConfig = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        color: 'var(--border)',
      },
      ticks: {
        color: 'var(--muted-foreground)',
      },
    },
    y: {
      beginAtZero: true,
      max: 100,
      grid: {
        color: 'var(--border)',
      },
      ticks: {
        color: 'var(--muted-foreground)',
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'var(--card)',
      titleColor: 'var(--card-foreground)',
      bodyColor: 'var(--card-foreground)',
      borderColor: 'var(--border)',
      borderWidth: 1,
    },
  },
};

export const progressBarConfig = {
  height: 8,
  borderRadius: 4,
  backgroundColor: 'var(--muted)',
  animationDuration: 300,
};

// Process performance data for trend analysis
export interface PerformanceDataPoint {
  fightNumber: number;
  performanceScore: number;
  striking: number;
  grappling: number;
  cardio: number;
  defense: number;
}

export const calculateTrend = (data: PerformanceDataPoint[]): 'improving' | 'declining' | 'stable' => {
  if (data.length < 2) return 'stable';
  
  const recent = data.slice(-3);
  const earlier = data.slice(0, -3);
  
  if (recent.length === 0 || earlier.length === 0) return 'stable';
  
  const recentAvg = recent.reduce((sum, d) => sum + d.performanceScore, 0) / recent.length;
  const earlierAvg = earlier.reduce((sum, d) => sum + d.performanceScore, 0) / earlier.length;
  
  const difference = recentAvg - earlierAvg;
  
  if (difference > 5) return 'improving';
  if (difference < -5) return 'declining';
  return 'stable';
};

export const calculateMovingAverage = (data: number[], windowSize: number = 3): number[] => {
  const result: number[] = [];
  
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const window = data.slice(start, i + 1);
    const average = window.reduce((sum, val) => sum + val, 0) / window.length;
    result.push(Math.round(average * 100) / 100);
  }
  
  return result;
};

// Generate chart data from raw performance data
export const transformPerformanceData = (rawData: any[]) => {
  return rawData.map((item, index) => ({
    name: `Fight ${item.fightNumber}`,
    performance: item.performanceScore,
    striking: item.striking,
    grappling: item.grappling,
    cardio: item.cardio,
    defense: item.defense,
    trend: index > 0 ? (item.performanceScore > rawData[index - 1].performanceScore ? 'up' : 'down') : 'stable',
  }));
};

// Generate radar chart data from analysis
export const transformAnalysisData = (analysis: any) => {
  return [
    { subject: 'Striking', value: analysis.striking, fullMark: 100 },
    { subject: 'Grappling', value: analysis.grappling, fullMark: 100 },
    { subject: 'Cardio', value: analysis.cardio, fullMark: 100 },
    { subject: 'Defense', value: analysis.defense, fullMark: 100 },
    { subject: 'Aggression', value: analysis.aggression, fullMark: 100 },
    { subject: 'Technique', value: analysis.technique, fullMark: 100 },
  ];
};

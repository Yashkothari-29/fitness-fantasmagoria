
// This service provides mock fitness data for the application

// Helper function to generate random data within a range
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a random heart rate between 60-160 bpm
export const generateHeartRate = (): number => {
  return getRandomInt(60, 160);
};

// Generate a steps count for the day (progress toward 10,000 steps)
export const generateSteps = (): number => {
  return getRandomInt(1000, 15000);
};

// Generate calories burned (between 500-3000)
export const generateCalories = (): number => {
  return getRandomInt(500, 3000);
};

// Generate XP points (between 0-1000)
export const generateXP = (): number => {
  return getRandomInt(0, 1000);
};

// Generate a level based on XP (1-30)
export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

// Generate a list of friends with their fitness data
export const generateFriends = (count: number = 5) => {
  const names = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Riley', 'Casey', 'Avery', 'Quinn', 'Skyler', 'Dakota'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    avatar: `/avatar-${(i % 5) + 1}.png`,
    steps: generateSteps(),
    level: getRandomInt(1, 30),
    lastActive: new Date(Date.now() - getRandomInt(0, 48) * 60 * 60 * 1000).toISOString(),
  }));
};

// Generate a week of steps data
export const generateWeeklySteps = () => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return daysOfWeek.map(day => ({
    day,
    steps: generateSteps(),
  }));
};

// Generate daily heart rate data (24 data points for each hour)
export const generateDailyHeartRate = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: getRandomInt(60, 140),
  }));
};

// Generate a heat map of steps for the day (36 blocks, 10 minutes each)
export const generateStepsHeatmap = () => {
  return Array.from({ length: 36 }, () => getRandomInt(0, 100));
};

// Get today's fitness summary
export const getTodayFitnessSummary = () => {
  const steps = generateSteps();
  const heartRate = generateHeartRate();
  const calories = generateCalories();
  const xp = generateXP();
  const level = calculateLevel(xp);
  
  return {
    steps,
    heartRate,
    calories,
    xp,
    level,
    stepsGoal: 10000,
    caloriesGoal: 2500,
    stepsPercentage: Math.min(Math.round((steps / 10000) * 100), 100),
    caloriesPercentage: Math.min(Math.round((calories / 2500) * 100), 100),
    weeklySteps: generateWeeklySteps(),
    dailyHeartRate: generateDailyHeartRate(),
    stepsHeatmap: generateStepsHeatmap(),
    levelProgress: (xp % 100) / 100,
    activeMinutes: getRandomInt(30, 180),
    activeMinutesGoal: 150,
    activeMinutesPercentage: Math.min(Math.round((getRandomInt(30, 180) / 150) * 100), 100),
    friends: generateFriends(5),
  };
};

// AI Coach messages
export const getCoachMessages = (personality: 'kind' | 'snarky' = 'kind') => {
  const kindMessages = [
    "You're doing great! Keep up the good work!",
    "Just a bit more to reach your daily goal!",
    "You're making excellent progress on your fitness journey.",
    "Remember to stay hydrated throughout the day.",
    "Your consistency is impressive. Keep it up!"
  ];
  
  const snarkyMessages = [
    "Call that exercise? My grandma moves more in her sleep.",
    "Oh wow, you actually moved today. Gold star for you.",
    "If you walked any slower, you'd be going backwards.",
    "Those steps aren't going to count themselves... oh wait, they do.",
    "Breaking news: User attempts fitness, results pending."
  ];
  
  const messages = personality === 'kind' ? kindMessages : snarkyMessages;
  return messages[Math.floor(Math.random() * messages.length)];
};

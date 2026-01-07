import type { RecapData, ChatStats, Award } from "./chatParser";

// Generate sample data for demo purposes
export function generateDemoRecap(): RecapData {
  // Create sample stats
  const stats: ChatStats = {
    totalMessages: 24853,
    totalWords: 156420,
    totalCharacters: 823150,
    participants: new Map([
      ["Best Friend 💜", 8234],
      ["Mom ❤️", 5123],
      ["Work Squad 🔥", 4521],
      ["Partner 💕", 3892],
      ["College Gang", 3083]
    ]),
    messagesByMonth: new Map([
      ["2024-01", 1823],
      ["2024-02", 2156],
      ["2024-03", 2489],
      ["2024-04", 1956],
      ["2024-05", 2234],
      ["2024-06", 2567],
      ["2024-07", 1789],
      ["2024-08", 2123],
      ["2024-09", 2456],
      ["2024-10", 2012],
      ["2024-11", 1734],
      ["2024-12", 1514]
    ]),
    messagesByHour: new Map([
      [0, 234], [1, 156], [2, 89], [3, 45], [4, 23], [5, 34],
      [6, 123], [7, 456], [8, 789], [9, 1234], [10, 1567],
      [11, 1823], [12, 1456], [13, 1234], [14, 1567], [15, 1789],
      [16, 1923], [17, 2156], [18, 2345], [19, 2123], [20, 1956],
      [21, 2567], [22, 1823], [23, 678]
    ]),
    messagesByDayOfWeek: new Map([
      [0, 3234], [1, 3567], [2, 3892], [3, 4123],
      [4, 3789], [5, 3456], [6, 2792]
    ]),
    topEmojis: new Map([
      ["😂", 4523],
      ["❤️", 3456],
      ["😭", 2789],
      ["🔥", 2345],
      ["💀", 1923],
      ["✨", 1567],
      ["🥺", 1234],
      ["💜", 989]
    ]),
    topWords: new Map([
      ["love", 892],
      ["haha", 756],
      ["tomorrow", 623],
      ["thanks", 567],
      ["amazing", 489],
      ["literally", 456],
      ["excited", 423],
      ["coffee", 389],
      ["weekend", 356],
      ["absolutely", 334],
      ["beautiful", 312],
      ["honestly", 289],
      ["perfect", 267],
      ["awesome", 245],
      ["seriously", 223],
      ["definitely", 201],
      ["exactly", 189],
      ["totally", 178],
      ["obviously", 156],
      ["finally", 145]
    ]),
    lateNightMessages: 4523,
    earlyMorningMessages: 1234,
    averageResponseTime: 5.2,
    longestStreak: 127,
    mediaCount: 2345,
    firstMessage: new Date("2024-01-01T10:23:00"),
    lastMessage: new Date("2024-12-31T23:45:00")
  };

  const awards: Award[] = [
    {
      title: "Late Night Philosopher",
      icon: "🌙",
      description: "18% of your messages were sent after midnight"
    },
    {
      title: "Main Character Energy",
      icon: "🏆",
      description: "Over 24,000 messages? You're the star of the show!"
    },
    {
      title: "Emoji Connoisseur",
      icon: "🎨",
      description: "You used 47 different emojis throughout the year"
    },
    {
      title: "Picture Perfect",
      icon: "📸",
      description: "You shared 2,345 photos, videos, and media files"
    },
    {
      title: "Conversation Starter",
      icon: "🔥",
      description: "You keep the conversations flowing!"
    }
  ];

  return {
    stats,
    personality: "Night Owl",
    awards,
    topContacts: [
      { name: "Best Friend 💜", count: 8234 },
      { name: "Mom ❤️", count: 5123 },
      { name: "Work Squad 🔥", count: 4521 },
      { name: "Partner 💕", count: 3892 },
      { name: "College Gang", count: 3083 }
    ],
    mostActiveMonth: { month: "Jun 2024", count: 2567 },
    peakHour: { hour: 21, count: 2567 },
    emojiHallOfFame: [
      { emoji: "😂", count: 4523 },
      { emoji: "❤️", count: 3456 },
      { emoji: "😭", count: 2789 },
      { emoji: "🔥", count: 2345 },
      { emoji: "💀", count: 1923 },
      { emoji: "✨", count: 1567 }
    ],
    moodTimeline: [
      { month: "Jan 2024", sentiment: 72 },
      { month: "Feb 2024", sentiment: 85 },
      { month: "Mar 2024", sentiment: 92 },
      { month: "Apr 2024", sentiment: 78 },
      { month: "May 2024", sentiment: 88 },
      { month: "Jun 2024", sentiment: 95 },
      { month: "Jul 2024", sentiment: 75 },
      { month: "Aug 2024", sentiment: 82 },
      { month: "Sep 2024", sentiment: 90 },
      { month: "Oct 2024", sentiment: 80 },
      { month: "Nov 2024", sentiment: 73 },
      { month: "Dec 2024", sentiment: 68 }
    ]
  };
}

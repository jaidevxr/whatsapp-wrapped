export interface Message {
  date: Date;
  sender: string;
  content: string;
  isMedia: boolean;
}

export interface ChatStats {
  totalMessages: number;
  totalWords: number;
  totalCharacters: number;
  participants: Map<string, number>;
  messagesByMonth: Map<string, number>;
  messagesByHour: Map<number, number>;
  messagesByDayOfWeek: Map<number, number>;
  topEmojis: Map<string, number>;
  topWords: Map<string, number>;
  lateNightMessages: number;
  earlyMorningMessages: number;
  averageResponseTime: number;
  longestStreak: number;
  mediaCount: number;
  firstMessage: Date | null;
  lastMessage: Date | null;
}

export interface RecapData {
  stats: ChatStats;
  personality: string;
  awards: Award[];
  topContacts: { name: string; count: number }[];
  mostActiveMonth: { month: string; count: number };
  peakHour: { hour: number; count: number };
  emojiHallOfFame: { emoji: string; count: number }[];
  moodTimeline: { month: string; sentiment: number }[];
}

export interface Award {
  title: string;
  icon: string;
  description: string;
}

// Common words to filter out
const stopWords = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
  'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must',
  'shall', 'can', 'need', 'dare', 'ought', 'used', 'i', 'you', 'he', 'she', 'it',
  'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our',
  'their', 'this', 'that', 'these', 'those', 'am', 'not', 'no', 'yes', 'ok', 'okay',
  'so', 'just', 'also', 'too', 'very', 'really', 'what', 'when', 'where', 'who',
  'how', 'why', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other',
  'some', 'such', 'only', 'same', 'than', 'then', 'now', 'here', 'there', 'if',
  'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'up',
  'down', 'out', 'off', 'over', 'under', 'again', 'further', 'once', 'media',
  'omitted', 'message', 'deleted', 'image', 'video', 'audio', 'document', 'sticker',
  'gif', 'https', 'http', 'www', 'com', 'dont', "don't", 'im', "i'm", 'its', "it's",
  'thats', "that's", 'youre', "you're", 'theyre', "they're", 'weve', "we've",
  'ive', "i've", 'cant', "can't", 'wont', "won't", 'didnt', "didn't", 'doesnt',
  "doesn't", 'isnt', "isn't", 'arent', "aren't", 'wasnt', "wasn't", 'werent',
  "weren't", 'havent', "haven't", 'hasnt', "hasn't", 'hadnt', "hadn't", 'get',
  'got', 'getting', 'going', 'go', 'come', 'coming', 'came', 'like', 'know',
  'think', 'want', 'see', 'look', 'make', 'way', 'well', 'back', 'even', 'new',
  'one', 'two', 'three', 'first', 'last', 'long', 'great', 'little', 'own', 'old',
  'right', 'big', 'high', 'different', 'small', 'large', 'next', 'early', 'young',
  'important', 'public', 'bad', 'much', 'still', 'na', 'ya', 'yeah', 'yea', 'nah',
  'lol', 'haha', 'hahaha', 'lmao', 'good', 'day', 'time', 'thing', 'things'
]);

// Emoji regex pattern
const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{231A}-\u{231B}]|[\u{23E9}-\u{23F3}]|[\u{23F8}-\u{23FA}]|[\u{25AA}-\u{25AB}]|[\u{25B6}]|[\u{25C0}]|[\u{25FB}-\u{25FE}]|[\u{2614}-\u{2615}]|[\u{2648}-\u{2653}]|[\u{267F}]|[\u{2693}]|[\u{26A1}]|[\u{26AA}-\u{26AB}]|[\u{26BD}-\u{26BE}]|[\u{26C4}-\u{26C5}]|[\u{26CE}]|[\u{26D4}]|[\u{26EA}]|[\u{26F2}-\u{26F3}]|[\u{26F5}]|[\u{26FA}]|[\u{26FD}]|[\u{2702}]|[\u{2705}]|[\u{2708}-\u{270D}]|[\u{270F}]|[\u{2712}]|[\u{2714}]|[\u{2716}]|[\u{271D}]|[\u{2721}]|[\u{2728}]|[\u{2733}-\u{2734}]|[\u{2744}]|[\u{2747}]|[\u{274C}]|[\u{274E}]|[\u{2753}-\u{2755}]|[\u{2757}]|[\u{2763}-\u{2764}]|[\u{2795}-\u{2797}]|[\u{27A1}]|[\u{27B0}]|[\u{27BF}]|[\u{2934}-\u{2935}]|[\u{2B05}-\u{2B07}]|[\u{2B1B}-\u{2B1C}]|[\u{2B50}]|[\u{2B55}]|[\u{3030}]|[\u{303D}]|[\u{3297}]|[\u{3299}]/gu;

export function parseWhatsAppChat(content: string): Message[] {
  const messages: Message[] = [];
  
  // Comprehensive WhatsApp export format patterns
  const patterns = [
    // iOS format: [DD/MM/YYYY, HH:MM:SS] Sender: Message
    /^\[(\d{1,2}\/\d{1,2}\/\d{2,4}),\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\]\s*([^:]+?):\s*(.*)$/i,
    // Android format: DD/MM/YYYY, HH:MM - Sender: Message
    /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\s*-\s*([^:]+?):\s*(.*)$/i,
    // Alternate: DD.MM.YYYY, HH:MM - Sender: Message (European)
    /^(\d{1,2}\.\d{1,2}\.\d{2,4}),\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\s*-\s*([^:]+?):\s*(.*)$/i,
    // Alternate: YYYY-MM-DD, HH:MM - Sender: Message (ISO)
    /^(\d{4}-\d{1,2}-\d{1,2}),\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\s*-\s*([^:]+?):\s*(.*)$/i,
    // Alternate: DD-MM-YYYY, HH:MM - Sender: Message
    /^(\d{1,2}-\d{1,2}-\d{2,4}),\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\s*-\s*([^:]+?):\s*(.*)$/i,
    // No brackets, no dash: DD/MM/YYYY HH:MM Sender: Message
    /^(\d{1,2}\/\d{1,2}\/\d{2,4})\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\s+([^:]+?):\s*(.*)$/i,
    // With unicode dash: DD/MM/YYYY, HH:MM – Sender: Message
    /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\s*[–—]\s*([^:]+?):\s*(.*)$/i,
  ];
  
  const lines = content.split(/\r?\n/);
  let currentMessage: Message | null = null;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    let matched = false;
    
    for (const pattern of patterns) {
      const match = trimmedLine.match(pattern);
      if (match) {
        if (currentMessage) {
          messages.push(currentMessage);
        }
        
        const [, dateStr, timeStr, sender, messageContent] = match;
        const date = parseDate(dateStr, timeStr);
        const content = messageContent || '';
        const isMedia = /(<Media omitted>|image omitted|video omitted|audio omitted|document omitted|sticker omitted|GIF omitted|<attached:|\.jpg|\.jpeg|\.png|\.mp4|\.opus|\.pdf)/i.test(content);
        
        currentMessage = {
          date,
          sender: sender.trim(),
          content: content.trim(),
          isMedia
        };
        
        matched = true;
        break;
      }
    }
    
    // If no pattern matched and we have a current message, append to it (multi-line messages)
    if (!matched && currentMessage) {
      currentMessage.content += '\n' + trimmedLine;
    }
  }
  
  if (currentMessage) {
    messages.push(currentMessage);
  }
  
  return messages;
}

function parseDate(dateStr: string, timeStr: string): Date {
  let day: number, month: number, year: number;
  
  // Handle different date separators: /, ., -
  const dateParts = dateStr.split(/[\/.\-]/).map(p => parseInt(p, 10));
  
  // Check for ISO format (YYYY-MM-DD)
  if (dateParts[0] > 1000) {
    [year, month, day] = dateParts;
  } else if (dateParts.length === 3) {
    // Determine format based on values
    if (dateParts[0] > 12) {
      // DD/MM/YYYY format
      [day, month, year] = dateParts;
    } else if (dateParts[1] > 12) {
      // MM/DD/YYYY format
      [month, day, year] = dateParts;
    } else {
      // Assume DD/MM/YYYY for ambiguous dates (more common globally)
      [day, month, year] = dateParts;
    }
  } else {
    // Fallback
    [day, month, year] = [1, 1, 2024];
  }
  
  // Handle 2-digit years
  if (year < 100) {
    year += year > 50 ? 1900 : 2000;
  }
  
  // Parse time
  let hours = 0;
  let minutes = 0;
  
  const timeParts = timeStr.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*([AP]M))?/i);
  if (timeParts) {
    hours = parseInt(timeParts[1], 10);
    minutes = parseInt(timeParts[2], 10);
    
    if (timeParts[4]) {
      const isPM = timeParts[4].toUpperCase() === 'PM';
      if (isPM && hours !== 12) hours += 12;
      if (!isPM && hours === 12) hours = 0;
    }
  }
  
  return new Date(year, month - 1, day, hours, minutes);
}

export function analyzeChat(messages: Message[]): ChatStats {
  const stats: ChatStats = {
    totalMessages: messages.length,
    totalWords: 0,
    totalCharacters: 0,
    participants: new Map(),
    messagesByMonth: new Map(),
    messagesByHour: new Map(),
    messagesByDayOfWeek: new Map(),
    topEmojis: new Map(),
    topWords: new Map(),
    lateNightMessages: 0,
    earlyMorningMessages: 0,
    averageResponseTime: 0,
    longestStreak: 0,
    mediaCount: 0,
    firstMessage: messages.length > 0 ? messages[0].date : null,
    lastMessage: messages.length > 0 ? messages[messages.length - 1].date : null
  };
  
  // Initialize hours and days
  for (let i = 0; i < 24; i++) stats.messagesByHour.set(i, 0);
  for (let i = 0; i < 7; i++) stats.messagesByDayOfWeek.set(i, 0);
  
  for (const message of messages) {
    // Count by participant
    const participantCount = stats.participants.get(message.sender) || 0;
    stats.participants.set(message.sender, participantCount + 1);
    
    // Count by month
    const monthKey = `${message.date.getFullYear()}-${String(message.date.getMonth() + 1).padStart(2, '0')}`;
    const monthCount = stats.messagesByMonth.get(monthKey) || 0;
    stats.messagesByMonth.set(monthKey, monthCount + 1);
    
    // Count by hour
    const hour = message.date.getHours();
    stats.messagesByHour.set(hour, (stats.messagesByHour.get(hour) || 0) + 1);
    
    // Count by day of week
    const dayOfWeek = message.date.getDay();
    stats.messagesByDayOfWeek.set(dayOfWeek, (stats.messagesByDayOfWeek.get(dayOfWeek) || 0) + 1);
    
    // Late night / early morning
    if (hour >= 0 && hour < 6) stats.earlyMorningMessages++;
    if (hour >= 23 || hour < 2) stats.lateNightMessages++;
    
    // Media count
    if (message.isMedia) stats.mediaCount++;
    
    // Word and character count
    const words = message.content.split(/\s+/).filter(w => w.length > 0);
    stats.totalWords += words.length;
    stats.totalCharacters += message.content.length;
    
    // Extract emojis
    const emojis = message.content.match(emojiRegex) || [];
    for (const emoji of emojis) {
      const count = stats.topEmojis.get(emoji) || 0;
      stats.topEmojis.set(emoji, count + 1);
    }
    
    // Word frequency
    for (const word of words) {
      const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
      if (cleanWord.length > 2 && !stopWords.has(cleanWord)) {
        const count = stats.topWords.get(cleanWord) || 0;
        stats.topWords.set(cleanWord, count + 1);
      }
    }
  }
  
  return stats;
}

export function generateRecap(stats: ChatStats): RecapData {
  // Sort participants by message count
  const topContacts = Array.from(stats.participants.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
  
  // Find most active month
  const sortedMonths = Array.from(stats.messagesByMonth.entries())
    .sort((a, b) => b[1] - a[1]);
  const mostActiveMonth = sortedMonths.length > 0 
    ? { month: formatMonth(sortedMonths[0][0]), count: sortedMonths[0][1] }
    : { month: 'N/A', count: 0 };
  
  // Find peak hour
  const sortedHours = Array.from(stats.messagesByHour.entries())
    .sort((a, b) => b[1] - a[1]);
  const peakHour = sortedHours.length > 0
    ? { hour: sortedHours[0][0], count: sortedHours[0][1] }
    : { hour: 0, count: 0 };
  
  // Top emojis
  const emojiHallOfFame = Array.from(stats.topEmojis.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([emoji, count]) => ({ emoji, count }));
  
  // Mood timeline (simplified - based on emoji usage per month)
  const moodTimeline = Array.from(stats.messagesByMonth.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-12)
    .map(([month, count]) => ({
      month: formatMonth(month),
      sentiment: Math.min(100, Math.round((count / (stats.totalMessages / 12)) * 50 + 50))
    }));
  
  // Generate personality
  const personality = determinePersonality(stats);
  
  // Generate awards
  const awards = generateAwards(stats);
  
  return {
    stats,
    personality,
    awards,
    topContacts,
    mostActiveMonth,
    peakHour,
    emojiHallOfFame,
    moodTimeline
  };
}

function formatMonth(monthStr: string): string {
  const [year, month] = monthStr.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

function determinePersonality(stats: ChatStats): string {
  const lateNightRatio = stats.lateNightMessages / stats.totalMessages;
  const avgMessagesPerDay = stats.totalMessages / (stats.firstMessage && stats.lastMessage 
    ? Math.max(1, Math.ceil((stats.lastMessage.getTime() - stats.firstMessage.getTime()) / (1000 * 60 * 60 * 24)))
    : 1);
  
  if (lateNightRatio > 0.2) return "Night Owl";
  if (avgMessagesPerDay > 100) return "Chatterbox";
  if (stats.topEmojis.size > 50) return "Emoji Artist";
  if (stats.mediaCount / stats.totalMessages > 0.3) return "Visual Storyteller";
  if (avgMessagesPerDay < 10) return "Quality over Quantity";
  return "Balanced Communicator";
}

function generateAwards(stats: ChatStats): Award[] {
  const awards: Award[] = [];
  
  const lateNightRatio = stats.lateNightMessages / stats.totalMessages;
  if (lateNightRatio > 0.15) {
    awards.push({
      title: "Late Night Philosopher",
      icon: "🌙",
      description: `${Math.round(lateNightRatio * 100)}% of your messages were sent after midnight`
    });
  }
  
  if (stats.totalMessages > 10000) {
    awards.push({
      title: "Main Character Energy",
      icon: "🏆",
      description: `Over ${stats.totalMessages.toLocaleString()} messages? You're the star of the show!`
    });
  }
  
  if (stats.topEmojis.size > 30) {
    awards.push({
      title: "Emoji Connoisseur",
      icon: "🎨",
      description: `You used ${stats.topEmojis.size} different emojis throughout the year`
    });
  }
  
  if (stats.mediaCount > 100) {
    awards.push({
      title: "Picture Perfect",
      icon: "📸",
      description: `You shared ${stats.mediaCount} photos, videos, and media files`
    });
  }
  
  const avgWordsPerMessage = stats.totalWords / stats.totalMessages;
  if (avgWordsPerMessage > 15) {
    awards.push({
      title: "Storyteller Supreme",
      icon: "📖",
      description: `Your messages average ${Math.round(avgWordsPerMessage)} words - you love to elaborate!`
    });
  } else if (avgWordsPerMessage < 5) {
    awards.push({
      title: "Straight to the Point",
      icon: "⚡",
      description: `With ${Math.round(avgWordsPerMessage)} words per message, you keep it brief`
    });
  }
  
  // Always add at least one positive award
  if (awards.length === 0) {
    awards.push({
      title: "Conversation Starter",
      icon: "🔥",
      description: "You keep the conversations flowing!"
    });
  }
  
  return awards.slice(0, 5);
}

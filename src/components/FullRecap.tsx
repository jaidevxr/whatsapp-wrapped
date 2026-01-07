import { motion } from "framer-motion";
import { AwardsSection } from "./AwardsSection";
import { DataVisualization } from "./DataVisualization";
import { ShareSection } from "./ShareSection";
import { Button } from "./ui/button";
import { 
  MessageCircle, Calendar, Clock, Type, Image, Users, RefreshCw, 
  TrendingUp, Moon, Zap, ArrowRight
} from "lucide-react";
import type { RecapData } from "@/lib/chatParser";

interface FullRecapProps {
  recap: RecapData;
  onNewRecap?: () => void;
}

// Clean stat card with glassmorphism
const StatCard = ({ 
  icon, 
  value, 
  label, 
  delay = 0 
}: { 
  icon: React.ReactNode; 
  value: string | number; 
  label: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="glass-card p-6 group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
    </div>
    <p className="text-3xl font-display font-bold text-foreground mb-1">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </motion.div>
);

// Personality section
const PersonalitySection = ({ personality }: { personality: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-card p-8 text-center max-w-md mx-auto"
  >
    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Your Chat Personality</p>
    <h2 className="text-4xl font-display font-bold gradient-text">{personality}</h2>
  </motion.div>
);

// Emoji grid
const EmojiGrid = ({ emojis }: { emojis: { emoji: string; count: number }[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="glass-card p-6"
  >
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
      Top Emojis <span className="text-muted-foreground text-sm font-normal">you used the most</span>
    </h3>
    <div className="grid grid-cols-4 gap-3">
      {emojis.slice(0, 8).map((item, index) => (
        <motion.div
          key={item.emoji}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.1 }}
          className="flex flex-col items-center p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-default"
        >
          <span className="text-2xl mb-1">{item.emoji}</span>
          <span className="text-xs text-muted-foreground">{item.count}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// Top contacts list
const ContactsList = ({ contacts }: { contacts: { name: string; count: number }[] }) => {
  const maxCount = contacts[0]?.count || 1;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Top Contacts</h3>
      <div className="space-y-3">
        {contacts.slice(0, 5).map((contact, index) => (
          <motion.div
            key={contact.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
              {contact.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{contact.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary/60 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(contact.count / maxCount) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-16 text-right">{contact.count.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Time insights card
const TimeInsights = ({ hour, lateNight, earlyMorning }: { hour: number; lateNight: number; earlyMorning: number }) => {
  const formatHour = (h: number) => {
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:00 ${suffix}`;
  };
  
  const isNightOwl = lateNight > earlyMorning;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Chat Timing</h3>
      
      <div className="text-center mb-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Peak Hour</p>
        <p className="text-3xl font-display font-bold">{formatHour(hour)}</p>
      </div>
      
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
        {isNightOwl ? (
          <>
            <Moon className="w-4 h-4 text-primary" />
            <span>Night Owl</span>
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 text-primary" />
            <span>Early Bird</span>
          </>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-secondary/50 text-center">
          <p className="text-xl font-bold">{lateNight.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Late Night</p>
        </div>
        <div className="p-3 rounded-xl bg-secondary/50 text-center">
          <p className="text-xl font-bold">{earlyMorning.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Early AM</p>
        </div>
      </div>
    </motion.div>
  );
};

// Word tags
const WordTags = ({ words }: { words: Map<string, number> }) => {
  const sortedWords = Array.from(words.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Most Used Words</h3>
      <div className="flex flex-wrap gap-2">
        {sortedWords.map(([word, count], index) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.02 }}
            className="px-3 py-1.5 rounded-full bg-secondary/70 text-sm hover:bg-secondary transition-colors cursor-default"
          >
            {word}
            <span className="ml-1.5 text-muted-foreground text-xs">{count}</span>
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export const FullRecap = ({ recap, onNewRecap }: FullRecapProps) => {
  const formatNumber = (num: number) => num.toLocaleString();

  const stats = [
    { icon: <MessageCircle className="w-5 h-5" />, value: formatNumber(recap.stats.totalMessages), label: "Messages" },
    { icon: <Type className="w-5 h-5" />, value: formatNumber(recap.stats.totalWords), label: "Words" },
    { icon: <Calendar className="w-5 h-5" />, value: recap.mostActiveMonth.month, label: "Most Active" },
    { icon: <Clock className="w-5 h-5" />, value: formatNumber(recap.stats.lateNightMessages), label: "Late Night" },
    { icon: <Image className="w-5 h-5" />, value: formatNumber(recap.stats.mediaCount), label: "Media" },
    { icon: <Users className="w-5 h-5" />, value: recap.stats.participants.size, label: "People" },
  ];

  return (
    <div className="min-h-screen">
      <div className="pt-20 pb-12">
        {/* Header */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
                className="inline-block text-5xl mb-4"
              >
                🎉
              </motion.span>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
                Your <span className="gradient-text">2025 Wrapped</span>
              </h1>
              <p className="text-muted-foreground mb-6">Here is your year in messages</p>
              {onNewRecap && (
                <Button variant="outline" size="sm" onClick={onNewRecap} className="group">
                  <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                  Analyze Another Chat
                </Button>
              )}
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <StatCard key={stat.label} {...stat} delay={index * 0.05} />
              ))}
            </div>
          </div>
        </section>

        {/* Personality */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <PersonalitySection personality={recap.personality} />
          </div>
        </section>

        {/* Three Column Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <ContactsList contacts={recap.topContacts} />
              <TimeInsights 
                hour={recap.peakHour.hour} 
                lateNight={recap.stats.lateNightMessages}
                earlyMorning={recap.stats.earlyMorningMessages}
              />
              <EmojiGrid emojis={recap.emojiHallOfFame} />
            </div>
          </div>
        </section>

        {/* Awards */}
        <AwardsSection awards={recap.awards} />

        {/* Charts */}
        <DataVisualization recap={recap} />

        {/* Words */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <WordTags words={recap.stats.topWords} />
            </div>
          </div>
        </section>

        {/* Share */}
        <ShareSection hasRecap={true} recap={recap} />
      </div>
    </div>
  );
};

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import type { RecapData } from "@/lib/chatParser";

interface DataVisualizationProps {
  recap: RecapData;
}

const COLORS = ["hsl(250, 70%, 60%)", "hsl(210, 80%, 55%)", "hsl(175, 60%, 45%)", "hsl(340, 65%, 55%)", "hsl(45, 70%, 50%)", "hsl(280, 60%, 55%)"];

export const DataVisualization = ({ recap }: DataVisualizationProps) => {
  const hourlyData = Array.from(recap.stats.messagesByHour.entries())
    .map(([hour, count]) => ({ hour: `${hour}h`, messages: count }));

  const emojiData = recap.emojiHallOfFame.slice(0, 5).map((item, index) => ({
    name: item.emoji, value: item.count, color: COLORS[index]
  }));

  const monthlyData = recap.moodTimeline.map(item => ({
    month: item.month.split(' ')[0], activity: item.sentiment
  }));

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekdayData = Array.from(recap.stats.messagesByDayOfWeek.entries())
    .map(([day, count]) => ({ day: dayNames[day], messages: count }));

  const tooltipStyle = {
    backgroundColor: 'hsl(220 20% 12%)',
    border: '1px solid hsl(220 10% 20%)',
    borderRadius: '8px',
    color: 'hsl(220 10% 95%)',
    fontSize: '12px'
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Chat <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-muted-foreground text-sm">Your messaging patterns visualized</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-5">
            <h3 className="text-sm font-semibold mb-4">Messages by Hour</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={hourlyData}>
                <XAxis dataKey="hour" tick={{ fill: 'hsl(220 10% 55%)', fontSize: 9 }} axisLine={false} tickLine={false} interval={5} />
                <YAxis hide />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="messages" fill="hsl(250, 70%, 60%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass-card p-5">
            <h3 className="text-sm font-semibold mb-4">Messages by Day</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weekdayData}>
                <XAxis dataKey="day" tick={{ fill: 'hsl(220 10% 55%)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="messages" fill="hsl(210, 80%, 55%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h3 className="text-sm font-semibold mb-4">Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={monthlyData}>
                <XAxis dataKey="month" tick={{ fill: 'hsl(220 10% 55%)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={tooltipStyle} />
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(250, 70%, 60%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(250, 70%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="activity" stroke="hsl(250, 70%, 60%)" strokeWidth={2} fill="url(#areaGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="glass-card p-5">
            <h3 className="text-sm font-semibold mb-4">Emoji Distribution</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={emojiData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
                    {emojiData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number, name: string) => [`${value}`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-1 ml-4">
                {emojiData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="text-lg">{item.name}</span>
                    <span className="text-muted-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

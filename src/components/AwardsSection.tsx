import { motion } from "framer-motion";
import type { Award } from "@/lib/chatParser";

interface AwardsSectionProps {
  awards: Award[];
}

export const AwardsSection = ({ awards }: AwardsSectionProps) => {
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
            Your <span className="gradient-text">Awards</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Achievements based on your chat patterns
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {awards.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card p-5 text-center"
            >
              <span className="text-4xl mb-3 block">{award.icon}</span>
              <h3 className="font-semibold mb-1">{award.title}</h3>
              <p className="text-muted-foreground text-sm">{award.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

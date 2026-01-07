import { motion } from "framer-motion";
import { Download, Upload, Cpu, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Download,
    title: "Export Chat",
    description: "Open any chat, tap More > Export Chat, save the .txt file",
  },
  {
    icon: Upload,
    title: "Upload File",
    description: "Drag and drop or click to upload your exported chat",
  },
  {
    icon: Cpu,
    title: "Local Analysis",
    description: "Algorithm processes messages locally in your browser",
  },
  {
    icon: Sparkles,
    title: "View Recap",
    description: "Your personalized Chat Wrapped is ready instantly",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Generate your recap in a few simple steps
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-5 relative"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <step.icon className="w-4 h-4" />
                </div>
                <span className="text-xs text-muted-foreground">Step {index + 1}</span>
              </div>
              <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Trash2, Server, Code } from "lucide-react";

const privacyFeatures = [
  { icon: Lock, title: "Local Processing", description: "Everything runs in your browser" },
  { icon: Server, title: "No Upload", description: "Chats stay on your device" },
  { icon: Eye, title: "No Tracking", description: "Zero data collection" },
  { icon: Trash2, title: "Instant Deletion", description: "Close tab, data is gone" },
  { icon: Shield, title: "No Account", description: "Use without signing up" },
  { icon: Code, title: "Transparent", description: "Open analysis logic" },
];

export const PrivacySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
            Privacy First
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Your chats never leave your device. All processing happens locally.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-4 text-center"
            >
              <feature.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <h3 className="font-medium text-xs mb-0.5">{feature.title}</h3>
              <p className="text-[10px] text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

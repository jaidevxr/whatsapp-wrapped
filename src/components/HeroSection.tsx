import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Lock, HelpCircle, X, Smartphone, MessageSquare, Download, FileText } from "lucide-react";

interface HeroSectionProps {
  onUploadClick: () => void;
}

export const HeroSection = ({ onUploadClick }: HeroSectionProps) => {
  const [showGuide, setShowGuide] = useState(false);

  const exportSteps = [
    { icon: <MessageSquare className="w-4 h-4" />, title: "Open the Chat", desc: "Open the individual chat you want to analyze" },
    { icon: <Smartphone className="w-4 h-4" />, title: "Open Settings", desc: "Tap ⋮ (Android) or the contact name (iOS)" },
    { icon: <FileText className="w-4 h-4" />, title: "Export Chat", desc: "Select 'More' → 'Export chat' → 'Without Media'" },
    { icon: <Download className="w-4 h-4" />, title: "Save & Upload", desc: "Save the .txt file and upload it here" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
      
      {/* Subtle orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/80 border border-border mb-8"
          >
            <span className="text-sm text-muted-foreground">2025 Year in Review</span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
          >
            Your 2025 in Chats,{" "}
            <span className="gradient-text">Wrapped.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto"
          >
            A beautiful recap of your WhatsApp conversations. 
            Discover your chat personality and patterns.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <Button 
              size="lg"
              onClick={onUploadClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload & Generate
            </Button>
            <Button variant="outline" size="lg" onClick={() => setShowGuide(true)}>
              <HelpCircle className="w-4 h-4 mr-2" />
              How to Export
            </Button>
          </motion.div>

          {/* Export Guide Modal */}
          <AnimatePresence>
            {showGuide && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
                onClick={() => setShowGuide(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  onClick={(e) => e.stopPropagation()}
                  className="glass-card p-6 max-w-md w-full relative"
                >
                  <button
                    onClick={() => setShowGuide(false)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <h3 className="text-xl font-display font-bold mb-5">
                    How to Export <span className="gradient-text">Chat</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {exportSteps.map((step, index) => (
                      <motion.div
                        key={step.title}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                          {step.icon}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{step.title}</p>
                          <p className="text-sm text-muted-foreground">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="w-full mt-6"
                    onClick={() => {
                      setShowGuide(false);
                      onUploadClick();
                    }}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Ready to Upload
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 inline-flex items-center gap-2 text-muted-foreground"
          >
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm">100% Private. Processed locally. No data stored.</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-muted-foreground/30 flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-muted-foreground"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

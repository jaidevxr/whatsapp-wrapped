import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neon-gradient flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">Chat Wrapped</span>
          </div>

          {/* Disclaimer */}
          <p className="text-sm text-muted-foreground text-center">
            Not affiliated with WhatsApp or Meta.
          </p>

          {/* Credits */}
          <motion.p 
            className="text-sm text-muted-foreground flex items-center gap-1"
            whileHover={{ scale: 1.02 }}
          >
            Made with <Heart className="w-4 h-4 text-neon-pink fill-neon-pink" /> by Jaidev
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

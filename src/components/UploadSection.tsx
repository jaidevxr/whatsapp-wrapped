import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Check, AlertCircle, Shield } from "lucide-react";
import { parseWhatsAppChat, analyzeChat, generateRecap, type RecapData } from "@/lib/chatParser";

interface UploadSectionProps {
  onRecapGenerated: (recap: RecapData) => void;
}

export const UploadSection = ({ onRecapGenerated }: UploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const processFile = useCallback(async (file: File) => {
    if (!file.name.endsWith('.txt')) {
      setUploadState("error");
      setErrorMessage("Please upload a .txt file exported from WhatsApp");
      return;
    }

    setFileName(file.name);
    setUploadState("processing");

    try {
      const content = await file.text();
      const messages = parseWhatsAppChat(content);
      
      if (messages.length < 10) {
        setUploadState("error");
        setErrorMessage("Could not parse enough messages. Make sure this is a valid WhatsApp export.");
        return;
      }

      const stats = analyzeChat(messages);
      const recap = generateRecap(stats);
      
      // Simulate a brief processing time for UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUploadState("success");
      
      // Wait a moment before transitioning to recap
      setTimeout(() => {
        onRecapGenerated(recap);
      }, 1000);
    } catch (error) {
      setUploadState("error");
      setErrorMessage("Failed to process the file. Please try again.");
    }
  }, [onRecapGenerated]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  return (
    <section id="upload" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Upload Your <span className="gradient-text">Chat</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Drop your WhatsApp export file to generate your personalized recap
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <label
            htmlFor="file-upload"
            className={`
              relative block cursor-pointer
              glass-card p-12 md:p-16
              border-2 border-dashed transition-all duration-300
              ${isDragging 
                ? "border-neon-purple bg-neon-purple/10" 
                : uploadState === "error"
                ? "border-destructive/50"
                : uploadState === "success"
                ? "border-neon-green/50"
                : "border-muted hover:border-neon-purple/50"
              }
            `}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <input
              id="file-upload"
              type="file"
              accept=".txt"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploadState === "processing"}
            />

            <AnimatePresence mode="wait">
              {uploadState === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <motion.div
                    animate={isDragging ? { scale: 1.1, y: -10 } : { scale: 1, y: 0 }}
                    className="w-20 h-20 rounded-2xl bg-neon-gradient mx-auto mb-6 flex items-center justify-center"
                  >
                    <Upload className="w-10 h-10 text-primary-foreground" />
                  </motion.div>
                  <h3 className="text-xl font-display font-semibold mb-2">
                    {isDragging ? "Drop it here!" : "Drag & drop your chat file"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse
                  </p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    Accepts .txt files only
                  </span>
                </motion.div>
              )}

              {uploadState === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full rounded-full border-4 border-muted border-t-neon-purple"
                    />
                    <FileText className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-neon-purple" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">
                    Analyzing your chats...
                  </h3>
                  <p className="text-muted-foreground">
                    Processing {fileName}
                  </p>
                </motion.div>
              )}

              {uploadState === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-neon-green mx-auto mb-6 flex items-center justify-center"
                  >
                    <Check className="w-10 h-10 text-background" />
                  </motion.div>
                  <h3 className="text-xl font-display font-semibold mb-2 text-neon-green">
                    Analysis Complete!
                  </h3>
                  <p className="text-muted-foreground">
                    Generating your wrapped...
                  </p>
                </motion.div>
              )}

              {uploadState === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-destructive/20 mx-auto mb-6 flex items-center justify-center">
                    <AlertCircle className="w-10 h-10 text-destructive" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2 text-destructive">
                    Upload Failed
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {errorMessage}
                  </p>
                  <button
                    onClick={() => setUploadState("idle")}
                    className="text-neon-purple hover:underline"
                  >
                    Try again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </label>
        </motion.div>

        {/* Privacy reassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-start gap-4 p-6 glass-card"
        >
          <Shield className="w-6 h-6 text-neon-green flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold mb-1">Your Privacy is Protected</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your chat file is processed directly in your browser. 
              We never upload, save, or track your messages. 
              Close the tab, and everything is gone.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

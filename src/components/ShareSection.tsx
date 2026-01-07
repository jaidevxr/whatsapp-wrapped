import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Share2, Image, FileText, Check } from "lucide-react";
import { useState } from "react";
import type { RecapData } from "@/lib/chatParser";

interface ShareSectionProps {
  hasRecap: boolean;
  recap?: RecapData;
}

export const ShareSection = ({ hasRecap, recap }: ShareSectionProps) => {
  const [downloadedImage, setDownloadedImage] = useState(false);
  const [downloadedPdf, setDownloadedPdf] = useState(false);

  const generateRecapText = () => {
    if (!recap) return "";
    
    const lines = [
      "🎉 My 2025 Chat Wrapped 🎉",
      "",
      `📱 Total Messages: ${recap.stats.totalMessages.toLocaleString()}`,
      `📝 Total Words: ${recap.stats.totalWords.toLocaleString()}`,
      `🌙 Late Night Messages: ${recap.stats.lateNightMessages.toLocaleString()}`,
      `📸 Media Shared: ${recap.stats.mediaCount.toLocaleString()}`,
      `📅 Most Active Month: ${recap.mostActiveMonth.month}`,
      `⏰ Peak Hour: ${recap.peakHour.hour}:00`,
      "",
      `🧠 My Chat Personality: ${recap.personality}`,
      "",
      "🏆 My Awards:",
      ...recap.awards.map(a => `  ${a.icon} ${a.title}`),
      "",
      "😀 Top Emojis:",
      recap.emojiHallOfFame.map(e => `${e.emoji} (${e.count})`).join(" "),
      "",
      "Generated with Chat Wrapped 2025 ✨"
    ];
    
    return lines.join("\n");
  };

  const handleDownloadImage = () => {
    if (!recap) return;
    
    // Create a canvas-based image
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    
    if (!ctx) return;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1920);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(0.5, "#16213e");
    gradient.addColorStop(1, "#0f0f23");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);
    
    // Add decorative circles
    ctx.beginPath();
    ctx.arc(200, 300, 150, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(168, 85, 247, 0.2)";
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(880, 1600, 200, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(236, 72, 153, 0.15)";
    ctx.fill();
    
    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 72px Space Grotesk, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("2025 Wrapped", 540, 200);
    
    // Emoji
    ctx.font = "120px serif";
    ctx.fillText("🎉", 540, 350);
    
    // Stats
    ctx.font = "bold 48px Space Grotesk, sans-serif";
    ctx.fillStyle = "#a855f7";
    ctx.fillText(recap.stats.totalMessages.toLocaleString(), 540, 500);
    ctx.font = "28px Inter, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText("Total Messages", 540, 550);
    
    ctx.font = "bold 48px Space Grotesk, sans-serif";
    ctx.fillStyle = "#ec4899";
    ctx.fillText(recap.stats.totalWords.toLocaleString(), 540, 680);
    ctx.font = "28px Inter, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText("Words Written", 540, 730);
    
    ctx.font = "bold 48px Space Grotesk, sans-serif";
    ctx.fillStyle = "#3b82f6";
    ctx.fillText(recap.mostActiveMonth.month, 540, 860);
    ctx.font = "28px Inter, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText("Most Active Month", 540, 910);
    
    // Personality
    ctx.font = "bold 36px Space Grotesk, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Your Chat Personality", 540, 1050);
    
    ctx.font = "bold 56px Space Grotesk, sans-serif";
    const personalityGradient = ctx.createLinearGradient(340, 1100, 740, 1100);
    personalityGradient.addColorStop(0, "#a855f7");
    personalityGradient.addColorStop(1, "#ec4899");
    ctx.fillStyle = personalityGradient;
    ctx.fillText(recap.personality, 540, 1130);
    
    // Top Emojis
    ctx.font = "28px Inter, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText("Top Emojis", 540, 1280);
    ctx.font = "64px serif";
    ctx.fillText(recap.emojiHallOfFame.slice(0, 5).map(e => e.emoji).join(" "), 540, 1360);
    
    // Awards
    ctx.font = "28px Inter, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText("Awards Earned", 540, 1500);
    recap.awards.slice(0, 3).forEach((award, i) => {
      ctx.font = "48px serif";
      ctx.fillText(award.icon, 540, 1580 + i * 80);
    });
    
    // Footer
    ctx.font = "24px Inter, sans-serif";
    ctx.fillStyle = "#6b7280";
    ctx.fillText("Chat Wrapped 2025 ✨", 540, 1850);
    
    // Download
    const link = document.createElement("a");
    link.download = "chat-wrapped-2025.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    
    setDownloadedImage(true);
    setTimeout(() => setDownloadedImage(false), 2000);
  };

  const handleDownloadPdf = () => {
    if (!recap) return;
    
    const text = generateRecapText();
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "chat-wrapped-2025.txt";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    
    setDownloadedPdf(true);
    setTimeout(() => setDownloadedPdf(false), 2000);
  };

  const handleShare = (platform: string) => {
    const text = encodeURIComponent("Check out my 2025 Chat Wrapped! 🎉📱");
    const url = encodeURIComponent(window.location.href);
    
    const shareUrls: Record<string, string> = {
      Twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      Facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      WhatsApp: `https://wa.me/?text=${text}%20${url}`,
    };
    
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/10 via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Download Your <span className="gradient-text">2025 Wrapped</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Save and share your chat recap with friends
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              disabled={!hasRecap}
              onClick={handleDownloadImage}
              className={!hasRecap ? "opacity-50 cursor-not-allowed" : ""}
            >
              {downloadedImage ? (
                <Check className="w-5 h-5 mr-2" />
              ) : (
                <Image className="w-5 h-5 mr-2" />
              )}
              {downloadedImage ? "Downloaded!" : "Download as Image"}
            </Button>
            <Button 
              variant="glass" 
              size="lg"
              disabled={!hasRecap}
              onClick={handleDownloadPdf}
              className={!hasRecap ? "opacity-50 cursor-not-allowed" : ""}
            >
              {downloadedPdf ? (
                <Check className="w-5 h-5 mr-2" />
              ) : (
                <FileText className="w-5 h-5 mr-2" />
              )}
              {downloadedPdf ? "Downloaded!" : "Download Summary"}
            </Button>
          </div>

          {!hasRecap && (
            <p className="text-sm text-muted-foreground mt-6">
              Upload a chat file to unlock download options
            </p>
          )}

          {/* Social share buttons */}
          {hasRecap && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <p className="text-sm text-muted-foreground mb-4">Or share directly</p>
              <div className="flex justify-center gap-4">
                {['Twitter', 'WhatsApp', 'Facebook'].map((platform) => (
                  <Button 
                    key={platform} 
                    variant="glass" 
                    size="sm"
                    onClick={() => handleShare(platform)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    {platform}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

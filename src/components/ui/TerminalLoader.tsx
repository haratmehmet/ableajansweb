"use client";

import { useEffect, useState } from "react";

export default function TerminalLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = 62;
    const duration = 1500; // 1.5 seconds
    const interval = 40;
    const steps = duration / interval;
    const stepValue = target / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setProgress(Math.floor(current));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const totalBlocks = 17;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  
  const filledStr = "█".repeat(filledBlocks);
  const emptyStr = "░".repeat(emptyBlocks);

  return (
    <div className="terminal-container">
      <div style={{ position: "absolute", top: "-20%", left: "-20%", width: "70%", height: "70%", background: "radial-gradient(circle, rgba(245, 90, 0, 0.15) 0%, transparent 60%)", pointerEvents: "none", filter: "blur(40px)" }} />
      <style>{`
        .terminal-container {
          position: relative;
          background: rgba(10, 10, 10, 0.4);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          padding: 36px 32px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.02);
          overflow: hidden;
          font-family: 'Fira Code', 'Courier New', monospace;
          color: #fff;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .terminal-header {
          position: relative;
          z-index: 1;
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }

        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          opacity: 0.8;
        }

        .terminal-dot.red { background: rgba(255, 95, 86, 0.8); }
        .terminal-dot.yellow { background: rgba(255, 189, 46, 0.8); }
        .terminal-dot.green { background: rgba(39, 201, 63, 0.8); }

        .terminal-body {
          position: relative;
          z-index: 1;
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
        }

        .terminal-prompt {
          color: rgba(255, 255, 255, 0.5);
          margin-right: 12px;
        }

        .terminal-progress {
          margin-top: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 1.4rem;
        }

        .terminal-blocks, .terminal-percentage, .accent-text {
          background: linear-gradient(135deg, #fff, var(--orange-soft));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
        }

        .terminal-percentage {
          font-family: var(--font-display);
          font-size: 1.6rem;
        }

        .cursor-blink {
          display: inline-block;
          width: 12px;
          height: 1.4rem;
          background: linear-gradient(135deg, #fff, var(--orange-soft));
          margin-left: 12px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
          border-radius: 2px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
      
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
      </div>
      
      <div className="terminal-body">
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "0.02em" }}>
          <span className="terminal-prompt">{">"}</span> 
          <span className="accent-text">Able Ajans Loading Portfolio...</span>
        </div>
        <div className="terminal-progress">
          <span className="terminal-blocks">
            {filledStr}<span style={{ opacity: 0.2 }}>{emptyStr}</span>
          </span>
          <span className="terminal-percentage">{progress}%</span>
          {progress === 62 && <span className="cursor-blink"></span>}
        </div>
      </div>
    </div>
  );
}


import React, { useEffect, useRef } from 'react';
import { Shield, Upload, FileText, Lock } from 'lucide-react';

const securityMessages = [
  { icon: Shield, text: "Industry-leading encryption for all user data" },
  { icon: Lock, text: "SOC 2 Type II compliant infrastructure" },
  { icon: Upload, text: "Zero-knowledge image processing technology" },
  { icon: FileText, text: "Automated data deletion after 30 days" },
  { icon: Shield, text: "No third-party data sharing or sales" },
  { icon: Lock, text: "Regular penetration testing by security experts" },
];

const SecurityTicker = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    
    const clone = ticker.innerHTML;
    ticker.innerHTML += clone;
    
    const animation = ticker.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${ticker.clientWidth / 2}px)` }
      ],
      {
        duration: 30000,
        iterations: Infinity,
        easing: 'linear'
      }
    );
    
    return () => {
      if (animation) animation.cancel();
    };
  }, []);
  
  return (
    <div className="w-full bg-card/50 border-b border-neon-purple/30 overflow-hidden py-2">
      <div className="relative flex items-center">
        <div ref={tickerRef} className="flex space-x-8 whitespace-nowrap">
          {securityMessages.map((item, index) => (
            <div key={index} className="flex items-center gap-2 px-4">
              <item.icon className="h-4 w-4 text-neon-green" />
              <span className="text-xs font-medium text-foreground/90">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityTicker;

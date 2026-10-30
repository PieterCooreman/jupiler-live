import { Trophy, Calendar } from 'lucide-react';
import { LEAGUE_INFO } from '@/lib/api';

export function Header() {
  return (
    <header className="relative overflow-hidden border-b border-white/10">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FF87]/5 via-transparent to-[#06B6D4]/5" />

      <div className="relative mx-auto max-w-6xl px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          {/* Logo area */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#00FF87]/10 ring-1 ring-[#00FF87]/30 sm:h-12 sm:w-12">
              <Trophy className="h-5 w-5 text-[#00FF87] sm:h-6 sm:w-6" />
              <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#00FF87]">
                <span className="text-[9px] font-bold text-black">BE</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white sm:text-2xl">
                {LEAGUE_INFO.name}
              </h1>
              <p className="flex items-center gap-1.5 text-xs text-white/50 sm:text-sm">
                <Calendar className="h-3 w-3" />
                Seizoen {LEAGUE_INFO.season}
              </p>
            </div>
          </div>

          {/* Live indicator */}
          <div className="flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1.5 ring-1 ring-red-500/30">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-xs font-semibold text-red-400">LIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
}

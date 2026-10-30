import type { StandingsRow } from '@/types';
import { Trophy, ArrowDown } from 'lucide-react';

interface StandingsTableProps {
  standings: StandingsRow[];
}

function PositionIndicator({ position }: { position: number }) {
  if (position <= 4) return <Trophy className="h-3.5 w-3.5 text-[#00FF87]" />;
  if (position >= 12 && position <= 13) return <ArrowDown className="h-3.5 w-3.5 text-red-400" />;
  if (position === 14) return <span className="text-xs font-bold text-red-400">↓</span>;
  return null;
}

function PositionBadge({ position }: { position: number }) {
  const isChampions = position <= 4;
  const isRelegation = position >= 12 && position <= 13;
  const isDirectRelegation = position === 14;

  let bgClass = 'bg-white/5 text-white/70';
  if (isChampions) bgClass = 'bg-[#00FF87]/10 text-[#00FF87] ring-1 ring-[#00FF87]/30';
  else if (isRelegation) bgClass = 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20';
  else if (isDirectRelegation) bgClass = 'bg-red-500/20 text-red-300 ring-1 ring-red-500/40';

  return (
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${bgClass}`}>
      {position}
    </span>
  );
}

export function StandingsTable({ standings }: StandingsTableProps) {
  const totalMatches = standings[0]?.played || 28;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      {/* Table header */}
      <div className="grid grid-cols-[40px_1fr_repeat(5,auto)_60px] items-center gap-2 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-white/30 sm:gap-3 sm:px-6">
        <span>#</span>
        <span className="text-left">Team</span>
        <span className="text-center">GS</span>
        <span className="text-center">W</span>
        <span className="text-center">G</span>
        <span className="text-center">V</span>
        <span className="text-center hidden sm:block">GF-GA</span>
        <span className="text-center">PNT</span>
      </div>

      {/* Table body */}
      <div className="divide-y divide-white/5">
        {standings.map((row) => (
          <div
            key={row.team.id}
            className="grid grid-cols-[40px_1fr_repeat(5,auto)_60px] items-center gap-2 px-4 py-3 transition-colors hover:bg-white/[0.03] sm:gap-3 sm:px-6"
          >
            {/* Position */}
            <div className="flex items-center gap-1">
              <PositionBadge position={row.position} />
              <PositionIndicator position={row.position} />
            </div>

            {/* Team name */}
            <span className="text-sm font-semibold text-white truncate">{row.team.name}</span>

            {/* Played */}
            <span className="text-center text-xs text-white/50 sm:text-sm">{row.played}</span>

            {/* Won */}
            <span className="text-center text-xs text-[#00FF87] font-medium sm:text-sm">{row.won}</span>

            {/* Drawn */}
            <span className="text-center text-xs text-white/50 sm:text-sm">{row.drawn}</span>

            {/* Lost */}
            <span className="text-center text-xs text-red-400 font-medium sm:text-sm">{row.lost}</span>

            {/* Goal difference (hidden on mobile) */}
            <span className={`text-center text-xs hidden sm:block ${row.goalDifference > 0 ? 'text-[#00FF87]' : row.goalDifference < 0 ? 'text-red-400' : 'text-white/50'}`}>
              {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
            </span>

            {/* Points */}
            <span className="text-center text-sm font-bold text-white">{row.points}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 border-t border-white/5 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-1.5 text-[10px] text-white/40">
          <span className="h-2 w-2 rounded-full bg-[#00FF87]" />
          Champions League
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/40">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          Degradatie
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import type { Match, GoalEvent, CardEvent, SubstitutionEvent } from '@/types';
import { MapPin, ChevronDown, ChevronUp, ArrowRightLeft } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

function StatusBadge({ status, minute }: { status: string; minute?: number }) {
  const config = {
    live: { label: `LIVE ${minute}'`, color: 'bg-red-500/20 text-red-400 ring-red-500/30' },
    halftime: { label: 'HALFTIME', color: 'bg-yellow-500/20 text-yellow-400 ring-yellow-500/30' },
    finished: { label: 'EINDE', color: 'bg-white/10 text-white/60 ring-white/20' },
    upcoming: { label: 'AANVANGEND', color: 'bg-[#00FF87]/10 text-[#00FF87] ring-[#00FF87]/30' },
    postponed: { label: 'UITGESTELD', color: 'bg-orange-500/20 text-orange-400 ring-orange-500/30' },
  };

  const c = config[status as keyof typeof config] || config.upcoming;

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider ring-1 ${c.color}`}>
      {c.label}
    </span>
  );
}

function ScoreDisplay({ homeScore, awayScore }: { homeScore: number; awayScore: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-3xl font-black text-white sm:text-4xl">{homeScore}</span>
      <span className="text-lg font-medium text-white/30">-</span>
      <span className="text-3xl font-black text-white sm:text-4xl">{awayScore}</span>
    </div>
  );
}

function EventIcon({ type }: { type: string }) {
  if (type === 'goal') return <ArrowRightLeft className="h-3 w-3 text-[#00FF87]" />;
  if (type === 'yellow') return <span className="inline-block h-2.5 w-1.5 rounded-sm bg-yellow-400" />;
  if (type === 'red') return <span className="inline-block h-2.5 w-1.5 rounded-sm bg-red-500" />;
  return null;
}

function MatchDetails({ match }: { match: Match }) {
  const [expanded, setExpanded] = useState(false);

  if (match.status === 'upcoming') return null;

  return (
    <div className="mt-3 border-t border-white/5 pt-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-xs font-medium text-white/40 transition-colors hover:text-white/70"
      >
        <span>Wedstrijd details</span>
        {expanded ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )}
      </button>

      {expanded && (
        <div className="mt-3 space-y-4">
          {/* Goals */}
          {match.goals.length > 0 && (
            <div>
              <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/30">Doelpunten</h4>
              <div className="space-y-1.5">
                {match.goals.map((goal, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <EventIcon type={goal.type} />
                    <span className={`font-medium ${goal.teamId === match.homeTeam.id ? 'text-[#00FF87]' : 'text-[#06B6D4]'}`}>
                      {goal.player}
                    </span>
                    <span className="text-white/30">{goal.minute}'</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cards */}
          {match.cards.length > 0 && (
            <div>
              <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/30">Kaarten</h4>
              <div className="space-y-1.5">
                {match.cards.map((card, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <EventIcon type={card.type} />
                    <span className={`font-medium ${card.teamId === match.homeTeam.id ? 'text-[#00FF87]' : 'text-[#06B6D4]'}`}>
                      {card.player}
                    </span>
                    <span className="text-white/30">{card.minute}'</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Substitutions */}
          {match.substitutions.length > 0 && (
            <div>
              <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/30">Wissels</h4>
              <div className="space-y-1.5">
                {match.substitutions.map((sub, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <ArrowRightLeft className="h-3 w-3 text-white/40" />
                    <span className={`font-medium ${sub.teamId === match.homeTeam.id ? 'text-[#00FF87]' : 'text-[#06B6D4]'}`}>
                      {sub.playerOut} → {sub.playerIn}
                    </span>
                    <span className="text-white/30">{sub.minute}'</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-[#00FF87]/30 hover:bg-white/[0.05] sm:p-5">
      {/* Live glow effect */}
      {match.status === 'live' && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-[#00FF87]/5 opacity-0 transition-opacity group-hover:opacity-100" />
      )}

      <div className="relative">
        {/* Header row */}
        <div className="mb-3 flex items-center justify-between sm:mb-4">
          <StatusBadge status={match.status} minute={match.minute} />
          <div className="flex items-center gap-1.5 text-[10px] text-white/30">
            <MapPin className="h-3 w-3" />
            {match.venue}
          </div>
        </div>

        {/* Teams & Score */}
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          {/* Home team */}
          <div className="flex flex-1 flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-[#00FF87] ring-1 ring-white/10 sm:h-10 sm:w-10 sm:text-sm">
              {match.homeTeam.shortName}
            </div>
            <span className="text-sm font-semibold text-white sm:text-base">{match.homeTeam.name}</span>
          </div>

          {/* Score */}
          <ScoreDisplay homeScore={match.homeScore} awayScore={match.awayScore} />

          {/* Away team */}
          <div className="flex flex-1 flex-col items-end gap-2 sm:flex-row-reverse sm:items-center sm:gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-[#06B6D4] ring-1 ring-white/10 sm:h-10 sm:w-10 sm:text-sm">
              {match.awayTeam.shortName}
            </div>
            <span className="text-sm font-semibold text-white sm:text-base">{match.awayTeam.name}</span>
          </div>
        </div>

        {/* Match details */}
        <MatchDetails match={match} />
      </div>
    </div>
  );
}

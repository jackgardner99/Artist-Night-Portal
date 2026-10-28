import { useId } from "react"

// min = signups needed to reach the tier; colors run highlight → base → shadow
const TIERS = [
    { name: "Bronze", min: 0, colors: ["#f0b98a", "#b8733a", "#6e3f1c"] },
    { name: "Silver", min: 10, colors: ["#f4f6fa", "#b4bccb", "#6f7787"] },
    { name: "Gold", min: 25, colors: ["#fff1b8", "#e2b33c", "#8f6a10"] },
    { name: "Platinum", min: 50, colors: ["#ffffff", "#d9e4f5", "#8fa2c4"] },
]

const GROOVES = [22, 25, 28, 31, 34, 37, 40, 43]

const getRecordTier = (count) => TIERS.findLast((tier) => count >= tier.min)

// compact: a small disc with the tier and count on one line, for lists and cards
export const RecordBadge = ({ count = 0, compact = false }) => {
    const id = useId()
    const tier = getRecordTier(count)
    const next = TIERS[TIERS.indexOf(tier) + 1]
    const [light, base, dark] = tier.colors

    const disc = (
        <svg className="record-disc" viewBox="0 0 100 100" role="img" aria-label={`${tier.name} record`}>
            <defs>
                <linearGradient id={`${id}-disc`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor={light} />
                    <stop offset="0.5" stopColor={base} />
                    <stop offset="1" stopColor={dark} />
                </linearGradient>
                {/* Punches the spindle hole through so the page shows behind it */}
                <mask id={`${id}-hole`}>
                    <rect width="100" height="100" fill="white" />
                    <circle cx="50" cy="50" r="2.5" fill="black" />
                </mask>
            </defs>
            <g mask={`url(#${id}-hole)`}>
                <circle cx="50" cy="50" r="48" fill={`url(#${id}-disc)`} stroke={dark} strokeWidth="1" />
                {GROOVES.map((r) => (
                    <circle key={r} cx="50" cy="50" r={r} fill="none" stroke={dark} strokeOpacity="0.35" strokeWidth="0.6" />
                ))}
                {/* Light glinting off the vinyl */}
                <path d="M50 50 L26 8.4 A48 48 0 0 1 41.7 2.7 Z" fill="white" opacity="0.3" />
                <path d="M50 50 L74 91.6 A48 48 0 0 1 58.3 97.3 Z" fill="white" opacity="0.3" />
                <circle cx="50" cy="50" r="16" fill={dark} />
                <circle cx="50" cy="50" r="13" fill="none" stroke={light} strokeOpacity="0.5" strokeWidth="0.8" />
            </g>
        </svg>
    )

    if (compact) {
        return (
            <span className="record-badge-compact" title={`${tier.name} Record: ${count} open mic ${count === 1 ? "signup" : "signups"}`}>
                {disc}
                <span style={{ color: base }}>{tier.name}</span>
                <span className="text-muted">· {count}</span>
            </span>
        )
    }

    return (
        <div className="record-badge" title={`${tier.name} Record`}>
            {disc}
            <div>
                <div className="record-badge-title" style={{ color: base }}>{tier.name} Record</div>
                <div className="text-secondary">
                    {count} open mic {count === 1 ? "signup" : "signups"}
                </div>
                {next && (
                    <div className="text-muted record-badge-next">
                        {next.min - count} more to {next.name}
                    </div>
                )}
            </div>
        </div>
    )
}

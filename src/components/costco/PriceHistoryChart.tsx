'use client'

import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { PriceHistoryChartProps } from '@/types/costco'

/**
 * CSS-only price history chart for Costco products
 * Shows price trends over time with SVG visualization
 */
export function PriceHistoryChart({ history, currentPrice }: PriceHistoryChartProps) {
  if (!history || history.length === 0) {
    return (
      <div className="bg-cream rounded-card p-6 text-center">
        <p className="text-muted">No price history available yet</p>
        <p className="text-sm text-muted mt-1">Check back later as we track prices over time</p>
      </div>
    )
  }

  // Sort history by date (oldest first for chart)
  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime()
  )

  // Get prices (use price_min for trend, fallback to price)
  const prices = sortedHistory.map(h => h.price_min ?? h.price ?? 0).filter(p => p > 0)

  if (prices.length === 0) {
    return (
      <div className="bg-cream rounded-card p-6 text-center">
        <p className="text-muted">Price data not available</p>
      </div>
    )
  }

  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const priceRange = maxPrice - minPrice || 1

  // Chart dimensions
  const width = 400
  const height = 120
  const padding = { top: 10, right: 10, bottom: 20, left: 10 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Generate SVG path points
  const points = prices.map((price, index) => {
    const x = padding.left + (index / (prices.length - 1 || 1)) * chartWidth
    const y = padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight
    return { x, y, price }
  })

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  // Area path (for shading under the line)
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`

  // Calculate trend
  const firstPrice = prices[0]
  const lastPrice = prices[prices.length - 1]
  const priceDiff = lastPrice - firstPrice
  const percentChange = ((priceDiff / firstPrice) * 100).toFixed(1)

  // Find lowest price point
  const lowestIndex = prices.indexOf(minPrice)
  const lowestPoint = points[lowestIndex]

  // Determine if price dropped recently (within last 3 entries)
  const recentDropped = prices.length >= 2 && prices[prices.length - 1] < prices[prices.length - 2]

  return (
    <div className="bg-white border border-silver-light rounded-card p-4">
      {/* Header with trend indicator */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-charcoal">Price History</h3>
        <div className="flex items-center gap-2">
          {priceDiff < 0 ? (
            <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
              <TrendingDown size={16} />
              {Math.abs(parseFloat(percentChange))}% down
            </span>
          ) : priceDiff > 0 ? (
            <span className="inline-flex items-center gap-1 text-red-600 text-sm font-medium">
              <TrendingUp size={16} />
              {percentChange}% up
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-muted text-sm font-medium">
              <Minus size={16} />
              Stable
            </span>
          )}
        </div>
      </div>

      {/* Price dropped badge */}
      {recentDropped && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-sm font-medium px-2.5 py-1 rounded-full">
            <TrendingDown size={14} />
            Price dropped!
          </span>
        </div>
      )}

      {/* SVG Chart */}
      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[300px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Gradient definition */}
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Area under line */}
          <path d={areaD} fill="url(#priceGradient)" />

          {/* Price line */}
          <path
            d={pathD}
            fill="none"
            stroke="#dc2626"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={index === lowestIndex ? 5 : 3}
              fill={index === lowestIndex ? '#16a34a' : '#dc2626'}
              stroke="white"
              strokeWidth="1.5"
            />
          ))}

          {/* Lowest price label */}
          {lowestPoint && (
            <text
              x={lowestPoint.x}
              y={lowestPoint.y - 10}
              textAnchor="middle"
              className="text-xs fill-green-600 font-medium"
            >
              ${minPrice.toFixed(2)}
            </text>
          )}

          {/* Y-axis labels */}
          <text
            x={padding.left}
            y={padding.top + 10}
            className="text-xs fill-muted"
          >
            ${maxPrice.toFixed(0)}
          </text>
          <text
            x={padding.left}
            y={height - padding.bottom - 5}
            className="text-xs fill-muted"
          >
            ${minPrice.toFixed(0)}
          </text>
        </svg>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-silver-light">
        <div className="text-center">
          <div className="text-lg font-bold text-charcoal">${minPrice.toFixed(2)}</div>
          <div className="text-xs text-muted">Lowest</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-charcoal">${maxPrice.toFixed(2)}</div>
          <div className="text-xs text-muted">Highest</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-charcoal">{history.length}</div>
          <div className="text-xs text-muted">Data points</div>
        </div>
      </div>
    </div>
  )
}

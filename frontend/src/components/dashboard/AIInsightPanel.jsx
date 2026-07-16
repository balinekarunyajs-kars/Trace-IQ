import React from 'react'
import { Brain, TrendingUp, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react'

const RiskFactor = ({ label, value, max = 35 }) => {
  const pct   = Math.min((value / max) * 100, 100)
  const color = value >= 30 ? '#FF2D55' : value >= 20 ? '#FF9F0A' : '#FFD60A'
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-[11px]" style={{ color: '#8BA0BF' }}>{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold" style={{ color }}>{value} pts</span>
        </div>
      </div>
      <div className="risk-bar-track">
        <div
          className="risk-bar-fill"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}99, ${color})`, boxShadow: `0 0 8px ${color}60` }}
        />
      </div>
    </div>
  )
}

export default function AIInsightPanel({ investigation }) {
  if (!investigation) return null
  const { executive_summary, behaviour_analysis, risk_breakdown, confidence_score, case: c } = investigation

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-slide-up">

      {/* ── Executive Summary ─────────────────────────────── */}
      <div
        className="card p-5 lg:col-span-2"
        style={{ borderTopColor: '#BF5AF2', borderTopWidth: '2px' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: '#BF5AF215', border: '1px solid #BF5AF240', boxShadow: '0 0 12px #BF5AF230' }}
          >
            <Brain className="w-4 h-4" style={{ color: '#BF5AF2' }} />
          </div>
          <div className="flex-1">
            <h3 className="font-mono text-xs font-bold tracking-wider" style={{ color: '#E8F0FE' }}>
              AI EXECUTIVE SUMMARY
            </h3>
            <p className="font-mono text-[9px]" style={{ color: '#3D5570' }}>
              Confidence Score: <span style={{ color: '#BF5AF2' }}>{confidence_score}%</span>
            </p>
          </div>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
            style={{ background: '#BF5AF212', border: '1px solid #BF5AF230' }}
          >
            <div className="animate-glow-breathe w-1.5 h-1.5 rounded-full" style={{ background: '#BF5AF2' }} />
            <span className="font-mono text-[9px] font-bold tracking-widest" style={{ color: '#BF5AF2' }}>AI GENERATED</span>
          </div>
        </div>

        {/* Summary text */}
        <div
          className="p-4 rounded-lg mb-5"
          style={{ background: '#030812', border: '1px solid #BF5AF220', borderLeft: '3px solid #BF5AF2' }}
        >
          <p className="text-sm leading-relaxed italic" style={{ color: '#8BA0BF' }}>
            "{executive_summary || 'Generating analysis...'}"
          </p>
        </div>

        {/* Anomaly signals */}
        {behaviour_analysis && behaviour_analysis.length > 0 && (
          <div>
            <p className="section-label mb-3">Anomaly Signals Detected</p>
            <div className="space-y-2">
              {behaviour_analysis.map((signal, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ background: '#FF2D5508', border: '1px solid #FF2D5520', borderLeft: '2px solid #FF2D55' }}
                >
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#FF2D55' }} />
                  <span className="text-xs" style={{ color: '#E8F0FE' }}>{signal}</span>
                  <span
                    className="ml-auto font-mono text-[9px] font-bold flex-shrink-0 px-1.5 py-0.5 rounded"
                    style={{ background: '#FF2D5515', color: '#FF2D55' }}
                  >
                    ANOMALY
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Risk Breakdown + Recommendations ─────────────── */}
      <div className="space-y-5">

        {/* Risk Breakdown */}
        {risk_breakdown && Object.keys(risk_breakdown).length > 0 && (
          <div
            className="card p-5"
            style={{ borderTopColor: '#FF2D55', borderTopWidth: '2px' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4" style={{ color: '#FF2D55' }} />
              <h3 className="font-mono text-xs font-bold tracking-wider" style={{ color: '#E8F0FE' }}>
                RISK BREAKDOWN
              </h3>
            </div>
            {Object.entries(risk_breakdown).map(([label, value]) => (
              <RiskFactor key={label} label={label} value={value} />
            ))}
            <div
              className="mt-4 pt-3 flex items-center justify-between"
              style={{ borderTop: '1px solid #112035' }}
            >
              <span className="font-mono text-[10px]" style={{ color: '#3D5570' }}>TOTAL RISK SCORE</span>
              <div className="flex items-center gap-2">
                <span
                  className="font-orbitron text-xl font-bold"
                  style={{ color: '#FF2D55', textShadow: '0 0 12px #FF2D5560' }}
                >
                  {c?.risk_score ?? 0}
                </span>
                <span className="font-mono text-xs" style={{ color: '#3D5570' }}>/100</span>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {c?.recommendations && c.recommendations.length > 0 && (
          <div
            className="card p-5"
            style={{ borderTopColor: '#30D158', borderTopWidth: '2px' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-4 h-4" style={{ color: '#30D158' }} />
              <h3 className="font-mono text-xs font-bold tracking-wider" style={{ color: '#E8F0FE' }}>
                AI RECOMMENDATIONS
              </h3>
            </div>
            <div className="space-y-2.5">
              {c.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#30D15815', border: '1px solid #30D15830' }}
                  >
                    <span className="font-mono text-[9px] font-bold" style={{ color: '#30D158' }}>{i + 1}</span>
                  </div>
                  <p className="text-xs leading-snug" style={{ color: '#8BA0BF' }}>{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

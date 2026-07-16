import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";

import {
  threatDistribution,
  riskDistribution,
  investigationTrend
} from "../data/analyticsData";

const COLORS = ["#00C2FF", "#2563EB", "#22C55E", "#EF4444"];

export default function Analytics() {
  return (
    <div className="p-6 bg-[#08111F] min-h-screen text-white">

      <h1 className="text-3xl font-bold mb-8">
        Security Analytics
      </h1>

      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-[#101B2D] rounded-xl p-6">
          <p className="text-gray-400">Detection Accuracy</p>
          <h2 className="text-3xl font-bold text-cyan-400">
            96.8%
          </h2>
        </div>

        <div className="bg-[#101B2D] rounded-xl p-6">
          <p className="text-gray-400">Avg Investigation</p>
          <h2 className="text-3xl font-bold text-green-400">
            5.8s
          </h2>
        </div>

        <div className="bg-[#101B2D] rounded-xl p-6">
          <p className="text-gray-400">False Positives</p>
          <h2 className="text-3xl font-bold text-red-400">
            2.1%
          </h2>
        </div>

        <div className="bg-[#101B2D] rounded-xl p-6">
          <p className="text-gray-400">Transactions Analysed</p>
          <h2 className="text-3xl font-bold text-yellow-400">
            18,430
          </h2>
        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-[#101B2D] rounded-xl p-6 h-[400px]">

          <h2 className="mb-4 text-xl font-semibold">
            Threat Distribution
          </h2>

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={threatDistribution}
                dataKey="value"
                outerRadius={120}
                label
              >
                {threatDistribution.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-[#101B2D] rounded-xl p-6 h-[400px]">

          <h2 className="mb-4 text-xl font-semibold">
            Risk Distribution
          </h2>

          <ResponsiveContainer>

            <BarChart data={riskDistribution}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="level" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count" fill="#00C2FF" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="bg-[#101B2D] rounded-xl mt-6 p-6 h-[400px]">

        <h2 className="mb-4 text-xl font-semibold">
          Weekly Investigation Trend
        </h2>

        <ResponsiveContainer>

          <LineChart data={investigationTrend}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="investigations"
              stroke="#00C2FF"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}
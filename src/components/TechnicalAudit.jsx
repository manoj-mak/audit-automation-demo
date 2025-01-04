import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import technicalAuditData from "../results/technical-audit.json";

const MetricCard = ({ title, value, description }) => {
  const getGradient = (title) => {
    switch (title.toLowerCase()) {
      case "performance":
        return "from-green-600 to-emerald-600";
      case "accessibility":
        return "from-blue-600 to-indigo-600";
      case "best practices":
        return "from-purple-600 to-violet-600";
      case "seo":
        return "from-rose-600 to-pink-600";
      case "lcp":
        return "from-amber-600 to-yellow-600";
      case "fid":
        return "from-cyan-600 to-sky-600";
      case "cls":
        return "from-red-600 to-rose-600";
      case "tti":
        return "from-indigo-600 to-blue-600";
      default:
        return "from-gray-600 to-slate-600";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardHeader className="space-y-1">
        <CardTitle
          className={`text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r ${getGradient(
            title
          )}`}
        >
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-gray-800 animate-in fade-in">
          {value}
        </p>
      </CardContent>
    </Card>
  );
};

const OpportunityCard = ({ name, score, description, savings }) => (
  <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-gray-800">
        {name}
      </CardTitle>
      <CardDescription className="flex items-center gap-2">
        Score: <span className="text-blue-600 font-medium">{score}</span>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{description}</p>
      <p className="mt-2 font-medium text-green-600">
        Potential savings: {savings}ms
      </p>
    </CardContent>
  </Card>
);

const ResourcesChart = ({ resources }) => {
  const data = Object.entries(resources.byType).map(
    ([type, { count, size }]) => ({
      type,
      count,
      size: size / 1024,
    })
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} className="mt-4">
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="type" stroke="#6b7280" />
        <YAxis yAxisId="left" orientation="left" stroke="#8b5cf6" />
        <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="count"
          fill="#8b5cf6"
          name="Count"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          yAxisId="right"
          dataKey="size"
          fill="#3b82f6"
          name="Size (KB)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const ComparisonChart = ({ data, dataKey, title }) => (
  <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-gray-800">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="url" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend />
          <Bar dataKey={dataKey} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const TTIComparisonChart = ({ data }) => (
  <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-gray-800">
        Time to Interactive (TTI) Comparison
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="url" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="tti"
            stroke="#8b5cf6"
            strokeWidth={2}
            activeDot={{ r: 8, fill: "#8b5cf6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default function TechnicalAudit() {
  const prepareComparisonData = (device) => {
    return technicalAuditData[device].map((audit) => ({
      url: new URL(audit.url).pathname,
      performance: audit.metrics.performance,
      accessibility: audit.metrics.accessibility,
      bestPractices: audit.metrics.bestPractices,
      seo: audit.metrics.seo,
      tti: audit.metrics.tti,
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Tabs defaultValue="mobile" className="space-y-6">
        <div className="sticky top-0 z-10 bg-gray-50 pt-4 pb-2">
          <TabsList className="bg-white shadow-md rounded-xl p-1 w-full max-w-md mx-auto">
            <TabsTrigger
              value="mobile"
              className="w-1/2 px-6 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              📱 Mobile
            </TabsTrigger>
            <TabsTrigger
              value="desktop"
              className="w-1/2 px-6 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              💻 Desktop
            </TabsTrigger>
          </TabsList>
        </div>

        {["mobile", "desktop"].map((device) => (
          <TabsContent key={device} value={device} className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
                Comparison Charts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ComparisonChart
                  data={prepareComparisonData(device)}
                  dataKey="performance"
                  title="Performance Comparison"
                />
                <ComparisonChart
                  data={prepareComparisonData(device)}
                  dataKey="accessibility"
                  title="Accessibility Comparison"
                />
                <ComparisonChart
                  data={prepareComparisonData(device)}
                  dataKey="bestPractices"
                  title="Best Practices Comparison"
                />
                <ComparisonChart
                  data={prepareComparisonData(device)}
                  dataKey="seo"
                  title="SEO Comparison"
                />
              </div>
              <TTIComparisonChart data={prepareComparisonData(device)} />
            </div>

            {technicalAuditData[device].map((audit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
                  {audit.url}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <MetricCard
                    title="Performance"
                    value={audit.metrics.performance}
                    description="Overall performance score"
                  />
                  <MetricCard
                    title="Accessibility"
                    value={audit.metrics.accessibility}
                    description="Accessibility score"
                  />
                  <MetricCard
                    title="Best Practices"
                    value={audit.metrics.bestPractices}
                    description="Best practices score"
                  />
                  <MetricCard
                    title="SEO"
                    value={audit.metrics.seo}
                    description="SEO score"
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <MetricCard
                    title="LCP"
                    value={`${audit.metrics.lcp.toFixed(2)}ms`}
                    description="Largest Contentful Paint"
                  />
                  <MetricCard
                    title="FID"
                    value={`${audit.metrics.fid}ms`}
                    description="First Input Delay"
                  />
                  <MetricCard
                    title="CLS"
                    value={audit.metrics.cls.toFixed(3)}
                    description="Cumulative Layout Shift"
                  />
                  <MetricCard
                    title="TTI"
                    value={`${audit.metrics.tti.toFixed(2)}ms`}
                    description="Time to Interactive"
                  />
                </div>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResourcesChart resources={audit.resources} />
                  </CardContent>
                </Card>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Opportunities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {audit.opportunities.map((opportunity, i) => (
                      <OpportunityCard key={i} {...opportunity} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsivePie } from "@nivo/pie";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Link2,
  UnplugIcon,
  Shield,
  GanttChart,
  Search,
  FileJson,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import seoAuditData from "../results/seo-audit.json";

const MetricCard = ({ title, value, description }) => (
  <Card className="bg-gradient-to-br from-white to-gray-50 shadow hover:shadow-md transition-all">
    <CardHeader className="space-y-1">
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

const LinksPieChart = ({ data }) => {
  const chartData = [
    {
      id: "Internal Links",
      value: data.links.internalLinks,
      color: "rgb(94, 53, 177)",
    },
    {
      id: "External Links",
      value: data.links.externalLinks,
      color: "rgb(57, 73, 171)",
    },
    {
      id: "Broken Links",
      value: data.links.brokenLinks.length,
      color: "rgb(211, 47, 47)",
    },
  ];

  return (
    <div className="h-[300px]">
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "set3" }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#ffffff"
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 120,
            itemHeight: 18,
            itemTextColor: "#666",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
      />
    </div>
  );
};

const AuditSection = ({ title, icon: Icon, children, className = "" }) => (
  <Card
    className={`shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
  >
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
        <Icon className="w-5 h-5" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const BrokenLinksList = ({ links }) => (
  <div className="space-y-2">
    {links.map((link, index) => (
      <Alert key={index} className="border-l-4 border-red-500 bg-red-50">
        <AlertTitle className="flex items-center gap-2 text-red-700">
          <UnplugIcon className="w-4 h-4 text-red-500" />
          Broken Link
        </AlertTitle>
        <AlertDescription className="mt-2">
          <div className="font-medium text-red-900">{link.url}</div>
          <div className="text-sm mt-1 text-red-700">
            {link.statusCode ? `Status Code: ${link.statusCode}` : link.error}
          </div>
        </AlertDescription>
      </Alert>
    ))}
  </div>
);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const AuditScore = ({ score, title }) => (
  <div className="flex items-center gap-2">
    {score >= 80 ? (
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : score >= 50 ? (
      <AlertTriangle className="w-5 h-5 text-yellow-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    )}
    <span className="font-medium">{title}:</span>
    <span
      className={`
      px-2 py-1 rounded-full text-sm
      ${
        score >= 80
          ? "bg-green-100 text-green-800"
          : score >= 50
          ? "bg-yellow-100 text-yellow-800"
          : "bg-red-100 text-red-800"
      }
    `}
    >
      {score}
    </span>
  </div>
);

export default function SEOAudit() {
  return (
    <div className="space-y-8 p-6 bg-gray-50">
      {seoAuditData.map((data, index) => (
        <div key={index} className="space-y-6">
          <Card className="bg-white shadow-lg">
            <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-xl font-bold break-all">
                {data.url}
              </CardTitle>
              <CardDescription>
                Last Scanned: {formatDate(data.timestamp)}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Lighthouse Scores */}
              <AuditSection title="Lighthouse Scores" icon={GanttChart}>
                <div className="space-y-2">
                  <AuditScore score={data.lighthouse.scores.seo} title="SEO" />
                  <AuditScore
                    score={data.lighthouse.scores.bestPractices}
                    title="Best Practices"
                  />
                </div>
              </AuditSection>

              {/* Links Analysis */}
              <AuditSection title="Links Analysis" icon={Link2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <MetricCard
                        title="Total Links"
                        value={data.links.totalLinks}
                      />
                      <MetricCard
                        title="Unique Links"
                        value={data.links.uniqueLinks}
                      />
                      <MetricCard
                        title="Internal Links"
                        value={data.links.internalLinks}
                      />
                      <MetricCard
                        title="External Links"
                        value={data.links.externalLinks}
                      />
                    </div>
                  </div>
                  <LinksPieChart data={data} />
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Broken Links</h3>
                  <BrokenLinksList links={data.links.brokenLinks} />
                </div>
              </AuditSection>

              {/* SSL Certificate */}
              <AuditSection title="SSL Certificate" icon={Shield}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Status</h3>
                    <Alert
                      className={`border-l-4 ${
                        data.ssl.valid
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                      }`}
                    >
                      <AlertTitle className="flex items-center gap-2">
                        {data.ssl.valid ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span
                          className={
                            data.ssl.valid ? "text-green-700" : "text-red-700"
                          }
                        >
                          {data.ssl.valid
                            ? "Valid SSL Certificate"
                            : "Invalid SSL Certificate"}
                        </span>
                      </AlertTitle>
                      <AlertDescription
                        className={`mt-2 ${
                          data.ssl.valid ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Protocol:</span>{" "}
                            {data.ssl.protocol}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Cipher:</span>{" "}
                            {data.ssl.cipher.name}
                          </div>
                          {data.ssl.daysUntilExpiration && (
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Expires in:</span>{" "}
                              {data.ssl.daysUntilExpiration} days
                            </div>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                  </div>
                  {data.ssl.issuer && (
                    <div>
                      <h3 className="font-semibold mb-2">
                        Certificate Details
                      </h3>
                      <div className="p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 text-blue-700">
                        <p>
                          <span className="font-medium">Issuer:</span>{" "}
                          {data.ssl.issuer.O}
                        </p>
                        <p>
                          <span className="font-medium">Valid From:</span>{" "}
                          {data.ssl.validFrom}
                        </p>
                        <p>
                          <span className="font-medium">Valid To:</span>{" "}
                          {data.ssl.validTo}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </AuditSection>

              {/* Crawlability */}
              <AuditSection title="Crawlability" icon={Search}>
                <div className="space-y-4">
                  <Alert
                    variant={
                      data.crawlability.robotsTxt.exists
                        ? "default"
                        : "destructive"
                    }
                  >
                    <AlertTitle className="flex items-center gap-2">
                      <FileJson className="w-4 h-4" />
                      robots.txt
                    </AlertTitle>
                    <AlertDescription>
                      <div className="mt-2">
                        <p>
                          Status:{" "}
                          {data.crawlability.robotsTxt.exists
                            ? "Found"
                            : "Not Found"}
                        </p>
                        {data.crawlability.robotsTxt.exists && (
                          <pre className="mt-2 p-2 bg-gray-50 rounded-lg text-sm overflow-x-auto">
                            {data.crawlability.robotsTxt.content}
                          </pre>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>

                  <Alert
                    variant={
                      data.crawlability.sitemap.exists
                        ? "default"
                        : "destructive"
                    }
                  >
                    <AlertTitle className="flex items-center gap-2">
                      <FileJson className="w-4 h-4" />
                      Sitemap
                    </AlertTitle>
                    <AlertDescription>
                      <div className="mt-2">
                        <p>
                          Status:{" "}
                          {data.crawlability.sitemap.exists
                            ? "Found"
                            : "Not Found"}
                        </p>
                        {data.crawlability.sitemap.exists && (
                          <p className="mt-2 text-sm">
                            URL: {data.crawlability.sitemap.url}
                          </p>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              </AuditSection>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}

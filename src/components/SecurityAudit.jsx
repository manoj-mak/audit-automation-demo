import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lock,
  FileWarning,
  Server,
  Key,
  Mail,
  Globe,
  ShieldAlert,
} from "lucide-react";
import securityAuditData from "../results/security-audit.json";

const MetricCard = ({ title, value, icon: Icon, description }) => (
  <Card className="bg-gradient-to-br from-white to-gray-50 shadow hover:shadow-md transition-all">
    <CardHeader className="space-y-1">
      <CardTitle className="text-lg font-semibold flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5" />}
        {title}
      </CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

const SecurityScore = ({ score }) => (
  <div className="flex items-center gap-2">
    {score >= 80 ? (
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : score >= 60 ? (
      <AlertTriangle className="w-5 h-5 text-yellow-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    )}
    <span
      className={`
        px-3 py-1 rounded-full text-sm font-medium
        ${
          score >= 80
            ? "bg-green-100 text-green-800"
            : score >= 60
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }
      `}
    >
      Security Score: {score}
    </span>
  </div>
);

const AuditSection = ({ title, icon: Icon, children }) => (
  <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
        <Icon className="w-5 h-5" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const SecurityHeaders = ({ headers }) => (
  <div className="space-y-4">
    {Object.keys(headers.present).length > 0 && (
      <div>
        <h3 className="text-lg font-semibold mb-2">Present Headers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(headers.present).map(([header, data]) => (
            <Alert
              key={header}
              className="border-l-4 border-green-500 bg-green-50"
            >
              <AlertTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="w-4 h-4" />
                {header}
              </AlertTitle>
              <AlertDescription className="mt-2 text-green-600">
                Value: {data.value}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    )}

    {headers.missing.length > 0 && (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Missing Headers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {headers.missing.map((header, index) => (
            <Alert key={index} className="border-l-4 border-red-500 bg-red-50">
              <AlertTitle className="flex items-center gap-2 text-red-700">
                <XCircle className="w-4 h-4" />
                {header}
              </AlertTitle>
            </Alert>
          ))}
        </div>
      </div>
    )}

    {headers.recommendations?.length > 0 && (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
        <div className="space-y-2">
          {headers.recommendations.map((rec, index) => (
            <Alert
              key={index}
              className="border-l-4 border-blue-500 bg-blue-50"
            >
              <AlertTitle className="flex items-center gap-2 text-blue-700">
                <AlertTriangle className="w-4 h-4" />
                {rec}
              </AlertTitle>
            </Alert>
          ))}
        </div>
      </div>
    )}
  </div>
);

const SSLAnalysis = ({ ssl }) => (
  <Alert
    className={`border-l-4 ${
      ssl.certificate.valid
        ? "border-green-500 bg-green-50"
        : "border-red-500 bg-red-50"
    }`}
  >
    <AlertTitle className="flex items-center gap-2">
      {ssl.certificate.valid ? (
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500" />
      )}
      <span
        className={ssl.certificate.valid ? "text-green-700" : "text-red-700"}
      >
        SSL Certificate Status
      </span>
    </AlertTitle>
    <AlertDescription className="mt-4 space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="font-medium">Protocol: {ssl.protocol.name}</p>
          <p className="font-medium">Cipher: {ssl.cipher.name}</p>
          <p
            className={`font-medium ${
              ssl.protocol.secure ? "text-green-700" : "text-red-700"
            }`}
          >
            Protocol Security: {ssl.protocol.secure ? "Secure" : "Insecure"}
          </p>
          <p
            className={`font-medium ${
              ssl.cipher.secure ? "text-green-700" : "text-red-700"
            }`}
          >
            Cipher Security: {ssl.cipher.secure ? "Secure" : "Insecure"}
          </p>
        </div>
      </div>
    </AlertDescription>
  </Alert>
);

const ExposedData = ({ data }) => (
  <div className="space-y-4">
    {data.exposedPaths?.length > 0 && (
      <div>
        <h3 className="text-lg font-semibold mb-2">Exposed Sensitive Paths</h3>
        <div className="grid grid-cols-1 gap-4">
          {data.exposedPaths.map((path, index) => (
            <Alert
              key={index}
              className="border-l-4 border-yellow-500 bg-yellow-50"
            >
              <AlertTitle className="flex items-center gap-2 text-yellow-700">
                <FileWarning className="w-4 h-4" />
                {path.path}
              </AlertTitle>
              <AlertDescription className="mt-2 text-yellow-600">
                Status: {path.status}
                <br />
                Size: {path.contentLength} bytes
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    )}

    {data.sensitiveFiles?.length > 0 && (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Exposed Sensitive Data</h3>
        {data.sensitiveFiles.map((file, index) => (
          <Alert key={index} className="border-l-4 border-red-500 bg-red-50">
            <AlertTitle className="flex items-center gap-2 text-red-700">
              <Mail className="w-4 h-4" />
              {file.type}s Found
            </AlertTitle>
            <AlertDescription className="mt-2 text-red-600">
              Count: {file.count}
            </AlertDescription>
          </Alert>
        ))}
      </div>
    )}

    {data.recommendations?.length > 0 && (
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Security Recommendations</h3>
        <div className="space-y-2">
          {data.recommendations.map((rec, index) => (
            <Alert
              key={index}
              className="border-l-4 border-blue-500 bg-blue-50"
            >
              <AlertTitle className="flex items-center gap-2 text-blue-700">
                <AlertTriangle className="w-4 h-4" />
                {rec}
              </AlertTitle>
            </Alert>
          ))}
        </div>
      </div>
    )}
  </div>
);

const CommonIssues = ({ issues }) => (
  <div className="space-y-2">
    {issues.map((issue, index) => (
      <Alert key={index} className="border-l-4 border-yellow-500 bg-yellow-50">
        <AlertTitle className="flex items-center gap-2 text-yellow-700">
          <AlertTriangle className="w-4 h-4" />
          {issue}
        </AlertTitle>
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

export default function SecurityAudit() {
  return (
    <div className="space-y-8 p-6 bg-gray-50">
      {/* Summary Section */}
      <Card className="bg-white shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-xl font-bold">
            Security Audit Summary
          </CardTitle>
          <CardDescription>
            Overall security assessment and key metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total URLs"
              value={securityAuditData.summary.totalUrls}
              icon={Globe}
            />
            <MetricCard
              title="Completed Audits"
              value={securityAuditData.summary.completedAudits}
              icon={CheckCircle2}
            />
            <MetricCard
              title="Failed Audits"
              value={securityAuditData.summary.failedAudits}
              icon={XCircle}
            />
            <MetricCard
              title="Critical Issues"
              value={securityAuditData.summary.criticalIssues}
              icon={AlertTriangle}
            />
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              Common Security Issues
            </h3>
            <CommonIssues issues={securityAuditData.summary.commonIssues} />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      {securityAuditData.results.map((result, index) => (
        <Card key={index} className="bg-white shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-xl font-bold break-all">
              {result.url}
            </CardTitle>
            <CardDescription>
              Last Scanned: {formatDate(result.timestamp)}
            </CardDescription>
            <SecurityScore score={result.securityScore} />
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Security Headers Section */}
            <AuditSection title="Security Headers" icon={Shield}>
              <SecurityHeaders headers={result.findings.securityHeaders} />
            </AuditSection>

            {/* SSL Analysis Section */}
            <AuditSection title="SSL/TLS Analysis" icon={Lock}>
              <SSLAnalysis ssl={result.findings.sslAnalysis} />
            </AuditSection>

            {/* Vulnerabilities Section */}
            {(result.findings.vulnerabilities.xss.length > 0 ||
              result.findings.vulnerabilities.sqli.length > 0 ||
              result.findings.vulnerabilities.openRedirect.length > 0) && (
              <AuditSection title="Security Vulnerabilities" icon={ShieldAlert}>
                <div className="space-y-4">
                  {/* Add vulnerability details here if needed */}
                </div>
              </AuditSection>
            )}

            {/* Exposed Data Section */}
            <AuditSection
              title="Exposed Data & Sensitive Information"
              icon={FileWarning}
            >
              <ExposedData data={result.findings.exposedData} />
            </AuditSection>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

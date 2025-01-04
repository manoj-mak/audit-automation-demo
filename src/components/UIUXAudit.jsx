import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Monitor, AlertTriangle, AlertCircle, Info } from "lucide-react";
import uiuxAuditData from "../results/uiux-audit.json";

const formatImagePath = (url, device) => {
  // Replace non-alphanumeric characters with underscores and convert to lowercase
  const sanitizedUrl = url.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  // Add device suffix
  return `${sanitizedUrl}_${device}.png`;
};

const Screenshot = ({ url, device }) => {
  const imagePath = formatImagePath(url, device);

  return (
    <div className="relative group max-w-full">
      <img
        src={imagePath}
        alt={`${device} screenshot of ${url}`}
        className={`w-full ${
          device === "mobile" ? "max-w-xs" : "max-w-md"
        } rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl`}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg" />
    </div>
  );
};

const SeverityIcon = ({ severity }) => {
  switch (severity) {
    case "High":
      return <AlertTriangle className="w-5 h-5 text-red-500" />;
    case "Medium":
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case "Low":
      return <Info className="w-5 h-5 text-blue-500" />;
    default:
      return null;
  }
};

const IssuesList = ({ issues, severity }) => (
  <div className="space-y-2">
    {issues
      .filter((issue) => issue.severity === severity)
      .map((issue, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
        >
          <div className="mt-1">
            <SeverityIcon severity={severity} />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{issue.type}</h4>
            <p className="text-gray-600 mt-1">{issue.recommendation}</p>
          </div>
        </div>
      ))}
  </div>
);

const getSeverityStyle = (severity) => {
  switch (severity) {
    case "High":
      return "border-l-red-500 bg-red-50";
    case "Medium":
      return "border-l-yellow-500 bg-yellow-50";
    case "Low":
      return "border-l-blue-500 bg-blue-50";
    default:
      return "";
  }
};

export default function UIUXAudit() {
  return (
    <div className="space-y-8 p-6 bg-gray-50">
      {uiuxAuditData.map((data, index) => (
        <Card key={index} className="overflow-hidden bg-white shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-blue-50">
            <CardTitle className="text-xl text-gray-800">{data.url}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                <Phone className="w-4 h-4 mr-1" /> Mobile
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                <Monitor className="w-4 h-4 mr-1" /> Desktop
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="max-w-[100px] mx-auto">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                  <Phone className="w-5 h-5 mr-2" /> Mobile View
                </h3>
                <Screenshot url={data.url} device="mobile" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                  <Monitor className="w-5 h-5 mr-2" /> Desktop View
                </h3>
                <Screenshot url={data.url} device="desktop" />
              </div>
            </div>

            <Tabs defaultValue="mobile" className="mt-6">
              <TabsList className="bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="mobile"
                  className="data-[state=active]:bg-white data-[state=active]:text-purple-700"
                >
                  <Phone className="w-4 h-4 mr-2" /> Mobile Issues
                </TabsTrigger>
                <TabsTrigger
                  value="desktop"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700"
                >
                  <Monitor className="w-4 h-4 mr-2" /> Desktop Issues
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mobile" className="mt-4 space-y-4">
                {["High", "Medium", "Low"].map((severity) => (
                  <div
                    key={severity}
                    className={`border-l-4 rounded-lg p-4 ${getSeverityStyle(
                      severity
                    )}`}
                  >
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <SeverityIcon severity={severity} />
                      {severity} Severity Issues
                    </h3>
                    <IssuesList
                      issues={data.analyses.mobile.issues}
                      severity={severity}
                    />
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="desktop" className="mt-4 space-y-4">
                {["High", "Medium", "Low"].map((severity) => (
                  <div
                    key={severity}
                    className={`border-l-4 rounded-lg p-4 ${getSeverityStyle(
                      severity
                    )}`}
                  >
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <SeverityIcon severity={severity} />
                      {severity} Severity Issues
                    </h3>
                    <IssuesList
                      issues={data.analyses.desktop.issues}
                      severity={severity}
                    />
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

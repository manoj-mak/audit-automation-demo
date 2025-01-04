import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TechnicalAudit from "./components/TechnicalAudit";
import UIUXAudit from "./components/UIUXAudit";
import SEOAudit from "./components/SEOAudit";
import SecurityAudit from "./components/SecurityAudit";

export default function App() {
  return (
    <div className="w-full min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Audit Results</h1>
      <Tabs defaultValue="technical" className="space-y-4">
        <TabsList className="bg-gray-100 rounded-lg p-1">
          <TabsTrigger
            className="rounded-md px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
            value="technical"
          >
            Technical Audit
          </TabsTrigger>
          <TabsTrigger
            className="rounded-md px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
            value="uiux"
          >
            UI/UX Audit
          </TabsTrigger>
          <TabsTrigger
            className="rounded-md px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
            value="seo"
          >
            SEO Audit
          </TabsTrigger>
          <TabsTrigger
            className="rounded-md px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
            value="security"
          >
            Security Audit
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className="rounded-lg shadow-lg bg-white p-6"
          value="technical"
        >
          <TechnicalAudit />
        </TabsContent>
        <TabsContent className="rounded-lg shadow-lg bg-white p-6" value="uiux">
          <UIUXAudit />
        </TabsContent>
        <TabsContent className="rounded-lg shadow-lg bg-white p-6" value="seo">
          <SEOAudit />
        </TabsContent>
        <TabsContent
          className="rounded-lg shadow-lg bg-white p-6"
          value="security"
        >
          <SecurityAudit />
        </TabsContent>
      </Tabs>
    </div>
  );
}

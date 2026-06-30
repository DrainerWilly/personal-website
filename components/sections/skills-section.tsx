import { resumeData } from "@/lib/data/resume-data";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Layers, Wrench, Brain } from "lucide-react";

export function SkillsSection() {
  const { skills } = resumeData;

  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: skills.languages,
      variant: "default" as const,
    },
    {
      title: "Frameworks",
      icon: Layers,
      skills: skills.frameworks,
      variant: "secondary" as const,
    },
    {
      title: "Developer Tools",
      icon: Wrench,
      skills: skills.developerTools,
      variant: "outline" as const,
    },
    {
      title: "Concepts",
      icon: Brain,
      skills: skills.concepts,
      variant: "secondary" as const,
    },
  ];

  return (
    <section id="skills" className="py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Technical Skills
        </h2>
        <Separator className="mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-0">
                  <CardTitle className="flex items-center gap-1.5 text-base">
                    <Icon className="h-4 w-4 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill, i) => (
                      <Badge key={i} variant={category.variant} className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

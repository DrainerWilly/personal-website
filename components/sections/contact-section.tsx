import { resumeData } from "@/lib/data/resume-data";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export function ContactSection() {
  const { personalInfo } = resumeData;

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "mkaraasl at u dot rochester dot edu",
      href: `mailto:${personalInfo.email}`,
      description: "Send me an email",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      description: "Give me a call",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: personalInfo.linkedin,
      href: `https://${personalInfo.linkedin}`,
      description: "Connect on LinkedIn",
    },
    {
      icon: Github,
      label: "GitHub",
      value: personalInfo.github,
      href: `https://${personalInfo.github}`,
      description: "Check out my code",
    },
  ];

  return (
    <section id="contact" className="py-6 px-4 pb-24">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <Separator className="mb-6" />

        <Card>
          <CardContent className="pt-2">
            <p className="text-sm text-muted-foreground mb-6 text-center">
              I&apos;m open to new opportunities. Feel free to reach out!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Button
                    key={index}
                    asChild
                    variant="outline"
                    size="sm"
                    className="h-auto py-3 flex-col items-start gap-1"
                  >
                    <a
                      href={method.href}
                      target={
                        method.label === "LinkedIn" || method.label === "GitHub"
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        method.label === "LinkedIn" || method.label === "GitHub"
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-1.5 w-full">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">{method.label}</span>
                      </div>
                      <span className="text-xs text-muted-foreground text-left w-full">
                        {method.value}
                      </span>
                      <span className="text-xs text-muted-foreground text-left w-full">
                        {method.description}
                      </span>
                    </a>
                  </Button>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                Based in Rochester, NY
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

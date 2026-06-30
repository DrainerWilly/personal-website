// Type Definitions
export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  abouts: string[];
}

export interface Education {
  institution: string;
  location: string;
  degrees: string[];
  gpa: number;
  period: string;
  achievements: string[];
  teachingAssistant?: string;
  coursework: string[];
  logo?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
  logo?: string;
}

export interface Project {
  name: string;
  date: string;
  description: string;
  achievements: string[];
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  developerTools: string[];
  concepts: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experiences: Experience[];
  projects: Project[];
  skills: Skills;
}

// Resume Data
export const resumeData: ResumeData = {
  personalInfo: {
    name: "William (Mertkan)",
    title: "CS + Math @ University of Rochester",
    phone: "585-305-0711",
    email: "mkaraasl@u.rochester.edu",
    linkedin: "linkedin.com/in/mertkan-karaaslan-950573298",
    github: "github.com/DrainerWilly",
    abouts: [
      "Software Development Engineer Intern at UW-Madison, SSEC",
      "Research Assistant at UR GIDS-AI",
      "I love running, bouldering, and EDM!",
    ],
  },

  education: [
    {
      institution: "University of Rochester",
      location: "Rochester, NY",
      degrees: ["B.S. Computer Science", "B.S. Mathematics"],
      gpa: 3.97,
      period: "Aug 2025 - May 2028",
      achievements: [
        "Research and Innovation Grant",
        //"Research Paper at SSRN Journal",
        //"Research Presentation Award",
        "Dean's List",
      ],
      teachingAssistant: "Multivariable Calculus (Fall 2026)",
      coursework: [
        "Design & Analysis of Algorithms",
        "Algorithmic Game Theory",
        "Computer Organization",
        "Computation & Formal Systems",
        "Abstract Algebra",
        "Probability Theory",
        "Multivariable Calculus",
        "Linear Algebra",
        "Data Structures & Algorithms",
        "Discrete Math",
      ],
      logo: "/logos/rochester.jpg",
    },
  ],

  experiences: [
    {
      title: "Software Development Engineer Intern",
      company: "UW-Madison, Space Science and Engineering Center",
      location: "Madison, WI",
      period: "May 2026 – Present",
      description: [
        "🛰️ GIS Satellite Imagery Dev & NASA STELLA Spectrometers",
      ],
      technologies: ["React", "Next.js", "C#", "CircuitPy", "JavaScript/TypeScript"],
      logo: "/logos/uw-madison.png",
    },
    {
      title: "Research Assistant",
      company: "University of Rochester (CS Dept.)",
      location: "Rochester, NY",
      period: "Jan 2026 – May 2026",
      description: [
        "🔎 Computer Vision & VLMs",
      ],
      technologies: ["Python", "PyTorch", "Pandas", "Matplotlib", "YOLO"],
      logo: "/logos/rochester.jpg",
    },
    {
      title: "Software Engineer",
      company: "Paper-X",
      location: "Rochester, NY",
      period: "Dec 2025 – Mar 2026",
      description: [
        "❄️ AI infra",
      ],
      technologies: ["Python", "Machine Learning"],
      logo: "/logos/paper-x.png",
    },
    {
      title: "Technology Assistant",
      company: "Media Lab, Eastman School of Music (University of Rochester)",
      location: "Rochester, NY",
      period: "Aug 2025 – Present",
      description: [
        "📸 Music Production, Filming, Camera Production, and Editing",
      ],
      technologies: ["Final Cut Pro", "Adobe Premiere", "Ableton Live"],
      logo: "/logos/eastman.png",
    },
  ],

  projects: [
    {
      name: "STELLA Explorer",
      date: "June 2026",
      description:
        "An interactive explorer for NASA STELLA spectrometer data, pairs near real-time Landsat 8/9 satellite imagery with spectral libraries to compare ground readings against orbital observations.",
      achievements: [
        "Pulls near real-time Landsat 8/9 imagery and surface reflectance data",
        "Matches NASA STELLA handheld spectrometer readings against spectral libraries",
        "Visualizes spectral signatures across bands for quick field-to-orbit comparison",
      ],
      technologies: ["React", "TypeScript", "Next.js", "CircuitPython"],
      image: "/projects/stella-explorer.png",
      link: "https://github.com/DrainerWilly",
    },
    {
      name: "web-vest",
      date: "April 2026",
      description:
        "Web-VEST (Visual Element-based Saliency Toolkit) is a Python package on PyPI for multimodal webpage saliency extraction and scoring, combining automated crawling, graph-based site mapping, and vision-language models to rank element importance.",
      achievements: [
        "Automated website crawling with full-page screenshots",
        "Structural mapping of domains as directed graphs",
        "Element importance scoring via the EleRank formula using vision-language models",
      ],
      technologies: ["Python", "OpenAI CLIP", "Florence-2", "BLIP-2", "U^2-Net","NetworkX"],
      image: "/projects/web-vest.png",
      link: "https://pypi.org/project/web-vest/",
    },
  ],

  skills: {
    languages: [
      "C++",
      "C",
      "Java",
      "Python",
      "Rust",
      "JavaScript",
      "TypeScript",
      "HTML/CSS",
      "SQL",
      "Lua",
      "x86-64 Assembly",
    ],
    frameworks: [
      "Node.js",
      "React.js",
      "Next.js",
      "Express.js",
      "Flask",
      "SwiftUI",
      "Flutter",
      "FastAPI",
      "JUnit",
      "Jest",
    ],
    developerTools: [
      "Git",
      "Linux",
      "Amazon Web Services",
      "Google Cloud Platform",
      "Microsoft Azure",
      "Docker",
      "Vim",
    ],
    concepts: [
      "Operating Systems",
      "Compilers",
      "Computer Networks",
      "Statistics",
      "Probability",
      "Object-Oriented Programming",
      "Web Development",
      "Databases",
      "Full stack",
      "Cloud Computing",
      "Cybersecurity",
      "Game Theory",
      "Parallel Programming",
      "REST API",
      "HTTP",
      "MCP",
    ],
  },
};

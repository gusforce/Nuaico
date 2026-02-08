import type { Article, Sector, SectorNewsData } from "./types"

export const SECTORS: Sector[] = [
  'Finance', 'Healthcare', 'Energy', 'Manufacturing',
  'Retail', 'Media', 'Government', 'Education',
  'Transportation', 'Cybersecurity', 'Real Estate', 'Agriculture'
]

export const ALL_ARTICLES: Article[] = [
  // === AI Studio articles (with full AI analysis) ===
  {
    id: "s1",
    title: "AI-Driven Underwriting Models Show 15% Reduction in Default Rates",
    slug: "ai-underwriting-default-rates",
    excerpt: "Major tier-1 banks piloting new generative AI risk models have reported a 15% drop in loan default rates over a 6-month trial.",
    content: "",
    imageUrl: "https://picsum.photos/800/400?random=1",
    category: "Banking",
    author: "Bloomberg Staff",
    date: "Oct 24, 2023",
    sector: "Finance",
    sourceDomain: "bloomberg.com",
    sourceUrl: "https://example.com/finance-ai",
    readTime: "6 min read",
    whyPicked: "Significant quantitative evidence of AI efficiency in core banking operations.",
    impactScore: 88,
    tags: ["Banking", "Risk Management", "Predictive Analytics"],
    featured: true,
    aiSummary: [
      "Major tier-1 banks piloting new generative AI risk models have reported a 15% drop in loan default rates over a 6-month trial.",
      "The models utilize non-traditional data points, including transactional velocity and supply chain stability metrics, rather than just credit history.",
      "Regulatory bodies are currently reviewing the 'black box' nature of these decisions to ensure fair lending compliance."
    ],
    aiOpinion: {
      change: "This validates the move from historical credit scoring to real-time behavioral risk assessment. We expect mid-sized lenders to license similar tech within 18 months to remain competitive.",
      beneficiaries: "Institutional lenders and high-cash-flow businesses with thin credit files benefit. Traditional credit bureaus and loan officers reliant on manual review face disruption.",
      risks: [
        "Algorithmic bias could inadvertently redline specific demographics based on non-financial behavioral patterns.",
        "Over-reliance on models during a 'black swan' economic event remains untested.",
        "Regulatory pushback could freeze deployment if explainability standards aren't met."
      ],
      confidenceLevel: "High",
      confidenceReason: "Data is corroborated by three independent pilot programs at major institutions.",
      takeaways: [
        "Default rates down 15% in pilot programs.",
        "Shift from historical data to real-time behavioral data.",
        "Regulatory compliance remains the primary bottleneck."
      ]
    }
  },
  {
    id: "s2",
    title: "Generative Protein Design Accelerates Phase 1 Trials for Rare Diseases",
    slug: "generative-protein-design",
    excerpt: "A new study demonstrates that AI-designed protein structures have successfully passed safety profiles in Phase 1 trials for two rare genetic disorders.",
    content: "",
    imageUrl: "https://picsum.photos/800/400?random=2",
    category: "Pharma",
    author: "NIH Research",
    date: "Oct 23, 2023",
    sector: "Healthcare",
    sourceDomain: "nih.gov",
    sourceUrl: "https://example.com/health-ai",
    readTime: "8 min read",
    whyPicked: "Breakthrough in time-to-market for orphan drugs.",
    impactScore: 94,
    tags: ["Pharma", "Drug Discovery", "Generative AI"],
    featured: true,
    aiSummary: [
      "A new study published in Nature demonstrates that AI-designed protein structures have successfully passed safety profiles in Phase 1 trials for two rare genetic disorders.",
      "The AI models reduced the candidate selection phase from 4 years to 8 months.",
      "Cost savings are estimated at approximately $400M per viable drug candidate."
    ],
    aiOpinion: {
      change: "The economics of 'orphan drugs' (diseases with few patients) fundamentally shifts. High R&D costs previously made these treatments unprofitable; AI makes them commercially viable.",
      beneficiaries: "Patients with rare genetic conditions and boutique biotech firms. Large legacy pharma with heavy traditional R&D infrastructure may struggle to pivot quickly.",
      risks: [
        "Off-target effects of generated proteins may not be fully understood until long-term studies conclude.",
        "IP ownership of AI-generated molecules is currently a legal grey area.",
        "High compute costs for training these models create a barrier to entry for startups."
      ],
      confidenceLevel: "Medium",
      confidenceReason: "While initial results are promising, Phase 2 and 3 efficacy data is still required to confirm real-world impact.",
      takeaways: [
        "Discovery timeline reduced from years to months.",
        "Orphan drugs becoming commercially viable.",
        "Legal frameworks for AI-generated IP need clarification."
      ]
    }
  },
  {
    id: "s3",
    title: "Smart Grid Optimization: AI Balances Renewables Load in Real-Time",
    slug: "smart-grid-ai-optimization",
    excerpt: "Utility providers in California have deployed AI agents to manage energy load distribution between solar, wind, and battery storage.",
    content: "",
    imageUrl: "https://picsum.photos/800/400?random=3",
    category: "Infrastructure",
    author: "Reuters Staff",
    date: "Oct 22, 2023",
    sector: "Energy",
    sourceDomain: "reuters.com",
    sourceUrl: "https://example.com/energy-ai",
    readTime: "5 min read",
    whyPicked: "Critical infrastructure update addressing the primary criticism of renewable energy (intermittency).",
    impactScore: 76,
    tags: ["Infrastructure", "Renewables", "Grid Mgmt"],
    aiSummary: [
      "Utility providers in California have deployed AI agents to manage energy load distribution between solar, wind, and battery storage.",
      "The system predicts demand spikes with 92% accuracy, reducing the need for natural gas peaker plants.",
      "Implementation costs were recouped within the first quarter of operation due to efficiency gains."
    ],
    aiOpinion: {
      change: "Energy grid management moves from reactive (human operators responding to load) to predictive (AI pre-allocating resources). This is a prerequisite for a 100% renewable grid.",
      beneficiaries: "Green energy producers and consumers. Fossil fuel peaker plant operators face existential demand reduction.",
      risks: [
        "Cybersecurity vulnerability increases as grid control becomes more centralized and automated.",
        "Model hallucination or data errors could theoretically cause localized blackouts.",
        "Hardware limitations in older grid infrastructure may bottleneck software capabilities."
      ],
      confidenceLevel: "High",
      confidenceReason: "Operational data from California ISO confirms the efficiency gains and accuracy metrics.",
      takeaways: [
        "92% accuracy in demand prediction.",
        "Reduced reliance on fossil fuel backup plants.",
        "Cybersecurity becomes the new critical safety vector."
      ]
    }
  },
  {
    id: "s4",
    title: "Autonomous Supply Chain Negotiators Cut Procurement Costs by 12%",
    slug: "autonomous-supply-chain-negotiators",
    excerpt: "Large scale manufacturers are utilizing AI bots to negotiate spot prices for raw materials autonomously.",
    content: "",
    imageUrl: "https://picsum.photos/800/400?random=4",
    category: "Logistics",
    author: "WSJ Staff",
    date: "Oct 21, 2023",
    sector: "Manufacturing",
    sourceDomain: "wsj.com",
    sourceUrl: "https://example.com/mfg-ai",
    readTime: "4 min read",
    whyPicked: "First widespread instance of AI-to-AI commerce negotiation.",
    impactScore: 65,
    tags: ["Logistics", "Procurement", "B2B"],
    aiSummary: [
      "Large scale manufacturers are utilizing AI bots to negotiate spot prices for raw materials autonomously.",
      "These bots interact with supplier APIs to find optimal pricing and delivery windows without human intervention.",
      "Early adopters report a 12% reduction in procurement spend."
    ],
    aiOpinion: {
      change: "B2B commerce is shifting towards 'machine-speed' transactions. The role of the procurement officer changes from negotiator to strategic auditor.",
      beneficiaries: "High-volume manufacturers and digitized suppliers. Traditional brokerages and manual supply chain coordinators are at risk.",
      risks: [
        "Flash crashes in raw material prices could occur if multiple algorithms react negatively to the same signal.",
        "Loss of human relationships in supplier networks may hurt resilience during crises.",
        "Smaller suppliers without API infrastructure will be locked out of the market."
      ],
      confidenceLevel: "Medium",
      confidenceReason: "Sample size is currently limited to large automotive and tech manufacturing sectors.",
      takeaways: [
        "12% cost reduction in raw materials.",
        "Rise of machine-to-machine commerce.",
        "Digital infrastructure is now a barrier to entry for suppliers."
      ]
    }
  },
  {
    id: "s5",
    title: "AI Educational Tutors Outperform Classroom Averages in Math Proficiency",
    slug: "ai-educational-tutors",
    excerpt: "A statewide pilot program utilizing personalized AI math tutors showed students improving by 1.5 grade levels in a single semester.",
    content: "",
    imageUrl: "https://picsum.photos/800/400?random=5",
    category: "EdTech",
    author: "Ed Week Staff",
    date: "Oct 20, 2023",
    sector: "Education",
    sourceDomain: "edweek.org",
    sourceUrl: "https://example.com/edu-ai",
    readTime: "7 min read",
    whyPicked: "Standardized testing data confirms efficacy of 1:1 AI tutoring.",
    impactScore: 82,
    tags: ["EdTech", "K-12", "Personalized Learning"],
    aiSummary: [
      "A statewide pilot program utilizing personalized AI math tutors showed students improving by 1.5 grade levels in a single semester.",
      "The AI adapts explanation styles to the student's specific learning gaps, something impossible in a 30-student classroom.",
      "Teacher unions are calling for guidelines on how these tools interact with existing curriculum."
    ],
    aiOpinion: {
      change: "Education is moving from a factory model (one size fits all) to a personalized model. The teacher's role shifts from lecturer to mentor and facilitator.",
      beneficiaries: "Students who fall behind in traditional settings. EdTech companies. Traditional textbook publishers are disrupted.",
      risks: [
        "Data privacy concerns regarding student learning patterns.",
        "The 'digital divide' could widen if low-income districts cannot afford the hardware/software.",
        "Social development may suffer if screen time replaces peer interaction."
      ],
      confidenceLevel: "High",
      confidenceReason: "Quantitative test score improvements are statistically significant across diverse demographics.",
      takeaways: [
        "1.5 grade level improvement in one semester.",
        "Shift to mentorship role for teachers.",
        "Equity of access remains a major policy hurdle."
      ]
    }
  },
  {
    id: "s6",
    title: "Deepfake Phishing Campaigns Target C-Suite Executives",
    slug: "deepfake-phishing-campaigns",
    excerpt: "Security firms report a 300% rise in 'executive impersonation' attacks using AI voice and video generation.",
    content: "",
    imageUrl: "https://picsum.photos/800/400?random=6",
    category: "Security",
    author: "Wired Staff",
    date: "Oct 24, 2023",
    sector: "Cybersecurity",
    sourceDomain: "wired.com",
    sourceUrl: "https://example.com/cyber-ai",
    readTime: "5 min read",
    whyPicked: "Escalation of threat vectors requiring new verification protocols.",
    impactScore: 89,
    tags: ["Security", "Deepfakes", "Corporate Governance"],
    featured: true,
    aiSummary: [
      "Security firms report a 300% rise in 'executive impersonation' attacks using AI voice and video generation.",
      "Attackers are using public media to train models and authorize fraudulent wire transfers via video calls.",
      "Companies are reverting to physical hardware keys and multi-person authorization protocols."
    ],
    aiOpinion: {
      change: "Digital trust is eroding. 'Seeing is believing' is no longer a valid security heuristic. Verification must move to cryptographic proof.",
      beneficiaries: "Zero-trust security vendors and hardware authentication firms. Remote-first organizations face higher operational friction.",
      risks: [
        "Corporate paralysis due to excessive verification steps.",
        "Reputational damage to executives targeted by convincing fakes.",
        "Lag in legal frameworks to prosecute digital impersonation."
      ],
      confidenceLevel: "High",
      confidenceReason: "Multiple confirmed high-value breaches have occurred using this specific methodology.",
      takeaways: [
        "300% increase in AI impersonation attacks.",
        "Return to hardware-based security.",
        "Video calls are no longer proof of identity."
      ]
    }
  },

  // === v0 articles (without AI analysis) ===
  {
    id: "v1",
    title: "OpenAI Unveils GPT-5 with Unprecedented Reasoning Capabilities",
    slug: "openai-unveils-gpt5",
    excerpt: "The latest iteration of OpenAI's language model demonstrates remarkable improvements in logical reasoning and problem-solving abilities, setting new benchmarks for AI systems.",
    content: "",
    imageUrl: "/placeholder.svg?height=900&width=1600",
    category: "Technology",
    author: "Sarah Johnson",
    date: "May 15, 2023",
    sector: "Cybersecurity",
    featured: true,
  },
  {
    id: "v2",
    title: "Breakthrough in mRNA Vaccines Shows Promise for Cancer Treatment",
    slug: "mrna-cancer-treatment",
    excerpt: "Researchers have developed a new approach using mRNA technology that has shown remarkable results in early clinical trials for treating various forms of cancer.",
    content: "",
    imageUrl: "/placeholder.svg?height=900&width=1600",
    category: "Health",
    author: "Michael Chen",
    date: "May 14, 2023",
    sector: "Healthcare",
    featured: true,
  },
  {
    id: "v3",
    title: "Global Financial Markets React to New Regulatory Framework",
    slug: "financial-markets-regulation",
    excerpt: "Major financial institutions are adapting to a comprehensive new regulatory framework designed to increase transparency and reduce systemic risks.",
    content: "",
    imageUrl: "/placeholder.svg?height=900&width=1600",
    category: "Finance",
    author: "Elena Rodriguez",
    date: "May 12, 2023",
    sector: "Finance",
    featured: true,
  },
  {
    id: "v4",
    title: "Sustainable Manufacturing Initiative Reduces Carbon Footprint by 40%",
    slug: "sustainable-manufacturing",
    excerpt: "A coalition of industry leaders has successfully implemented new manufacturing processes that significantly reduce environmental impact while maintaining productivity.",
    content: "",
    imageUrl: "/placeholder.svg?height=900&width=1600",
    category: "Industry",
    author: "David Wilson",
    date: "May 10, 2023",
    sector: "Manufacturing",
  },
  {
    id: "v5",
    title: "AI-Powered Diagnostic Tool Receives FDA Approval",
    slug: "ai-diagnostic-tool-approval",
    excerpt: "A revolutionary diagnostic system using artificial intelligence has been approved for clinical use, promising faster and more accurate disease detection.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Medical Technology",
    author: "James Lee",
    date: "May 9, 2023",
    sector: "Healthcare",
  },
  {
    id: "v6",
    title: "Global Initiative Launches to Address Antibiotic Resistance",
    slug: "antibiotic-resistance-initiative",
    excerpt: "Health organizations worldwide are joining forces to combat the growing threat of antibiotic-resistant bacteria through research and policy changes.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Public Health",
    author: "Priya Patel",
    date: "May 8, 2023",
    sector: "Healthcare",
  },
  {
    id: "v7",
    title: "Wearable Health Monitors Show Promise in Preventive Care",
    slug: "wearable-health-monitors",
    excerpt: "New research indicates that advanced wearable devices can significantly improve early detection of health issues, leading to better outcomes.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Digital Health",
    author: "Thomas Brown",
    date: "May 7, 2023",
    sector: "Healthcare",
  },
  {
    id: "v8",
    title: "Quantum Computing Breakthrough Achieves 1000-Qubit Milestone",
    slug: "quantum-computing-breakthrough",
    excerpt: "Scientists have successfully developed a stable 1000-qubit quantum processor, potentially accelerating the timeline for practical quantum computing applications.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Quantum Computing",
    author: "Lisa Wong",
    date: "May 6, 2023",
    sector: "Cybersecurity",
  },
  {
    id: "v9",
    title: "Next-Generation 6G Network Standards Begin Development",
    slug: "6g-network-standards",
    excerpt: "Industry leaders and research institutions have started work on defining standards for 6G networks, promising unprecedented connectivity speeds.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Telecommunications",
    author: "Robert Johnson",
    date: "May 5, 2023",
    sector: "Cybersecurity",
  },
  {
    id: "v10",
    title: "Open Source AI Model Rivals Commercial Alternatives",
    slug: "open-source-ai-model",
    excerpt: "A community-developed artificial intelligence model has achieved performance comparable to proprietary systems, democratizing access to advanced AI capabilities.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Artificial Intelligence",
    author: "Emily Clark",
    date: "May 4, 2023",
    sector: "Cybersecurity",
  },
  {
    id: "v11",
    title: "Central Banks Explore Digital Currency Implementation",
    slug: "central-banks-digital-currency",
    excerpt: "Major central banks are conducting trials of digital currencies that could transform monetary systems and financial transactions.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Digital Currency",
    author: "Kevin Zhang",
    date: "May 3, 2023",
    sector: "Finance",
  },
  {
    id: "v12",
    title: "Sustainable Investment Funds See Record Growth",
    slug: "sustainable-investment-growth",
    excerpt: "ESG-focused investment vehicles have attracted unprecedented capital as investors increasingly prioritize environmental and social impact.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Investment",
    author: "Sophia Kim",
    date: "May 2, 2023",
    sector: "Finance",
  },
  {
    id: "v13",
    title: "Fintech Startups Revolutionize Small Business Lending",
    slug: "fintech-small-business-lending",
    excerpt: "New financial technology platforms are filling gaps in traditional banking systems, providing crucial access to capital for small enterprises.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Fintech",
    author: "Daniel Martinez",
    date: "May 1, 2023",
    sector: "Finance",
  },
  {
    id: "v14",
    title: "International Data Privacy Agreement Reaches Final Stages",
    slug: "data-privacy-agreement",
    excerpt: "A landmark international agreement on data protection and privacy standards is nearing completion after years of negotiation.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Policy",
    author: "Olivia Green",
    date: "April 30, 2023",
    sector: "Government",
  },
  {
    id: "v15",
    title: "AI Governance Framework Adopted by Major Tech Companies",
    slug: "ai-governance-framework",
    excerpt: "Leading technology firms have committed to a comprehensive set of principles for the ethical development and deployment of artificial intelligence systems.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Technology Policy",
    author: "Nathan White",
    date: "April 29, 2023",
    sector: "Government",
  },
  {
    id: "v16",
    title: "Smart City Initiative Demonstrates Successful Public-Private Partnership",
    slug: "smart-city-partnership",
    excerpt: "An innovative urban development project has shown how collaboration between government and industry can create more efficient and livable cities.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Urban Planning",
    author: "Amanda Scott",
    date: "April 28, 2023",
    sector: "Government",
  },
  {
    id: "v17",
    title: "Automation Transforms Manufacturing Supply Chains",
    slug: "automation-supply-chains",
    excerpt: "Advanced robotics and AI systems are reshaping production processes and supply chain management across multiple industries.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Manufacturing",
    author: "Richard Taylor",
    date: "April 27, 2023",
    sector: "Manufacturing",
  },
  {
    id: "v18",
    title: "Green Hydrogen Production Scales Up with New Technology",
    slug: "green-hydrogen-production",
    excerpt: "Breakthrough electrolysis methods are making carbon-free hydrogen production economically viable for industrial applications.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Energy",
    author: "Laura Miller",
    date: "April 26, 2023",
    sector: "Energy",
  },
  {
    id: "v19",
    title: "Aerospace Industry Achieves Milestone in Sustainable Aviation Fuel",
    slug: "sustainable-aviation-fuel",
    excerpt: "Major airlines and fuel producers have successfully tested new sustainable aviation fuels that could significantly reduce the carbon footprint of air travel.",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Aerospace",
    author: "Carlos Mendez",
    date: "April 25, 2023",
    sector: "Transportation",
  },
]

// Computed exports for backwards compatibility
export const featuredNews = ALL_ARTICLES.filter(a => a.featured)

export const sectorNews: SectorNewsData = ALL_ARTICLES.reduce<SectorNewsData>((acc, article) => {
  if (!acc[article.sector]) acc[article.sector] = []
  acc[article.sector].push(article)
  return acc
}, {})

export const getArticlesBySector = (sector: string) =>
  ALL_ARTICLES.filter(a => a.sector.toLowerCase() === sector.toLowerCase())

export const getTrendingArticles = () =>
  ALL_ARTICLES.filter(a => (a.impactScore ?? 0) > 80)

export const getArticleBySlug = (slug: string) =>
  ALL_ARTICLES.find(a => a.slug === slug)

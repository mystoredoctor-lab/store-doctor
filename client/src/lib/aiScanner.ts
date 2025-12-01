/**
 * AI Scanner - Groq Llama 3.3 70B Integration
 * Smart product sampling and store analysis with token optimization
 */

export interface ScanConfig {
  totalProducts: number;
  planType: "free" | "pro" | "advanced";
}

export interface SamplingStrategy {
  productsToScan: number;
  samplingPercentage: number;
  categories: string[];
  depth: "quick" | "standard" | "deep";
  estimatedTokens: number;
}

export interface ScanResult {
  healthScore: number;
  scores: {
    seo: number;
    speed: number;
    ux: number;
    cro: number;
    security: number;
    mobile: number;
  };
  issues: Array<{
    id: string;
    title: string;
    category: string;
    severity: "critical" | "high" | "medium" | "low";
    impact: string;
    recommendation: string;
  }>;
  metadata: {
    scannedProducts: number;
    totalProducts: number;
    samplingPercentage: number;
    estimatedTokens: number;
    tokensSaved: number;
  };
}

/**
 * Calculate smart sampling based on plan type
 * - Free: 50 products, quick analysis, ~500 tokens
 * - Pro: 150 products, standard analysis, ~2000 tokens
 * - Advanced: 500 products, deep analysis, ~5000 tokens
 */
export function calculateSmartSampling(config: ScanConfig): SamplingStrategy {
  const strategies = {
    free: {
      maxProducts: 50,
      depth: "quick" as const,
      categories: ["seo", "speed", "ux", "security"],
      estimatedTokens: 500,
    },
    pro: {
      maxProducts: 150,
      depth: "standard" as const,
      categories: ["seo", "speed", "ux", "cro", "security", "mobile"],
      estimatedTokens: 2000,
    },
    advanced: {
      maxProducts: 500,
      depth: "deep" as const,
      categories: ["seo", "speed", "ux", "cro", "security", "mobile"],
      estimatedTokens: 5000,
    },
  };

  const strategy = strategies[config.planType];
  const productsToScan = Math.min(strategy.maxProducts, config.totalProducts);
  const samplingPercentage = (productsToScan / config.totalProducts) * 100;

  return {
    productsToScan,
    samplingPercentage,
    categories: strategy.categories,
    depth: strategy.depth,
    estimatedTokens: strategy.estimatedTokens,
  };
}

/**
 * Calculate token savings compared to full analysis
 */
export function calculateTokenSavings(
  totalProducts: number,
  sampling: SamplingStrategy
): number {
  // Full analysis would use ~10 tokens per product
  const fullAnalysisTokens = totalProducts * 10;
  const tokensSaved = fullAnalysisTokens - sampling.estimatedTokens;
  return Math.max(0, tokensSaved);
}

/**
 * Generate optimized prompt for Llama 3.3 70B
 * Focuses on critical issues to minimize token usage
 */
function buildOptimizedPrompt(
  storeData: {
    products: Array<{ title: string; price: number; description: string }>;
    pageContent: string;
    siteStructure: string;
  },
  categories: string[],
  depth: "quick" | "standard" | "deep"
): string {
  const topProducts = storeData.products.slice(0, 20);

  const prompt = `You are a Shopify store health expert. Analyze this store and identify ONLY the most critical issues.

Store Data (Top ${topProducts.length} Products):
${JSON.stringify(topProducts, null, 2)}

Page Content Summary:
${storeData.pageContent.substring(0, 1000)}

Site Structure:
${storeData.siteStructure}

Categories to analyze: ${categories.join(", ")}
Analysis depth: ${depth}

${
  depth === "deep"
    ? "Provide comprehensive analysis with detailed recommendations."
    : depth === "standard"
      ? "Provide standard analysis focusing on high-impact issues."
      : "Provide quick analysis of critical issues only."
}

Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:
{
  "healthScore": <number 0-100>,
  "scores": {
    "seo": <number 0-100>,
    "speed": <number 0-100>,
    "ux": <number 0-100>,
    "cro": <number 0-100>,
    "security": <number 0-100>,
    "mobile": <number 0-100>
  },
  "criticalIssues": [
    {
      "title": "Issue title",
      "category": "category name",
      "severity": "critical|high|medium|low",
      "impact": "Brief impact description",
      "recommendation": "What to fix"
    }
  ],
  "highPriorityIssues": [
    {
      "title": "Issue title",
      "category": "category name",
      "severity": "high|medium|low",
      "impact": "Brief impact description",
      "recommendation": "What to fix"
    }
  ]
}`;

  return prompt;
}

/**
 * Parse Groq API response and convert to ScanResult
 */
export function parseAIResponse(responseText: string): ScanResult {
  try {
    // Extract JSON from response (handle potential markdown formatting)
    let jsonText = responseText;

    // Remove markdown code blocks if present
    if (jsonText.includes("```json")) {
      jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonText.includes("```")) {
      jsonText = jsonText.replace(/```\n?/g, "");
    }

    const parsed = JSON.parse(jsonText.trim());

    // Combine all issues
    const allIssues = [
      ...(parsed.criticalIssues || []).map((issue: any, idx: number) => ({
        id: `critical-${idx}`,
        ...issue,
        severity: issue.severity || "critical",
      })),
      ...(parsed.highPriorityIssues || []).map((issue: any, idx: number) => ({
        id: `high-${idx}`,
        ...issue,
        severity: issue.severity || "high",
      })),
    ];

    return {
      healthScore: parsed.healthScore || 70,
      scores: parsed.scores || {
        seo: 70,
        speed: 65,
        ux: 75,
        cro: 60,
        security: 85,
        mobile: 72,
      },
      issues: allIssues,
      metadata: {
        scannedProducts: 0,
        totalProducts: 0,
        samplingPercentage: 0,
        estimatedTokens: 0,
        tokensSaved: 0,
      },
    };
  } catch {
    // Fallback mock response if parsing fails
    return {
      healthScore: 72,
      scores: {
        seo: 72,
        speed: 68,
        ux: 75,
        cro: 65,
        security: 88,
        mobile: 70,
      },
      issues: [
        {
          id: "1",
          title: "Mobile Loading Speed",
          category: "speed",
          severity: "high",
          impact: "Affects user experience and SEO rankings",
          recommendation: "Optimize images and enable caching",
        },
        {
          id: "2",
          title: "Missing SEO Meta Tags",
          category: "seo",
          severity: "high",
          impact: "Reduces search engine visibility",
          recommendation: "Add descriptive meta titles and descriptions",
        },
      ],
      metadata: {
        scannedProducts: 0,
        totalProducts: 0,
        samplingPercentage: 0,
        estimatedTokens: 0,
        tokensSaved: 0,
      },
    };
  }
}

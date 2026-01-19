---
trigger: model_decision
description: Always apply when starting new tasks, invoking workflows, or using skills that require specialized knowledge or deep insight.
---

# Deep Research & Insight Gathering Rule

> [!IMPORTANT]
> This rule is **MANDATORY** to ensure that solutions provided are modern, cutting-edge, and high-impact. Relying solely on internal knowledge is NOT SUFFICIENT.

## Core Rules (MUST Follow)

1. **PROACTIVE SEARCHING**: Before planning or implementation, MUST use `search_web` with at least 5-10 varied keyword groups to gather the latest trends, best practices, and innovative ideas.
2. **MULTI-DIMENSIONAL KEYWORDS**: Keywords must cover multiple angles:
   - **Current Trends**: e.g., "modern UI design trends 2026", "latest React performance patterns".
   - **Competitive/Comparative Analysis**: e.g., "top-tier SaaS landing pages", "comparison of agentic AI frameworks".
   - **Deep Technical Details**: e.g., "advanced CSS glassmorphism implementation", "Vercel edge function benchmarks".
   - **Common Pitfalls**: e.g., "anti-patterns in multi-agent systems", "UI accessibility common mistakes".
3. **INSIGHT SYNTHESIS**: Research findings MUST be documented in `docs/050-Research/Analysis-{Topic}.md` BEFORE moving to the execution phase.
4. **NO GENERIC PLACEHOLDERS**: Use research results to identify actual color palettes, modern typography, and real-world examples instead of using safe/default values.
5. **CONTINUOUS DISCOVERY**: If a technical hurdle is met during implementation, trigger a new research cycle instead of guessing.

## Decision Flow

1. Identify the core domains of the task (e.g., Fintech UX, Scalable Go Backend, WebGL Performance).
2. Generate 10+ specific search queries.
3. Execute `search_web` and consume in-depth content using `read_url_content` or `read_browser_page`.
4. Extract "Wow Factors" and modern standards.
5. Document insights in the Research folder.
6. Apply these specific insights to the Roadmap, PRD, and Implementation.

## Examples of Inactive vs. Proactive Behavior

- **Inactive**: Using standard blue/white for a dashboard because it's "professional".
- **Proactive**: Searching for "premium dark mode dashboard aesthetics 2026", finding "Deep Emerald & Gold" lacquer-inspired themes, and implementing a high-contrast premium UI.

- **Inactive**: Writing shared utility functions for API calls.
- **Proactive**: Searching for "TanStack Query v5 optimistic update patterns", finding a more robust signal-based approach, and implementing that instead.

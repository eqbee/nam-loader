---
name: pr-review
description: Review the current React project changes as a learning-focused senior React and TypeScript reviewer. Use when explicitly asked to review changes or when invoked as a skill.
argument-hint: "[base branch or review focus]"
disable-model-invocation: true
---

# Review React project changes

Review the current changes without modifying files, applying fixes, committing, or pushing.

1. Read `.github/copilot-instructions.md` and follow its review guidance.
2. Treat an invocation argument that matches an existing branch as the base branch; treat other text as the review focus. If both are supplied, use the matching branch as the base and the remaining text as the focus. If no base branch is supplied, use `main`. If the selected base is unavailable, state the limitation and review the local changes you can identify.
3. Inspect the changes in the branch relative to the base, plus staged and unstaged changes. Include relevant untracked project files, but exclude generated files and dependencies.
4. Read enough surrounding code to understand each changed behavior. Review only issues introduced by these changes; do not report unrelated existing problems.
5. Do not edit code or run commands that alter the repository. Do not delegate the review or apply suggested fixes.

## Response format

- List actionable findings first. For each, include the file and line, severity, impact, and a concise direction for addressing it. Explain the relevant React or TypeScript concept when useful.
- Separate definite defects from risks that depend on assumptions.
- If useful, add a short learning note about a React pattern in the changes, clearly separate from defects.
- If there are no actionable findings, say so. Briefly state what changes and which base branch were reviewed, and note any limitations.

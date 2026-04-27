# CYSE 411 Lab: Software Composition Analysis (SCA) and Supply Chain Security

## Overview

In this lab you will investigate software supply-chain risks using Software Composition Analysis (SCA) tools.

You will:

- Analyze direct and transitive dependencies
- Discover vulnerable packages (CVEs)
- Generate a Software Bill of Materials (SBOM)
- Fix dependency vulnerabilities
- Use GitHub Actions security workflows

---

## Learning Objectives

After this lab you should be able to:

- Explain direct vs transitive dependency risks
- Interpret CVE findings
- Use open-source SCA tools
- Generate and inspect SBOM artifacts
- Remediate supply-chain weaknesses

---

## Scenario

A development team deployed a small Node.js application.

Security suspects:

- outdated dependencies
- hidden transitive risk
- possible license concerns
- poor dependency hygiene

You were asked to assess the software supply chain.

---

## Tasks

## Task 1 — Run the Security Workflows

Push your repository.

Verify these GitHub Actions run:

- Dependency Check
- SBOM Generation

Capture findings.

---


## Task 2 — Identify Vulnerabilities

Answer:

1. Which dependency contains a known CVE?
2. Is it direct or transitive?
3. What is its CVSS severity?
4. What is the remediation recommendation?

Document in:

report.md

---

## Task 3 — Generate Dependency Tree

Run:

```bash
npm ls
```

Identify one transitive dependency chain.

Example:

app -> packageA -> packageB

---

## Task 4 — Patch the Vulnerabilities

Update insecure packages.

Commit fix.

Show scan results improved.

---

## Task 5 — Analyze the SBOM

Review generated CycloneDX SBOM.

Answer:

How many third-party components are trusted by this application?

---

## Bonus Challenge

Investigate:

Could dependency confusion affect this project?

Explain conceptually.

---

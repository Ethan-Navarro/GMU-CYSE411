import os

def check_file(path, message):
    if not os.path.exists(path):
        return f"❌ Missing {path}. {message}"
    return None

def check_custom_rule():
    path = "semgrep/custom-rule.yaml"
    if not os.path.exists(path):
        return "❌ Missing custom rule. You must create your own Semgrep rule."

    with open(path) as f:
        content = f.read()

    if "pattern" not in content:
        return "❌ Custom rule missing 'pattern'. Define what to detect."

    return "✅ Custom rule detected"

def run():
    results = []

    workflows = [
        "sast-xss.yml",
        "sast-sqli.yml",
        "sast-path.yml",
        "sast-csrf.yml",
        "sast-custom.yml"
    ]

    for wf in workflows:
        path = f".github/workflows/{wf}"
        r = check_file(path, "Create this workflow.")
        if r:
            results.append(r)
        else:
            results.append(f"✅ {wf} exists")

    results.append(check_custom_rule())

    print("\n=== RESULTS ===\n")
    for r in results:
        print(r)

    print("\nSuggestions:")
    print("- Each workflow should focus on ONE vulnerability")
    print("- Use specific Semgrep rules")
    print("- Use --error for enforcement")
    print("- Ensure correct file paths")

if __name__ == "__main__":
    run()
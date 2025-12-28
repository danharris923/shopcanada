#!/usr/bin/env python3
"""
Update brands-data.ts with scraped brandStory content
======================================================
Reads scrape-results.json and updates the brands-data.ts file
with scraped brandStory content.

Usage:
  python scripts/update-brands-from-scrape.py
"""

import json
import re
from datetime import datetime
from pathlib import Path

# Color output
class Colors:
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    RESET = '\033[0m'

def log(msg: str, color: str = Colors.CYAN):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f"{color}[{timestamp}] {msg}{Colors.RESET}")

def log_success(msg: str):
    log(f"[OK] {msg}", Colors.GREEN)

def log_warning(msg: str):
    log(f"[WARN] {msg}", Colors.YELLOW)

def log_error(msg: str):
    log(f"[ERR] {msg}", Colors.RED)


def load_scrape_results() -> dict:
    """Load scrape results from JSON"""
    results_file = Path("scripts/scrape-results.json")
    if not results_file.exists():
        log_error(f"Results file not found: {results_file}")
        log("Run 'python scripts/scrape-ltk-brands.py' first")
        return {}

    with open(results_file) as f:
        results = json.load(f)

    # Convert to dict keyed by slug
    return {r["slug"]: r for r in results}


def update_brands_data(results: dict):
    """Update brands-data.ts with scraped content"""
    brands_file = Path("src/lib/brands-data.ts")

    if not brands_file.exists():
        log_error(f"Brands file not found: {brands_file}")
        return

    with open(brands_file, 'r', encoding='utf-8') as f:
        content = f.read()

    updates = 0
    for slug, data in results.items():
        if not data.get("brandStory"):
            continue

        # Escape the brandStory for JSON
        brand_story = data["brandStory"]
        # Escape backslashes, quotes, and newlines
        brand_story = brand_story.replace('\\', '\\\\')
        brand_story = brand_story.replace('"', '\\"')
        brand_story = brand_story.replace('\n', '\\n')

        # Find the brand entry and add brandStory if missing
        # Pattern: "slug": "slug-name" ... "description": "..." }
        pattern = rf'("slug":\s*"{re.escape(slug)}".*?"description":\s*"[^"]*")\s*\}}'

        def add_brand_story(match):
            existing = match.group(1)
            # Check if brandStory already exists
            if '"brandStory"' in existing:
                return match.group(0)  # Don't modify
            return f'{existing},\n    "brandStory": "{brand_story}"\n  }}'

        new_content, count = re.subn(pattern, add_brand_story, content, flags=re.DOTALL)
        if count > 0:
            content = new_content
            updates += 1
            log_success(f"Added brandStory for: {slug}")

    if updates > 0:
        # Write back
        with open(brands_file, 'w', encoding='utf-8') as f:
            f.write(content)
        log_success(f"Updated {updates} brands in {brands_file}")
    else:
        log_warning("No updates made")


def main():
    log("="*60)
    log("Update brands-data.ts from scrape results")
    log("="*60)

    results = load_scrape_results()
    if not results:
        return

    brands_with_story = sum(1 for r in results.values() if r.get("brandStory"))
    log(f"Loaded {len(results)} results, {brands_with_story} have brandStory")

    update_brands_data(results)


if __name__ == "__main__":
    main()

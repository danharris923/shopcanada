#!/usr/bin/env python3
"""
LTK Brand Scraper - Screenshots & About Page Content
=====================================================
Scrapes Canadian sites for:
1. Homepage screenshots (after clearing cookie popups)
2. About page content for brandStory field
3. High-res logos

Usage:
  pip install playwright beautifulsoup4 requests
  playwright install chromium
  python scripts/scrape-ltk-brands.py
"""

import asyncio
import json
import os
import re
import time
from datetime import datetime
from pathlib import Path
from typing import Optional
from urllib.parse import urljoin, urlparse

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

# LTK Brands to scrape (37 total)
LTK_BRANDS = [
    # Fashion (23)
    {"slug": "abercrombie", "name": "Abercrombie & Fitch", "url": "https://www.abercrombie.com/shop/ca", "about_paths": ["/shop/ca/about-us", "/shop/about-us"]},
    {"slug": "american-eagle", "name": "American Eagle", "url": "https://www.ae.com/ca/en", "about_paths": ["/ca/en/content/about-us", "/intl/en/content/about-us"]},
    {"slug": "aerie", "name": "Aerie", "url": "https://www.ae.com/ca/en/c/aerie/cat10004", "about_paths": ["/ca/en/content/about-aerie"]},
    {"slug": "alo-yoga", "name": "Alo Yoga", "url": "https://www.aloyoga.com", "about_paths": ["/pages/about", "/about"]},
    {"slug": "guess", "name": "GUESS", "url": "https://www.guess.com/ca/en/", "about_paths": ["/ca/en/about-us", "/about"]},
    {"slug": "skims", "name": "SKIMS", "url": "https://skims.com/en-ca", "about_paths": ["/pages/about", "/about"]},
    {"slug": "revolve", "name": "Revolve", "url": "https://www.revolve.com", "about_paths": ["/r/AboutUs.jsp", "/about"]},
    {"slug": "princess-polly", "name": "Princess Polly", "url": "https://us.princesspolly.com", "about_paths": ["/pages/about-us", "/about"]},
    {"slug": "shopbop", "name": "Shopbop", "url": "https://www.shopbop.com", "about_paths": ["/ci/about-shopbop", "/about"]},
    {"slug": "vuori", "name": "Vuori", "url": "https://vuoriclothing.com", "about_paths": ["/pages/about", "/about"]},
    {"slug": "lulus", "name": "Lulus", "url": "https://www.lulus.com", "about_paths": ["/about", "/pages/about"]},
    {"slug": "madewell", "name": "Madewell", "url": "https://www.madewell.com", "about_paths": ["/inspo-do-well-about-us", "/about"]},
    {"slug": "anthropologie", "name": "Anthropologie", "url": "https://www.anthropologie.com", "about_paths": ["/help/about-us", "/about"]},
    {"slug": "free-people", "name": "Free People", "url": "https://www.freepeople.com", "about_paths": ["/help/about-us", "/about"]},
    {"slug": "cotton-on", "name": "Cotton On", "url": "https://cottonon.com/CA/", "about_paths": ["/CA/about-us.html", "/about"]},
    {"slug": "nasty-gal", "name": "Nasty Gal", "url": "https://www.nastygal.com", "about_paths": ["/about-us", "/about"]},
    {"slug": "prettylittlething", "name": "PrettyLittleThing", "url": "https://www.prettylittlething.ca", "about_paths": ["/page/about-us.html", "/about"]},
    {"slug": "urban-outfitters", "name": "Urban Outfitters", "url": "https://www.urbanoutfitters.com/en-ca", "about_paths": ["/help/about-urban-outfitters", "/about"]},
    {"slug": "steve-madden", "name": "Steve Madden", "url": "https://www.stevemadden.ca", "about_paths": ["/pages/about", "/about"]},
    {"slug": "new-balance", "name": "New Balance", "url": "https://www.newbalance.ca", "about_paths": ["/en_ca/about-new-balance", "/about"]},
    {"slug": "birkenstock", "name": "Birkenstock", "url": "https://www.birkenstock.ca", "about_paths": ["/en-ca/company", "/about"]},
    {"slug": "ugg", "name": "UGG", "url": "https://www.ugg.com/ca", "about_paths": ["/ca/about-ugg.html", "/about"]},
    {"slug": "simons", "name": "Simons", "url": "https://www.simons.ca", "about_paths": ["/en/cms/about-simons--s12", "/about"]},

    # Beauty (8)
    {"slug": "charlotte-tilbury", "name": "Charlotte Tilbury", "url": "https://www.charlottetilbury.com/ca", "about_paths": ["/ca/about-charlotte", "/about"]},
    {"slug": "tarte", "name": "Tarte Cosmetics", "url": "https://tartecosmetics.com", "about_paths": ["/about-tarte", "/about"]},
    {"slug": "elf", "name": "e.l.f. Cosmetics", "url": "https://www.elfcosmetics.com", "about_paths": ["/pages/about-us", "/about"]},
    {"slug": "tula", "name": "Tula Skincare", "url": "https://www.tula.com", "about_paths": ["/pages/about-us", "/about"]},
    {"slug": "colleen-rothschild", "name": "Colleen Rothschild", "url": "https://www.colleenrothschild.com", "about_paths": ["/pages/our-story", "/about"]},
    {"slug": "dime-beauty", "name": "Dime Beauty", "url": "https://www.dimebeauty.co", "about_paths": ["/pages/about-us", "/about"]},
    {"slug": "merit", "name": "Merit Beauty", "url": "https://www.meritbeauty.com", "about_paths": ["/pages/about", "/about"]},
    {"slug": "supergoop", "name": "Supergoop", "url": "https://supergoop.com", "about_paths": ["/pages/about-us", "/about"]},

    # Home (6)
    {"slug": "crate-and-barrel", "name": "Crate & Barrel", "url": "https://www.crateandbarrel.ca", "about_paths": ["/customer-service/about-us", "/about"]},
    {"slug": "pottery-barn", "name": "Pottery Barn", "url": "https://www.potterybarn.ca", "about_paths": ["/pages/about-us", "/about"]},
    {"slug": "west-elm", "name": "West Elm", "url": "https://www.westelm.ca", "about_paths": ["/pages/about-us", "/about"]},
    {"slug": "cb2", "name": "CB2", "url": "https://www.cb2.ca", "about_paths": ["/customer-service/about-us", "/about"]},
    {"slug": "dyson", "name": "Dyson", "url": "https://www.dyson.ca", "about_paths": ["/en/discover/about-dyson", "/about"]},
    {"slug": "brooklinen", "name": "Brooklinen", "url": "https://www.brooklinen.com", "about_paths": ["/pages/about-us", "/about"]},
]

# Common cookie popup selectors to click to dismiss
COOKIE_SELECTORS = [
    # Accept buttons
    'button:has-text("Accept")',
    'button:has-text("Accept All")',
    'button:has-text("Accept Cookies")',
    'button:has-text("I Accept")',
    'button:has-text("Got it")',
    'button:has-text("OK")',
    'button:has-text("Agree")',
    'button:has-text("Allow")',
    'button:has-text("Allow All")',
    'button:has-text("Continue")',
    # Close buttons
    'button[aria-label="Close"]',
    'button[aria-label="close"]',
    'button.close-button',
    '.cookie-banner button',
    '.cookie-consent button',
    '.privacy-banner button',
    '#onetrust-accept-btn-handler',
    '.onetrust-accept-btn-handler',
    '[data-testid="close-button"]',
    # Newsletter popups
    'button[aria-label="Close dialog"]',
    '.modal-close',
    '.popup-close',
    '.newsletter-close',
]

# Paths to try for scraping about content
ABOUT_PAGE_PATTERNS = [
    '/about',
    '/about-us',
    '/our-story',
    '/company',
    '/about/our-story',
    '/pages/about',
    '/pages/about-us',
    '/pages/our-story',
    '/en/about',
    '/en/about-us',
    '/en-ca/about',
    '/ca/about',
]


class BrandScraper:
    def __init__(self, output_dir: str = "public/brand-screenshots"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.results = []
        self.progress_file = Path("scripts/scrape-progress.json")

    def load_progress(self) -> set:
        """Load previously scraped brands to skip"""
        if self.progress_file.exists():
            with open(self.progress_file, encoding='utf-8') as f:
                data = json.load(f)
                return set(data.get("completed", []))
        return set()

    def save_progress(self, completed: set):
        """Save progress for resuming"""
        with open(self.progress_file, 'w', encoding='utf-8') as f:
            json.dump({"completed": list(completed), "last_run": datetime.now().isoformat()}, f, indent=2)

    async def dismiss_popups(self, page):
        """Try to dismiss cookie banners and newsletter popups"""
        for selector in COOKIE_SELECTORS:
            try:
                button = page.locator(selector).first
                if await button.is_visible(timeout=500):
                    await button.click(timeout=1000)
                    log(f"  Dismissed popup: {selector[:40]}...")
                    await asyncio.sleep(0.5)
            except:
                continue

        # Also try pressing Escape for modal popups
        try:
            await page.keyboard.press("Escape")
            await asyncio.sleep(0.3)
        except:
            pass

    async def take_screenshot(self, page, slug: str) -> Optional[str]:
        """Take a screenshot of the current page"""
        screenshot_path = self.output_dir / f"{slug}.png"
        try:
            # Set viewport to standard desktop size
            await page.set_viewport_size({"width": 1440, "height": 900})

            # Wait for page to be fully loaded
            await page.wait_for_load_state("networkidle", timeout=10000)

            # Dismiss any popups
            await self.dismiss_popups(page)
            await asyncio.sleep(1)

            # Scroll down slightly to trigger lazy loading, then back up
            await page.evaluate("window.scrollTo(0, 300)")
            await asyncio.sleep(0.5)
            await page.evaluate("window.scrollTo(0, 0)")
            await asyncio.sleep(0.5)

            # Dismiss popups again (some appear after scroll)
            await self.dismiss_popups(page)

            # Take screenshot
            await page.screenshot(path=str(screenshot_path), full_page=False)
            log_success(f"Screenshot saved: {screenshot_path}")
            return str(screenshot_path)
        except Exception as e:
            log_error(f"Screenshot failed: {e}")
            return None

    async def scrape_about_page(self, page, base_url: str, about_paths: list) -> Optional[str]:
        """Try to scrape about page content"""
        # Try provided paths first, then fallback patterns
        all_paths = about_paths + ABOUT_PAGE_PATTERNS

        for path in all_paths:
            try:
                about_url = urljoin(base_url, path)
                log(f"  Trying about page: {about_url}")

                response = await page.goto(about_url, timeout=15000, wait_until="domcontentloaded")

                if response and response.status == 200:
                    # Wait a bit for content to load
                    await asyncio.sleep(2)

                    # Extract main content
                    content = await self.extract_about_content(page)
                    if content and len(content) > 200:
                        log_success(f"Found about content ({len(content)} chars)")
                        return content
            except Exception as e:
                continue

        log_warning("No about page content found")
        return None

    async def extract_about_content(self, page) -> Optional[str]:
        """Extract meaningful content from about page"""
        try:
            # Try various selectors for main content
            selectors = [
                'main article',
                '.about-content',
                '.our-story',
                '.about-us-content',
                '[class*="about"]',
                '[class*="story"]',
                'article',
                '.content-wrapper',
                'main',
            ]

            for selector in selectors:
                try:
                    element = page.locator(selector).first
                    if await element.is_visible(timeout=1000):
                        text = await element.inner_text()
                        # Clean up the text
                        text = self.clean_text(text)
                        if len(text) > 200:
                            return text
                except:
                    continue

            # Fallback: get all paragraph text
            paragraphs = await page.locator('p').all_inner_texts()
            text = ' '.join(paragraphs)
            return self.clean_text(text)

        except Exception as e:
            log_error(f"Content extraction failed: {e}")
            return None

    def clean_text(self, text: str) -> str:
        """Clean up scraped text"""
        if not text:
            return ""

        # Remove excessive whitespace
        text = re.sub(r'\s+', ' ', text)
        # Remove common navigation/footer text
        remove_patterns = [
            r'(Shop Now|Add to Cart|Sign Up|Subscribe|Newsletter|Cookie|Privacy Policy|Terms).*?(?=\.|$)',
            r'(Facebook|Instagram|Twitter|Pinterest|TikTok).*?(?=\s|$)',
        ]
        for pattern in remove_patterns:
            text = re.sub(pattern, '', text, flags=re.IGNORECASE)

        # Truncate to reasonable length (max 2000 chars)
        if len(text) > 2000:
            text = text[:2000] + "..."

        return text.strip()

    def format_brand_story(self, content: str, brand_name: str) -> str:
        """Format scraped content as HTML brandStory"""
        if not content:
            return ""

        # Split into paragraphs
        paragraphs = [p.strip() for p in content.split('.') if len(p.strip()) > 30]

        # Create HTML structure
        html = f"<h3>About {brand_name}</h3>\n"
        html += "<p>" + ". ".join(paragraphs[:5]) + ".</p>"

        return html

    async def scrape_brand(self, browser, brand: dict) -> dict:
        """Scrape a single brand"""
        slug = brand["slug"]
        name = brand["name"]
        url = brand["url"]
        about_paths = brand.get("about_paths", [])

        log(f"\n{'='*60}")
        log(f"Scraping: {name} ({slug})")
        log(f"URL: {url}")

        result = {
            "slug": slug,
            "name": name,
            "url": url,
            "screenshot": None,
            "brandStory": None,
            "error": None,
        }

        context = None
        try:
            # Create new context for each brand (clean cookies)
            context = await browser.new_context(
                viewport={"width": 1440, "height": 900},
                locale="en-CA",
                timezone_id="America/Toronto",
            )
            page = await context.new_page()

            # Navigate to homepage
            log(f"  Loading homepage...")
            await page.goto(url, timeout=30000, wait_until="domcontentloaded")
            await asyncio.sleep(2)

            # Take screenshot
            result["screenshot"] = await self.take_screenshot(page, slug)

            # Scrape about page
            log(f"  Looking for about page...")
            about_content = await self.scrape_about_page(page, url, about_paths)
            if about_content:
                result["brandStory"] = self.format_brand_story(about_content, name)

        except Exception as e:
            result["error"] = str(e)
            log_error(f"Failed to scrape {name}: {e}")
        finally:
            if context:
                await context.close()

        return result

    async def run(self, resume: bool = True):
        """Run the scraper on all LTK brands"""
        from playwright.async_api import async_playwright

        log("="*60)
        log("LTK Brand Scraper - Screenshots & About Pages")
        log("="*60)
        log(f"Output directory: {self.output_dir}")
        log(f"Brands to scrape: {len(LTK_BRANDS)}")

        # Load progress
        completed = self.load_progress() if resume else set()
        if completed:
            log(f"Resuming - {len(completed)} brands already completed")

        async with async_playwright() as p:
            # Launch browser
            log("Launching browser...")
            browser = await p.chromium.launch(
                headless=True,  # Set to False for debugging
            )

            try:
                for i, brand in enumerate(LTK_BRANDS):
                    if brand["slug"] in completed:
                        log(f"Skipping {brand['name']} (already completed)")
                        continue

                    log(f"\nProgress: {i+1}/{len(LTK_BRANDS)}")

                    result = await self.scrape_brand(browser, brand)
                    self.results.append(result)

                    # Mark as completed
                    completed.add(brand["slug"])
                    self.save_progress(completed)

                    # Rate limiting - be polite
                    await asyncio.sleep(2)

            finally:
                await browser.close()

        # Save final results
        self.save_results()
        self.print_summary()

    def save_results(self):
        """Save scrape results to JSON"""
        results_file = Path("scripts/scrape-results.json")
        with open(results_file, 'w') as f:
            json.dump(self.results, f, indent=2)
        log_success(f"Results saved to {results_file}")

    def print_summary(self):
        """Print summary of scrape results"""
        log("\n" + "="*60)
        log("SCRAPE SUMMARY")
        log("="*60)

        success_count = sum(1 for r in self.results if r["screenshot"])
        about_count = sum(1 for r in self.results if r["brandStory"])
        error_count = sum(1 for r in self.results if r["error"])

        log(f"Screenshots captured: {success_count}/{len(self.results)}")
        log(f"About pages scraped: {about_count}/{len(self.results)}")
        log(f"Errors: {error_count}")

        if error_count > 0:
            log_warning("\nFailed brands:")
            for r in self.results:
                if r["error"]:
                    log_error(f"  - {r['name']}: {r['error'][:50]}")


def main():
    """Entry point"""
    import argparse
    parser = argparse.ArgumentParser(description="Scrape LTK brand screenshots and about pages")
    parser.add_argument("--no-resume", action="store_true", help="Start fresh, don't resume")
    parser.add_argument("--output", default="public/brand-screenshots", help="Output directory for screenshots")
    args = parser.parse_args()

    scraper = BrandScraper(output_dir=args.output)
    asyncio.run(scraper.run(resume=not args.no_resume))


if __name__ == "__main__":
    main()

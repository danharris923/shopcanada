#!/usr/bin/env python3
"""
=============================================================================
SITE AUDITOR - Comprehensive Front-End Website Audit Tool
=============================================================================
Author: Dan's Claude Assistant  
Purpose: Crawl a website and detect:
         - AI-generated "slop" content
         - SEO killers (missing meta, bad headings, etc.)
         - Broken links (404s, 5xx errors)
         - Duplicate/repeated content
         - Image issues (missing alt, broken images)
         - Technical SEO problems

SMART CRAWLING:
    - Crawls first-level pages (homepage + links FROM homepage)
    - Random samples from template-heavy sections (deals, stores, etc.)
    - Skips the 1000s of templated pages you don't need to audit
         
Requirements:
    pip install playwright colorama beautifulsoup4 --break-system-packages
    playwright install chromium
=============================================================================
"""

import asyncio
import json
import re
import hashlib
import random
from datetime import datetime
from urllib.parse import urljoin, urlparse
from collections import defaultdict
from dataclasses import dataclass, field
from typing import Optional, Set, List, Dict
import sys

# ============================================================================
# COLORAMA SETUP - Pretty colored output!
# ============================================================================
try:
    from colorama import init, Fore, Back, Style
    init(autoreset=True)  # Auto-reset colors after each print
    COLORS_AVAILABLE = True
except ImportError:
    print("WARNING: colorama not installed. Run: pip install colorama --break-system-packages")
    class Fore:
        RED = YELLOW = GREEN = CYAN = MAGENTA = WHITE = BLUE = LIGHTBLACK_EX = ""
    class Back:
        RED = YELLOW = GREEN = ""
    class Style:
        BRIGHT = DIM = RESET_ALL = ""
    COLORS_AVAILABLE = False

try:
    from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeout
except ImportError:
    print(f"{Fore.RED}ERROR: Playwright not installed!")
    print(f"{Fore.YELLOW}Run: pip install playwright --break-system-packages")
    print(f"{Fore.YELLOW}Then: playwright install chromium")
    sys.exit(1)

try:
    from bs4 import BeautifulSoup
except ImportError:
    print(f"{Fore.RED}ERROR: BeautifulSoup not installed!")
    print(f"{Fore.YELLOW}Run: pip install beautifulsoup4 --break-system-packages")
    sys.exit(1)


# ============================================================================
# CONFIGURATION - EDIT THIS SECTION FOR YOUR SITE!
# ============================================================================
class AuditConfig:
    """
    -------------------------------------------------------------------------
    CONFIGURATION CLASS - Customize this for your specific site!
    -------------------------------------------------------------------------
    This is where you tell the auditor:
    - What site to crawl
    - What sections to skip entirely  
    - What sections to randomly sample from
    - How many random samples to grab
    -------------------------------------------------------------------------
    """
    
    # The site you want to audit
    BASE_URL = "https://shopcanada.cc"
    
    # -----------------------------------------------------------------------
    # EXCLUDE PATTERNS - Pages matching these WON'T be crawled at all
    # These are regex patterns matched against the URL path
    # -----------------------------------------------------------------------
    EXCLUDE_PATTERNS = [
        r'^/deal/',           # Individual deal pages (e.g., /deal/some-deal-slug)
        r'^/deals/',          # Deal listing pages
        r'^/store/.+',        # Individual store pages (but NOT /store/ index)
        r'^/stores/.+',       # Alternative store path
        r'^/product/',        # Individual product pages
        r'^/products/',       # Product listings
        r'^/coupon/',         # Individual coupon pages
        r'^/coupons/',        # Coupon listings
        r'^/tag/',            # Tag pages
        r'^/author/',         # Author archive pages
        r'^/page/\d+',        # Pagination pages
        r'\?',                # Any URL with query strings (pagination, filters)
        r'^/wp-',             # WordPress system pages
        r'^/feed',            # RSS feeds
        r'^/cdn-cgi/',        # Cloudflare pages
    ]
    
    # -----------------------------------------------------------------------
    # SAMPLE SECTIONS - Sections where we grab RANDOM samples instead of all
    # Format: { "path_prefix": number_of_samples }
    # -----------------------------------------------------------------------
    SAMPLE_SECTIONS = {
        "/flipp/": 5,              # Grab 5 random pages from Flipp Canada section
        "/flyers/": 5,             # Grab 5 random flyer pages
        "/international/": 5,      # Grab 5 random international retailer pages
        "/retailers/": 5,          # Grab 5 random retailer pages
        "/brand/": 3,              # Grab 3 random brand pages
        "/category/": 5,           # Grab 5 random category pages
    }
    
    # -----------------------------------------------------------------------
    # FIRST-LEVEL CRAWL SETTINGS
    # -----------------------------------------------------------------------
    CRAWL_DEPTH = 1               # 1 = homepage + direct links only
    MAX_FIRST_LEVEL_PAGES = 100   # Safety limit for first-level pages
    
    # -----------------------------------------------------------------------
    # REQUEST SETTINGS - Be nice to your server!
    # -----------------------------------------------------------------------
    REQUEST_DELAY_MS = 500        # Milliseconds between requests
    PAGE_TIMEOUT_MS = 30000       # 30 second timeout per page
    MAX_RETRIES = 2               # Retry failed pages this many times
    
    # -----------------------------------------------------------------------
    # AI SLOP DETECTION - Phrases that scream "AI wrote this"
    # -----------------------------------------------------------------------
    AI_SLOP_PHRASES = [
        # The classics
        "dive into",
        "delve into", 
        "let's explore",
        "in today's world",
        "in this article",
        "without further ado",
        "it's important to note",
        "it's worth noting",
        "at the end of the day",
        "in conclusion",
        "to summarize",
        "game-changer",
        "game changer",
        "elevate your",
        "take .* to the next level",
        "unlock the power",
        "harness the power",
        "leverage the power",
        "empower you to",
        "embark on",
        "navigate the",
        "in the realm of",
        "in the world of",
        "landscape of",
        "tapestry of",
        "myriad of",
        "plethora of",
        "multifaceted",
        "comprehensive guide",
        "ultimate guide",
        "everything you need to know",
        "buckle up",
        "stay tuned",
        "look no further",
        "whether you're a .* or",
        "from .* to .*,",
        "not just .*, but",
        "isn't just about",
        "more than just",
        "revolutionize",
        "transform your",
        "supercharge",
        "skyrocket",
        "seamlessly",
        "effortlessly",
        "robust",
        "cutting-edge",
        "state-of-the-art",
        "best-in-class",
        "world-class",
        "top-notch",
        "first-rate",
        "unparalleled",
        "unprecedented",
        "undeniable",
        "excels at",
        "stands out",
        "boasts",
        "offers a unique",
        "provides a unique",
        "ensuring that",
        "rest assured",
        "enables you to",
        "allows you to seamlessly",
        "designed to",
        "crafted to",
        "tailored to",
        "curated",
        "bespoke",
        "streamline",
        "optimize",
        "maximize",
        "minimize",
        "enhance your",
        "boost your",
        "level up",
        "up your .* game",
        "a]? must-have",
        "essential for",
        "crucial for",
        "vital for",
        "key to",
        "the secret to",
        "the key is",
        "here's the thing",
        "here's the deal",
        "the bottom line",
        "when it comes to",
        "it goes without saying",
        "needless to say",
        "as we all know",
        "as you may know",
        "as you're probably aware",
        "I'm excited to",
        "I'm thrilled to",
        "I'm happy to",
        "I'd be happy to",
        # Canadian-specific AI slop for deal sites
        "savvy shoppers",
        "savvy consumers",
        "budget-conscious",
        "wallet-friendly",
        "pocket-friendly",
        "bang for your buck",
        "stretch your dollar",
        "hard-earned money",
        "your hard-earned",
        "informed decision",
        "informed purchase",
    ]
    
    # -----------------------------------------------------------------------
    # SEO SETTINGS - What's considered "bad"
    # -----------------------------------------------------------------------
    MIN_TITLE_LENGTH = 30         # Titles shorter than this = problem
    MAX_TITLE_LENGTH = 60         # Titles longer than this = problem
    MIN_META_DESC_LENGTH = 120    # Meta descriptions shorter = problem
    MAX_META_DESC_LENGTH = 160    # Meta descriptions longer = problem
    MIN_CONTENT_WORDS = 300       # Pages with fewer words = thin content
    
    # -----------------------------------------------------------------------
    # OUTPUT SETTINGS
    # -----------------------------------------------------------------------
    REPORT_FILENAME = "site_audit_report"  # Will add timestamp + .json/.html
    VERBOSE_OUTPUT = True         # Show detailed progress (you want this!)


# ============================================================================
# DATA CLASSES - Store our findings in organized structures
# ============================================================================
@dataclass
class PageIssue:
    """
    Represents a single issue found on a page.
    
    Attributes:
        severity: "critical", "warning", or "info"
        category: What type of issue (seo, content, link, image, ai_slop)
        message: Human-readable description of the issue
        details: Optional extra context
    """
    severity: str           # critical, warning, info
    category: str           # seo, content, link, image, ai_slop
    message: str            # What's wrong
    details: Optional[str] = None  # Extra context


@dataclass
class PageAudit:
    """
    Complete audit results for a single page.
    
    This holds everything we discovered about one URL.
    """
    url: str
    status_code: int = 0
    title: str = ""
    meta_description: str = ""
    h1_tags: List[str] = field(default_factory=list)
    word_count: int = 0
    content_hash: str = ""          # For duplicate detection
    issues: List[PageIssue] = field(default_factory=list)
    links_found: List[str] = field(default_factory=list)
    images_found: List[Dict] = field(default_factory=list)
    ai_slop_matches: List[str] = field(default_factory=list)
    crawled_at: str = ""
    load_time_ms: int = 0


# ============================================================================
# HELPER FUNCTIONS - Utility stuff
# ============================================================================
def print_banner():
    """Print a fancy startup banner because we're not animals."""
    banner = f"""
{Fore.CYAN}{Style.BRIGHT}
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║   {Fore.WHITE}███████╗██╗████████╗███████╗     █████╗ ██╗   ██╗██████╗ ██╗████████╗{Fore.CYAN}   ║
║   {Fore.WHITE}██╔════╝██║╚══██╔══╝██╔════╝    ██╔══██╗██║   ██║██╔══██╗██║╚══██╔══╝{Fore.CYAN}   ║
║   {Fore.WHITE}███████╗██║   ██║   █████╗      ███████║██║   ██║██║  ██║██║   ██║   {Fore.CYAN}   ║
║   {Fore.WHITE}╚════██║██║   ██║   ██╔══╝      ██╔══██║██║   ██║██║  ██║██║   ██║   {Fore.CYAN}   ║
║   {Fore.WHITE}███████║██║   ██║   ███████╗    ██║  ██║╚██████╔╝██████╔╝██║   ██║   {Fore.CYAN}   ║
║   {Fore.WHITE}╚══════╝╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝   ╚═╝   {Fore.CYAN}   ║
║                                                                               ║
║   {Fore.YELLOW}Comprehensive Website Audit Tool - AI Slop | SEO | Links | Content{Fore.CYAN}     ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
{Style.RESET_ALL}"""
    print(banner)


def print_section(title: str):
    """Print a section header."""
    print(f"\n{Fore.CYAN}{Style.BRIGHT}{'═' * 70}")
    print(f"  {title}")
    print(f"{'═' * 70}{Style.RESET_ALL}\n")


def print_progress(current: int, total: int, url: str):
    """Print progress indicator."""
    pct = (current / total) * 100 if total > 0 else 0
    bar_width = 30
    filled = int(bar_width * current / total) if total > 0 else 0
    bar = "█" * filled + "░" * (bar_width - filled)
    
    # Truncate URL if too long
    display_url = url if len(url) < 50 else url[:47] + "..."
    
    print(f"{Fore.CYAN}[{bar}] {pct:5.1f}% ({current}/{total}){Style.RESET_ALL}")
    print(f"  {Fore.LIGHTBLACK_EX}→ {display_url}{Style.RESET_ALL}")


def print_issue(issue: PageIssue):
    """Print a single issue with appropriate coloring."""
    if issue.severity == "critical":
        icon = f"{Fore.RED}✖"
        color = Fore.RED
    elif issue.severity == "warning":
        icon = f"{Fore.YELLOW}⚠"
        color = Fore.YELLOW
    else:
        icon = f"{Fore.BLUE}ℹ"
        color = Fore.BLUE
    
    print(f"    {icon} {color}[{issue.category.upper()}]{Style.RESET_ALL} {issue.message}")
    if issue.details:
        print(f"       {Fore.LIGHTBLACK_EX}↳ {issue.details}{Style.RESET_ALL}")


def debug(message: str, level: str = "info"):
    """Print debug message if verbose mode is on."""
    if not AuditConfig.VERBOSE_OUTPUT:
        return
    
    timestamp = datetime.now().strftime("%H:%M:%S")
    
    if level == "error":
        prefix = f"{Fore.RED}[ERROR]"
    elif level == "warn":
        prefix = f"{Fore.YELLOW}[WARN]"
    elif level == "success":
        prefix = f"{Fore.GREEN}[OK]"
    else:
        prefix = f"{Fore.LIGHTBLACK_EX}[DEBUG]"
    
    print(f"{Fore.LIGHTBLACK_EX}{timestamp} {prefix} {message}{Style.RESET_ALL}")


def should_exclude_url(url: str, base_url: str) -> bool:
    """
    Check if a URL should be excluded based on our patterns.
    
    This is where we filter out all those templated deal/store pages!
    
    Args:
        url: The URL to check
        base_url: Our site's base URL
        
    Returns:
        True if URL should be EXCLUDED (not crawled)
    """
    # Parse the URL to get just the path
    parsed = urlparse(url)
    path = parsed.path
    
    # Check against each exclude pattern
    for pattern in AuditConfig.EXCLUDE_PATTERNS:
        if re.search(pattern, path, re.IGNORECASE):
            debug(f"Excluding URL (matched '{pattern}'): {url}", "info")
            return True
    
    return False


def get_sample_section(url: str) -> Optional[str]:
    """
    Check if URL belongs to a section we want to randomly sample.
    
    Args:
        url: The URL to check
        
    Returns:
        The section prefix if it's a sample section, None otherwise
    """
    parsed = urlparse(url)
    path = parsed.path
    
    for section_prefix in AuditConfig.SAMPLE_SECTIONS.keys():
        if path.startswith(section_prefix):
            return section_prefix
    
    return None


def is_same_domain(url: str, base_url: str) -> bool:
    """Check if URL belongs to the same domain as our base URL."""
    try:
        base_domain = urlparse(base_url).netloc
        url_domain = urlparse(url).netloc
        return base_domain == url_domain
    except:
        return False


def normalize_url(url: str, base_url: str) -> str:
    """
    Normalize a URL - make relative URLs absolute, remove fragments, etc.
    
    Args:
        url: The URL (might be relative like "/about")
        base_url: Our site's base URL
        
    Returns:
        Fully qualified, normalized URL
    """
    # Handle relative URLs
    if url.startswith('/'):
        url = urljoin(base_url, url)
    elif not url.startswith('http'):
        url = urljoin(base_url, url)
    
    # Remove fragment (#section)
    url = url.split('#')[0]
    
    # Remove trailing slash for consistency (except for root)
    if url.endswith('/') and url != base_url + '/':
        url = url.rstrip('/')
    
    return url


# ============================================================================
# AI SLOP DETECTOR - Find that generic AI garbage!
# ============================================================================
class AISlopDetector:
    """
    ---------------------------------------------------------------------------
    AI SLOP DETECTOR
    ---------------------------------------------------------------------------
    This class scans text content for telltale signs of AI-generated content.
    
    We're looking for:
    1. Overused AI phrases ("delve into", "game-changer", etc.)
    2. Excessive hedging language
    3. Generic filler that says nothing
    4. Repetitive sentence structures
    ---------------------------------------------------------------------------
    """
    
    def __init__(self):
        """Initialize the detector with our phrase patterns."""
        # Compile regex patterns for efficiency
        self.patterns = []
        for phrase in AuditConfig.AI_SLOP_PHRASES:
            try:
                # Make patterns case-insensitive and word-boundary aware
                pattern = re.compile(r'\b' + phrase + r'\b', re.IGNORECASE)
                self.patterns.append((phrase, pattern))
            except re.error:
                # If regex is invalid, try as literal string
                pattern = re.compile(re.escape(phrase), re.IGNORECASE)
                self.patterns.append((phrase, pattern))
        
        debug(f"AI Slop Detector initialized with {len(self.patterns)} patterns", "success")
    
    def analyze(self, text: str) -> List[str]:
        """
        Scan text for AI slop phrases.
        
        Args:
            text: The page content to analyze
            
        Returns:
            List of matched phrases found
        """
        matches = []
        
        for phrase, pattern in self.patterns:
            found = pattern.findall(text)
            if found:
                # Add the phrase and how many times it appeared
                matches.append(f"{phrase} (×{len(found)})")
        
        return matches
    
    def get_slop_score(self, text: str, word_count: int) -> float:
        """
        Calculate an AI slop score (0-100).
        
        Higher = more likely AI generated.
        
        Args:
            text: The content to analyze
            word_count: Total words on the page
            
        Returns:
            Score from 0-100
        """
        if word_count == 0:
            return 0
        
        matches = self.analyze(text)
        match_count = len(matches)
        
        # Score based on matches per 100 words
        density = (match_count / word_count) * 100
        
        # Scale to 0-100 (cap at 100)
        score = min(density * 20, 100)
        
        return round(score, 1)


# ============================================================================
# SEO ANALYZER - Find those ranking killers!
# ============================================================================
class SEOAnalyzer:
    """
    ---------------------------------------------------------------------------
    SEO ANALYZER
    ---------------------------------------------------------------------------
    Checks pages for common SEO problems that hurt your rankings:
    
    - Missing or bad title tags
    - Missing or bad meta descriptions  
    - Heading hierarchy issues (no H1, multiple H1s, skipped levels)
    - Thin content (not enough words)
    - Missing canonical tags
    - Missing Open Graph tags
    ---------------------------------------------------------------------------
    """
    
    def __init__(self):
        """Initialize the analyzer."""
        debug("SEO Analyzer initialized", "success")
    
    def analyze(self, soup: BeautifulSoup, url: str) -> List[PageIssue]:
        """
        Run all SEO checks on a page.
        
        Args:
            soup: Parsed HTML (BeautifulSoup object)
            url: The page URL (for context in messages)
            
        Returns:
            List of issues found
        """
        issues = []
        
        # ===== TITLE TAG CHECKS =====
        title_tag = soup.find('title')
        if not title_tag or not title_tag.string:
            issues.append(PageIssue(
                severity="critical",
                category="seo",
                message="Missing title tag",
                details="Every page needs a unique, descriptive title tag"
            ))
        else:
            title_text = title_tag.string.strip()
            title_len = len(title_text)
            
            if title_len < AuditConfig.MIN_TITLE_LENGTH:
                issues.append(PageIssue(
                    severity="warning",
                    category="seo",
                    message=f"Title too short ({title_len} chars)",
                    details=f"Title: '{title_text}' - Aim for {AuditConfig.MIN_TITLE_LENGTH}-{AuditConfig.MAX_TITLE_LENGTH} chars"
                ))
            elif title_len > AuditConfig.MAX_TITLE_LENGTH:
                issues.append(PageIssue(
                    severity="warning",
                    category="seo",
                    message=f"Title too long ({title_len} chars)",
                    details=f"Will be truncated in search results. Aim for <{AuditConfig.MAX_TITLE_LENGTH} chars"
                ))
        
        # ===== META DESCRIPTION CHECKS =====
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if not meta_desc or not meta_desc.get('content'):
            issues.append(PageIssue(
                severity="critical",
                category="seo",
                message="Missing meta description",
                details="Meta descriptions help CTR in search results"
            ))
        else:
            desc_text = meta_desc.get('content', '').strip()
            desc_len = len(desc_text)
            
            if desc_len < AuditConfig.MIN_META_DESC_LENGTH:
                issues.append(PageIssue(
                    severity="warning",
                    category="seo",
                    message=f"Meta description too short ({desc_len} chars)",
                    details=f"Aim for {AuditConfig.MIN_META_DESC_LENGTH}-{AuditConfig.MAX_META_DESC_LENGTH} chars"
                ))
            elif desc_len > AuditConfig.MAX_META_DESC_LENGTH:
                issues.append(PageIssue(
                    severity="warning",
                    category="seo",
                    message=f"Meta description too long ({desc_len} chars)",
                    details=f"Will be truncated. Aim for <{AuditConfig.MAX_META_DESC_LENGTH} chars"
                ))
        
        # ===== H1 TAG CHECKS =====
        h1_tags = soup.find_all('h1')
        if len(h1_tags) == 0:
            issues.append(PageIssue(
                severity="critical",
                category="seo",
                message="Missing H1 tag",
                details="Every page should have exactly one H1"
            ))
        elif len(h1_tags) > 1:
            issues.append(PageIssue(
                severity="warning",
                category="seo",
                message=f"Multiple H1 tags ({len(h1_tags)} found)",
                details="Best practice is one H1 per page"
            ))
        
        # ===== HEADING HIERARCHY CHECK =====
        headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
        if headings:
            prev_level = 0
            for heading in headings:
                level = int(heading.name[1])
                if prev_level > 0 and level > prev_level + 1:
                    issues.append(PageIssue(
                        severity="warning",
                        category="seo",
                        message=f"Heading hierarchy skip: H{prev_level} → H{level}",
                        details="Don't skip heading levels (e.g., H1 → H3)"
                    ))
                    break  # Only report first skip
                prev_level = level
        
        # ===== CANONICAL TAG CHECK =====
        canonical = soup.find('link', attrs={'rel': 'canonical'})
        if not canonical:
            issues.append(PageIssue(
                severity="warning",
                category="seo",
                message="Missing canonical tag",
                details="Canonical tags help prevent duplicate content issues"
            ))
        
        # ===== OPEN GRAPH CHECKS =====
        og_title = soup.find('meta', attrs={'property': 'og:title'})
        og_desc = soup.find('meta', attrs={'property': 'og:description'})
        og_image = soup.find('meta', attrs={'property': 'og:image'})
        
        missing_og = []
        if not og_title:
            missing_og.append("og:title")
        if not og_desc:
            missing_og.append("og:description")
        if not og_image:
            missing_og.append("og:image")
        
        if missing_og:
            issues.append(PageIssue(
                severity="info",
                category="seo",
                message=f"Missing Open Graph tags: {', '.join(missing_og)}",
                details="OG tags improve social media sharing"
            ))
        
        # ===== ROBOTS META CHECK =====
        robots = soup.find('meta', attrs={'name': 'robots'})
        if robots:
            robots_content = robots.get('content', '').lower()
            if 'noindex' in robots_content:
                issues.append(PageIssue(
                    severity="critical",
                    category="seo",
                    message="Page has noindex directive",
                    details="This page won't appear in search results!"
                ))
        
        return issues


# ============================================================================
# CONTENT ANALYZER - Check for thin/duplicate content
# ============================================================================
class ContentAnalyzer:
    """
    ---------------------------------------------------------------------------
    CONTENT ANALYZER
    ---------------------------------------------------------------------------
    Checks content quality:
    
    - Word count (thin content detection)
    - Content hashing (duplicate detection across pages)
    - Paragraph repetition
    ---------------------------------------------------------------------------
    """
    
    def __init__(self):
        """Initialize with storage for content hashes."""
        self.content_hashes: Dict[str, str] = {}  # hash -> first URL with this content
        self.paragraph_hashes: Dict[str, List[str]] = defaultdict(list)  # hash -> URLs
        debug("Content Analyzer initialized", "success")
    
    def analyze(self, soup: BeautifulSoup, url: str) -> tuple[List[PageIssue], int, str]:
        """
        Analyze page content.
        
        Args:
            soup: Parsed HTML
            url: Page URL
            
        Returns:
            Tuple of (issues, word_count, content_hash)
        """
        issues = []
        
        # Get main content (try common content containers first)
        main_content = (
            soup.find('main') or 
            soup.find('article') or 
            soup.find(class_='content') or
            soup.find(id='content') or
            soup.body
        )
        
        if not main_content:
            return issues, 0, ""
        
        # Extract text content
        # Remove script and style elements first
        for element in main_content.find_all(['script', 'style', 'nav', 'header', 'footer']):
            element.decompose()
        
        text = main_content.get_text(separator=' ', strip=True)
        words = text.split()
        word_count = len(words)
        
        # ===== THIN CONTENT CHECK =====
        if word_count < AuditConfig.MIN_CONTENT_WORDS:
            issues.append(PageIssue(
                severity="warning",
                category="content",
                message=f"Thin content ({word_count} words)",
                details=f"Consider adding more content (aim for >{AuditConfig.MIN_CONTENT_WORDS} words)"
            ))
        
        # ===== DUPLICATE CONTENT CHECK =====
        # Hash the main content
        content_hash = hashlib.md5(text.encode()).hexdigest()
        
        if content_hash in self.content_hashes:
            original_url = self.content_hashes[content_hash]
            issues.append(PageIssue(
                severity="critical",
                category="content",
                message="Duplicate content detected",
                details=f"Same content as: {original_url}"
            ))
        else:
            self.content_hashes[content_hash] = url
        
        # ===== PARAGRAPH DUPLICATION CHECK =====
        paragraphs = main_content.find_all('p')
        for p in paragraphs:
            p_text = p.get_text(strip=True)
            if len(p_text) > 100:  # Only check substantial paragraphs
                p_hash = hashlib.md5(p_text.encode()).hexdigest()
                
                if p_hash in self.paragraph_hashes:
                    if url not in self.paragraph_hashes[p_hash]:
                        self.paragraph_hashes[p_hash].append(url)
                        # Will report in final summary, not per-page
                else:
                    self.paragraph_hashes[p_hash] = [url]
        
        return issues, word_count, content_hash
    
    def get_repeated_paragraphs(self) -> List[tuple]:
        """Get paragraphs that appear on multiple pages."""
        repeated = []
        for p_hash, urls in self.paragraph_hashes.items():
            if len(urls) > 1:
                repeated.append((p_hash, urls))
        return repeated


# ============================================================================
# LINK CHECKER - Find those 404s!
# ============================================================================
class LinkChecker:
    """
    ---------------------------------------------------------------------------
    LINK CHECKER
    ---------------------------------------------------------------------------
    Extracts and validates links:
    
    - Find all links on a page
    - Check for empty hrefs
    - Check for javascript: links
    - Track external vs internal links
    - (Actual 404 checking happens during crawl)
    ---------------------------------------------------------------------------
    """
    
    def __init__(self, base_url: str):
        """Initialize with base URL for determining internal vs external."""
        self.base_url = base_url
        self.base_domain = urlparse(base_url).netloc
        self.checked_links: Dict[str, int] = {}  # URL -> status code
        debug("Link Checker initialized", "success")
    
    def extract_links(self, soup: BeautifulSoup, current_url: str) -> tuple[List[PageIssue], List[str]]:
        """
        Extract all links from a page.
        
        Args:
            soup: Parsed HTML
            current_url: The page we're analyzing
            
        Returns:
            Tuple of (issues, list of link URLs to check)
        """
        issues = []
        links_to_check = []
        
        for link in soup.find_all('a', href=True):
            href = link.get('href', '').strip()
            link_text = link.get_text(strip=True)[:50]  # Truncate for display
            
            # ===== EMPTY HREF =====
            if not href or href == '#':
                issues.append(PageIssue(
                    severity="warning",
                    category="link",
                    message="Empty or placeholder href",
                    details=f"Link text: '{link_text}'"
                ))
                continue
            
            # ===== JAVASCRIPT LINKS =====
            if href.startswith('javascript:'):
                issues.append(PageIssue(
                    severity="info",
                    category="link",
                    message="JavaScript link found",
                    details=f"'{link_text}' - Not crawlable by search engines"
                ))
                continue
            
            # ===== MAILTO/TEL LINKS =====
            if href.startswith('mailto:') or href.startswith('tel:'):
                continue  # These are fine, skip
            
            # Normalize the URL
            full_url = normalize_url(href, current_url)
            
            # Only check internal links for 404s
            if is_same_domain(full_url, self.base_url):
                links_to_check.append(full_url)
        
        return issues, links_to_check
    
    def record_status(self, url: str, status: int):
        """Record the status code for a URL."""
        self.checked_links[url] = status
    
    def get_broken_links(self) -> List[tuple]:
        """Get all links that returned error status codes."""
        broken = []
        for url, status in self.checked_links.items():
            if status >= 400:
                broken.append((url, status))
        return broken


# ============================================================================
# IMAGE CHECKER - Alt text and broken images
# ============================================================================
class ImageChecker:
    """
    ---------------------------------------------------------------------------
    IMAGE CHECKER  
    ---------------------------------------------------------------------------
    Checks images for:
    
    - Missing alt text (accessibility + SEO)
    - Empty alt text (might be decorative, but flag anyway)
    - Missing dimensions (causes layout shift)
    ---------------------------------------------------------------------------
    """
    
    def __init__(self):
        debug("Image Checker initialized", "success")
    
    def analyze(self, soup: BeautifulSoup, url: str) -> tuple[List[PageIssue], List[Dict]]:
        """
        Analyze all images on a page.
        
        Args:
            soup: Parsed HTML
            url: Page URL
            
        Returns:
            Tuple of (issues, list of image info dicts)
        """
        issues = []
        images = []
        
        for img in soup.find_all('img'):
            src = img.get('src', '')
            alt = img.get('alt')
            width = img.get('width')
            height = img.get('height')
            
            img_info = {
                'src': src,
                'alt': alt,
                'has_dimensions': bool(width and height)
            }
            images.append(img_info)
            
            # Skip tiny images (likely icons/tracking pixels)
            if width and int(width) < 50:
                continue
            
            # ===== MISSING ALT =====
            if alt is None:
                issues.append(PageIssue(
                    severity="warning",
                    category="image",
                    message="Image missing alt attribute",
                    details=f"src: {src[:60]}..."
                ))
            elif alt.strip() == '':
                # Empty alt might be intentional for decorative images
                issues.append(PageIssue(
                    severity="info",
                    category="image",
                    message="Image has empty alt text",
                    details=f"src: {src[:60]}... - OK if decorative"
                ))
            
            # ===== MISSING DIMENSIONS =====
            if not width or not height:
                issues.append(PageIssue(
                    severity="info",
                    category="image",
                    message="Image missing width/height",
                    details=f"src: {src[:60]}... - Causes layout shift (CLS)"
                ))
        
        return issues, images


# ============================================================================
# MAIN AUDITOR CLASS - Orchestrates everything
# ============================================================================
class SiteAuditor:
    """
    ---------------------------------------------------------------------------
    MAIN SITE AUDITOR
    ---------------------------------------------------------------------------
    This is the main class that:
    
    1. Discovers pages to audit (respecting our filters)
    2. Crawls each page with Playwright
    3. Runs all analyzers on each page
    4. Collects and reports results
    ---------------------------------------------------------------------------
    """
    
    def __init__(self, base_url: str = None):
        """
        Initialize the auditor.
        
        Args:
            base_url: Override the config base URL if provided
        """
        self.base_url = base_url or AuditConfig.BASE_URL
        
        # Ensure base URL doesn't have trailing slash
        self.base_url = self.base_url.rstrip('/')
        
        # Initialize all our analyzers
        self.ai_detector = AISlopDetector()
        self.seo_analyzer = SEOAnalyzer()
        self.content_analyzer = ContentAnalyzer()
        self.link_checker = LinkChecker(self.base_url)
        self.image_checker = ImageChecker()
        
        # Storage for results
        self.audited_pages: List[PageAudit] = []
        self.pages_to_audit: Set[str] = set()
        self.sample_candidates: Dict[str, List[str]] = defaultdict(list)  # section -> URLs
        self.visited_urls: Set[str] = set()
        
        # Stats
        self.start_time = None
        self.pages_crawled = 0
        self.errors_count = 0
        
        debug(f"Site Auditor initialized for: {self.base_url}", "success")
    
    async def discover_pages(self, page) -> None:
        """
        ---------------------------------------------------------------------------
        PHASE 1: DISCOVER PAGES TO AUDIT
        ---------------------------------------------------------------------------
        This crawls the homepage and collects:
        1. First-level pages (direct links from homepage)
        2. URLs that belong to sample sections (for random sampling later)
        ---------------------------------------------------------------------------
        """
        print_section("PHASE 1: DISCOVERING PAGES")
        
        debug(f"Loading homepage: {self.base_url}")
        
        try:
            response = await page.goto(self.base_url, wait_until='networkidle', timeout=AuditConfig.PAGE_TIMEOUT_MS)
            
            if response.status >= 400:
                print(f"{Fore.RED}ERROR: Homepage returned status {response.status}{Style.RESET_ALL}")
                return
            
            debug(f"Homepage loaded successfully (status: {response.status})", "success")
            
            # Get all links from homepage
            links = await page.eval_on_selector_all('a[href]', 'elements => elements.map(e => e.href)')
            
            debug(f"Found {len(links)} total links on homepage")
            
            first_level_count = 0
            excluded_count = 0
            sample_count = 0
            
            for link in links:
                # Normalize the URL
                normalized = normalize_url(link, self.base_url)
                
                # Skip if not same domain
                if not is_same_domain(normalized, self.base_url):
                    continue
                
                # Skip if already seen
                if normalized in self.pages_to_audit or normalized in self.visited_urls:
                    continue
                
                # Check if should be excluded entirely
                if should_exclude_url(normalized, self.base_url):
                    excluded_count += 1
                    continue
                
                # Check if belongs to a sample section
                sample_section = get_sample_section(normalized)
                if sample_section:
                    self.sample_candidates[sample_section].append(normalized)
                    sample_count += 1
                    continue
                
                # It's a first-level page we want to audit
                self.pages_to_audit.add(normalized)
                first_level_count += 1
                
                # Safety limit
                if first_level_count >= AuditConfig.MAX_FIRST_LEVEL_PAGES:
                    debug(f"Hit max first-level pages limit ({AuditConfig.MAX_FIRST_LEVEL_PAGES})", "warn")
                    break
            
            # Add the homepage itself
            self.pages_to_audit.add(self.base_url)
            
            # Now select random samples from each sample section
            print(f"\n{Fore.CYAN}  Sample Section Candidates:{Style.RESET_ALL}")
            for section, urls in self.sample_candidates.items():
                sample_size = AuditConfig.SAMPLE_SECTIONS.get(section, 5)
                selected = random.sample(urls, min(sample_size, len(urls)))
                
                print(f"    {Fore.YELLOW}{section}{Style.RESET_ALL}: {len(urls)} found → sampling {len(selected)}")
                
                for url in selected:
                    self.pages_to_audit.add(url)
            
            print(f"\n{Fore.GREEN}  Discovery Summary:{Style.RESET_ALL}")
            print(f"    • First-level pages: {first_level_count}")
            print(f"    • Excluded by pattern: {excluded_count}")
            print(f"    • Sample candidates: {sample_count}")
            print(f"    • {Fore.WHITE}{Style.BRIGHT}Total pages to audit: {len(self.pages_to_audit)}{Style.RESET_ALL}")
            
        except PlaywrightTimeout:
            print(f"{Fore.RED}ERROR: Timeout loading homepage{Style.RESET_ALL}")
        except Exception as e:
            print(f"{Fore.RED}ERROR discovering pages: {str(e)}{Style.RESET_ALL}")
    
    async def audit_page(self, page, url: str) -> Optional[PageAudit]:
        """
        ---------------------------------------------------------------------------
        AUDIT A SINGLE PAGE
        ---------------------------------------------------------------------------
        This is where all the magic happens for one URL:
        
        1. Load the page with Playwright
        2. Extract the HTML
        3. Run all analyzers
        4. Collect results
        ---------------------------------------------------------------------------
        """
        audit = PageAudit(url=url)
        audit.crawled_at = datetime.now().isoformat()
        
        try:
            start_time = datetime.now()
            
            # Load the page
            response = await page.goto(url, wait_until='networkidle', timeout=AuditConfig.PAGE_TIMEOUT_MS)
            
            load_time = (datetime.now() - start_time).total_seconds() * 1000
            audit.load_time_ms = int(load_time)
            audit.status_code = response.status
            
            # Record link status
            self.link_checker.record_status(url, response.status)
            
            # Check for error status
            if response.status >= 400:
                audit.issues.append(PageIssue(
                    severity="critical",
                    category="link",
                    message=f"Page returned HTTP {response.status}",
                    details="This page is not accessible"
                ))
                return audit
            
            # Get the HTML content
            html = await page.content()
            soup = BeautifulSoup(html, 'html.parser')
            
            # ===== EXTRACT BASIC INFO =====
            title_tag = soup.find('title')
            audit.title = title_tag.string.strip() if title_tag and title_tag.string else ""
            
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            audit.meta_description = meta_desc.get('content', '').strip() if meta_desc else ""
            
            h1_tags = soup.find_all('h1')
            audit.h1_tags = [h1.get_text(strip=True) for h1 in h1_tags]
            
            # ===== RUN SEO ANALYZER =====
            seo_issues = self.seo_analyzer.analyze(soup, url)
            audit.issues.extend(seo_issues)
            
            # ===== RUN CONTENT ANALYZER =====
            content_issues, word_count, content_hash = self.content_analyzer.analyze(soup, url)
            audit.word_count = word_count
            audit.content_hash = content_hash
            audit.issues.extend(content_issues)
            
            # ===== RUN AI SLOP DETECTOR =====
            # Get all text content
            main_content = soup.find('main') or soup.find('article') or soup.body
            if main_content:
                text = main_content.get_text(separator=' ', strip=True)
                slop_matches = self.ai_detector.analyze(text)
                audit.ai_slop_matches = slop_matches
                
                if slop_matches:
                    slop_score = self.ai_detector.get_slop_score(text, word_count)
                    
                    if slop_score >= 30:
                        severity = "warning"
                    elif slop_score >= 10:
                        severity = "info"
                    else:
                        severity = "info"
                    
                    if len(slop_matches) >= 3:
                        audit.issues.append(PageIssue(
                            severity=severity,
                            category="ai_slop",
                            message=f"AI slop detected ({len(slop_matches)} phrases, score: {slop_score})",
                            details=f"Matches: {', '.join(slop_matches[:5])}{'...' if len(slop_matches) > 5 else ''}"
                        ))
            
            # ===== RUN LINK CHECKER =====
            link_issues, found_links = self.link_checker.extract_links(soup, url)
            audit.issues.extend(link_issues)
            audit.links_found = found_links
            
            # ===== RUN IMAGE CHECKER =====
            image_issues, images = self.image_checker.analyze(soup, url)
            audit.issues.extend(image_issues)
            audit.images_found = images
            
            # ===== SLOW PAGE WARNING =====
            if load_time > 3000:
                audit.issues.append(PageIssue(
                    severity="warning",
                    category="performance",
                    message=f"Slow page load ({int(load_time)}ms)",
                    details="Pages should load in <3 seconds"
                ))
            
            return audit
            
        except PlaywrightTimeout:
            audit.issues.append(PageIssue(
                severity="critical",
                category="link",
                message="Page timeout",
                details=f"Failed to load within {AuditConfig.PAGE_TIMEOUT_MS}ms"
            ))
            return audit
        except Exception as e:
            audit.issues.append(PageIssue(
                severity="critical",
                category="error",
                message="Error auditing page",
                details=str(e)
            ))
            return audit
    
    async def run_audit(self) -> None:
        """
        ---------------------------------------------------------------------------
        MAIN AUDIT ENTRY POINT
        ---------------------------------------------------------------------------
        Orchestrates the entire audit process:
        
        1. Start Playwright browser
        2. Discover pages to audit
        3. Audit each page
        4. Generate report
        ---------------------------------------------------------------------------
        """
        print_banner()
        
        print(f"{Fore.WHITE}Target Site: {Fore.CYAN}{self.base_url}{Style.RESET_ALL}")
        print(f"{Fore.WHITE}Started at: {Fore.CYAN}{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{Style.RESET_ALL}")
        
        self.start_time = datetime.now()
        
        async with async_playwright() as p:
            # Launch browser
            debug("Launching Chromium browser...")
            browser = await p.chromium.launch(headless=True)
            
            # Create context with reasonable viewport
            context = await browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            )
            
            page = await context.new_page()
            
            # PHASE 1: Discover pages
            await self.discover_pages(page)
            
            if not self.pages_to_audit:
                print(f"{Fore.RED}No pages to audit! Check your configuration.{Style.RESET_ALL}")
                await browser.close()
                return
            
            # PHASE 2: Audit each page
            print_section("PHASE 2: AUDITING PAGES")
            
            total_pages = len(self.pages_to_audit)
            
            for i, url in enumerate(self.pages_to_audit, 1):
                if url in self.visited_urls:
                    continue
                
                self.visited_urls.add(url)
                
                print_progress(i, total_pages, url)
                
                audit = await self.audit_page(page, url)
                
                if audit:
                    self.audited_pages.append(audit)
                    self.pages_crawled += 1
                    
                    # Print issues for this page
                    if audit.issues:
                        for issue in audit.issues:
                            print_issue(issue)
                    else:
                        print(f"    {Fore.GREEN}✓ No issues found{Style.RESET_ALL}")
                
                # Be nice to the server
                await asyncio.sleep(AuditConfig.REQUEST_DELAY_MS / 1000)
            
            await browser.close()
        
        # Generate report
        self.generate_report()
    
    def generate_report(self) -> None:
        """
        ---------------------------------------------------------------------------
        GENERATE FINAL REPORT
        ---------------------------------------------------------------------------
        Creates both a JSON report (machine-readable) and prints a summary.
        ---------------------------------------------------------------------------
        """
        print_section("AUDIT COMPLETE - SUMMARY")
        
        elapsed = datetime.now() - self.start_time
        
        # Count issues by severity
        critical_count = 0
        warning_count = 0
        info_count = 0
        
        # Count issues by category
        issues_by_category = defaultdict(int)
        
        # Pages with AI slop
        pages_with_slop = []
        
        for audit in self.audited_pages:
            for issue in audit.issues:
                if issue.severity == "critical":
                    critical_count += 1
                elif issue.severity == "warning":
                    warning_count += 1
                else:
                    info_count += 1
                
                issues_by_category[issue.category] += 1
            
            if audit.ai_slop_matches:
                pages_with_slop.append((audit.url, audit.ai_slop_matches))
        
        # Print summary stats
        print(f"{Fore.WHITE}Pages Audited: {Fore.CYAN}{self.pages_crawled}{Style.RESET_ALL}")
        print(f"{Fore.WHITE}Time Elapsed: {Fore.CYAN}{elapsed.total_seconds():.1f} seconds{Style.RESET_ALL}")
        print()
        
        print(f"{Fore.WHITE}Issues Found:{Style.RESET_ALL}")
        print(f"  {Fore.RED}✖ Critical: {critical_count}{Style.RESET_ALL}")
        print(f"  {Fore.YELLOW}⚠ Warnings: {warning_count}{Style.RESET_ALL}")
        print(f"  {Fore.BLUE}ℹ Info: {info_count}{Style.RESET_ALL}")
        print()
        
        print(f"{Fore.WHITE}Issues by Category:{Style.RESET_ALL}")
        for category, count in sorted(issues_by_category.items(), key=lambda x: -x[1]):
            print(f"  {Fore.CYAN}{category.upper():15}{Style.RESET_ALL}: {count}")
        print()
        
        # AI Slop Summary
        if pages_with_slop:
            print(f"{Fore.MAGENTA}{Style.BRIGHT}AI SLOP DETECTED ON {len(pages_with_slop)} PAGES:{Style.RESET_ALL}")
            for url, matches in pages_with_slop[:10]:  # Show top 10
                print(f"  {Fore.YELLOW}→{Style.RESET_ALL} {url}")
                print(f"    {Fore.LIGHTBLACK_EX}Phrases: {', '.join(matches[:3])}...{Style.RESET_ALL}")
            if len(pages_with_slop) > 10:
                print(f"  {Fore.LIGHTBLACK_EX}... and {len(pages_with_slop) - 10} more pages{Style.RESET_ALL}")
            print()
        
        # Broken Links Summary
        broken_links = self.link_checker.get_broken_links()
        if broken_links:
            print(f"{Fore.RED}{Style.BRIGHT}BROKEN LINKS FOUND ({len(broken_links)}):{Style.RESET_ALL}")
            for url, status in broken_links[:10]:
                print(f"  {Fore.RED}✖{Style.RESET_ALL} [{status}] {url}")
            print()
        
        # Save JSON report
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        report_filename = f"{AuditConfig.REPORT_FILENAME}_{timestamp}.json"
        
        report_data = {
            "audit_info": {
                "site": self.base_url,
                "started_at": self.start_time.isoformat(),
                "completed_at": datetime.now().isoformat(),
                "pages_audited": self.pages_crawled,
                "elapsed_seconds": elapsed.total_seconds()
            },
            "summary": {
                "critical_issues": critical_count,
                "warnings": warning_count,
                "info": info_count,
                "issues_by_category": dict(issues_by_category),
                "pages_with_ai_slop": len(pages_with_slop),
                "broken_links": len(broken_links)
            },
            "pages": [
                {
                    "url": audit.url,
                    "status_code": audit.status_code,
                    "title": audit.title,
                    "meta_description": audit.meta_description,
                    "h1_tags": audit.h1_tags,
                    "word_count": audit.word_count,
                    "load_time_ms": audit.load_time_ms,
                    "ai_slop_matches": audit.ai_slop_matches,
                    "issues": [
                        {
                            "severity": issue.severity,
                            "category": issue.category,
                            "message": issue.message,
                            "details": issue.details
                        }
                        for issue in audit.issues
                    ]
                }
                for audit in self.audited_pages
            ],
            "broken_links": [{"url": url, "status": status} for url, status in broken_links]
        }
        
        with open(report_filename, 'w', encoding='utf-8') as f:
            json.dump(report_data, f, indent=2, ensure_ascii=False)
        
        print(f"{Fore.GREEN}✓ Report saved to: {Fore.WHITE}{report_filename}{Style.RESET_ALL}")


# ============================================================================
# ENTRY POINT
# ============================================================================
async def main():
    """
    Main entry point - edit the URL here or pass via command line.
    """
    import sys
    
    # Allow passing URL as command line argument
    if len(sys.argv) > 1:
        base_url = sys.argv[1]
    else:
        base_url = AuditConfig.BASE_URL
    
    auditor = SiteAuditor(base_url)
    await auditor.run_audit()


if __name__ == "__main__":
    # Run the async main function
    asyncio.run(main())

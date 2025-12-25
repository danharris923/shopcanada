#!/usr/bin/env python3
"""
=============================================================================
REACT SITE AUDIT SCRIPT
=============================================================================
Author: Dan's Claude Assistant
Purpose: Comprehensive audit of React projects for SEO, security,
         forgotten features, dead routes, and code quality issues.

This script crawls through your React project and flags potential problems
like a building inspector going room by room!

Usage: python react_audit.py /path/to/your/react/project
=============================================================================
"""

import os
import sys
import re
import json
import argparse
from datetime import datetime
from pathlib import Path
from collections import defaultdict

# ============================================================================
# COLORAMA SETUP - Pretty colors make debugging fun!
# ============================================================================
try:
    from colorama import init, Fore, Back, Style
    init(autoreset=True)
    COLORS_AVAILABLE = True
except ImportError:
    # Fallback if colorama not installed
    print("WARNING: colorama not installed. Run: pip install colorama")
    print("Continuing without colors...\n")
    COLORS_AVAILABLE = False

    # Create dummy color classes so the script still works
    class DummyColors:
        RED = YELLOW = GREEN = CYAN = MAGENTA = WHITE = BLUE = ""
        BRIGHT = ""
        RESET_ALL = ""

    Fore = DummyColors()
    Back = DummyColors()
    Style = DummyColors()


# ============================================================================
# CONFIGURATION - What file types and patterns to look for
# ============================================================================

# File extensions we care about in a React project
REACT_EXTENSIONS = {'.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.css', '.scss'}

# Directories to skip (node_modules would take forever!)
SKIP_DIRS = {
    'node_modules', '.git', 'build', 'dist', '.next', 'coverage',
    '__pycache__', '.cache', '.parcel-cache', 'public/static'
}

# ============================================================================
# AUDIT PATTERNS - The actual things we're looking for
# ============================================================================

# SEO Issues - Things that hurt your Google rankings
SEO_PATTERNS = {
    'missing_alt_img': {
        'pattern': r'<img[^>]*(?<!alt=)[^>]*>|<img[^>]*alt\s*=\s*["\']["\']',
        'description': 'Image without alt text (bad for accessibility & SEO)',
        'severity': 'WARNING',
        'extensions': ['.jsx', '.tsx', '.js', '.html']
    },
    'hardcoded_localhost': {
        'pattern': r'https?://localhost[:\d]*|https?://127\.0\.0\.1[:\d]*',
        'description': 'Hardcoded localhost URL (will break in production!)',
        'severity': 'ERROR',
        'extensions': ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    'missing_noopener': {
        'pattern': r'target\s*=\s*["\']_blank["\'][^>]*(?!rel\s*=\s*["\'][^"\']*noopener)',
        'description': 'External link without rel="noopener" (security & performance)',
        'severity': 'WARNING',
        'extensions': ['.jsx', '.tsx', '.js', '.html']
    },
    'http_not_https': {
        'pattern': r'http://(?!localhost|127\.0\.0\.1)[a-zA-Z]',
        'description': 'Non-secure HTTP URL found (should be HTTPS)',
        'severity': 'WARNING',
        'extensions': ['.js', '.jsx', '.ts', '.tsx', '.html', '.css']
    },
}

# Security Issues - Things that could get you hacked
SECURITY_PATTERNS = {
    'dangerous_innerhtml': {
        'pattern': r'dangerouslySetInnerHTML',
        'description': 'dangerouslySetInnerHTML usage (XSS vulnerability risk!)',
        'severity': 'ERROR',
        'extensions': ['.jsx', '.tsx', '.js']
    },
    'exposed_api_key': {
        'pattern': r'(?:api[_-]?key|apikey|api_secret|secret[_-]?key)\s*[:=]\s*["\'][a-zA-Z0-9_\-]{16,}["\']',
        'description': 'Possible exposed API key (CRITICAL SECURITY ISSUE!)',
        'severity': 'CRITICAL',
        'extensions': ['.js', '.jsx', '.ts', '.tsx', '.json', '.env']
    },
    'hardcoded_password': {
        'pattern': r'(?:password|passwd|pwd)\s*[:=]\s*["\'][^"\']+["\']',
        'description': 'Possible hardcoded password (NEVER do this!)',
        'severity': 'CRITICAL',
        'extensions': ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    'eval_usage': {
        'pattern': r'\beval\s*\(',
        'description': 'eval() usage detected (major security risk!)',
        'severity': 'CRITICAL',
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
    },
    'innerhtml_direct': {
        'pattern': r'\.innerHTML\s*=',
        'description': 'Direct innerHTML assignment (XSS risk)',
        'severity': 'WARNING',
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
    },
    'localstorage_sensitive': {
        'pattern': r'localStorage\.setItem\s*\(\s*["\'](?:token|password|secret|auth|jwt|session)',
        'description': 'Sensitive data in localStorage (use httpOnly cookies instead)',
        'severity': 'WARNING',
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
    },
    'exposed_aws_key': {
        'pattern': r'AKIA[0-9A-Z]{16}',
        'description': 'AWS Access Key ID detected (ROTATE IMMEDIATELY!)',
        'severity': 'CRITICAL',
        'extensions': ['.js', '.jsx', '.ts', '.tsx', '.json', '.env']
    },
    'private_key_pattern': {
        'pattern': r'-----BEGIN (?:RSA |EC |DSA )?PRIVATE KEY-----',
        'description': 'Private key found in source code (CRITICAL!)',
        'severity': 'CRITICAL',
        'extensions': ['.js', '.jsx', '.ts', '.tsx', '.json', '.pem', '.key']
    },
}

# Forgotten Features - Stuff you meant to finish but didn't
FORGOTTEN_PATTERNS = {
    'todo_comment': {
        'pattern': r'(?://|/\*|\*|#)\s*(?:TODO|FIXME|HACK|XXX|BUG|OPTIMIZE)',
        'description': 'TODO/FIXME comment found (unfinished work)',
        'severity': 'INFO',
        'extensions': ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss']
    },
    'lorem_ipsum': {
        'pattern': r'lorem\s+ipsum|dolor\s+sit\s+amet',
        'description': 'Placeholder Lorem Ipsum text (forgot to replace!)',
        'severity': 'WARNING',
        'extensions': ['.js', '.jsx', '.ts', '.tsx', '.html', '.css']
    },
    'placeholder_text': {
        'pattern': r'["\'](?:placeholder|test|dummy|example|sample|temp|tmp)["\']',
        'description': 'Possible placeholder/test text',
        'severity': 'INFO',
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
    },
    'commented_code_block': {
        'pattern': r'(?://.*(?:function|const|let|var|return|import|export))|(?:/\*[\s\S]*?(?:function|const|let|var|return)[\s\S]*?\*/)',
        'description': 'Commented out code block (dead code)',
        'severity': 'INFO',
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
    },
    'console_log': {
        'pattern': r'console\.(?:log|debug|info|warn|error|trace|dir)\s*\(',
        'description': 'Console statement (remove before production!)',
        'severity': 'WARNING',
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
    },
    'debugger_statement': {
        'pattern': r'\bdebugger\b',
        'description': 'Debugger statement (will pause execution!)',
        'severity': 'ERROR',
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
    },
    'empty_catch': {
        'pattern': r'catch\s*\([^)]*\)\s*\{\s*\}',
        'description': 'Empty catch block (swallowing errors silently)',
        'severity': 'WARNING',
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
    },
    'alert_usage': {
        'pattern': r'\balert\s*\(',
        'description': 'alert() usage (annoying in production!)',
        'severity': 'WARNING',
        'extensions': ['.js', '.jsx', '.ts', '.tsx']
    },
}

# Route Issues - Navigation problems
ROUTE_PATTERNS = {
    'dead_link_hash': {
        'pattern': r'(?:href|to)\s*=\s*["\']#["\']',
        'description': 'Dead link (href="#" or to="#")',
        'severity': 'WARNING',
        'extensions': ['.jsx', '.tsx', '.js', '.html']
    },
    'empty_link': {
        'pattern': r'(?:href|to)\s*=\s*["\']["\']',
        'description': 'Empty link destination',
        'severity': 'WARNING',
        'extensions': ['.jsx', '.tsx', '.js', '.html']
    },
    'javascript_void': {
        'pattern': r'href\s*=\s*["\']javascript:void\(0\)["\']',
        'description': 'javascript:void(0) link (use button instead)',
        'severity': 'INFO',
        'extensions': ['.jsx', '.tsx', '.js', '.html']
    },
}


# ============================================================================
# UTILITY FUNCTIONS
# ============================================================================

def print_banner():
    """Print a fancy startup banner"""
    banner = f"""
{Fore.CYAN}{Style.BRIGHT}╔══════════════════════════════════════════════════════════════════╗
║                    REACT SITE AUDIT SCRIPT                        ║
║                    ========================                        ║
║  Scanning for: SEO issues, Security holes, Forgotten features,    ║
║                Dead routes, and Code quality problems              ║
╚══════════════════════════════════════════════════════════════════╝{Style.RESET_ALL}
"""
    print(banner)


def print_section(title):
    """Print a section header"""
    print(f"\n{Fore.CYAN}{Style.BRIGHT}{'='*70}")
    print(f"  {title}")
    print(f"{'='*70}{Style.RESET_ALL}\n")


def print_verbose(message, verbose=True):
    """Print verbose debug output"""
    if verbose:
        timestamp = datetime.now().strftime("%H:%M:%S.%f")[:-3]
        print(f"{Fore.WHITE}[{timestamp}] {Fore.BLUE}DEBUG: {Style.RESET_ALL}{message}")


def print_finding(severity, file_path, line_num, description, matched_text):
    """Print a finding with appropriate coloring based on severity"""

    # Color coding by severity
    severity_colors = {
        'CRITICAL': (Fore.WHITE + Back.RED + Style.BRIGHT, '🚨'),
        'ERROR': (Fore.RED + Style.BRIGHT, '❌'),
        'WARNING': (Fore.YELLOW + Style.BRIGHT, '⚠️'),
        'INFO': (Fore.CYAN, 'ℹ️'),
    }

    color, emoji = severity_colors.get(severity, (Fore.WHITE, '•'))

    # Truncate matched text if too long
    if len(matched_text) > 60:
        matched_text = matched_text[:57] + "..."

    print(f"{color}[{severity}]{Style.RESET_ALL} {emoji}")
    print(f"    {Fore.GREEN}File:{Style.RESET_ALL} {file_path}")
    print(f"    {Fore.GREEN}Line:{Style.RESET_ALL} {line_num}")
    print(f"    {Fore.GREEN}Issue:{Style.RESET_ALL} {description}")
    print(f"    {Fore.GREEN}Found:{Style.RESET_ALL} {Fore.MAGENTA}{matched_text}{Style.RESET_ALL}")
    print()


def get_files_to_scan(project_path, verbose=False):
    """
    Recursively get all files that should be scanned.
    Skips node_modules and other irrelevant directories.
    """
    files_to_scan = []
    project_path = Path(project_path)

    print_verbose(f"Starting file discovery in: {project_path}", verbose)

    for root, dirs, files in os.walk(project_path):
        # Remove directories we want to skip (modifies dirs in-place)
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]

        for file in files:
            file_path = Path(root) / file
            extension = file_path.suffix.lower()

            if extension in REACT_EXTENSIONS:
                files_to_scan.append(file_path)
                print_verbose(f"  Found: {file_path.relative_to(project_path)}", verbose)

    print_verbose(f"Total files to scan: {len(files_to_scan)}", verbose)
    return files_to_scan


def scan_file_for_patterns(file_path, patterns, verbose=False):
    """
    Scan a single file for all patterns in a category.
    Returns list of findings.
    """
    findings = []
    extension = file_path.suffix.lower()

    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            lines = content.split('\n')
    except Exception as e:
        print_verbose(f"  ERROR reading {file_path}: {e}", verbose)
        return findings

    for pattern_name, pattern_info in patterns.items():
        # Skip if this pattern doesn't apply to this file type
        if extension not in pattern_info.get('extensions', REACT_EXTENSIONS):
            continue

        try:
            regex = re.compile(pattern_info['pattern'], re.IGNORECASE | re.MULTILINE)

            # Search line by line for better line number reporting
            for line_num, line in enumerate(lines, 1):
                matches = regex.findall(line)
                for match in matches:
                    if isinstance(match, tuple):
                        match = match[0] if match else ""
                    findings.append({
                        'severity': pattern_info['severity'],
                        'file': str(file_path),
                        'line': line_num,
                        'description': pattern_info['description'],
                        'matched': match if match else line.strip()[:60],
                        'pattern_name': pattern_name
                    })

        except re.error as e:
            print_verbose(f"  Regex error in pattern '{pattern_name}': {e}", verbose)

    return findings


def check_project_structure(project_path, verbose=False):
    """
    Check for important files that should exist in a React project.
    Things like robots.txt, sitemap.xml, 404 pages, etc.
    """
    findings = []
    project_path = Path(project_path)

    print_verbose("Checking project structure...", verbose)

    # Files that should exist for SEO
    important_files = {
        'robots.txt': {
            'paths': ['public/robots.txt', 'robots.txt'],
            'description': 'Missing robots.txt (tells search engines what to crawl)',
            'severity': 'WARNING'
        },
        'sitemap.xml': {
            'paths': ['public/sitemap.xml', 'sitemap.xml'],
            'description': 'Missing sitemap.xml (helps search engines index your site)',
            'severity': 'INFO'
        },
        'favicon.ico': {
            'paths': ['public/favicon.ico', 'favicon.ico'],
            'description': 'Missing favicon.ico (the little icon in browser tabs)',
            'severity': 'INFO'
        },
        '.env.example': {
            'paths': ['.env.example', '.env.sample'],
            'description': 'Missing .env.example (helps other devs know what env vars are needed)',
            'severity': 'INFO'
        },
    }

    for file_name, info in important_files.items():
        found = False
        for path in info['paths']:
            if (project_path / path).exists():
                found = True
                print_verbose(f"  ✓ Found {file_name} at {path}", verbose)
                break

        if not found:
            findings.append({
                'severity': info['severity'],
                'file': f'<project_root>/{info["paths"][0]}',
                'line': 'N/A',
                'description': info['description'],
                'matched': f'File not found: {file_name}',
                'pattern_name': f'missing_{file_name.replace(".", "_")}'
            })
            print_verbose(f"  ✗ Missing: {file_name}", verbose)

    # Check for .env file (should NOT be committed!)
    env_file = project_path / '.env'
    if env_file.exists():
        findings.append({
            'severity': 'WARNING',
            'file': '.env',
            'line': 'N/A',
            'description': '.env file exists - make sure it\'s in .gitignore!',
            'matched': 'Check .gitignore includes .env',
            'pattern_name': 'env_file_warning'
        })
        print_verbose("  ⚠ .env file exists - verify it's gitignored", verbose)

    return findings


def check_package_json(project_path, verbose=False):
    """
    Analyze package.json for potential issues.
    """
    findings = []
    package_json_path = Path(project_path) / 'package.json'

    if not package_json_path.exists():
        print_verbose("No package.json found (is this a React project?)", verbose)
        return findings

    print_verbose("Analyzing package.json...", verbose)

    try:
        with open(package_json_path, 'r') as f:
            package = json.load(f)
    except json.JSONDecodeError as e:
        findings.append({
            'severity': 'ERROR',
            'file': 'package.json',
            'line': 'N/A',
            'description': f'Invalid JSON in package.json: {e}',
            'matched': 'JSON parse error',
            'pattern_name': 'invalid_package_json'
        })
        return findings

    # Check for missing homepage (important for deployments)
    if 'homepage' not in package:
        findings.append({
            'severity': 'INFO',
            'file': 'package.json',
            'line': 'N/A',
            'description': 'Missing "homepage" field (can cause routing issues in production)',
            'matched': 'Add: "homepage": "https://yourdomain.com"',
            'pattern_name': 'missing_homepage'
        })

    # Check for SEO-related packages
    dependencies = {**package.get('dependencies', {}), **package.get('devDependencies', {})}

    seo_packages = ['react-helmet', 'react-helmet-async', '@next/head', 'next-seo']
    if not any(pkg in dependencies for pkg in seo_packages):
        findings.append({
            'severity': 'INFO',
            'file': 'package.json',
            'line': 'N/A',
            'description': 'No SEO meta tag package found (react-helmet recommended)',
            'matched': 'Consider adding react-helmet-async for dynamic meta tags',
            'pattern_name': 'missing_seo_package'
        })

    # Check for security-related packages
    if 'helmet' not in dependencies and 'express' in dependencies:
        findings.append({
            'severity': 'INFO',
            'file': 'package.json',
            'line': 'N/A',
            'description': 'Using Express without Helmet security middleware',
            'matched': 'Consider adding helmet package for security headers',
            'pattern_name': 'missing_helmet'
        })

    # Check for outdated React version (just a heads up)
    react_version = dependencies.get('react', '')
    if react_version:
        print_verbose(f"  React version: {react_version}", verbose)

    return findings


def check_index_html(project_path, verbose=False):
    """
    Check index.html for SEO essentials.
    """
    findings = []

    # Try common locations for index.html
    possible_paths = [
        Path(project_path) / 'public' / 'index.html',
        Path(project_path) / 'index.html',
        Path(project_path) / 'src' / 'index.html',
    ]

    index_html = None
    for path in possible_paths:
        if path.exists():
            index_html = path
            break

    if not index_html:
        print_verbose("No index.html found in common locations", verbose)
        return findings

    print_verbose(f"Analyzing {index_html}...", verbose)

    with open(index_html, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read().lower()

    # Check for essential meta tags
    meta_checks = [
        ('viewport', '<meta name="viewport"', 'Missing viewport meta tag (breaks mobile!)'),
        ('description', '<meta name="description"', 'Missing description meta tag (bad for SEO)'),
        ('charset', '<meta charset', 'Missing charset declaration'),
        ('og:title', 'property="og:title"', 'Missing Open Graph title (bad for social sharing)'),
        ('og:description', 'property="og:description"', 'Missing Open Graph description'),
        ('og:image', 'property="og:image"', 'Missing Open Graph image (social previews will be ugly)'),
        ('twitter:card', 'name="twitter:card"', 'Missing Twitter Card meta (bad for Twitter sharing)'),
    ]

    for name, pattern, description in meta_checks:
        if pattern.lower() not in content:
            severity = 'ERROR' if name in ['viewport', 'charset'] else 'WARNING'
            findings.append({
                'severity': severity,
                'file': str(index_html),
                'line': 'N/A',
                'description': description,
                'matched': f'Add: {pattern}',
                'pattern_name': f'missing_meta_{name.replace(":", "_")}'
            })

    # Check for title tag
    if '<title>' not in content or '<title></title>' in content:
        findings.append({
            'severity': 'ERROR',
            'file': str(index_html),
            'line': 'N/A',
            'description': 'Missing or empty <title> tag (critical for SEO!)',
            'matched': 'Add a descriptive title',
            'pattern_name': 'missing_title'
        })

    # Check for lang attribute on html tag
    if 'lang=' not in content[:500]:  # Check near the beginning
        findings.append({
            'severity': 'WARNING',
            'file': str(index_html),
            'line': 'N/A',
            'description': 'Missing lang attribute on <html> tag (accessibility issue)',
            'matched': 'Add: <html lang="en">',
            'pattern_name': 'missing_lang'
        })

    return findings


def analyze_routes(project_path, verbose=False):
    """
    Try to find and analyze route definitions.
    Looks for react-router patterns.
    """
    findings = []
    project_path = Path(project_path)

    print_verbose("Analyzing route definitions...", verbose)

    route_files = []
    route_pattern = re.compile(r'<Route|createBrowserRouter|useRoutes|Routes', re.IGNORECASE)

    # Find files that likely contain routes
    for ext in ['.jsx', '.tsx', '.js', '.ts']:
        for file_path in project_path.rglob(f'*{ext}'):
            if any(skip in str(file_path) for skip in SKIP_DIRS):
                continue

            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    if route_pattern.search(content):
                        route_files.append(file_path)
                        print_verbose(f"  Found routes in: {file_path.name}", verbose)
            except:
                pass

    if not route_files:
        findings.append({
            'severity': 'INFO',
            'file': '<project>',
            'line': 'N/A',
            'description': 'No React Router patterns found (using different routing?)',
            'matched': 'Could not locate route definitions',
            'pattern_name': 'no_routes_found'
        })
        return findings

    # Check for 404/catch-all route
    has_404 = False
    for file_path in route_files:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            if re.search(r'path\s*[=:]\s*["\'][*]|path\s*[=:]\s*["\']:?\*|<Route[^>]*path\s*=\s*["\'][*]', content):
                has_404 = True
                print_verbose(f"  Found catch-all route in {file_path.name}", verbose)
                break

    if not has_404:
        findings.append({
            'severity': 'WARNING',
            'file': 'Route configuration',
            'line': 'N/A',
            'description': 'No catch-all/404 route found (users will see blank page on bad URLs)',
            'matched': 'Add: <Route path="*" element={<NotFound />} />',
            'pattern_name': 'missing_404_route'
        })

    return findings


def generate_report(all_findings, project_path, output_file=None):
    """
    Generate a summary report of all findings.
    """
    print_section("AUDIT REPORT SUMMARY")

    # Count by severity
    severity_counts = defaultdict(int)
    category_counts = defaultdict(int)

    for finding in all_findings:
        severity_counts[finding['severity']] += 1

    # Print severity summary with colors
    print(f"{Fore.WHITE}{Style.BRIGHT}Total Issues Found: {len(all_findings)}{Style.RESET_ALL}\n")

    severity_order = ['CRITICAL', 'ERROR', 'WARNING', 'INFO']
    severity_colors = {
        'CRITICAL': Fore.WHITE + Back.RED + Style.BRIGHT,
        'ERROR': Fore.RED + Style.BRIGHT,
        'WARNING': Fore.YELLOW + Style.BRIGHT,
        'INFO': Fore.CYAN,
    }

    for severity in severity_order:
        count = severity_counts[severity]
        color = severity_colors[severity]
        bar = '█' * min(count, 50)  # Visual bar (max 50 chars)
        print(f"  {color}{severity:10}{Style.RESET_ALL}: {count:4} {Fore.MAGENTA}{bar}{Style.RESET_ALL}")

    print()

    # Action items
    if severity_counts['CRITICAL'] > 0:
        print(f"{Fore.RED}{Style.BRIGHT}🚨 CRITICAL ISSUES REQUIRE IMMEDIATE ATTENTION!{Style.RESET_ALL}")
        print(f"   Found {severity_counts['CRITICAL']} critical security/functionality issues.\n")

    if severity_counts['ERROR'] > 0:
        print(f"{Fore.RED}❌ ERRORS should be fixed before deployment.{Style.RESET_ALL}")
        print(f"   Found {severity_counts['ERROR']} errors that will cause problems.\n")

    if severity_counts['WARNING'] > 0:
        print(f"{Fore.YELLOW}⚠️  WARNINGS are recommended to fix.{Style.RESET_ALL}")
        print(f"   Found {severity_counts['WARNING']} issues that should be addressed.\n")

    # Save report to file if requested
    if output_file:
        try:
            report_data = {
                'project': str(project_path),
                'timestamp': datetime.now().isoformat(),
                'summary': dict(severity_counts),
                'total_issues': len(all_findings),
                'findings': all_findings
            }
            with open(output_file, 'w') as f:
                json.dump(report_data, f, indent=2)
            print(f"{Fore.GREEN}📄 Report saved to: {output_file}{Style.RESET_ALL}")
        except Exception as e:
            print(f"{Fore.RED}Failed to save report: {e}{Style.RESET_ALL}")


# ============================================================================
# MAIN EXECUTION
# ============================================================================

def main():
    """
    Main entry point for the audit script.
    """
    parser = argparse.ArgumentParser(
        description='Audit a React project for SEO, security, and code quality issues.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python react_audit.py /path/to/my/react/project
  python react_audit.py . --verbose
  python react_audit.py ./my-app --output report.json
        """
    )
    parser.add_argument('project_path', help='Path to the React project to audit')
    parser.add_argument('-v', '--verbose', action='store_true',
                        help='Enable verbose debug output')
    parser.add_argument('-o', '--output', metavar='FILE',
                        help='Save report to JSON file')
    parser.add_argument('--skip-seo', action='store_true',
                        help='Skip SEO checks')
    parser.add_argument('--skip-security', action='store_true',
                        help='Skip security checks')
    parser.add_argument('--skip-forgotten', action='store_true',
                        help='Skip forgotten features checks')
    parser.add_argument('--skip-routes', action='store_true',
                        help='Skip route checks')

    args = parser.parse_args()

    # Validate project path
    project_path = Path(args.project_path).resolve()
    if not project_path.exists():
        print(f"{Fore.RED}ERROR: Path does not exist: {project_path}{Style.RESET_ALL}")
        sys.exit(1)

    if not project_path.is_dir():
        print(f"{Fore.RED}ERROR: Path is not a directory: {project_path}{Style.RESET_ALL}")
        sys.exit(1)

    # Start the audit
    print_banner()

    print(f"{Fore.GREEN}Project Path:{Style.RESET_ALL} {project_path}")
    print(f"{Fore.GREEN}Started:{Style.RESET_ALL} {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{Fore.GREEN}Verbose Mode:{Style.RESET_ALL} {'ON' if args.verbose else 'OFF'}")
    print()

    all_findings = []

    # Get files to scan
    print_section("DISCOVERING FILES")
    files = get_files_to_scan(project_path, args.verbose)
    print(f"\n{Fore.GREEN}Found {len(files)} files to scan{Style.RESET_ALL}\n")

    # Check project structure
    print_section("PROJECT STRUCTURE CHECK")
    structure_findings = check_project_structure(project_path, args.verbose)
    all_findings.extend(structure_findings)
    for f in structure_findings:
        print_finding(f['severity'], f['file'], f['line'], f['description'], f['matched'])
    if not structure_findings:
        print(f"{Fore.GREEN}✓ Project structure looks good!{Style.RESET_ALL}")

    # Check package.json
    print_section("PACKAGE.JSON ANALYSIS")
    package_findings = check_package_json(project_path, args.verbose)
    all_findings.extend(package_findings)
    for f in package_findings:
        print_finding(f['severity'], f['file'], f['line'], f['description'], f['matched'])
    if not package_findings:
        print(f"{Fore.GREEN}✓ package.json looks good!{Style.RESET_ALL}")

    # Check index.html
    print_section("INDEX.HTML SEO CHECK")
    index_findings = check_index_html(project_path, args.verbose)
    all_findings.extend(index_findings)
    for f in index_findings:
        print_finding(f['severity'], f['file'], f['line'], f['description'], f['matched'])
    if not index_findings:
        print(f"{Fore.GREEN}✓ index.html SEO tags look good!{Style.RESET_ALL}")

    # Scan for patterns in all files
    if not args.skip_seo:
        print_section("SEO PATTERN SCAN")
        for file_path in files:
            findings = scan_file_for_patterns(file_path, SEO_PATTERNS, args.verbose)
            all_findings.extend(findings)
            for f in findings:
                print_finding(f['severity'], f['file'], f['line'], f['description'], f['matched'])
        print(f"\n{Fore.GREEN}SEO scan complete.{Style.RESET_ALL}")

    if not args.skip_security:
        print_section("SECURITY PATTERN SCAN")
        for file_path in files:
            findings = scan_file_for_patterns(file_path, SECURITY_PATTERNS, args.verbose)
            all_findings.extend(findings)
            for f in findings:
                print_finding(f['severity'], f['file'], f['line'], f['description'], f['matched'])
        print(f"\n{Fore.GREEN}Security scan complete.{Style.RESET_ALL}")

    if not args.skip_forgotten:
        print_section("FORGOTTEN FEATURES SCAN")
        for file_path in files:
            findings = scan_file_for_patterns(file_path, FORGOTTEN_PATTERNS, args.verbose)
            all_findings.extend(findings)
            for f in findings:
                print_finding(f['severity'], f['file'], f['line'], f['description'], f['matched'])
        print(f"\n{Fore.GREEN}Forgotten features scan complete.{Style.RESET_ALL}")

    if not args.skip_routes:
        print_section("ROUTE PATTERN SCAN")
        for file_path in files:
            findings = scan_file_for_patterns(file_path, ROUTE_PATTERNS, args.verbose)
            all_findings.extend(findings)
            for f in findings:
                print_finding(f['severity'], f['file'], f['line'], f['description'], f['matched'])

        # Special route analysis
        route_findings = analyze_routes(project_path, args.verbose)
        all_findings.extend(route_findings)
        for f in route_findings:
            print_finding(f['severity'], f['file'], f['line'], f['description'], f['matched'])
        print(f"\n{Fore.GREEN}Route scan complete.{Style.RESET_ALL}")

    # Generate final report
    generate_report(all_findings, project_path, args.output)

    print(f"\n{Fore.CYAN}{Style.BRIGHT}Audit completed at {datetime.now().strftime('%H:%M:%S')}{Style.RESET_ALL}\n")

    # Exit with error code if critical issues found
    if any(f['severity'] == 'CRITICAL' for f in all_findings):
        sys.exit(2)
    elif any(f['severity'] == 'ERROR' for f in all_findings):
        sys.exit(1)

    sys.exit(0)


if __name__ == '__main__':
    main()
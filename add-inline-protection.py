#!/usr/bin/env python3
"""
Script to add INLINE license protection to all chapter and resource pages.
This embeds the JavaScript directly in each HTML file instead of linking to external file.
"""

import os
import re
from pathlib import Path

# Files that should be protected (require license)
PROTECTED_PATTERNS = [
    'del*-kapitel*.html',
    'part*-chapter*.html',
    'partie*-chapitre*.html',
    'fordjupning.html',
    'fusklapp.html',
    'traningsjournal.html',
    'matchprotokoll.html',
    'utrustning.html',
    'ordlista.html',
    'regler.html',
    'innehall.html',
    'contents.html',
    'sommaire.html',
    'inhalt.html',
    'contenido.html',
    'saraban.html',
    '*indepth*.html',
    '*approfondissement*.html',
    'cheat-sheet.html',
    'training-journal.html',
    'match-protocol.html',
    'equipment-guide.html',
    'glossary.html',
    'rules.html',
]

# Files that should NOT be protected (public pages)
EXCLUDE_FILES = [
    'index.html',
    'upload.html',
    'access.html',
    'test-activation.html',
]

# The inline license check script to add
INLINE_LICENSE_SCRIPT = '''    <script>
        // License protection - Check immediately before page loads
        (function() {
            'use strict';
            
            const licenseKey = localStorage.getItem('petanque_license_key');
            
            if (!licenseKey) {
                // Store current URL for return after activation
                sessionStorage.setItem('petanque_return_url', window.location.pathname + window.location.search);
                
                // Determine correct upload.html path based on current location
                const currentPath = window.location.pathname;
                let uploadPath = '/upload.html';
                
                if (currentPath.includes('/en/')) {
                    uploadPath = '/en/upload.html';
                } else if (currentPath.includes('/de/')) {
                    uploadPath = '/de/upload.html';
                } else if (currentPath.includes('/fr/')) {
                    uploadPath = '/fr/upload.html';
                } else if (currentPath.includes('/es/')) {
                    uploadPath = '/es/upload.html';
                } else if (currentPath.includes('/th/')) {
                    uploadPath = '/th/upload.html';
                }
                
                // Redirect immediately
                window.location.href = uploadPath;
            }
        })();
    </script>
'''

def should_protect_file(filepath):
    """Check if a file should be protected based on patterns."""
    filename = os.path.basename(filepath)
    
    if filename in EXCLUDE_FILES:
        return False
    
    for pattern in PROTECTED_PATTERNS:
        if Path(filename).match(pattern):
            return True
    
    return False

def file_has_inline_protection(content):
    """Check if file already has inline license protection."""
    return 'License protection - Check immediately before page loads' in content

def remove_old_protection(content):
    """Remove old external script reference."""
    # Remove the old external script tag
    content = re.sub(r'\s*<script src="/license-check\.js"></script>\n?', '', content)
    return content

def add_inline_protection(filepath):
    """Add inline license protection script to a file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove old protection first
        content = remove_old_protection(content)
        
        # Skip if already has inline protection
        if file_has_inline_protection(content):
            return 'already_protected'
        
        # Find </head> and insert script before it
        if '</head>' in content:
            new_content = content.replace('</head>', INLINE_LICENSE_SCRIPT + '</head>')
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            return 'protected'
        else:
            return 'no_head_tag'
            
    except Exception as e:
        return f'error: {str(e)}'

def main():
    """Main function to protect all files."""
    base_dir = Path(__file__).parent
    
    stats = {
        'protected': 0,
        'already_protected': 0,
        'skipped': 0,
        'errors': 0
    }
    
    print("🔒 Adding INLINE license protection to content files...\n")
    
    # Walk through all directories
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if not file.endswith('.html'):
                continue
            
            filepath = os.path.join(root, file)
            relative_path = os.path.relpath(filepath, base_dir)
            
            if should_protect_file(filepath):
                result = add_inline_protection(filepath)
                
                if result == 'protected':
                    print(f"✅ Protected: {relative_path}")
                    stats['protected'] += 1
                elif result == 'already_protected':
                    print(f"⏭️  Already protected: {relative_path}")
                    stats['already_protected'] += 1
                elif result == 'no_head_tag':
                    print(f"⚠️  No <head> tag: {relative_path}")
                    stats['errors'] += 1
                else:
                    print(f"❌ Error: {relative_path} - {result}")
                    stats['errors'] += 1
            else:
                stats['skipped'] += 1
    
    print(f"\n{'='*60}")
    print("📊 Summary:")
    print(f"   ✅ Newly protected: {stats['protected']}")
    print(f"   ⏭️  Already protected: {stats['already_protected']}")
    print(f"   ⏩ Skipped (public): {stats['skipped']}")
    print(f"   ❌ Errors: {stats['errors']}")
    print(f"{'='*60}\n")
    
    if stats['protected'] > 0 or stats['already_protected'] > 0:
        print("✅ INLINE license protection added successfully!")
        print("   This will work on Vercel without needing external .js files")
    
    print("\n💡 Next steps:")
    print("   1. Commit and push to GitHub")
    print("   2. Vercel will auto-deploy")
    print("   3. Test on your iPhone!")

if __name__ == '__main__':
    main()

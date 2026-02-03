#!/usr/bin/env python3
"""
Script to add license protection to all chapter and resource pages.
This ensures only paying customers can access the content.
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

# The license check script tag to add
LICENSE_SCRIPT_TAG = '    <script src="/license-check.js"></script>\n'

def should_protect_file(filepath):
    """Check if a file should be protected based on patterns."""
    filename = os.path.basename(filepath)
    
    # Don't protect excluded files
    if filename in EXCLUDE_FILES:
        return False
    
    # Check if filename matches any protected pattern
    for pattern in PROTECTED_PATTERNS:
        if Path(filename).match(pattern):
            return True
    
    return False

def file_has_protection(content):
    """Check if file already has license protection."""
    return 'license-check.js' in content

def add_protection_to_file(filepath):
    """Add license protection script to a file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip if already protected
        if file_has_protection(content):
            return 'already_protected'
        
        # Find the </head> tag and insert script before it
        if '</head>' in content:
            # Insert the script tag before </head>
            new_content = content.replace('</head>', LICENSE_SCRIPT_TAG + '</head>')
            
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
    
    print("🔒 Adding license protection to content files...\n")
    
    # Walk through all directories
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if not file.endswith('.html'):
                continue
            
            filepath = os.path.join(root, file)
            relative_path = os.path.relpath(filepath, base_dir)
            
            # Check if file should be protected
            if should_protect_file(filepath):
                result = add_protection_to_file(filepath)
                
                if result == 'protected':
                    print(f"✅ Protected: {relative_path}")
                    stats['protected'] += 1
                elif result == 'already_protected':
                    print(f"⏭️  Already protected: {relative_path}")
                    stats['already_protected'] += 1
                elif result == 'no_head_tag':
                    print(f"⚠️  No <head> tag found: {relative_path}")
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
    
    if stats['protected'] > 0:
        print("✅ License protection added successfully!")
        print("   All chapter and resource pages now require a valid license key.")
    elif stats['already_protected'] > 0:
        print("✅ All files are already protected!")
    
    print("\n💡 Next steps:")
    print("   1. Test the protection by opening a chapter without a license")
    print("   2. Verify that activation still works correctly")
    print("   3. Deploy the changes to your live site")

if __name__ == '__main__':
    main()

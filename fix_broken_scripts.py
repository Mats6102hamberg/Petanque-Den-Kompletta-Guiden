#!/usr/bin/env python3
import os
import re

def fix_broken_license_script(filepath):
    """Fix broken license check scripts in HTML files"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if file has broken license check
        if "// License protection" not in content:
            return False
        
        # Pattern 1: Complete script block
        pattern1 = r'<script>\s*//\s*License protection.*?</script>\s*'
        
        # Pattern 2: Broken script block (no closing tag)
        pattern2 = r'<link[^>]*>\s*<script>\s*//\s*License protection.*?\'use strict\';\s*\n\s*\n'
        
        new_content = content
        
        # Try pattern 1 first
        new_content = re.sub(pattern1, '', new_content, flags=re.DOTALL)
        
        # Then try pattern 2 (broken scripts)
        new_content = re.sub(pattern2, lambda m: m.group(0).split('<script>')[0], new_content, flags=re.DOTALL)
        
        # Write back if changed
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

# Find all HTML files
count = 0
for root, dirs, files in os.walk('.'):
    # Skip hidden directories
    if '/.git' in root or '/node_modules' in root:
        continue
    
    for file in files:
        if file.endswith('.html') and file not in ['upload.html', 'licens-utgangen.html']:
            filepath = os.path.join(root, file)
            if fix_broken_license_script(filepath):
                print(f"✓ Fixed: {filepath}")
                count += 1

print(f"\n✅ Total files fixed: {count}")

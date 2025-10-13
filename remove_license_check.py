#!/usr/bin/env python3
import os
import re

def remove_license_check(filepath):
    """Remove license check script from HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if file has license check
        if "localStorage.getItem('petanque_license_key')" not in content:
            return False
        
        # Pattern to match the entire license check script block
        pattern = r'<script>\s*//\s*License protection.*?</script>'
        
        # Remove the script block
        new_content = re.sub(pattern, '', content, flags=re.DOTALL)
        
        # Write back if changed
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

# Find all HTML files except upload.html and licens-utgangen.html
count = 0
for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html') and file not in ['upload.html', 'licens-utgangen.html']:
            filepath = os.path.join(root, file)
            if remove_license_check(filepath):
                print(f"✓ Fixed: {filepath}")
                count += 1

print(f"\n✅ Total files fixed: {count}")

#!/usr/bin/env python3
"""
Add license check to premium chapters
"""
import os
import re

# Premium chapters (Kapitel 4-15)
premium_chapters = [
    'del1-kapitel4.html',
    'del2-kapitel5.html',
    'del2-kapitel6.html',
    'del2-kapitel7.html',
    'del2-kapitel8.html',
    'del3-kapitel9.html',
    'del3-kapitel10.html',
    'del4-kapitel11.html',
    'del4-kapitel12.html',
    'del4-kapitel13.html',
    'del4-kapitel14.html',
    'del4-kapitel15.html',
]

# Premium appendices
premium_appendices = [
    'utrustning.html',
    'regler.html',
    'ordlista.html',
    'fordjupning.html',
]

# Premium tools
premium_tools = [
    'matchprotokoll.html',
    'traningsjournal.html',
    'fusklapp.html',
]

license_script = '''    <script src="simple-license.js"></script>
    <script>
        // Check premium access on page load
        window.addEventListener('DOMContentLoaded', function() {
            PetanqueLicense.requirePremium();
        });
    </script>
</head>'''

def add_license_check(filepath):
    """Add license check to HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already has license check
        if 'simple-license.js' in content:
            print(f"⏭️  Skipped (already has license): {filepath}")
            return False
        
        # Replace </head> with license script + </head>
        if '</head>' in content:
            new_content = content.replace('</head>', license_script)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✓ Added license check: {filepath}")
            return True
        else:
            print(f"❌ No </head> tag found: {filepath}")
            return False
            
    except Exception as e:
        print(f"❌ Error processing {filepath}: {e}")
        return False

# Process all premium files
all_premium = premium_chapters + premium_appendices + premium_tools
count = 0

for filename in all_premium:
    if os.path.exists(filename):
        if add_license_check(filename):
            count += 1
    else:
        print(f"⚠️  File not found: {filename}")

print(f"\n✅ Total files updated: {count}/{len(all_premium)}")

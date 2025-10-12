#!/usr/bin/env python3
"""
Add Table of Contents button to all chapter and resource pages
"""

import os
import re

# Define which files should get the TOC button
CHAPTER_PATTERNS = [
    'del*-kapitel*.html',
    'fordjupning.html',
    'fusklapp.html',
    'traningsjournal.html',
    'matchprotokoll.html',
    'utrustning.html',
    'regler.html',
    'ordlista.html'
]

# Language-specific TOC button configurations
TOC_CONFIG = {
    '': {  # Swedish (root)
        'button_text': 'Innehåll',
        'toc_path': 'innehall.html'
    },
    'en': {
        'button_text': 'Contents',
        'toc_path': 'contents.html'
    },
    'fr': {
        'button_text': 'Sommaire',
        'toc_path': 'sommaire.html'
    },
    'es': {
        'button_text': 'Contenido',
        'toc_path': 'contenido.html'
    },
    'de': {
        'button_text': 'Inhalt',
        'toc_path': 'inhalt.html'
    },
    'th': {
        'button_text': 'สารบัญ',
        'toc_path': 'saraban.html'
    }
}

def should_process_file(filename):
    """Check if file should get TOC button"""
    # Skip index, access, upload, and TOC pages themselves
    skip_files = ['index.html', 'access.html', 'upload.html', 'innehall.html', 
                  'contents.html', 'sommaire.html', 'contenido.html', 'inhalt.html', 'saraban.html']
    
    if filename in skip_files:
        return False
    
    # Check if it's a chapter or resource file
    for pattern in CHAPTER_PATTERNS:
        pattern_regex = pattern.replace('*', '.*')
        if re.match(pattern_regex, filename):
            return True
    
    # Check language-specific patterns
    if filename.startswith(('part', 'partie', 'chapitre', 'chapter', 'kapitel')):
        return True
    
    if any(word in filename for word in ['feuille-triche', 'journal', 'protocole', 'guide', 'reglement', 'glossaire', 'cheat-sheet', 'equipment', 'rules', 'training']):
        return True
    
    return False

def get_toc_button_html(lang_code, is_subdirectory=False):
    """Generate TOC button HTML for specific language"""
    config = TOC_CONFIG.get(lang_code, TOC_CONFIG[''])
    
    # Adjust path if in subdirectory
    toc_path = config['toc_path']
    if is_subdirectory and lang_code:
        toc_path = f'../{lang_code}/{toc_path}' if lang_code else f'../{toc_path}'
    elif is_subdirectory:
        toc_path = toc_path
    
    return f'<a href="{toc_path}" class="toc-button">{config["button_text"]}</a>'

def add_toc_button_to_file(filepath, lang_code=''):
    """Add TOC button to a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if TOC button already exists
        if 'class="toc-button"' in content:
            print(f"⏭️  Skipped (already has button): {filepath}")
            return False
        
        # Determine if file is in subdirectory
        is_subdirectory = '/' in filepath and not filepath.startswith('./')
        
        # Generate TOC button HTML
        toc_button = get_toc_button_html(lang_code, is_subdirectory)
        
        # Find </head> and <body> tags
        pattern = r'(</head>\s*<body>)'
        replacement = f'</head>\\n<body>\\n    {toc_button}'
        
        new_content = re.sub(pattern, replacement, content, count=1)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"✅ Added TOC button: {filepath}")
            return True
        else:
            print(f"❌ Could not find insertion point: {filepath}")
            return False
            
    except Exception as e:
        print(f"❌ Error processing {filepath}: {e}")
        return False

def process_directory(directory, lang_code=''):
    """Process all files in a directory"""
    added_count = 0
    skipped_count = 0
    
    for filename in os.listdir(directory):
        if not filename.endswith('.html'):
            continue
        
        if not should_process_file(filename):
            continue
        
        filepath = os.path.join(directory, filename)
        
        if add_toc_button_to_file(filepath, lang_code):
            added_count += 1
        else:
            skipped_count += 1
    
    return added_count, skipped_count

def main():
    """Main function"""
    print("🔘 Adding Table of Contents buttons to all chapter pages...")
    print("=" * 60)
    
    total_added = 0
    total_skipped = 0
    
    # Process root directory (Swedish)
    print("\n📁 Processing Swedish (root)...")
    added, skipped = process_directory('.', '')
    total_added += added
    total_skipped += skipped
    
    # Process language subdirectories
    for lang_code in ['en', 'fr', 'es', 'de', 'th']:
        lang_dir = lang_code
        if os.path.exists(lang_dir) and os.path.isdir(lang_dir):
            print(f"\n📁 Processing {lang_code.upper()}...")
            added, skipped = process_directory(lang_dir, lang_code)
            total_added += added
            total_skipped += skipped
    
    print("\n" + "=" * 60)
    print(f"📊 Summary:")
    print(f"   ✅ TOC buttons added: {total_added}")
    print(f"   ⏭️  Files skipped: {total_skipped}")
    print("=" * 60)
    print("\n✅ TOC button addition complete!")
    print("\n💡 Next steps:")
    print("   1. Test on a chapter page")
    print("   2. Commit and push to GitHub")
    print("   3. Vercel will auto-deploy")

if __name__ == '__main__':
    main()

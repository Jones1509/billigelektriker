/**
 * Scan ALL files in the project for hardcoded text
 * Run with: npx tsx src/scripts/scan-all-pages.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface PageIssue {
  file: string;
  hardcodedTexts: Array<{
    line: number;
    text: string;
  }>;
}

const IGNORE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /dist/,
  /build/,
  /src\/components\/ui\//,  // Ignore shadcn components
  /\.test\./,
  /\.spec\./,
];

function scanAllPages(directory: string = 'src'): PageIssue[] {
  const issues: PageIssue[] = [];
  
  function scanDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (IGNORE_PATTERNS.some(pattern => pattern.test(fullPath))) {
        continue;
      }
      
      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.isFile() && /\.(tsx|jsx)$/.test(entry.name)) {
        const fileIssues = scanFile(fullPath);
        if (fileIssues.hardcodedTexts.length > 0) {
          issues.push(fileIssues);
        }
      }
    }
  }
  
  scanDirectory(directory);
  return issues;
}

function scanFile(filePath: string): PageIssue {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const hardcodedTexts: Array<{line: number; text: string}> = [];
  
  lines.forEach((line, index) => {
    // Skip if already uses t() or imports
    if (line.includes('t(') || line.includes('useTranslation') || line.includes('import ')) {
      return;
    }
    
    // Find hardcoded text in JSX
    const jsxTextRegex = />([^<>{}]+)</g;
    let match;
    
    while ((match = jsxTextRegex.exec(line)) !== null) {
      const text = match[1].trim();
      
      if (text.length > 2 && /[a-zA-ZæøåÆØÅ]/.test(text) && !line.includes('{t(')) {
        hardcodedTexts.push({
          line: index + 1,
          text
        });
      }
    }
    
    // Find hardcoded in attributes
    const attrRegex = /(placeholder|title|alt|aria-label)=["']([^"']+)["']/g;
    
    while ((match = attrRegex.exec(line)) !== null) {
      const text = match[2];
      if (text.length > 2 && /[a-zA-ZæøåÆØÅ]/.test(text) && !line.includes('{t(')) {
        hardcodedTexts.push({
          line: index + 1,
          text: `${match[1]}="${text}"`
        });
      }
    }
  });
  
  return {
    file: filePath,
    hardcodedTexts
  };
}

function main() {
  console.log('\n🔍 Scanning ALL files for hardcoded text...\n');
  
  const issues = scanAllPages('src');
  
  if (issues.length === 0) {
    console.log('✅ No hardcoded text found!\n');
    return;
  }
  
  console.log(`\n❌ FOUND ${issues.length} FILES WITH HARDCODED TEXT:\n`);
  console.log('='.repeat(80) + '\n');
  
  let totalIssues = 0;
  
  issues.forEach(issue => {
    totalIssues += issue.hardcodedTexts.length;
    console.log(`📄 ${issue.file}`);
    console.log(`   ${issue.hardcodedTexts.length} hardcoded strings:\n`);
    
    issue.hardcodedTexts.slice(0, 5).forEach(item => {
      console.log(`   Line ${item.line}: "${item.text}"`);
    });
    
    if (issue.hardcodedTexts.length > 5) {
      console.log(`   ... and ${issue.hardcodedTexts.length - 5} more`);
    }
    
    console.log('\n' + '-'.repeat(80) + '\n');
  });
  
  console.log(`\n📊 SUMMARY:`);
  console.log(`   Files with issues: ${issues.length}`);
  console.log(`   Total hardcoded texts: ${totalIssues}\n`);
  
  // Save report
  fs.writeFileSync(
    'translation-issues.json',
    JSON.stringify(issues, null, 2)
  );
  
  console.log(`📝 Full report saved to: translation-issues.json\n`);
  console.log(`⚠️  YOU MUST FIX ${issues.length} FILES BEFORE TRANSLATION WORKS\n`);
  console.log(`💡 Run: npm run fix-all\n`);
}

if (require.main === module) {
  main();
}

export { scanAllPages };

/**
 * Script til at scanne og finde ALLE hardcoded tekster i projektet
 * Kør med: npx tsx src/scripts/scanHardcodedText.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface HardcodedText {
  file: string;
  line: number;
  column: number;
  text: string;
  type: 'jsx' | 'attribute' | 'string';
  context: string;
}

const IGNORE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /dist/,
  /build/,
  /coverage/,
  /src\/components\/ui\//,  // Ignorer shadcn komponenter
  /\.test\./,
  /\.spec\./,
];

const ATTRIBUTE_NAMES = [
  'placeholder',
  'title',
  'alt',
  'aria-label',
  'aria-describedby',
  'data-tooltip',
];

class HardcodedTextScanner {
  private results: HardcodedText[] = [];
  private stats = {
    filesScanned: 0,
    textsFound: 0,
    byType: { jsx: 0, attribute: 0, string: 0 },
  };

  scan(directory: string = 'src'): HardcodedText[] {
    this.results = [];
    this.stats = {
      filesScanned: 0,
      textsFound: 0,
      byType: { jsx: 0, attribute: 0, string: 0 },
    };

    this.scanDirectory(directory);
    return this.results;
  }

  private scanDirectory(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Ignorer visse filer/mapper
      if (IGNORE_PATTERNS.some(pattern => pattern.test(fullPath))) {
        continue;
      }

      if (entry.isDirectory()) {
        this.scanDirectory(fullPath);
      } else if (entry.isFile() && /\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        this.scanFile(fullPath);
      }
    }
  }

  private scanFile(filePath: string): void {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    this.stats.filesScanned++;

    lines.forEach((line, lineIndex) => {
      // Skip comments og imports
      if (line.trim().startsWith('//') || 
          line.trim().startsWith('/*') ||
          line.trim().startsWith('import ') ||
          line.trim().startsWith('*')) {
        return;
      }

      // Find JSX text (text mellem > og <)
      this.findJSXText(line, lineIndex, filePath);

      // Find text i attributter
      this.findAttributeText(line, lineIndex, filePath);

      // Find strings i kode (tilpasset)
      this.findStringLiterals(line, lineIndex, filePath);
    });
  }

  private findJSXText(line: string, lineIndex: number, filePath: string): void {
    // Match tekst mellem JSX tags: >text<
    // Undgå selvlukkende tags og tom tekst
    const jsxRegex = />([^<>{}]+)</g;
    let match;

    while ((match = jsxRegex.exec(line)) !== null) {
      const text = match[1].trim();

      // Ignorer hvis:
      // - Tom eller kun whitespace
      // - Er kun tal eller special characters
      // - Er allerede i t() funktion
      // - Er et icon/component navn
      if (!text || 
          text.length < 3 || 
          /^[\d\s\W]+$/.test(text) ||
          line.includes(`t('`) ||
          line.includes('t("') ||
          line.includes('{t(') ||
          /^[A-Z][a-z]*$/.test(text) ||  // Single word starting with capital (component name)
          text.startsWith('•') ||  // Bullet points
          text.startsWith('✓') ||
          text.startsWith('✅')) {
        continue;
      }

      this.addResult({
        file: filePath,
        line: lineIndex + 1,
        column: match.index,
        text,
        type: 'jsx',
        context: line.trim(),
      });
    }
  }

  private findAttributeText(line: string, lineIndex: number, filePath: string): void {
    // Match attributter med tekst: placeholder="text" eller title='text'
    for (const attrName of ATTRIBUTE_NAMES) {
      const attrRegex = new RegExp(`${attrName}\\s*=\\s*["']([^"']+)["']`, 'g');
      let match;

      while ((match = attrRegex.exec(line)) !== null) {
        const text = match[1].trim();

        // Ignorer hvis allerede i t() eller for kort
        if (!text || 
            text.length < 2 || 
            line.includes(`{t('`) ||
            line.includes(`{t("`) ||
            /^[\d\s\W]+$/.test(text)) {
          continue;
        }

        this.addResult({
          file: filePath,
          line: lineIndex + 1,
          column: match.index,
          text,
          type: 'attribute',
          context: line.trim(),
        });
      }
    }
  }

  private findStringLiterals(line: string, lineIndex: number, filePath: string): void {
    // Find strings der ligner UI tekst (ikke teknisk kode)
    // Dette er mere avanceret og kan give false positives
    
    // Match strings med danske tegn eller længere engelske fraser
    const stringRegex = /["']([^"']{10,}[æøåÆØÅ][^"']*)["']/g;
    let match;

    while ((match = stringRegex.exec(line)) !== null) {
      const text = match[1].trim();

      // Ignorer hvis:
      // - I t() funktion
      // - URL eller path
      // - Tekniske strenge (className, etc)
      if (line.includes('t(') ||
          text.includes('/') ||
          text.includes('\\') ||
          text.includes('http') ||
          line.includes('className') ||
          line.includes('console.log')) {
        continue;
      }

      this.addResult({
        file: filePath,
        line: lineIndex + 1,
        column: match.index,
        text,
        type: 'string',
        context: line.trim(),
      });
    }
  }

  private addResult(result: HardcodedText): void {
    this.results.push(result);
    this.stats.textsFound++;
    this.stats.byType[result.type]++;
  }

  getStats() {
    return this.stats;
  }

  generateReport(): string {
    const report = [
      '='.repeat(80),
      '🔍 HARDCODED TEXT SCAN REPORT',
      '='.repeat(80),
      '',
      `📊 STATISTICS:`,
      `  Files scanned: ${this.stats.filesScanned}`,
      `  Hardcoded texts found: ${this.stats.textsFound}`,
      `  - JSX text: ${this.stats.byType.jsx}`,
      `  - Attributes: ${this.stats.byType.attribute}`,
      `  - String literals: ${this.stats.byType.string}`,
      '',
      '='.repeat(80),
      '📝 DETAILED FINDINGS:',
      '='.repeat(80),
      '',
    ];

    // Gruppér per fil
    const byFile = this.results.reduce((acc, result) => {
      if (!acc[result.file]) acc[result.file] = [];
      acc[result.file].push(result);
      return acc;
    }, {} as Record<string, HardcodedText[]>);

    for (const [file, items] of Object.entries(byFile)) {
      report.push(`\n📄 ${file} (${items.length} issues):`);
      report.push('-'.repeat(80));

      items.forEach((item, index) => {
        report.push(`  ${index + 1}. Line ${item.line}, Column ${item.column} [${item.type}]`);
        report.push(`     Text: "${item.text}"`);
        report.push(`     Context: ${item.context.slice(0, 100)}${item.context.length > 100 ? '...' : ''}`);
        report.push('');
      });
    }

    report.push('='.repeat(80));
    report.push('💡 NEXT STEPS:');
    report.push('  1. Review all hardcoded texts above');
    report.push('  2. Add them to src/i18n/locales/da.json');
    report.push('  3. Replace with t() function calls');
    report.push('  4. Run translation system to auto-translate');
    report.push('='.repeat(80));

    return report.join('\n');
  }
}

// Kør scanning
if (require.main === module) {
  console.log('🚀 Starting hardcoded text scan...\n');

  const scanner = new HardcodedTextScanner();
  const results = scanner.scan('src');

  // Generer rapport
  const report = scanner.generateReport();
  console.log(report);

  // Gem til fil
  const reportPath = 'hardcoded-texts-report.txt';
  fs.writeFileSync(reportPath, report);
  console.log(`\n✅ Report saved to: ${reportPath}`);

  // Gem JSON for videre processing
  const jsonPath = 'hardcoded-texts-report.json';
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`✅ JSON data saved to: ${jsonPath}`);
}

export { HardcodedTextScanner };
export type { HardcodedText };

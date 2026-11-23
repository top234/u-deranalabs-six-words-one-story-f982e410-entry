// Six Words, One Story — make.fun entry
// The whole entry is one six-word story. This program writes it to
// $OUTPUT_DIR/entry.txt, exactly as the judge will read it.
//
// The story: a grandmother's ring, kept for decades, slips onto a
// stranger's finger as if it had always belonged there. One image,
// one turn, one whole hidden history the reader has to fill in:
// who the stranger is, why the ring fits, what the grandmother knew.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY = "Grandma's ring fit the stranger perfectly.";

function wordCount(text: string): number {
  return text
    .replace(/[.!?]+$/u, "")
    .split(/\s+/u)
    .filter(Boolean).length;
}

if (wordCount(STORY) !== 6) {
  throw new Error(`story must be exactly six words, got ${wordCount(STORY)}`);
}

// The gate: /output/entry.txt must be UTF-8 text of 1 to 60 characters,
// not only white space. Fail loudly here rather than shipping an entry
// the sealed scorer would refuse.
if (STORY.length < 1 || STORY.length > 60 || STORY.trim().length === 0) {
  throw new Error(`story must be 1-60 characters, got ${STORY.length}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, STORY + "\n", "utf8");
console.log(`wrote ${wordCount(STORY)}-word story (${STORY.length} chars) to ${outFile}`);

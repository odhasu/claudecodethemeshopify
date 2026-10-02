const { minify } = require('terser');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
async function build() {
  const source = fs.readFileSync(path.join(root, 'runtime/loader.js'), 'utf8');
  const result = await minify(source, { compress: { passes: 2 }, mangle: true, format: { comments: false } });
  if (!result.code) throw new Error('Loader build produced no output');
  for (const asset of ['scaled-loader-current.js', 'scaled-loader.js']) {
    fs.writeFileSync(path.join(root, 'assets', asset), result.code + '\n');
  }
  console.log(`Loader: ${Buffer.byteLength(source)} source bytes, ${Buffer.byteLength(result.code)} minified bytes`);
}
build().catch(error => { console.error(error); process.exitCode = 1; });

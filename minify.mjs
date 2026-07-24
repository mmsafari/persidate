import { build } from "esbuild";
import fs from "fs/promises";
import path from "path";

async function walk(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);

		if (entry.isDirectory()) {
			await walk(fullPath);
		} else if (entry.name.endsWith(".js")) {
			await build({
				entryPoints: [fullPath],
				outfile: fullPath,
				minify: true,
				bundle: false,
				allowOverwrite: true,
			});
		}
	}
}

await walk("dist");

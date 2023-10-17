const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const yargs = require("yargs");

const argv = yargs
  .option("source", {
    alias: "s",
    description: "Source directory containing input files",
    type: "string",
    demandOption: true,
  })
  .option("destination", {
    alias: "d",
    description: "Destination directory for output images",
    type: "string",
    demandOption: true,
  })
  .option("format", {
    alias: "f",
    description: "Output format (jpeg, png, webp, avif, tiff)",
    type: "string",
    default: "webp",
    choices: ["jpeg", "png", "webp", "avif", "tiff"],
  })
  .option("width", {
    alias: "w",
    description: "Output image max width",
    type: "number",
  })
  .option("removeTransparency", {
    alias: "r",
    description:
      "Remove transparency from the output image, replacing it with a white background",
    type: "boolean",
  })
  .help()
  .alias("help", "h").argv;

const convertSVGs = async (
  sourceDir,
  destinationDir,
  format,
  width,
  removeTransparency
) => {
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir);

  for (const file of files) {
    if (
      [".svg", ".jpeg", ".jpg", ".png", ".webp", ".avif", ".tiff"].includes(
        path.extname(file).toLowerCase()
      )
    ) {
      const inputFile = path.join(sourceDir, file);
      const outputFile = path.join(
        destinationDir,
        `${path.basename(file, ".svg")}.${format}`
      );

      const sharpInstance = sharp(inputFile);

      if (width) {
        sharpInstance.resize({ width: width, fit: "inside" });
      }

      if (removeTransparency) {
        sharpInstance.flatten({ background: { r: 255, g: 255, b: 255 } });
      }

      switch (format) {
        case "jpeg":
          sharpInstance.jpeg();
          break;
        case "png":
          sharpInstance.png();
          break;
        case "webp":
          sharpInstance.webp();
          break;
        case "avif":
          sharpInstance.avif();
          break;
        case "tiff":
          sharpInstance.tiff();
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      try {
        await sharpInstance.toFile(outputFile);
        console.log(`Converted ${file} to ${outputFile}`);
      } catch (error) {
        console.error(`Error converting ${file}:`, error);
      }
    }
  }
};

convertSVGs(
  argv.source,
  argv.destination,
  argv.format,
  argv.width,
  argv.removeTransparency
);

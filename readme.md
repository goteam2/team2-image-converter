# Team2 Image Converter

This is a command-line tool for converting image files to another format. It uses the [Sharp](https://sharp.pixelplumbing.com/) library for image processing.

## Installation

To install the tool, run the following command:

`npm install`

## Usage

To use the tool, run the following command:

`node convert.js --source <sourceDir> --destination <destinationDir> [--format <format>] [--width <width>] [--removeTransparency]`

The following options are available:

- `--source` (`-s`): The source directory containing input files. This option is required.
- `--destination` (`-d`): The destination directory for output images. This option is required.
- `--format` (`-f`): The output format (JPEG, PNG, WEBP, AVIF, and TIFF formats). Default is JPEG.
- `--width` (`-w`): The output image max width.
- `--removeTransparency` (`-r`): Remove transparency from the output image, replacing it with a white background.

## Examples

Convert all files in the `input` directory to JPEG images with a maximum width of 800 pixels and save them in the `output` directory:

`node convert.js --source input --destination output --format jpeg --width 800`

Convert all files in the `input` directory to WebP images with a maximum width of 800 pixels and remove transparency:

`node convert.js --source input --destination output --format webp --width 800 --removeTransparency`

## License

This tool is licensed under the [MIT License](https://opensource.org/licenses/MIT).

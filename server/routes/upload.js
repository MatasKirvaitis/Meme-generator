const Jimp = require("jimp");
const IncomingForm = require("formidable").IncomingForm;

module.exports = () => async (req, res) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) throw err;

    let file = files.file;
    let botText = fields.botText || "";
    let topText = fields.topText || "";

    const image = await jimpFileModifier(file.path, botText, topText);
    const mime = Jimp.MIME_PNG;
    const base64Image = await image.getBase64Async(mime);

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": base64Image.length
    });
    res.end(base64Image);
  });

  form.on("end", () => {
    console.log("Form received successfully");
  });
};

const jimpFileModifier = async (filePath, botText, topText) => {
  try {
    const image = await Jimp.read(filePath);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    image.resize(700, Jimp.AUTO);
    image.print(font, 0, 0, {
        text: topText,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP,
      },  image.bitmap.width, image.bitmap.height);
    image.print(font, 0, 0, {
        text: botText,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
      }, image.bitmap.width, image.bitmap.height);
    return image;
  } catch (error) {
    console.log("This is the error", error);
  }
};

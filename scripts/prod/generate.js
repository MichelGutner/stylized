const { execSync } = require("child_process");
const fs = require("fs");

const copyFolder = (source, destination, output = true) => {
  fs.mkdirSync("configs", { recursive: true });
  fs.mkdirSync("configs/environment", { recursive: true });
  fs.mkdirSync("configs/environment/prod", { recursive: true });
  fs.writeFileSync(destination, "{}");

  try {
    const files = fs.readdirSync(source);

    files.forEach((file) => {
      const fileIsDirectory = fs.statSync(`${source}/${file}`).isDirectory();
      if (fileIsDirectory) {
        return;
      }

      const destinationFileData = fs.readFileSync(destination, "utf8");
      const destinationFileJson = JSON.parse(destinationFileData);
      const fileData = fs.readFileSync(`${source}/${file}`, "utf8");

      // Generate UUID synchronously
      const uuid = execSync(
        "node -e \"console.log(require('crypto').randomUUID())\""
      )
        .toString()
        .trim();

      // Replace sessionId in fileData
      const replacedFileData = fileData.replace(
        /"sessionId": ""/gm,
        `"sessionId": "${uuid}"`
      );

      const fileDataJson = JSON.parse(replacedFileData);
      const merge = {
        ...destinationFileJson,
        [`${file.split(".")[0].toLowerCase()}Config`]: fileDataJson,
      };

      fs.writeFileSync(destination, JSON.stringify(merge, null, 2));
    });

    if (output) console.log("\x1b[92mEnv create with success!");
  } catch (error) {
    console.error("Error:", error);
  }
};

copyFolder("configs/environment/prod", "env.json");

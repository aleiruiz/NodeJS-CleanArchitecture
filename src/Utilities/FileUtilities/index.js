import { BlobServiceClient } from "@azure/storage-blob";
import { v1 } from "uuid";
import path from "path";

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_BLOB_CONNECTION_STRING
);

const containerName = process.env.AZURE_BLOB_CONTAINER;

console.log("\nCreating container...");
console.log("\t", containerName);

const containerClient = blobServiceClient.getContainerClient(containerName);

const setUpContainer = async () => {
  await containerClient.create();
};

const videoFormats = [".mp4", ".flv"];

const imageFormats = [".jpg", ".jpeg", ".png", ".PNG"];

const contentTypes = [
  { extension: ".mp4", contentType: "video/mp4" },
  { extension: ".flv", contentType: "video/x-flv" },
  { extension: ".jpg", contentType: "images/jpeg" },
  { extension: ".jpeg", contentType: "images/jpeg" },
  { extension: ".png", contentType: "images/png" },
];

const validateExtension = (extension, fileType) => {
  switch (fileType) {
    case "image":
      return imageFormats.includes(extension);
    case "video":
      return videoFormats.includes(extension);
    case "any":
      return true;
    default:
      return false;
  }
};

const getContentType = (extension) => {
  return contentTypes.find((x) => x.extension == extension).contentType;
};

const uploadBlob = async (blob, prefix, fileType) => {
  try {
    const originalExtension = path.extname(blob.name);
    if (!validateExtension(originalExtension, fileType)) {
      throw Error("original_extension_invalid");
    }

    const blobName = prefix + v1() + originalExtension;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(blob.data, blob.size, {
      blobHTTPHeaders: {
        blobContentType: getContentType(originalExtension),
      },
    });

    return blobName;
  } catch (err) {
    throw Error(`error_file_upload`);
  }
};

export default { uploadBlob, setUpContainer };

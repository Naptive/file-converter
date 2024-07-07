"use server";
export const formatFileSize = async (bytes: any) => {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + " gb";
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + " mb";
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + " kb";
  } else if (bytes > 1) {
    bytes = bytes + " bytes";
  } else if (bytes == 1) {
    bytes = bytes + " byte";
  } else {
    bytes = "";
  }
  return bytes;
};

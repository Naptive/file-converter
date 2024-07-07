"use server";
import { formSchema } from "@/schema/convert";
import * as z from "zod";

// Define the type for progress event
// interface Progress {
//   timemark: string;
// }

// Helper function to save the File object to disk
// const saveFileToDisk = async (file: File): Promise<string> => {
//   const buffer = await file.arrayBuffer();
//   const filePath = path.resolve(__dirname, file.name);
//   await writeFileAsync(filePath, Buffer.from(buffer));
//   return filePath;
// };

// Define the convert function with the correct types
export const convert = async (values: z.infer<typeof formSchema>) => {
  // let inputPath: string;
  // // Save the File object to disk and get the file path
  // try {
  //   inputPath = await saveFileToDisk(values.file);
  // } catch (err) {
  //   throw new Error("Failed to save input file to disk");
  // }
  // const outputPath: string = path.resolve(__dirname, "output.mp4"); // Use an absolute path
  // // Check if the input file exists
  // if (!fs.existsSync(inputPath)) {
  //   throw new Error("Input file does not exist");
  // }
  // return new Promise((resolve, reject) => {
  //   let totalTime: number = 0;
  //   ffmpeg.ffprobe(inputPath, (err: Error, metadata: ffmpeg.FfprobeData) => {
  //     if (err) {
  //       reject(err);
  //       return;
  //     }
  //     totalTime = metadata.format.duration || 0;
  //     ffmpeg(inputPath)
  //       .videoCodec("libx264")
  //       .on("end", () => {
  //         console.log(`File has been transcoded to H.264`);
  //         resolve(outputPath);
  //       })
  //       .on("progress", (progress: Progress) => {
  //         const timeParts: string[] = progress.timemark.split(":");
  //         const timeInSeconds: number =
  //           parseInt(timeParts[0]) * 3600 +
  //           parseInt(timeParts[1]) * 60 +
  //           parseInt(timeParts[2]);
  //         const percent: number = (timeInSeconds / totalTime) * 100;
  //         console.log(`Progress: ${percent.toFixed(2)}%`);
  //       })
  //       .on("error", (err: Error) => {
  //         console.error(`Error transcoding file: ${err.message}`);
  //         reject(err);
  //       })
  //       .save(outputPath);
  //   });
  // });
};

"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
// eslint-disable-next-line @next/next/no-async-client-component
const ConvertFile = async (video: File, convertTo: string) => {
  const ffmpegRef = new FFmpeg();

  const ffmpeg = ffmpegRef;

  const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
  ffmpeg.on("progress", ({ progress }: any) => {
    console.log(parseInt(String(progress * 100).split(".")[0]));
  });
  await ffmpeg
    .load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    })
    .then(async () => {
      // Convert the File object to a Uint8Array
      const fileData = new Uint8Array(await video.arrayBuffer());

      // Now pass the Uint8Array to ffmpeg.writeFile
      try {
        await ffmpeg.writeFile(`${video?.name}`, fileData);

        await ffmpeg.exec(["-i", `${video?.name}`, "output.mkv"]);

        // Read the output file as a Uint8Array
        const data: any = await ffmpeg.readFile(`output.${convertTo}`);
        const blob = new Blob([data.buffer], { type: `video/${convertTo}` });
        const convertedVideo = new File([blob], `your_video.${convertTo}`);

        return convertedVideo;
      } catch (error) {
        console.error(error);
      }
    });
};

export default ConvertFile;

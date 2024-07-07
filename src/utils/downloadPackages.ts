import { toBlobURL } from "@ffmpeg/util";
import * as z from "zod";
import { formSchema } from "@/schema/convert";
import { FFmpeg } from "@ffmpeg/ffmpeg";

export const downloadPackages = async (
  values: z.infer<typeof formSchema>,
  ffmpegRef: React.MutableRefObject<FFmpeg>
) => {
  const ffmpeg = ffmpegRef.current;
  if (values.multithreading) {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/umd";
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript"
      ),
    });
  } else {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
  }
};

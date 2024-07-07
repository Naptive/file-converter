import * as z from "zod";

export const formSchema = z.object({
  convertFrom: z.string(),
  convertTo: z.string().min(1, {
    message: "please select",
  }),
  multithreading: z.boolean(),
  rename_file: z.boolean(),
  renameFileName: z.string(),
  file: z
    .instanceof(File, {
      message: "no file selected",
    })
    .refine((file) => file.size > 0, "Required"),
  video_FPS: z.string().optional(),
  video_bitrate: z.string().optional(),
  video_resolution: z.string().optional(),
  audio_bitrate: z.string().optional(),
});

"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CloudUpload, Loader2 } from "lucide-react";
import Dropzone from "react-dropzone";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Message from "./Message";
import { formSchema } from "@/schema/convert";
import Ffmpeg from "@/utils/ffmpeg";

const VideoOptions = () => {
  const [convertedFile, setConvertedFile] = React.useState<File | null>(null);
  const [isRename, setIsRename] = React.useState(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [isPackageDownloading, setIsPackageDownloading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      convertFrom: "",
      convertTo: "",
      multithreading: false,
      rename_file: false,
      renameFileName: "",
      file: undefined,
      video_bitrate: undefined,
      video_FPS: undefined,
      video_resolution: undefined,
      audio_bitrate: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const ffmpeg = Ffmpeg().current;
    console.time("convert");

    const downloadPackages = (await import("@/utils/downloadPackages"))
      .downloadPackages;
    setIsPackageDownloading(true);
    await downloadPackages(values, Ffmpeg()).then(() => {
      format(values);
    });
    setIsPackageDownloading(false);
    ffmpeg.on("progress", ({ progress }: any) => {
      console.log(Number((progress * 100).toFixed(1)));
      setProgress(Number((progress * 100).toFixed(1)));
      // parseInt(String(progress * 100).split(".")[0])
    });
  };

  const format = async (values: z.infer<typeof formSchema>) => {
    const ffmpeg = Ffmpeg().current;
    // Convert the File object to a Uint8Array
    const fileData = new Uint8Array(await values.file.arrayBuffer());

    console.log(values.video_resolution);

    // Now pass the Uint8Array to ffmpeg.writeFile
    try {
      await ffmpeg.writeFile(`${values.file?.name}`, fileData);

      const args = ["-i", `${values.file?.name}`];

      if (values.video_FPS && values.video_FPS !== "copy") {
        args.push("-r", values.video_FPS);
      }

      if (values.video_resolution && values.video_resolution !== "copy") {
        args.push("-s", values.video_resolution);
      }

      if (values.video_bitrate && values.video_bitrate !== "copy") {
        args.push("-b:v", values.video_bitrate);
      }

      if (values.audio_bitrate && values.audio_bitrate !== "copy") {
        args.push("-b:a", values.audio_bitrate);
      }

      args.push(`output.${values.convertTo}`);

      ffmpeg.exec([...args]);

      // Read the output file as a Uint8Array
      const data: any = await ffmpeg.readFile(`output.${values.convertTo}`);
      const blob = new Blob([data.buffer], {
        type: `video/${values.convertTo}`,
      });
      const convertedVideo = new File(
        [blob],
        `${
          values.rename_file
            ? values.renameFileName.split(".")[0]
            : values.file.name.split(".")[0]
        }.${values.convertTo}`
      );
      setConvertedFile(convertedVideo);
      console.timeEnd("convert");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(convertedFile as File);
    const a = document.createElement("a");
    a.href = url;
    a.download = convertedFile?.name as string;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const convertNew = () => {
    setConvertedFile(null);
    setProgress(0);
    setIsRename(false);
    form.reset({
      convertFrom: "",
      convertTo: "",
      multithreading: false,
      rename_file: false,
      renameFileName: "",
      file: undefined,
      video_bitrate: "",
      video_FPS: "",
      video_resolution: "",
      audio_bitrate: "",
    });
  };

  return (
    <section className="md:min-w-[290px] h-full">
      <Message
        isVisible={isPackageDownloading}
        message="Downloading packages"
      />
      {progress === 0 ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="absolute -top-11 right-0 flex gap-1 md:w-[250px]">
              <FormField
                control={form.control}
                name="convertFrom"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="hover:bg-white/30 bg-white/10 text-white transition min-w-[123px]">
                            <SelectValue
                              placeholder={
                                form.watch("file")?.name.split(".")[1] || "From"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Video File Types</SelectLabel>
                              <SelectItem value="mp4">MP4</SelectItem>
                              <SelectItem value="avi">AVI</SelectItem>
                              <SelectItem value="mkv">MKV</SelectItem>
                              <SelectItem value="mov">MOV</SelectItem>
                              <SelectItem value="wmv">WMV</SelectItem>
                              <SelectItem value="flv">FLV</SelectItem>
                              <SelectItem value="webm">WEBM</SelectItem>
                              <SelectItem value="mpeg">MPEG</SelectItem>
                              <SelectItem value="ogv">OGV</SelectItem>
                              <SelectItem value="ts">TS</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="convertTo"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="hover:bg-white/30 bg-white/10 text-white transition min-w-[123px]">
                            <SelectValue placeholder="To" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Video File Types</SelectLabel>
                              <SelectItem value="mp4">MP4</SelectItem>
                              <SelectItem value="avi">AVI</SelectItem>
                              <SelectItem value="mkv">MKV</SelectItem>
                              <SelectItem value="mov">MOV</SelectItem>
                              <SelectItem value="wmv">WMV</SelectItem>
                              <SelectItem value="flv">FLV</SelectItem>
                              <SelectItem value="webm">WEBM</SelectItem>
                              <SelectItem value="mpeg">MPEG</SelectItem>
                              <SelectItem value="ogv">OGV</SelectItem>
                              <SelectItem value="ts">TS</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => {
                const file = form.watch("file");
                return (
                  <FormItem>
                    <FormControl>
                      {file ? (
                        <section className="flex gap-3 text-sm">
                          <video
                            autoPlay
                            loop
                            muted
                            src={URL.createObjectURL(file)}
                            className="h-[154px] w-2/3 object-cover mb-3 cursor-pointer rounded-xl"
                          />
                          <div>
                            <Label htmlFor="details">Details</Label>
                            <ul
                              id="details"
                              className="mt-3 flex items-start gap-x-3"
                            >
                              <div className="font-medium space-y-1">
                                <li>name:</li>
                                <li>type:</li>
                                <li>size:</li>
                                <li>from:</li>
                                <li>to:</li>
                              </div>
                              <div className="space-y-1">
                                <li>{file.name}</li>
                                <li>{file.type}</li>
                                <li>{file.size}</li>
                                <li>.{file.name.split(".")[1]}</li>
                                <li>.{form.watch("convertTo")}</li>
                              </div>
                            </ul>
                          </div>
                        </section>
                      ) : (
                        <Dropzone
                          onDrop={(acceptedFiles) =>
                            field.onChange(acceptedFiles[0])
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section
                              {...getRootProps()}
                              className="border border-dashed rounded-xl py-16 content-center border-zinc-600/30 mb-3 cursor-pointer"
                            >
                              <input {...getInputProps()} />
                              <div className="flex justify-center">
                                <CloudUpload color="rgb(82 82 91 / 0.5)" />
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Label htmlFor="videoOptions">Options</Label>
            <section id="videoOptions" className="md:flex">
              <aside className="md:w-1/2 space-y-3">
                <div className="flex md:block md:space-y-3 items-center gap-x-3">
                  <FormField
                    control={form.control}
                    name="multithreading"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id="enable-multithreading"
                              />
                              <Label
                                className="text-red-600 whitespace-nowrap"
                                htmlFor="enable-multithreading"
                              >
                                Enable Multi-threading
                              </Label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="rename_file"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={field.value && isRename}
                                onCheckedChange={(e) => {
                                  field.onChange(e);
                                  setIsRename(e);
                                }}
                                id="rename-file"
                              />
                              <Label
                                htmlFor="rename-file"
                                className="whitespace-nowrap"
                              >
                                Rename File
                              </Label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="renameFileName"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        {isRename && (
                          <>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                placeholder="New file name"
                                className="w-full md:w-1/2"
                              />
                            </FormControl>
                            <FormMessage />
                          </>
                        )}
                      </FormItem>
                    );
                  }}
                />
              </aside>
              <aside className="md:w-1/2 space-y-3">
                <section className="flex gap-x-3 justify-center">
                  <FormField
                    control={form.control}
                    name="video_bitrate"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="w-[42vw] md:w-[159px] bg-gray-100">
                                <SelectValue placeholder="Video Bitrate" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="45000k">
                                  45,000 kbps
                                </SelectItem>
                                <SelectItem value="16000k">
                                  16,000 kbps
                                </SelectItem>
                                <SelectItem value="5000k">
                                  5,000 kbps
                                </SelectItem>
                                <SelectItem value="2500k">
                                  2,500 kbps
                                </SelectItem>
                                <SelectItem value="1000k">
                                  1,000 kbps
                                </SelectItem>
                                <SelectItem value="copy">original</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="audio_bitrate"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="w-[42vw] md:w-[159px] bg-gray-100">
                                <SelectValue placeholder="Audio Bitrate" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="320k">320 kbps</SelectItem>
                                <SelectItem value="256k">256 kbps</SelectItem>
                                <SelectItem value="192k">192 kbps</SelectItem>
                                <SelectItem value="128k">128 kbps</SelectItem>
                                <SelectItem value="64k">64 kbps</SelectItem>
                                <SelectItem value="copy">original</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </section>
                <section className="flex gap-x-3 justify-center">
                  <FormField
                    control={form.control}
                    name="video_FPS"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="w-[42vw] md:w-[159px] bg-gray-100">
                                <SelectValue placeholder="Video fps" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="144">144 fps</SelectItem>
                                <SelectItem value="120">120 fps</SelectItem>
                                <SelectItem value="60">60 fps</SelectItem>
                                <SelectItem value="30">30 fps</SelectItem>
                                <SelectItem value="24">24 fps</SelectItem>
                                <SelectItem value="copy">original</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="video_resolution"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="w-[42vw] md:w-[159px] bg-gray-100">
                                <SelectValue placeholder="Video Resolution" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="7680x4320">
                                  7680x4320
                                </SelectItem>
                                <SelectItem value="3840x2160">
                                  3840x2160
                                </SelectItem>
                                <SelectItem value="2560x1440">
                                  2560x1440
                                </SelectItem>
                                <SelectItem value="1920x1080">
                                  1920x1080
                                </SelectItem>
                                <SelectItem value="1280x720">
                                  1280x720
                                </SelectItem>
                                <SelectItem value="1000k">640x480</SelectItem>
                                <SelectItem value="copy">original</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </section>
              </aside>
            </section>

            <Button
              type="submit"
              className="bg-[#006fee] absolute inset-x-5 bottom-5 md:left-auto"
            >
              Convert
            </Button>
          </form>
        </Form>
      ) : (
        <div className="w-full h-full flex pb-16">
          <div className="w-[180px] h-[180px] m-auto">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                pathColor: "#006fee",
                textColor: "#006fee",
              })}
            />
            <p className="whitespace-nowrap my-5 text-center">
              Convert is in progress
            </p>
          </div>
          <footer className="absolute inset-x-5 bottom-5 md:left-auto space-x-2">
            <Button
              onClick={convertNew}
              variant={progress === 100 ? "ghost" : "destructive"}
              className="w-[48.5%] md:w-auto"
            >
              {progress === 100 ? "Convert new" : "Cancel"}
            </Button>
            <Button onClick={handleDownload} className="w-[48.5%] md:w-auto">
              {progress === 100 ? "Download" : "Pause"}
            </Button>
          </footer>
        </div>
      )}
    </section>
  );
};

export default VideoOptions;
{
}

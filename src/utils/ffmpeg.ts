"use client";
import { useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";

const Ffmpeg = () => {
  const ffmpegRef = useRef(new FFmpeg());
  return ffmpegRef;
};

export default Ffmpeg;

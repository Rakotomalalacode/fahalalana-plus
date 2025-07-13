"use client";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { IconLoader } from '@tabler/icons-react';
import { useEffect, useRef, useState } from "react";
import Image from "next/image"
import { IconPlayerPauseFilled, IconPlayerPlayFilled, IconVolume, IconVolumeOff, IconRepeat } from "@tabler/icons-react";
import CoursPlus from "./CoursPlus";

type VideoItem = {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
};

export default function TowCours() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch("/api/admin/videos");
      const data = await res.json();
      setVideos(data);
      if (data.length > 0) {
        setCurrentVideo(data[0]);
      }
    };
    fetchVideos();
  }, []);

  const changeVideo = (video: VideoItem) => {
    setCurrentVideo(video);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeLimit = () => {
      if (video.duration > 180 && video.currentTime >= 180) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener("timeupdate", handleTimeLimit);

    return () => {
      video.removeEventListener("timeupdate", handleTimeLimit);
    };
  }, [currentVideo]);

  if (!currentVideo) return <div className="h-[600px] flex justify-center items-center"><IconLoader className="animate-spin h-8 w-8 text-muted-foreground" /></div>

  return (
    <div className="relative w-full font-outfit lg:h-[520px] z-0">
      <div className="relative w-full lg:h-[520px] overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          controlsList="nodownload"
          muted
          loop={false}
          playsInline
        >
          <source src={currentVideo.videoUrl} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>

        <div className="absolute backdrop-blur-sm w-full top-0 pt-6 h-full flex items-start px-4 lg:px-10">
          <div className="text-white max-w-md">
            <h1 className="text-xl w-[80%] lg:w-full lg:text-5xl font-bold mb-4">
              {currentVideo.title}
            </h1>
            <p className="text-sm hidden lg:block lg:text-base mb-6">
              {currentVideo.description}
            </p>
            <p className="text-sm w-[85%] lg:hidden lg:text-base lg:mb-6">
              {currentVideo.description.slice(0, 100)}
            </p>
            <CoursPlus cours={currentVideo} />
          
          </div>
        </div>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-3">
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded bg-white/60 backdrop-blur flex items-center justify-center hover:bg-white transition"
          >
            {isMuted ? <IconVolumeOff className="text-blue-600" /> : <IconVolume className="text-blue-600" />}
          </button>
          <button
            onClick={togglePlayPause}
            className="w-10 h-10 rounded bg-white/60 backdrop-blur flex items-center justify-center hover:bg-white transition"
          >
            {isPlaying ? <IconPlayerPauseFilled className="text-blue-600" /> : <IconPlayerPlayFilled className="text-blue-600" />}
          </button>
          <button
            onClick={replayVideo}
            className="w-10 h-10 rounded bg-white/60 backdrop-blur flex items-center justify-center hover:bg-white transition"
          >
            <IconRepeat className="text-blue-600" />
          </button>
        </div>
      </div>

      <div className="w-full lg:absolute relative bottom-0 gadient-videos">
        <Carousel className="lg:w-[90%] left-1/2 transform -translate-x-1/2">
          <CarouselContent className="px-4 lg:pt-2 pt-5 pb-5">
            {videos.map((video) => (
              <CarouselItem
                key={video.id}
                onClick={() => changeVideo(video)}
                className="md:basis-1/2 lg:basis-[290px]"
              >
                <div
                  className={`md:basis-1/2 lg:basis-[290px] rounded-md relative cursor-pointer hover:ring-1 hover:ring-green-600 ${currentVideo.id === video.id ? "ring-1 ring-orange-500" : ""
                    }`}>
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={500}
                    height={500}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <div className="absolute w-[90%] bg-orangeme/50 px-3 py-1 text-white rounded left-1/2 transform -translate-x-1/2 bottom-3.5 font-semibold text-center">{video.title.slice(0, 26)}...</div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-orangeme hidden lg:flex rounded text-white border-none" />
          <CarouselNext className="bg-orangeme hidden lg:flex rounded text-white border-none" />
        </Carousel>
      </div>
    </div>
  );
}
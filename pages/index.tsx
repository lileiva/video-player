import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Video = ({ videoURL }: { videoURL: string }): JSX.Element => {
  const [videoSpeed, setVideoSpeed] = useState<number>(1);
  const handleChangeVideoSpeed = (e: any) => {
    setVideoSpeed(e.target.value);
  };

  useEffect(() => {
    const video = document.getElementById("video") as HTMLVideoElement;
    if (!video) return;
    video.playbackRate = videoSpeed;
  }, [videoSpeed]);
  return (
    <div className="flex flex-col justify-center h-1 min-h-screen gap-5">
      <div className="mx-auto border-2">
        <label htmlFor="number">
          Select Video Speed
          <input
            className="ml-8"
            step={0.1}
            type="number"
            placeholder="video speed"
            value={videoSpeed}
            onChange={handleChangeVideoSpeed}
          />
        </label>
      </div>
      <video className="mx-auto h-full" id="video" src={videoURL} controls />
    </div>
  );
};

const Home: NextPage = () => {
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const onChange = (e: any) => {
    console.log(e.target.files[0]);
    setVideoURL(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="video player created by lileiva" />
      </Head>

      {!videoURL && (
        <div className="flex flex-col mx-auto">
          <h1>Video Player</h1>

          <input
            type="file"
            accept="video/*"
            placeholder="Select your video file"
            onChange={(evt) => onChange(evt)}
          />
        </div>
      )}
      {videoURL && <Video videoURL={videoURL} />}
    </div>
  );
};

export default Home;

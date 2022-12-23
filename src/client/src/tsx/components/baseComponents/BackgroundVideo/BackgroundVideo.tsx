import React, { useState } from "react";
import style from "./BackgroundVideo.module.scss";
import video from "../../../../assets/home_page_video.mp4";
import { AnyFun } from "../../../types";

function BackgroundVideo({ onLoadedData }: { onLoadedData?: AnyFun }) {
  return (
    <video
      autoPlay
      muted
      loop
      className={style.background_video}
      onLoadedData={onLoadedData}
    >
      <source src={video} type="video/mp4" />
    </video>
  );
}

export default BackgroundVideo;

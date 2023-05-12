import React from "react";
import { LandingPage } from "./LandingPage";
import { WebFunction } from "./WebFunction";
import { ChatInfos } from "./chatInfos";
import { BlogPreview } from "./BlogPreview";
import { Footer } from "./resource/Footer";
import { PraisedDoctors } from "./PraisedDoctors";
import { Assessments } from "./Assessments";
import { AppPreview } from "./AppPreview";

export const HomeWeb = () => {
  return (
    <>
      <LandingPage />
      <WebFunction />
      {/* <ChatInfos />
      <PraisedDoctors /> */}
      {/* <Assessments /> */}
      {/* <BlogPreview /> */}
      {/* <AppPreview /> */}
      <Footer/>
    </>
  );
};

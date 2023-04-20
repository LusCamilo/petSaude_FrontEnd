import React from 'react'
import { AuthHeader } from '../../components/headers/AuthHeader';
import { LandingPage } from './LandingPage';
import { WebFunction } from './WebFunction';
import { ChatInfos } from './chatInfos';
import { BlogPreview } from './BlogPreview';
import { Footer } from "./resource/Footer";

export const HomeWeb = () => {
    return (
        <>
            <AuthHeader/>
            <LandingPage/>
            <WebFunction/>
            <ChatInfos/>
            <BlogPreview/>
            <Footer/>
        </>
    );
}
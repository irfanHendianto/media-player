import React, { useState, createContext } from "react";

export const SongContext = createContext();

export const SongProvider = props => {
  const tempSong = {
    thumbnailSrc: "",
    songSrc: "",
    name: "",
    artistName: "",
    trackId: ""
  }
  const [currentSong, setcurrentSong] = useState(tempSong)
  const [location, setLocation] = useState("")
  
  return (
    <SongContext.Provider value={{currentSong, setcurrentSong,location, setLocation}}>
      {props.children}
    </SongContext.Provider>
  );
};
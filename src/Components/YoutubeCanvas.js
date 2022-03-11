import React, { useEffect, useState } from "react";
import styled from "styled-components";
import YoutubeCard from "./YoutubeCard";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 1920px;
  height: 1080px;
  aspect-ratio: 16 / 9;
  background-color: #e3e3e3;
`;

const YoutubeCanvas = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = localStorage.getItem("youtube-grid-data");
    if (db) {
      setData(JSON.parse(db));
    } else {
      setData([
        { id: 0, x: 0, y: 0, factor: 20 },
        { id: 1, x: 640, y: 0, factor: 40 },
        { id: 2, x: 0, y: 180, factor: 20 },
        { id: 3, x: 320, y: 0, factor: 20 },
      ]);
    }
  }, []);

  const updateData = obj => {
    const newData = [...data];
    newData[obj.id] = obj;
    setData(newData);
    localStorage.setItem("youtube-grid-data", JSON.stringify(newData));
  };

  return (
    <Wrapper>
      {data.map(d => (
        <YoutubeCard cardData={d} key={d.id} updateData={updateData} />
      ))}
    </Wrapper>
  );
};

export default YoutubeCanvas;

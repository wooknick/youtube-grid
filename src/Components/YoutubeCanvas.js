import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import YoutubeCard from "./YoutubeCard";
import AppContext from "../Context/AppContext";

const Wrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 1920px;
  height: 1080px;
  aspect-ratio: 16 / 9;
  background-color: #e3e3e3;
`;

const Grid = styled.div`
  position: absolute;
  left: -1px;
  top: -1px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #aaaaaa;
  box-sizing: content-box;
`;

const GridBox = styled.div`
  width: 160px;
  height: 90px;
  background-color: #e3e3e3;
  border: 1px solid #aaaaaa;
`;

const YoutubeCanvas = () => {
  const { editMode } = useContext(AppContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = localStorage.getItem("youtube-grid-data");
    if (db) {
      setData(JSON.parse(db));
    } else {
      setData([
        { id: 0, x: 0, y: 0, factor: 20, videoId: "XA2YEHn-A8Q" },
        { id: 1, x: 640, y: 0, factor: 40, videoId: "XA2YEHn-A8Q" },
        { id: 2, x: 0, y: 180, factor: 20, videoId: "XA2YEHn-A8Q" },
        { id: 3, x: 320, y: 0, factor: 20, videoId: "XA2YEHn-A8Q" },
      ]);
    }
  }, []);

  const updateData = obj => {
    const newData = [...data];
    const targetIdx = newData.findIndex(v => v.id === obj.id);
    newData[targetIdx] = obj;
    setData(newData);
    localStorage.setItem("youtube-grid-data", JSON.stringify(newData));
  };

  return (
    <Wrapper>
      {editMode && (
        <Grid>
          {new Array(144).fill(0).map(() => (
            <GridBox key={v4()} />
          ))}
        </Grid>
      )}
      {data.map(d => (
        <YoutubeCard cardData={d} key={d.id} updateData={updateData} />
      ))}
    </Wrapper>
  );
};

export default YoutubeCanvas;

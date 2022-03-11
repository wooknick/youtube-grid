import React, { useState } from "react";
import styled from "styled-components";
import { Rnd } from "react-rnd";
import PropTypes from "prop-types";

const MIN_FACTOR = 20;
const MIN_WIDTH = 16 * MIN_FACTOR;
const MIN_HEIGHT = 9 * MIN_FACTOR;
const MAX_FACTOR = 120;
const MAX_WIDTH = 16 * MAX_FACTOR;
const MAX_HEIGHT = 9 * MAX_FACTOR;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #333333;
  background-color: #eeeeee;
`;

const YoutubeCard = ({ cardData, updateData }) => {
  /**
   * Problem : onDragStop에 deltaX, deltaY 계산 버그 존재함(22.3.12 기준)
   * Solution : 버그가 없는 onDrag를 통해 position을 직접 계산하여 관리함
   */
  const [position, setPosition] = useState({ x: cardData.x, y: cardData.y });

  const handleDrag = (_, data) => {
    const { deltaX, deltaY } = data;
    const newPosition = { x: position.x + deltaX, y: position.y + deltaY };
    setPosition(newPosition);
  };

  const handleDragStop = () => {
    const { x, y } = position;
    const { id, factor } = cardData;
    updateData({ id, x, y, factor });
  };

  const handleResizeStop = (_, __, ref) => {
    const { id, x, y } = cardData;
    const factor = ref.offsetWidth / 16;
    updateData({ id, x, y, factor });
  };

  const defaultStyle = {
    x: cardData.x,
    y: cardData.y,
    width: 16 * cardData.factor,
    height: 9 * cardData.factor,
  };

  return (
    <Rnd
      default={defaultStyle}
      lockAspectRatio={16 / 9}
      minWidth={MIN_WIDTH}
      minHeight={MIN_HEIGHT}
      maxWidth={MAX_WIDTH}
      maxHeight={MAX_HEIGHT}
      resizeGrid={[MIN_WIDTH / 2, MIN_HEIGHT / 2]}
      dragGrid={[MIN_WIDTH / 2, MIN_HEIGHT / 2]}
      bounds="parent"
      onResizeStop={handleResizeStop}
      onDrag={handleDrag}
      onDragStop={handleDragStop}
    >
      <Wrapper>
        <Content>youtubecard</Content>
      </Wrapper>
    </Rnd>
  );
};

export default YoutubeCard;

YoutubeCard.propTypes = {
  cardData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    factor: PropTypes.number.isRequired,
  }).isRequired,
  updateData: PropTypes.func.isRequired,
};

import styled from 'styled-components';

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;

  a {
    height: 40vh;
    display: inline-flex;
    margin: 2px;
    flex-grow: 1;
  }

  .last-row {
    flex-grow: 10;
  }
`;

export default ImageContainer;

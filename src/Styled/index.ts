import styled from "styled-components";

interface IProps {
  bgImage: string;
}

export const BannerImage = styled.div<IProps>`
  background-image: url(${(props) =>
    props.bgImage ||
    "https://media.istockphoto.com/photos/digital-cyberspace-with-particles-and-digital-data-network-high-picture-id1302189748?b=1&k=20&m=1302189748&s=170667a&w=0&h=s0o2dhTh40lrWLPt6rg54S0jCUywkr6h04rDdfStMq8="});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 1;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
    z-index: -1;
  }
`;

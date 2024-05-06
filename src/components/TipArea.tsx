import React from "react";
import styled from "styled-components";
import Neko from "../images/neko_coffee_sosogu_nya.png";
import Author from "../images/profilepic250.png";
import KofiButton from "kofi-button";
import { Link } from "gatsby";

const TipArea: React.FC = () => {
  return (
    <OuterWrapper>
      <Title>役に立ったらコーヒーを注ごう</Title>
      <InnerWrapper>
        <PicAndCoffee>
          <Onnya src={Neko} alt="コーヒーを注ぐおんニャ" />
          <Me src={Author} alt="プロフィール画像" />
        </PicAndCoffee>
        <KofiButton color="#0a9396" kofiID={"ao_sankaku"} title="コーヒーを頭にかける" />
      </InnerWrapper>
      <Desc>
        この記事が「役に立った！」と思ったら、筆者にコーヒー（300円）を注いであげましょう。きっと執筆の活力になります。
        <br />リクエストも受け付けています。やり方は<Link to="/blog/requesting_guideline">こちら</Link>。
      </Desc>
    </OuterWrapper>
  )
}

const OuterWrapper = styled.div`
  background-color: var(--color-gray-3);
  padding: 20px 0;
`

const Title = styled.p`
  font-size: 0.9em;
  text-align: center;
  padding: 0 0 20px 0;
`

const Desc = styled.p`
  font-size: 1em;
  text-align: center;
  padding: 10px 10px;
  white-space: auto;
  word-break: auto-phrase;
  line-height: 1.8;
`

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  padding-top: 15px;
`

const PicAndCoffee = styled.div`
  position: relative;
  padding: 20px;
`

const Onnya = styled.img`
  position: absolute;
  width: 50px;

  @keyframes return {
    50% {
      left: 25px;
    }
    100% {
      left: 75px;
    }
  }
  left: 75px;
  top: -15px;

  animation-name: return;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
  z-index: 4;
  
`

const Me = styled.img`
  width: 80px;
  animation: hurueru .1s  infinite;
  @keyframes hurueru {
    0% {transform: translate(0px, 0px) rotateZ(0deg)}
    25% {transform: translate(2px, 2px) rotateZ(1deg)}
    50% {transform: translate(0px, 2px) rotateZ(0deg)}
    75% {transform: translate(2px, 0px) rotateZ(-1deg)}
    100% {transform: translate(0px, 0px) rotateZ(0deg)}
  }
`

export default TipArea
import React, { useState } from "react"
import styled from "styled-components"
import {
  LineShareButton,
  LineIcon,
  TwitterShareButton,
  TwitterIcon,
  XIcon,
} from 'react-share'
import { FaLink, FaCheck } from "react-icons/fa6"
import MisskeyLogo from '../images/misskey_logo.png'
import MastodonLogo from '../images/mastodon-icon-spacing.png'

const meta = require("../../gatsby-meta-config")

type Props = {
  title: string;
  articleUrl: string;
}

const ShareButtons: React.FC<Props> = ({ title, articleUrl }) => {
  const shareText = `${title} | ${meta.title}`;
  const encodedShareText = encodeURIComponent(shareText);
  const [isCopied, setIsCopied] = useState(false);
  const copyIconStyle: React.CSSProperties = {
    border: "solid 10px var(--color-gray-1)",
    height: "50px",
    width: "50px",
    backgroundColor: "var(--color-gray-1)",
    borderRadius: "25px",
    objectFit: "fill"
  }

  const handleClick = () => {
    global.navigator.clipboard.writeText(`${shareText}\n${articleUrl}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }

  return (
    <>
      <ShareText>シェアする？<wbr />（Misskey/Mastodon対応）</ShareText>
      <WarnText render={articleUrl.startsWith("http://localhost")}>【警告】<br /><br />開発環境（localhost）で共有しようとしているぞ！</WarnText>
      <SharebuttonsWrapper>
        <TwitterShareButton title={shareText} url={articleUrl}>
          <TwitterIcon size={50} round />
        </TwitterShareButton>
        <TwitterShareButton title={shareText} url={articleUrl}>
          <XIcon size={50} round />
        </TwitterShareButton>
        <a
          href={`https://misskey-hub.net/share/?text=${encodedShareText}&url=${articleUrl}&visibility=public&localOnly=0`}
          target="_blank"
          rel="noopener"
        >
          <img src={MisskeyLogo} alt="Misskey Logo" style={{ width: "50px", backgroundColor: "white", borderRadius: "25px" }} />
        </a>
        <a
          href={`https://donshare.net/share.html?text=${encodedShareText}&url=${articleUrl}`}
          target="_blank"
          rel="noopener"
        >
          <img src={MastodonLogo} alt="Mastodon Logo" style={{ width: "50px", backgroundColor: "#858AFA", borderRadius: "25px", objectFit: "fill" }} />
        </a>
        <LineShareButton title={shareText} url={articleUrl}>
          <LineIcon size={50} round />
        </LineShareButton>
        <CopyLinkButton onClick={handleClick}>
          {isCopied
            ? <FaCheck aria-label="Copy Link" color="var(--color-text)" style={copyIconStyle} />
            : <FaLink aria-label="Copy Link" color="var(--color-text)" style={copyIconStyle} />
          }
        </CopyLinkButton>
      </SharebuttonsWrapper >
    </>
  )
}

const ShareText = styled.p`
  font-size: 0.9em;
  background-color: var(--color-gray-3);
  text-align: center;
  padding: 20px 0px 5px 0px;
`

const SharebuttonsWrapper = styled.div`
  background-color: var(--color-gray-3);
  width: 100%;
  padding: 20px var(--padding-lg);
  margin: 0 auto;
  margin-bottom: var(--sizing-md);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  > a,
  > button {
    width: 70px;
    height: 50px;
    margin-bottom: 20px;
    text-align: center;
  }
`

const WarnText = styled.p<{ render: boolean }>`
  display: ${props => props.render ? "block" : "none"};
  font-size: 0.9em;
  background-color: var(--color-gray-3);
  text-align: center;
  padding: 20px 0px 5px 0px;
  color: var(--color-strong);
  font-weight: bold;
`

const CopyLinkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`

export default ShareButtons
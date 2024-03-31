import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { FaTags } from "react-icons/fa6";

const normalizeTagName = require("../../functions/normalizeTagName")

type TagName = {
  tagName: string;
  count?: number;
}

const TagButton: React.FC<TagName> = ({ tagName, count }) => {
  return (
    <Link to={`/tags/${normalizeTagName(tagName)}`}>
      <ButtonBase>
        <FaTags />
        {tagName}
        {count && ` (${count})`}
      </ButtonBase>
    </Link>
  )
}

const ButtonBase = styled.div`
  padding: 5px;
  background-color: var(--color-gray-3);
  display: flex;
  align-items: center;
  border-radius: 3px;
  gap: 5px;
`

export default TagButton
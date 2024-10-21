'use client'

import Link from "next/link";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 35px;
`

const LogoBox = styled.div`
  display: flex;
  gap: 10px;
`

const Logo = styled.div`
  font-size: 30px;
  font-weight: 600;
`

const LinkBox = styled.div`
  display: flex;
  gap: 10px;
`

const LinkButton = styled(Link)`
  font-size: 25px;
  text-decoration: none;
  color: #000;
  padding: 5px 15px;
  border: 1px solid #dedede;
  border-radius: 15px;
`

export default function Home() {
  return (
    <Box>
      <LogoBox>
        <Logo>STOCK HELPER</Logo>
      </LogoBox>
      <LinkBox>
        <LinkButton href='/save'>저장</LinkButton>
        <LinkButton href='/analyze'>분석</LinkButton>
      </LinkBox>
    </Box>
  );
}

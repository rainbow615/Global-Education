import styled from 'styled-components'
import { Layout, Menu } from 'antd'
import { Element } from 'react-scroll'

const { Header, Content, Footer } = Layout

export const Root = styled.div``

export const CustomHeader = styled(Header)`
  position: relative;
  background: ${(props) => props.theme.palette.white};
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 100%;
  }
`

export const CustomMenu = styled(Menu)`
  flex: 1;
  justify-content: flex-end;
  border-bottom: 0;

  .ant-menu-title-content {
    font-size: 1rem;
    font-weight: 500;
  }

  .login::after {
    border-bottom-color: ${(props) => props.theme.palette.textColor};
    border-bottom-width: 3px !important;
  }
`

export const CustomContent = styled(Content)`
  padding: 30px 10%;
`

export const TopBanner = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  button {
    min-width: 200px;
    font-size: 1.2rem;
    height: 50px;
  }
`

export const Section = styled(Element)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 100px;
`

export const LeftSection = styled.div`
  flex: 1;
  min-width: 350px;
  padding: 0 20px;
  margin-bottom: 50px;
`

export const RightSection = styled.div`
  flex: 1;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  padding: 0 20px;

  img {
    max-width: 90%;
  }
`

export const Title = styled.div`
  font-size: 3rem;
  font-weight: bold;
`

export const SubTitle = styled.div`
  font-size: 1rem;
`

export const Description = styled.p`
  font-size: 1.7rem;
  font-weight: 500;
  margin-top: 40px;
  margin-bottom: 40px;
`

export const DetailedText = styled.p`
  font-size: 1.5rem;
  color: grey;
  margin-top: 40px;
  margin-bottom: 40px;
`

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;

  button {
    font-size: 1.2rem;
    height: 50px;
    margin-right: 20px;
    margin-bottom: 10px;
    min-width: 120px;
  }
`

export const LinkButton = styled.div`
  font-size: 1.3rem;
  border-bottom: 2px solid ${(props) => props.theme.palette.primary};
  color: ${(props) => props.theme.palette.primary};
  margin-right: 20px;
  margin-bottom: 10px;
  line-height: 2;
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    border-bottom-color: transparent;
    opacity: 0.8;
  }
`

export const ContackSection = styled(Section)`
  margin-top: 20px;
`

export const ContactSectionArea = styled(LeftSection)`
  img {
    max-width: 100%;
  }

  .organization,
  .role {
    display: inline-block;
    width: calc(50% - 10px);
    margin: 0;
  }

  .role {
    margin-left: 20px;
  }
`

export const CustomFooter = styled(Footer)`
  position: relative;
  background: ${(props) => props.theme.palette.white};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 30px 10%;

  a {
    font-size: 1.5rem;
    border-bottom: 2px solid ${(props) => props.theme.palette.primary};
    line-height: 2;
  }
`

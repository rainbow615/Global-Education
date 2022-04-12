import styled from 'styled-components'
import { Col, Layout, Row } from 'antd'
import { Element } from 'react-scroll'
import { css } from 'styled-components'

const { Content, Footer } = Layout

export const CustomRow = styled(Row)({
  marginTop: '2rem',
})

export const CustomCol = styled(Col)({
  maxWidth: '12rem',
  alignItems: 'flex-start',
})

export const CenteredContent = css`
  padding: 0 5%;
  margin: 1rem auto 0;
  max-width: 65rem;
`

export const Root = styled.div`
  .store-icon {
    width: 100%;
    max-width: 200px;
  }
`

export const CustomContent = styled(Content)(CenteredContent)

export const TopBanner = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  row-gap: 4rem;
  column-gap: 5%;

  button {
    padding: 0.5rem 3rem;
    border-radius: 3rem;
    background: ${({ theme }) => theme.palette.blueGrey[900]};
    border: none;
    font-size: 1.2rem;
    height: 50px;
  }

  @media (hover: hover) {
    button:hover {
      background: ${({ theme }) => theme.palette.blueGrey[600]};
    }
  }

  @media screen and (min-width: 40rem) {
    flex-direction: row;
  }
`

export const Section = styled(Element)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 7.5rem;
  flex-direction: column;
  row-gap: 4rem;
  column-gap: 5%;

  @media screen and (min-width: 40rem) {
    flex-direction: row;
  }
`

export const LeftSection = styled.div`
  flex: 1;
  min-width: 45%;
`

export const RightSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  img {
    max-width: 100%;
  }
`

export const Title = styled.h1(({ theme, as }) => ({
  fontSize: '2.369rem',
  fontFamily: 'InterBlack',
  lineHeight: 1.15,
  color: theme.palette.blueGrey[900],
  ...(as === 'h2' && {
    fontSize: '1.539rem',
  }),
}))

export const SubTitle = styled.div`
  font-size: 0.812rem;
  font-family: 'InterMedium';
  text-transform: uppercase;
  /* background: ${(props) => props.theme.palette.blueGrey[200]}; */
  color: ${(props) => props.theme.palette.blueGrey[800]};
  margin-bottom: 0.5rem;
  letter-spacing: 0.25ch;
  border-radius: 0.5rem;
`

export const Img = styled.img({
  width: '15rem',
  background: 'red',
})

export const Description = styled.p`
  font-size: 1.539rem;
  font-family: 'InterMedium';
  line-height: 1.25;
  color: ${(props) => props.theme.palette.blueGrey[900]};
`

export const DetailedText = styled.p`
  font-size: 1.25rem;
  margin-top: 1rem;
  line-height: 1.5;
  font-family: 'InterMedium';
  color: ${(props) => props.theme.palette.blueGrey[700]};
`

export const Buttons = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  color: #00eeb3;
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'flex-start')};
  margin-top: 2rem;

  button {
    font-size: 1rem;
    height: 50px;
    margin: 10px 0;
    min-width: 120px;
  }
`

export const LinkButton = styled.div`
  font-size: 1rem;
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

export const CheckList = styled.ul({
  all: 'unset',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  gap: '0.75rem',
})

export const CheckListItem = styled.li(({ theme }) => ({
  all: 'unset',
  display: 'flex',
  fontFamily: 'InterMedium',
  color: theme.palette.blueGrey[700],
  fontSize: '1.25rem',
  gap: '0.5rem',
  alignItems: 'flex-start',
  lineHeight: 1.125,
  svg: {
    width: 24,
    height: 24,
    minWidth: 24,
    minHeight: 24,
    maxWidth: 24,
    maxHeight: 24,
  },
}))

export const ContactSection = styled.div({
  margin: '2rem 0 4rem',
  maxWidth: '30rem',
})

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
  ${CenteredContent}
  padding-bottom: 2rem;

  a {
    font-size: 1rem;
    border-bottom: 2px solid ${(props) => props.theme.palette.primary};
    line-height: 2;
  }
`

export const ContactSuccessMessage = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .ant-space {
    max-width: 450px;
  }

  * {
    text-align: center;
  }
`

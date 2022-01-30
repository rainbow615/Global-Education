import React, { useEffect } from 'react'
import { Link, scroller } from 'react-scroll'
import { useSearchParams } from 'react-router-dom'

import TopHeader from '../../components/TopHeader'
import { getQueryParams } from '../../utils'

const menus = [
  {
    key: 'app',
    item: (
      <Link to="app" spy={true} smooth={true} duration={500}>
        Mobile Apps
      </Link>
    ),
  },
  {
    key: 'book',
    item: (
      <Link to="book" spy={true} smooth={true} duration={500}>
        Books
      </Link>
    ),
  },
]

const HomeHeader = () => {
  const urlParam = getQueryParams()
  const [, setSearchParams] = useSearchParams()

  const onScrollTo = (to) => {
    scroller.scrollTo(to, {
      duration: 500,
      delay: 0,
      spy: true,
      smooth: true,
    })
  }

  useEffect(() => {
    if (urlParam?.section === 'app' || urlParam?.section === 'book') {
      onScrollTo(urlParam?.section)
      setSearchParams({})
    }
  }, [urlParam, setSearchParams])

  return <TopHeader menus={menus} />
}

export default HomeHeader

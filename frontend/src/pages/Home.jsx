import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopSalons from '../components/TopSalons'
import TopParlours from '../components/TopParlours'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopSalons />
      <TopParlours />
      <Banner />
    </div>
  )
}

export default Home
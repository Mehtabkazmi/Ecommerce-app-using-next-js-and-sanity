import React from 'react'
import { FooterBanner, HeroBanner, Product } from '../components';
import { client } from '../lib/client'

const Home = ({ products, bannerData }) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>
      <div className='products-heading'>
        <h2>Our best Products</h2>
        <p>Mobile There are many variations passages</p>
      </div>
      <div className='products-container'>
        {products?.map((item) => <Product key={item._id} product={item}/>)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type=="product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type=="banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props:{products,bannerData}
  }
}

export default Home
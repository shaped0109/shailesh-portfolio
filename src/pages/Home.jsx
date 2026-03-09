import HeroSection from '../components/HeroSection'
import StatStrip from '../components/StatStrip'
import ProofOfWorkSection from '../components/ProofOfWorkSection'

/**
 * Home page — hero section + stats strip + proof of work cards.
 */
const Home = () => {
  return (
    <>
      <HeroSection />
      <ProofOfWorkSection />
      <StatStrip />
    </>
  )
}

export default Home

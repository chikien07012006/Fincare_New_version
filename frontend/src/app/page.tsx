import Image from "next/image";
import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import UseCases from "../components/UseCases";
import CoreFeatures from "../components/CoreFeatures";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";
import ReviewsMarquee from "../components/ReviewsMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <UseCases />
      <CoreFeatures />
      <HowItWorks />
      <ReviewsMarquee />
      <FAQ />
      <CTABanner />
      <Footer />
    </>
  );
}
  
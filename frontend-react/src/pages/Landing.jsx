import React from 'react'
import HeroSection from '../components/landing/HeroSection'
import HowItWorks from '../components/landing/HowItWorks'
import MoneyGuarantee from '../components/landing/MoneyGuarantee'
import SeePlansCTA from '../components/landing/SeePlansCTA'
import ContactUsCTA from '../components/landing/ContactUsCTA'
import CustomerReviews from '../components/landing/CustomerReviews'
import { useSearchParams } from 'react-router-dom'
import AuthNotification from '../components/auth/AuthNotification'

function Landing() {
  const [searchParams, setSearchParams] = useSearchParams()

  const message = searchParams.get('message')
  const messageType = searchParams.get('type') || 'success'

  return (
    <>
      <HeroSection />
      <HowItWorks />
      <SeePlansCTA />
      <MoneyGuarantee />
      <CustomerReviews />
      <ContactUsCTA />
      {
        message
          ? <AuthNotification message={message} type={messageType} setSearchParams={setSearchParams} />
          : null
      }
    </>
  )
}

export default Landing
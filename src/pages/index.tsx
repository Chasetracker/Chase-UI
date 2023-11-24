import Image from 'next/image'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Assuming you want to handle the redirect on component mount
    router.push('/auth');
  }, []); //

  return (
    <>
    </>
  )
}

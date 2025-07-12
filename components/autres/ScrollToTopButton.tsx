"use client"
import { useEffect, useState } from "react"
import { IconChevronUp } from "@tabler/icons-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="group fixed bottom-5 lg:w-fit flex justify-center p-3 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-400 hover:bg-indigo-600/80 shadow-2xl right-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
        >
          <IconChevronUp className="animate-bounce" />
        </button>
      )}
    </>
  )
}

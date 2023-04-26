import { useEffect, useRef, useState } from 'react'

const LazyImage = (props: any) => {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  let callback = (entries: any[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setInView(true)
      }
    })
  }

  useEffect(() => {
    let observer = new IntersectionObserver(callback)

    if (ref?.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return inView ? (
    <img {...props} />
  ) : (
    <img ref={ref} width={176} height={176} className='bg-gray-300' />
  )
}
export default LazyImage

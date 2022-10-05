import { useState, useLayoutEffect } from 'react'

export default function () {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    const handleChangeResize = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
        if (window.innerWidth < 768) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useLayoutEffect(() => {
        if (!width || !height) {
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }
        window?.addEventListener('resize', handleChangeResize)
        return () => window.removeEventListener('resize', handleChangeResize)
    }, [])

    return { width, height, isMobile }
}

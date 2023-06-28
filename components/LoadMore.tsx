'use client'

import {useRouter} from 'next/navigation'
import Button from './Button'

type Props = {
  startCursor: string
  endCursor: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}

const LoadMore = ({startCursor, endCursor, hasPreviousPage, hasNextPage}: Props) => {
  const router = useRouter()
  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(location.search)
    if (direction === 'next' && hasNextPage) {
      currentParams.delete('startCursor')
      currentParams.set('endCursor', endCursor)
    } else if (direction === 'prev' && hasPreviousPage) {
      currentParams.delete('endCursor')
      currentParams.set('startCursor', startCursor)
    }
    const newSearchParams = currentParams.toString()
    const newPathname = `${location.pathname}?${newSearchParams}`

    router.push(newPathname)
  }
  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && <Button label="Previous" handleClick={() => handleNavigation('prev')} />}
      {hasNextPage && <Button label="Next" handleClick={() => handleNavigation('next')} />}
    </div>
  )
}

export default LoadMore

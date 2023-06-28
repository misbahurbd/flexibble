import {ProjectInterface} from '@/common.types'
import Categories from '@/components/Categories'
import LoadMore from '@/components/LoadMore'
import ProjectCard from '@/components/ProjectCard'
import {fetchAllProject} from '@/lib/actions'
import React from 'react'

type ProjectSearch = {
  projectSearch: {
    edges: {node: ProjectInterface}[]
    pageInfo: {
      hasPreviousPage: boolean
      hasNextPage: boolean
      startCursor: string
      endCursor: string
    }
  }
}

type SearchParams = {
  category?: string
  endCursor?: string
}
type Props = {
  searchParams: SearchParams
}

const Home = async ({searchParams: {category, endCursor}}: Props) => {
  const data = (await fetchAllProject(category, endCursor)) as ProjectSearch
  const projectsToDisplay = data?.projectSearch?.edges || []

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories
        <p className="no-result-text text-center">No project found!</p>
      </section>
    )
  }

  const pagination = data?.projectSearch?.pageInfo
  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />

      <section className="projects-grid">
        {projectsToDisplay.map(({node}: {node: ProjectInterface}) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
      </section>

      <LoadMore
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasNextPage={pagination.hasNextPage}
        hasPreviousPage={pagination.hasPreviousPage}
      />
    </section>
  )
}

export default Home

'use client'

import {ProjectInterface, SessionInterface} from '@/common.types'
import Image from 'next/image'
import {ChangeEvent, useState} from 'react'
import FormField from './FormField'
import {categoryFilters} from '@/constant'
import CustomMenu from './CustomMenu'
import Button from './Button'
import {createNewProject, fetchToken, updateProject} from '@/lib/actions'
import {useRouter} from 'next/navigation'

type Props = {
  type: string
  session: SessionInterface
  project?: ProjectInterface
}

const ProjectForm = ({type, session, project}: Props) => {
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    liveSiteUrl: project?.liveSiteUrl || '',
    githubUrl: project?.githubUrl || '',
    category: project?.category || '',
  })

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const {token} = await fetchToken()

    try {
      if (type === 'create') {
        await createNewProject(form, session?.user?.id, token)
        router.push('/')
      }
      if (type === 'edit') {
        await updateProject(form, project?.id as string, token)
        router.push(`/project/${project?.id}`)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.includes('image')) {
      return alert('Please upload an image file!')
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      handleStateChange('image', result)
    }
  }
  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({...prevState, [fieldName]: value}))
  }

  return (
    <form className="flexStart form" onSubmit={handleFormSubmit}>
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form?.image && 'Choose a poster for your project'}
        </label>
        <input id="image" type="file" accept="image/*" required={type === 'create'} className="form_image-input" onChange={handleChangeImage} />
        {form?.image && <Image src={form?.image} className="sm:p-10 object-contain z-20" alt="Project Poster" fill />}
      </div>
      <FormField label="Title" state={form?.title} placeholder="Project Title" setState={(value) => handleStateChange('title', value)} />
      <FormField
        label="Description"
        state={form?.description}
        placeholder="Project description"
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type="url"
        label="Website URL"
        state={form?.liveSiteUrl}
        placeholder="https://misbahurbd.com"
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        type="url"
        label="Github Project URL"
        state={form?.githubUrl}
        placeholder="https://github.com/project-url"
        setState={(value) => handleStateChange('githubUrl', value)}
      />
      <CustomMenu label="Category" state={form?.category} filter={categoryFilters} setState={(value) => handleStateChange('category', value)} />
      <div className="flexStart w-full">
        <Button
          label={isSubmitting ? `${type === 'create' ? 'Creating...' : 'Editing...'}` : `${type === 'create' ? 'Create' : 'Edit'}`}
          type="submit"
          leftIcon={isSubmitting ? '' : '/plus.svg'}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  )
}

export default ProjectForm

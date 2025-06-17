import SearchPosts from '@/components/layouts/containers/SearchPosts'
import GeneralSection from '@/components/layouts/sections/GeneralSection'
import PageTitle from '@/components/ui/common/typography/PageTitle'

export default function SearchPage() {
  return (
    <GeneralSection>
      <PageTitle>Search Blog</PageTitle>
      <SearchPosts />
    </GeneralSection>
  )
}

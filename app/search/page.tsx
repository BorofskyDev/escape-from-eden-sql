import SearchPosts from '@/components/layouts/containers/SearchPosts'
import { GeneralSection } from '@/components/layouts'
import PageTitle from '@/components/ui/common/typography/PageTitle'

export default function SearchPage() {
  return (
    <GeneralSection id='search'>
      <PageTitle>Search Blog</PageTitle>
      <SearchPosts />
    </GeneralSection>
  )
}

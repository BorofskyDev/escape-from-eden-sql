import { Page } from '@/components/layouts'
import { Heading } from '@/components/ui/common'
import { PostForm } from '@/components/ui/forms'
import type { PostFormData } from '@/lib/hooks/usePostForm'

export function EditPostPage({ initialData }: { initialData: PostFormData }) {
  return (
    <Page>
      <Heading as='h1' size='page'>
        Edit Post
      </Heading>
      <PostForm mode='edit' initialData={initialData} />
    </Page>
  )
}

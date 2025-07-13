import { Page } from '@/components/layouts'
import { Heading } from '@/components/ui/common'
import { PostForm } from '@/components/ui/forms'
import styles from './CreatePostPage.module.scss'

export function CreatePostPage() {
  return (
    <Page className={styles.createPostPage}>
      <Heading as='h1' size='page'>
        Create Post
      </Heading>
      <PostForm
              mode='create'
            />
    </Page>
  )
}

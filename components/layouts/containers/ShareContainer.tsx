// components/layouts/containers/ShareContainer.tsx
import ShareContainerClient from './ShareContainerClient'

export default function ShareContainer(props: {
  url: string
  title: string
  description: string
}) {
  return <ShareContainerClient {...props} />
}

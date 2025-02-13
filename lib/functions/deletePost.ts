// lib/functions/deletePost.ts
export async function deletePost(postId: string) {
  const res = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.error || 'Failed to delete post')
  }

  return res.json()
}

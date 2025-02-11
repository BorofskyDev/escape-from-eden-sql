// lib/functions/updatePost.ts
export async function updatePost(postId: string, data: Record<string, unknown>) {
  const res = await fetch(`/api/posts/${postId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error(`Failed to update post: ${res.statusText}`)
  }
  return await res.json()
}

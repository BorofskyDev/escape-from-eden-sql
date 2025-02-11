// lib/hooks/functions/uploadImage.ts
import axios from 'axios'

/**
 * Uploads an image file to Cloudinary and returns the secure URL.
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  )

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`

  const response = await axios.post(url, formData)
  return response.data.secure_url
}

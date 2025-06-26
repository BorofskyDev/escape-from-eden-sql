import { Category } from '@prisma/client'

export type CategoryMeta = Pick<Category, 'id' | 'name' | 'description'>

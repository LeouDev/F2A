import { images, type ImageAsset } from './images'

/**
 * Customer handovers / releases.
 * ⚠️ Placeholders only — never invent customer names or stories. Replace with real releases
 * (photos and names used with the customer's permission) and delete these entries.
 */
export type CustomerStory = {
  id: string
  customer: string
  vehicle: string
  photo: ImageAsset
  story: string
  date?: string
  placeholder?: boolean
}

export const customerStories: CustomerStory[] = [
  {
    id: 'placeholder-1',
    customer: 'Customer name',
    vehicle: 'Vehicle',
    photo: images.stories.keyAndCar,
    story: 'Customer story placeholder — a real F2A release will appear here.',
    placeholder: true,
  },
  {
    id: 'placeholder-2',
    customer: 'Customer name',
    vehicle: 'Vehicle',
    photo: images.stories.keys,
    story: 'Customer story placeholder — a real F2A release will appear here.',
    placeholder: true,
  },
  {
    id: 'placeholder-3',
    customer: 'Customer name',
    vehicle: 'Vehicle',
    photo: images.stories.keyInHand,
    story: 'Customer story placeholder — a real F2A release will appear here.',
    placeholder: true,
  },
]

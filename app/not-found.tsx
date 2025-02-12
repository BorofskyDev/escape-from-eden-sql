// app/not-found.tsx

import Link from "next/link";

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-4 bg-bg2'>
      <h1 className='text-5xl font-bold mb-4 text-center'>
        Not All Who Wander Are Lost
      </h1>
      <p className='text-lg text-text1 mb-8 text-center max-w-2xl'>
        But on the internet, it is easy to get lost. Somehow, you found your way
        to a broken link. Feel free to go to the home page to look through the
        most recent blog entries, and maybe you will find your way to what you
        need.
      </p>
      <Link
        href='/'
        className='px-6 py-3 bg-primary text-bg1 rounded hover:bg-secondary transition-colors'
      >
        Go to Home
      </Link>
    </div>
  )
}

import GeneralSection from '@/components/layouts/sections/GeneralSection'
import PageTitle from '@/components/typography/PageTitle'
export default function TipCancel() {
  return (
    <GeneralSection>
      <PageTitle className='text-2xl font-bold'>Tip Cancelled</PageTitle>
      <p>You have cancelled your tip. Feel free to try again anytime.</p>
    </GeneralSection>
  )
}

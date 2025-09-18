import React from 'react'

export default function SectionTitle({title, subtitle}:{title: string, subtitle: string}) {
  return (
    <>
    <h3 className='font-semibold text-main relative ms-8 mb-6 shape'>{title}</h3>
    <p className='text-4xl font-semibold mb-8'>{subtitle}</p>
    </>
  )
}

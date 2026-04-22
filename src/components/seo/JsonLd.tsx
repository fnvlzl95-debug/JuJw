import React from 'react'

export default function JsonLd({
  id,
  data,
}: {
  id?: string
  data: Record<string, unknown> | Array<Record<string, unknown>>
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

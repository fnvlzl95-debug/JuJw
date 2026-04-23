/* eslint-disable @next/next/no-img-element */

import { cn } from '@/lib/utils'

type ShowcaseImageProps = {
  src: string
  alt: string
  mobileSrc?: string
  className?: string
  overlayClassName?: string
  imageClassName?: string
  fit?: 'contain' | 'cover'
  loading?: 'eager' | 'lazy'
}

export default function ShowcaseImage({
  src,
  alt,
  mobileSrc,
  className,
  overlayClassName,
  imageClassName,
  fit = 'cover',
  loading = 'lazy',
}: ShowcaseImageProps) {
  const objectFitClass = fit === 'cover' ? 'object-cover' : 'object-contain'

  return (
    <div className={cn('relative overflow-hidden bg-[#e8ddd2]', className)}>
      <picture className="block h-full w-full">
        {mobileSrc ? <source media="(max-width: 767px)" srcSet={mobileSrc} /> : null}
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className={cn('h-full w-full', objectFitClass, imageClassName)}
        />
      </picture>
      {overlayClassName ? <div className={cn('absolute inset-0', overlayClassName)} /> : null}
    </div>
  )
}

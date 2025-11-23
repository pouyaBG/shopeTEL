import React from 'react';

export interface BannerContent {
  id: string;
  type: 'image' | 'video' | 'text';
  content: string;
  title?: string;
  description?: string;
  link?: string;
  backgroundColor?: string;
}

interface BannerProps {
  banner: BannerContent;
  className?: string;
}

export const Banner: React.FC<BannerProps> = ({ banner, className = '' }) => {
  const handleClick = () => {
    if (banner.link) {
      window.open(banner.link, '_blank');
    }
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${banner.link ? 'cursor-pointer' : ''} ${className}`}
      onClick={handleClick}
      style={{
        backgroundColor: banner.backgroundColor || '#f3f4f6',
      }}
    >
      {banner.type === 'image' && (
        <div className="relative w-full h-40 md:h-48">
          <img
            src={banner.content}
            alt={banner.title || 'Banner'}
            className="w-full h-full object-cover"
          />
          {(banner.title || banner.description) && (
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
              {banner.title && (
                <h3 className="text-white text-lg font-bold mb-1 m-0">{banner.title}</h3>
              )}
              {banner.description && (
                <p className="text-white/90 text-sm line-clamp-2 m-0">{banner.description}</p>
              )}
            </div>
          )}
        </div>
      )}

      {banner.type === 'video' && (
        <div className="relative w-full h-40 md:h-48">
          <video
            src={banner.content}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {(banner.title || banner.description) && (
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
              {banner.title && (
                <h3 className="text-white text-lg font-bold mb-1 m-0">{banner.title}</h3>
              )}
              {banner.description && (
                <p className="text-white/90 text-sm line-clamp-2 m-0">{banner.description}</p>
              )}
            </div>
          )}
        </div>
      )}

      {banner.type === 'text' && (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-40">
          {banner.title && (
            <h3 className="text-2xl font-bold text-gray-800 mb-2 m-0">{banner.title}</h3>
          )}
          {banner.description && (
            <p className="text-gray-600 text-base m-0">{banner.description}</p>
          )}
          {banner.content && banner.content !== banner.description && (
            <div className="mt-4 text-lg font-semibold text-primary-start">{banner.content}</div>
          )}
        </div>
      )}
    </div>
  );
};

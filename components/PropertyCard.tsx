import React from 'react';

export interface PropertyCardProps {
  id?: string;
  title: string;
  price: number;
  currency?: string;
  beds: number;
  baths: number;
  sqft: number;
  imageUrl: string;
  address?: string;
  city?: string;
  featured?: boolean;
  onCtaClick?: () => void;
  ctaText?: string;
  className?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  price,
  currency = '$',
  beds,
  baths,
  sqft,
  imageUrl,
  address,
  city,
  featured = false,
  onCtaClick,
  ctaText = 'View Details',
  className = '',
}) => {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <div
      id={id}
      className={`group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        featured ? 'ring-2 ring-amber-500' : ''
      } ${className}`}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
          <span className="text-lg font-bold">{currency}{formatPrice(price)}</span>
        </div>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">
          {title}
        </h3>

        {(address || city) && (
          <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {[address, city].filter(Boolean).join(', ')}
          </p>
        )}

        {/* Property Stats */}
        <div className="flex items-center justify-between py-4 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800">{beds}</p>
              <p className="text-xs text-slate-500">Beds</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800">{baths}</p>
              <p className="text-xs text-slate-500">Baths</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800">{sqft.toLocaleString()}</p>
              <p className="text-xs text-slate-500">Sq Ft</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onCtaClick}
          className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          {ctaText}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;

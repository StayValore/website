type FeatureIconVariant =
  | 'star'
  | 'feed'
  | 'map'
  | 'bookmark'
  | 'users'
  | 'ranking';

type FeatureIconProps = {
  readonly variant: FeatureIconVariant;
};

function renderIconPath(variant: FeatureIconVariant) {
  switch (variant) {
    case 'star':
      return (
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'feed':
      return (
        <>
          <path
            d="M4 11a9 9 0 0 1 9 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 4a16 16 0 0 1 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="5" cy="19" r="1.5" fill="currentColor" />
        </>
      );
    case 'map':
      return (
        <path
          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'bookmark':
      return (
        <path
          d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'users':
      return (
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    case 'ranking':
      return (
        <path
          d="M12 20V10 M18 20V4 M6 20v-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
  }
}

export function FeatureIcon({ variant }: FeatureIconProps) {
  return (
    <div className="feature-icon">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        {renderIconPath(variant)}
      </svg>
    </div>
  );
}

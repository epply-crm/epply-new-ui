interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  desc?: string;
  src?: string;
  alt?: string;
}

const randomColorGenerator = () => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Avatar: React.FC<AvatarProps> = ({ size = 'md', src, alt, desc }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };
  return (
    <div className={`overflow-hidden rounded-full ${sizeClasses[size]}`}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div
          className={
            randomColorGenerator() + ' flex h-full w-full items-center justify-center'
          }
        >
          <span className="flex h-full w-full items-center justify-center font-bold text-white">
            {alt
              ?.split(' ')
              .map((word) => word[0])
              .join('')
              .toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};
export default Avatar;

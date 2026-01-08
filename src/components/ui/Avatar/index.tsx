import { ComponentProps } from '@/core/types/component';

interface AvatarProps extends ComponentProps {
  desc?: string;
  src?: string;
  name?: string;
  alt?: string;
}

const randomColorGenerator = () => {
  const colors = [
    'bg-red-900',
    'bg-blue-900',
    'bg-green-900',
    'bg-yellow-900',
    'bg-purple-900',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Avatar: React.FC<AvatarProps> = ({ size = 'medium', src, alt, name, desc }) => {
  const sizeClasses = {
    small: 'h-8 w-8 text-[13px]',
    medium: 'h-12 w-12 text-[15px]',
    large: 'h-16 w-16 text-[17px]',
  };

  return (
    <div className="flex items-center">
      <div
        className={`${sizeClasses[size].split(' ')[0]} ${sizeClasses[size].split(' ')[1]} overflow-hidden rounded-full`}
      >
        {src ? (
          <img src={src} alt={alt || 'Avatar'} className="h-full w-full object-cover" />
        ) : name ? (
          <div
            className={`flex h-full w-full items-center justify-center ${randomColorGenerator()} text-white`}
          >
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()}
          </div>
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center ${randomColorGenerator()} text-white`}
          >
            {alt
              ? alt
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
              : '?'}
          </div>
        )}
      </div>
      <div className={`${sizeClasses[size].split(' ')[2]} ml-3 flex flex-col`}>
        {name && <div className="font-semibold text-gray-800">{name}</div>}
        {desc && <div className="text-gray-500">{desc}</div>}
      </div>
    </div>
  );
};
export default Avatar;

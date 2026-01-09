interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small';
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'black'
    | 'white'
    | 'gray';
  children?: React.ReactNode;
  weight?: 'light' | 'normal' | 'medium' | 'bold' | 'semibold';
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'p',
  color = 'black',
  weight = 'normal',
  children,
  className,
}) => {
  const textSize = variantToTextSizeConvertor(variant);
  const Tag = variant;
  return (
    <Tag className={`text-${color} font-${weight} ${textSize} ${className}`}>
      {children}
    </Tag>
  );
};

const variantToTextSizeConvertor = (variant: string) => {
  switch (variant) {
    case 'h1':
      return 'text-4xl';
    case 'h2':
      return 'text-3xl';
    case 'h3':
      return 'text-2xl';
    case 'h4':
      return 'text-xl';
    case 'h5':
      return 'text-lg';
    case 'h6':
      return 'text-base';
    case 'p':
      return 'text-base';
    case 'small':
      return 'text-small';
    default:
      return 'text-small';
  }
};

export default Typography;

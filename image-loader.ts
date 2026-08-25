interface HusnImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function husnImageLoader({
  src,
}: HusnImageLoaderProps): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${src}`;
}

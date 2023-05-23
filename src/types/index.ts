export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  classes?: string;
}

export interface ImageProps {
  size: number[];
  src: string;
}

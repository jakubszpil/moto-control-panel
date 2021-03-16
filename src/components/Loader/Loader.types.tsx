import { ReactNode } from "react";
import { SpinnerProps } from "react-bootstrap";

export interface LoaderProps extends SpinnerProps {
  children?: ReactNode;
  message: string;
}

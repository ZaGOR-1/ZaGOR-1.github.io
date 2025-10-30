import { LazyMotion, domAnimation } from 'framer-motion';

const MotionConfig = ({ children }) => {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
};

export default MotionConfig;

/* eslint-disable react/prop-types */

import { motion } from "framer-motion";

const BouncingImage = ({
  children,
  animationType = "bouncey",
  duration = 5,
  repeat = Infinity,
  easing = "easeInOut",
  className = "",
}) => {
  const animations = {
    bouncex: { x: [-10, 10, -10] },
    bouncey: { y: [0, -20, 0] },
    rotate: { rotate: [0, 360] },
  };

  return (
    <motion.div
      className={` ${className}`}
      animate={animations[animationType] || animations.bouncey}
      transition={{
        duration,
        repeat,
        repeatType: "loop",
        ease: easing,
      }}
    >
      {children}
    </motion.div>
  );
};

export default BouncingImage;

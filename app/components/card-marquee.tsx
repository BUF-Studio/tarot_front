import styles from "@/app/landing.module.scss";
import Image from "next/image";
import Marquee from "react-fast-marquee";

import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

export default function PictureMarquee() {

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const inertia = 2;

  useEffect(() => {
    const handleMouseMove = (e: MousePosition) => {
      setMousePos({ x: e.x / inertia, y: e.y / inertia });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Marquee>
      {picturePathData.map((path, index) => (
        <PictureCard key={index} path={path} mousePos={mousePos} />
      ))}
    </Marquee>
  );
}

const picturePathData = [
  "/balance.png",
  "/candle.png",
  "/eye.png",
  "/hand.png",
  "/hour.png",
  "/logo.png",
  "/moon.png",
  "/snake.png",
  "/sun.png",
  "/sword.png",
  "/tree.png",
  "/wine.png",
];

type MousePosition = {
  x: number;
  y: number;
};

interface PictureCardProps {
  path: string;
  mousePos: MousePosition;
}

const PictureCard: React.FC<PictureCardProps> = ({ path, mousePos }) => {
  const calcTransform = (x: number, y: number): [number, number] => [
    (x / window.innerWidth - 0.5) * 30,
    (y / window.innerHeight - 0.5) * 30,
  ];

  const springProps = useSpring({
    transform: `perspective(300px) rotateX(${
      calcTransform(mousePos.x, mousePos.y)[1]
    }deg) rotateY(${calcTransform(mousePos.x, mousePos.y)[0]}deg)`,
    config: { mass: 5, tension: 350, friction: 40 },
  });

  return (
    <div className={styles.pictureCard}>
      <animated.div style={springProps}>
        <Image
          src={path}
          alt={path}
          width={window.innerHeight * 0.3}
          height={window.innerHeight * 0.3}
        />
      </animated.div>
    </div>
  );
};

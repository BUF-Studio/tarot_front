"use client";

import styles from "@/app/landing.module.scss";
import Marquee from "react-fast-marquee";
import Image, { StaticImageData } from "next/image";
import BalanceImg from "@/public/balance.png";
import CandleImg from "@/public/candle.png";
import EyeImg from "@/public/eye.png";
import HandImg from "@/public/hand.png";
import HourImg from "@/public/hour.png";
import LogoImg from "@/public/logo.png";
import MoonImg from "@/public/moon.png";
import SnakeImg from "@/public/snake.png";
import SunImg from "@/public/sun.png";
import SwordImg from "@/public/sword.png";
import TreeImg from "@/public/tree.png";
import WineImg from "@/public/wine.png";

import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

const pictureData = [
  { src: BalanceImg, alt: "balance" },
  { src: CandleImg, alt: "candle" },
  { src: EyeImg, alt: "eye" },
  { src: HandImg, alt: "hand" },
  { src: HourImg, alt: "hour" },
  { src: LogoImg, alt: "logo" },
  { src: MoonImg, alt: "moon" },
  { src: SnakeImg, alt: "snake" },
  { src: SunImg, alt: "sun" },
  { src: SwordImg, alt: "sword" },
  { src: TreeImg, alt: "tree" },
  { src: WineImg, alt: "wine" },
];

type MousePosition = {
  x: number;
  y: number;
};

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
      {pictureData.map((data, index) => (
        <PictureCard
          key={index}
          src={data.src}
          alt={data.alt}
          mousePos={mousePos}
        />
      ))}
    </Marquee>
  );
}

interface PictureCardProps {
  src: StaticImageData;
  alt: string;
  mousePos: MousePosition;
}

const PictureCard: React.FC<PictureCardProps> = ({ src, alt, mousePos }) => {
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
        <Image src={src} alt={alt} height={240} />
      </animated.div>
    </div>
  );
};
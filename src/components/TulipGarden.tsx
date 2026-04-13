import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalAudio } from "../hooks/useGlobalAudio";

const Tulip = ({
  x,
  color,
  stemHeight,
  delay,
  scale = 1,
}: {
  x: number;
  color: string;
  stemHeight: number;
  delay: number;
  scale?: number;
}) => {
  const petalColors: Record<string, { main: string; dark: string; light: string }> = {
    red: { main: "#c0392b", dark: "#962d22", light: "#e74c3c" },
    pink: { main: "#e84393", dark: "#b8336e", light: "#fd79a8" },
    yellow: { main: "#f1c40f", dark: "#d4ac0d", light: "#f9e854" },
    orange: { main: "#e67e22", dark: "#bf6516", light: "#f0a04b" },
    purple: { main: "#8e44ad", dark: "#6c3483", light: "#a569bd" },
    white: { main: "#ecf0f1", dark: "#bdc3c7", light: "#fdfefe" },
  };

  const c = petalColors[color] || petalColors.red;
  const stemBase = 500;
  const tulipTop = stemBase - stemHeight;

  return (
    <motion.g
      style={{ originX: `${x}px`, originY: `${stemBase}px` }}
      animate={{ rotate: [0, 1.5, -1.5, 0.8, -0.5, 0] }}
      transition={{
        duration: 5 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      transform={`translate(0, 0)`}
    >
      {/* Stem */}
      <path
        d={`M${x} ${stemBase} Q${x + 3} ${tulipTop + 60} ${x} ${tulipTop + 30}`}
        stroke="#4a7c4e"
        strokeWidth={3.5 * scale}
        fill="none"
        strokeLinecap="round"
      />

      {/* Left leaf */}
      <path
        d={`M${x} ${stemBase - stemHeight * 0.35} Q${x - 28 * scale} ${stemBase - stemHeight * 0.5} ${x - 18 * scale} ${stemBase - stemHeight * 0.65}`}
        fill="#3d7a42"
        opacity={0.85}
      />
      <path
        d={`M${x} ${stemBase - stemHeight * 0.35} Q${x - 20 * scale} ${stemBase - stemHeight * 0.45} ${x - 18 * scale} ${stemBase - stemHeight * 0.65}`}
        fill="#6bba72"
        opacity={0.35}
      />

      {/* Right leaf */}
      <path
        d={`M${x} ${stemBase - stemHeight * 0.55} Q${x + 22 * scale} ${stemBase - stemHeight * 0.65} ${x + 14 * scale} ${stemBase - stemHeight * 0.78}`}
        fill="#3d7a42"
        opacity={0.8}
      />

      {/* Tulip head group */}
      <g transform={`translate(${x}, ${tulipTop + 25})`}>
        {/* Back petals */}
        <ellipse cx={-7 * scale} cy={-8 * scale} rx={10 * scale} ry={22 * scale} fill={c.dark} />
        <ellipse cx={7 * scale} cy={-8 * scale} rx={10 * scale} ry={22 * scale} fill={c.dark} />

        {/* Center petal */}
        <ellipse cx={0} cy={-10 * scale} rx={9 * scale} ry={24 * scale} fill={c.main} />

        {/* Front left petal */}
        <ellipse cx={-8 * scale} cy={-5 * scale} rx={11 * scale} ry={20 * scale} fill={c.main} opacity={0.9} />
        {/* Front right petal */}
        <ellipse cx={8 * scale} cy={-5 * scale} rx={11 * scale} ry={20 * scale} fill={c.main} opacity={0.9} />

        {/* Highlights */}
        <ellipse cx={-3 * scale} cy={-14 * scale} rx={4 * scale} ry={10 * scale} fill={c.light} opacity={0.4} />
        <ellipse cx={5 * scale} cy={-12 * scale} rx={3 * scale} ry={8 * scale} fill={c.light} opacity={0.25} />
      </g>
    </motion.g>
  );
};

const Firefly = ({ delay }: { delay: number }) => {
  const startX = Math.random() * 900 + 50;
  const startY = Math.random() * 300 + 100;

  return (
    <motion.circle
      cx={startX}
      cy={startY}
      r={2}
      fill="#fff8a0"
      style={{ filter: "blur(0.5px)" }}
      animate={{
        opacity: [0, 0.8, 0.3, 0.9, 0],
        cx: [startX, startX + 30, startX - 20, startX + 10],
        cy: [startY, startY - 20, startY + 15, startY - 30],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
};

const Bee = ({ delay }: { delay: number }) => {
  const startX = Math.random() * 700 + 150;
  const startY = Math.random() * 150 + 200;
  const endX = startX + (Math.random() * 200 - 100);
  const endY = startY + (Math.random() * 150 - 75);

  return (
    <motion.g
      animate={{
        opacity: [0, 1, 1, 0.7, 0],
        x: [0, (endX - startX) * 0.3, (endX - startX) * 0.6, endX - startX, 0],
        y: [0, (endY - startY) * 0.3 - 8, (endY - startY) * 0.6 + 5, endY - startY, 0],
      }}
      transition={{
        duration: 8 + Math.random() * 6,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      {/* Body */}
      <ellipse cx={startX} cy={startY} rx={8} ry={5} fill="#f7d95e" />
      {/* Stripes */}
      <rect x={startX - 5} y={startY - 3} width={4} height={6} rx={1} fill="#3a2535" opacity={0.7} />
      <rect x={startX - 1} y={startY - 3} width={4} height={6} rx={1} fill="#3a2535" opacity={0.7} />
      {/* Left wing */}
      <motion.ellipse
        cx={startX - 3}
        cy={startY - 5}
        rx={5}
        ry={3}
        fill="rgba(200,230,255,.6)"
        animate={{
          scaleX: [1, 1.2, 0.9, 1.2, 1],
          opacity: [0.6, 0.8, 0.5, 0.8, 0.6],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Right wing */}
      <motion.ellipse
        cx={startX + 5}
        cy={startY - 4}
        rx={4}
        ry={2.5}
        fill="rgba(200,230,255,.6)"
        animate={{
          scaleX: [1, 1.2, 0.9, 1.2, 1],
          opacity: [0.6, 0.8, 0.5, 0.8, 0.6],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Eye */}
      <circle cx={startX} cy={startY} r={1} fill="#3a2535" />
    </motion.g>
  );
};

const Moon = () => (
  <motion.div
    className="absolute top-[6vh] right-[12vw] md:w-[70px] md:h-[70px] w-[60px] h-[60px] rounded-full pointer-events-none"
    style={{
      background: "radial-gradient(circle at 40% 40%, #fffbe8, #f5e8c0 60%, #e0c878)",
      boxShadow:
        "0 0 20px 8px rgba(245,232,192,0.25), 0 0 60px 20px rgba(245,232,192,0.12), 0 0 120px 40px rgba(245,232,192,0.06)",
    }}
    animate={{
      boxShadow: [
        "0 0 20px 8px rgba(245,232,192,0.25), 0 0 60px 20px rgba(245,232,192,0.12), 0 0 120px 40px rgba(245,232,192,0.06)",
        "0 0 25px 12px rgba(245,232,192,0.3), 0 0 80px 28px rgba(245,232,192,0.16), 0 0 150px 50px rgba(245,232,192,0.08)",
        "0 0 20px 8px rgba(245,232,192,0.25), 0 0 60px 20px rgba(245,232,192,0.12), 0 0 120px 40px rgba(245,232,192,0.06)",
      ],
    }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  />
);

const Stars = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: [
        "radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.52) 0%, transparent 100%)",
        "radial-gradient(1px 1px at 22% 8%, rgba(255,255,255,0.38) 0%, transparent 100%)",
        "radial-gradient(1px 1px at 45% 5%, rgba(255,255,255,0.45) 0%, transparent 100%)",
        "radial-gradient(1px 1px at 67% 12%, rgba(255,255,255,0.30) 0%, transparent 100%)",
        "radial-gradient(1px 1px at 80% 6%, rgba(255,255,255,0.42) 0%, transparent 100%)",
        "radial-gradient(1px 1px at 92% 18%, rgba(255,255,255,0.33) 0%, transparent 100%)",
        "radial-gradient(1px 1px at 35% 20%, rgba(255,255,255,0.27) 0%, transparent 100%)",
        "radial-gradient(1px 1px at 58% 25%, rgba(255,255,255,0.22) 0%, transparent 100%)",
        "radial-gradient(1px 1px at 15% 30%, rgba(255,255,255,0.18) 0%, transparent 100%)",
        "radial-gradient(1px 1px at 75% 22%, rgba(255,255,255,0.30) 0%, transparent 100%)",
        "radial-gradient(1px 1px at 50% 18%, rgba(255,255,255,0.24) 0%, transparent 100%)",
        "radial-gradient(1px 1px at 88% 10%, rgba(255,255,255,0.36) 0%, transparent 100%)",
      ].join(", "),
    }}
  />
);

const TulipGarden = () => {
  const navigate = useNavigate();
  const { isPlaying, toggleAudio } = useGlobalAudio();

  useEffect(() => {
    // El audio global ya está siendo manejado por el hook
  }, []);

  const tulips = [
    { x: 20, color: "pink", stemHeight: 220, delay: 2.1, scale: 0.78 },
    { x: 80, color: "purple", stemHeight: 240, delay: 0.2, scale: 0.85 },
    { x: 160, color: "red", stemHeight: 280, delay: 0.8, scale: 1 },
    { x: 240, color: "pink", stemHeight: 260, delay: 0.5, scale: 0.95 },
    { x: 320, color: "yellow", stemHeight: 300, delay: 1.2, scale: 1.05 },
    { x: 400, color: "orange", stemHeight: 270, delay: 0.3, scale: 0.9 },
    { x: 480, color: "red", stemHeight: 290, delay: 1.0, scale: 1 },
    { x: 560, color: "white", stemHeight: 250, delay: 0.6, scale: 0.88 },
    { x: 640, color: "pink", stemHeight: 285, delay: 0.9, scale: 1.02 },
    { x: 720, color: "yellow", stemHeight: 265, delay: 0.4, scale: 0.92 },
    { x: 800, color: "purple", stemHeight: 295, delay: 1.1, scale: 0.97 },
    { x: 880, color: "orange", stemHeight: 255, delay: 0.7, scale: 0.9 },
    { x: 950, color: "red", stemHeight: 275, delay: 1.3, scale: 0.85 },
    { x: 1020, color: "yellow", stemHeight: 245, delay: 2.0, scale: 0.82 },
    { x: 1080, color: "purple", stemHeight: 260, delay: 2.3, scale: 0.88 },
    // Back row
    { x: 40, color: "orange", stemHeight: 185, delay: 2.2, scale: 0.62 },
    { x: 120, color: "yellow", stemHeight: 200, delay: 1.5, scale: 0.7 },
    { x: 200, color: "white", stemHeight: 190, delay: 1.7, scale: 0.65 },
    { x: 360, color: "pink", stemHeight: 210, delay: 1.4, scale: 0.72 },
    { x: 520, color: "purple", stemHeight: 195, delay: 1.6, scale: 0.68 },
    { x: 680, color: "red", stemHeight: 205, delay: 1.8, scale: 0.7 },
    { x: 840, color: "orange", stemHeight: 198, delay: 1.9, scale: 0.66 },
    { x: 980, color: "white", stemHeight: 192, delay: 2.4, scale: 0.64 },
    { x: 1060, color: "red", stemHeight: 188, delay: 2.5, scale: 0.6 },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Botón de música */}
      <button
        onClick={toggleAudio}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(232,115,154,0.9), rgba(212,91,138,0.9))',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 100,
          boxShadow: '0 4px 12px rgba(232, 115, 154, 0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(232, 115, 154, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(232, 115, 154, 0.4)';
        }}
        title={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>

      {/* Night sky */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 30% 0%, #1e3a5f 0%, #0d1b2e 55%, #080e18 100%)",
        }}
      />

      {/* Stars */}
      <Stars />

      {/* Moon */}
      <Moon />

      {/* Ground */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "33vh",
          background: "linear-gradient(to bottom, #2d5016 0%, #1a3a0a 40%, #142e08 100%)",
          borderTop: "1px solid rgba(60,100,40,0.5)",
        }}
      >
        {/* Grass texture line */}
        <div
          className="absolute -top-[3px] left-0 right-0 h-[6px] rounded-t-sm"
          style={{
            background:
              "linear-gradient(90deg, #2d5016 0%, #3a6b1e 15%, #265212 30%, #3d7020 45%, #224a10 60%, #3a6b1e 75%, #2d5016 100%)",
          }}
        />
      </div>

      {/* Moon light cast on ground */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 75% 85%, rgba(255,200,120,0.06) 0%, transparent 50%)",
        }}
      />

      {/* SVG tulip scene */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute bottom-[33vh] md:bottom-[12vh] left-1/2 -translate-x-1/2 w-[95%] md:w-full md:max-w-6xl px-2 md:px-0"
      >
        <svg viewBox="300 150 600 350" className="w-full h-auto" preserveAspectRatio="xMidYMid slice">
          {/* Fireflies */}
          {Array.from({ length: 18 }).map((_, i) => (
            <Firefly key={i} delay={i * 0.6} />
          ))}
          {/* Bees */}
          {Array.from({ length: 6 }).map((_, i) => (
            <Bee key={`bee-${i}`} delay={i * 1.2} />
          ))}
          {/* Tulips */}
          {tulips
            .sort((a, b) => a.scale - b.scale)
            .map((t, i) => (
              <Tulip key={i} {...t} />
            ))}
        </svg>
      </motion.div>

      {/* Caption */}
      <motion.p
        onClick={() => window.location.href = "/FloresAmarillas/flower.html"}
        className="fixed bottom-[5vh] md:bottom-[8vh] left-[1%] -translate-x-1/2 text-sm md:text-lg italic font-light tracking-[0.12em] md:tracking-[0.16em] whitespace-nowrap pointer-events-auto cursor-pointer px-4 hover:opacity-80 transition-opacity"
        style={{ color: "rgba(245,232,192,0.85)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        Eres mi abejita preciosa &nbsp;·&nbsp; Por eso me encanta darte flores
      </motion.p>
    </div>
  );
};

export default TulipGarden;

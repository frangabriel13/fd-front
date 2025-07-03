import { useState, useRef, useEffect } from "react";
import s from "./Description.module.css";

const Description = ({ text }) => {
  const [showFull, setShowFull] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const pRef = useRef(null);

  useEffect(() => {
    if (pRef.current) {
      setIsClamped(pRef.current.scrollHeight > pRef.current.clientHeight + 2);
    }
  }, [text]);

  if (!text) return <p className={s.text}>Sin descripción.</p>;

  return (
    <div className={s.description}>
      <p
        ref={pRef}
        className={`${s.text} ${!showFull ? s.clamp : ''}`}
        style={{ marginBottom: 0 }}
        data-no-map="true"
        suppressHydrationWarning={true}
      >
        {text}
      </p>
      {isClamped && (
        <button
          className={s.btnShowMore}
          onClick={() => setShowFull((v) => !v)}
        >
          {showFull ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
};

export default Description;
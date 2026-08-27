import { useState, useRef, useEffect } from "react";
import "./index.css";

type Props = {
  toggleTheme: () => void;
};

export default function HeaderActions({ toggleTheme }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const outside = (event: Event) => {
      if (open && ref.current && !ref.current.contains(event.target as Node))
        setOpen(false);
    };

    document.addEventListener("mousedown", outside);
    document.addEventListener("touchstart", outside);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("touchstart", outside);
    };
  }, [open]);

  return (
    <div className="header-actions" ref={ref}>
      <button
        className="header-actions__more-btn"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
      >
        More options
      </button>
      {open && (
        <div className="header-actions__more-menu" role="menu">
          <button
            className="header-actions__theme-toggle"
            onClick={toggleTheme}
            role="menuitem"
          >
            Change theme
          </button>
        </div>
      )}
    </div>
  );
}

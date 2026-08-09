import { useState, useRef, useEffect, type FormEvent } from "react";
import "./index.css";

type Props = {
  onSearch: (q: string) => void;
};

export default function SearchForm({ onSearch }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tRef = useRef<number | null>(null);

  useEffect(() => {
    if (tRef.current) window.clearTimeout(tRef.current);

    tRef.current = window.setTimeout(() => onSearch(value.trim()), 400);

    return () => {
      if (tRef.current) window.clearTimeout(tRef.current);
    };
  }, [value, onSearch]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setValue("");
        onSearch("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSearch]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  const clearSearch = () => {
    setValue("");
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <section className="search">
      <form
        className="search__form"
        onSubmit={submit}
        role="search"
        aria-label="Find the catalog"
      >
        <div className="search__wrap">
          <span className="search__icon" aria-hidden>
            🔍
          </span>
          <input
            id="site-search"
            ref={inputRef}
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Find product..."
            aria-label="Search the catalog"
            className="search__input"
          />
          <button
            type="button"
            onClick={clearSearch}
            className="search__clear"
            aria-label="Clear search"
            hidden={value === ""}
          >
            ✕
          </button>
        </div>

        <button type="submit" className="search__btn" aria-label="Search">
          Search
        </button>
      </form>
    </section>
  );
}

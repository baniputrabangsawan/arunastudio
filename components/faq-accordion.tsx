"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { PublicFaq } from "@/lib/content-data";

function FaqItem({
  answer,
  buttonId,
  isOpen,
  onToggle,
  panelId,
  question,
}: PublicFaq & {
  buttonId: string;
  isOpen: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const measure = () => setContentHeight(content.scrollHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [answer]);

  return (
    <div className="border-b border-black/25 py-1">
      <h3>
        <button
          id={buttonId}
          type="button"
          className="flex min-h-20 w-full items-center justify-between gap-5 py-5 text-left"
          aria-controls={panelId}
          aria-expanded={isOpen}
          onClick={onToggle}
        >
          <span className="text-lg font-bold text-[var(--ink)]">{question}</span>
          <span
            className={`shrink-0 text-2xl font-light text-[var(--accent)] transition-transform duration-(--duration-default) ease-(--ease-out) ${isOpen ? "rotate-45" : "rotate-0"}`}
            aria-hidden="true"
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        className={`faq-answer ${isOpen ? "opacity-100" : "opacity-0"}`}
        style={{ height: isOpen ? `${contentHeight}px` : "0px" }}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
      >
        <div ref={contentRef}>
          <p className="max-w-2xl pb-7 pr-10 text-[#505551]">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion({ faqs }: { faqs: PublicFaq[] }) {
  const accordionId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {faqs.map(({ question, answer }, index) => {
        const buttonId = `${accordionId}-faq-button-${index}`;
        const panelId = `${accordionId}-faq-panel-${index}`;
        const isOpen = openIndex === index;

        return (
          <FaqItem
            key={question}
            question={question}
            answer={answer}
            buttonId={buttonId}
            panelId={panelId}
            isOpen={isOpen}
            onToggle={() => setOpenIndex(isOpen ? null : index)}
          />
        );
      })}
    </div>
  );
}

'use client';

import React, { useState } from "react";

type FaqItem = {
  question?: string;
  answer?: string;
};

interface FaqListProps {
  items?: FaqItem[];
}

export default function FaqList({ items = [] }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFaq = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  if (!items.length) {
    return null;
  }

  return (
    <>
      {items.map((item, index) => (
        <div key={index} className="faq-item">
          <div
            className={`faq-question ${openIndex === index ? 'open' : ''}`}
            onClick={() => toggleFaq(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                toggleFaq(index);
              }
            }}
          >
            {item.question}
          </div>
          {openIndex === index && (
            <div className="faq-answer">{item.answer}</div>
          )}
        </div>
      ))}
    </>
  );
}

'use client';

import React from 'react';

interface TeaserButton {
    buttonText?: string;
    anchorLink?: string;
    buttonUrl?: string;
}

interface TeaserButtonsProps {
    buttons: TeaserButton[];
}

export default function TeaserButtons({ buttons }: TeaserButtonsProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    };

    return (
        <div className="container container-box">
            {buttons.map((button, index) => (
                <div key={index} className="button">
                    <a
                        href={button.anchorLink || button.buttonUrl || "#"}
                        className="button-link"
                        onClick={(e) => handleClick(e, button.anchorLink || button.buttonUrl || "#")}
                    >
                        {button.buttonText}
                    </a>
                </div>
            ))}
        </div>
    );
}

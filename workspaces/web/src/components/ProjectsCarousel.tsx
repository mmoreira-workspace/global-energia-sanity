/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import type { Project } from '@/lib/sanity';

interface ProjectsCarouselProps {
    projects: Project[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Update items per page based on window width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerPage(3);
            } else {
                setItemsPerPage(1);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!projects || projects.length === 0) {
        return null;
    }

    const maxIndex = Math.max(0, projects.length - itemsPerPage);

    const goToNext = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Optional: Loop back to start
            setCurrentIndex(0);
        }
    };

    const goToPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        } else {
            // Optional: Loop to end
            setCurrentIndex(maxIndex);
        }
    };

    // Ensure index stays valid when itemsPerPage changes
    useEffect(() => {
        const newMax = Math.max(0, projects.length - itemsPerPage);
        if (currentIndex > newMax) {
            setCurrentIndex(newMax);
        }
    }, [itemsPerPage, projects.length, currentIndex]);


    // Calculate transform percentage
    // item width = 100% / itemsPerPage
    // shift = currentIndex * (100 / itemsPerPage)
    const translateX = -(currentIndex * (100 / itemsPerPage));

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                <div
                    className="carousel-track"
                    style={{
                        transform: `translateX(${translateX}%)`,
                        // width: `${(projects.length / itemsPerPage) * 100}%` // This logic might be tricky if we want flexible widths. 
                        // Better approach:
                        // track is flex container. width: 100% * projects.length / itemsPerPage ?
                        // No. Let's start simple:
                        // items have flex-basis: 100%/itemsPerPage.
                        // track width is simply large enough? No.
                        // Standard sliding Window:
                        // Container Overflow Hidden.
                        // Track width = 100% (of visible area) * projects.length / itemsPerPage.
                        // If itemsPerPage = 3, and projects = 6. Track needs to be 200% width of container.
                    }}
                >
                    {/* 
                       Re-thinking CSS for smoothness:
                       If I set track width to `(projects.length * 100) / itemsPerPage` %,
                       then each item can be `width: (100 / projects.length)%` relative to track?
                       Example: 3 items per page. 6 projects.
                       Track Width = 200%.
                       Item Width relative to track = 1/6 = 16.66%.
                       
                       Calculation:
                       (100 / 3) * 6 = 200%.
                       Item width = 100% / 6 = 16.666%.
                       
                       Wait, 100 / itemsPerPage is the width relative to the VIEWPORT (container).
                       So if I use flexbox:
                       Track has `display: flex`.
                       We apply `transform: translateX(-currentIndex * (100 / itemsPerPage)%)` ? 
                       NO. If track is super wide, 100% refers to track width? No, % in translate refers to the ELEMENT itself.
                       So if track is 200% wide...
                       
                       Simplest implementation:
                       Track width: `${projects.length * (100 / itemsPerPage)}%`
                       Item width: `${100 / projects.length}%`
                       Translate X: `-(currentIndex * (100 / projects.length))`% ? No.
                       
                       Let's do: 
                       Track { display: flex; width: 100%; transition: transform... }
                       Item { flex: 0 0 ${100/itemsPerPage}%; min-width: ${100/itemsPerPage}%; }
                       
                       Then TranslateX on the Track:
                       `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
                       
                       BUT wait. If track is 100% width of container, and items are 33% width.
                       The 4th item wraps? No, we need `flex-wrap: nowrap`.
                       So the items will overflow the track? Yes.
                       But if track is 100% width, the overflow is hidden by container?
                       Wait. If track is 100%, and I have 10 items of 33%, they will shrink if I don't set `flex-shrink: 0`.
                       So: Track width 100%. Flex nowrap. Items flex-shrink 0.
                       Then TranslateX.
                       When I translate -100%, I move the whole track.
                       But I want to move by ITEM width.
                       Item width is 100/itemsPerPage %.
                       So translate(-33.33%).
                       Percentages in transform refer to the element's bounding box.
                       If Track is 100% (visual width), but has overflowing content...
                       Actually, usually Track needs to be wide enough to hold everything if we want `width: X%` to work nicely.
                       
                       Let's try:
                       Track `display: flex`.
                       Item `min-width: calc(100% / ${itemsPerPage})`.
                       TranslateX ` -${currentIndex * (100 / itemsPerPage)}%`.
                       
                       Does `100%` in `calc` refer to parent (Track) or Grandparent?
                       If Track has no explicit width, it expands? No, div is block. Width 100% of parent.
                       So `min-width` on item works relative to Viewport.
                       
                       If I translate Track by 33%, it moves 33% of TRACK WIDTH.
                       If Track width is constrained to container (100%), then it matches.
                       Yes.
                     */}

                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="carousel-item"
                            style={{ flex: `0 0 ${100 / itemsPerPage}%`, maxWidth: `${100 / itemsPerPage}%` }}
                        >
                            <div className="project-card">
                                <div className="card-image-wrapper">
                                    {project.mainImageUrl ? (
                                        <img
                                            src={project.mainImageUrl}
                                            alt={project.title || 'Project'}
                                            className="card-image"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="card-placeholder" />
                                    )}
                                </div>
                                <div className="card-content">
                                    {project.category && (
                                        <span className="card-category">{project.category}</span>
                                    )}
                                    {project.description && (
                                        <p className="card-description">{project.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons for Desktop - floating? Or below? 
                Reference image doesn't show buttons explicitly but usually they exist.
                User said "Carousel".
            */}
            <div className="carousel-controls">
                <button
                    className="carousel-button prev"
                    onClick={goToPrev}
                    disabled={currentIndex === 0}
                    aria-label="Previous"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                {/* Dots? Maybe too many dots if many projects. Let's keep arrows. */}

                <button
                    className="carousel-button next"
                    onClick={goToNext}
                    disabled={currentIndex >= maxIndex} // Disable if at end
                    aria-label="Next"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

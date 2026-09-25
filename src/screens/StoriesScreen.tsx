import React, { useState } from 'react';
import { JournalStory } from '../types';

interface StoriesScreenProps {
  stories: JournalStory[];
  onSelectStory: (story: JournalStory) => void;
}

export const StoriesScreen: React.FC<StoriesScreenProps> = ({ stories, onSelectStory }) => {
  const [selectedStoryModal, setSelectedStoryModal] = useState<JournalStory | null>(null);

  const handleOpen = (story: JournalStory) => {
    setSelectedStoryModal(story);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-3 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffffff] shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-[#0c6780]">auto_stories</span>
          <span className="text-xs uppercase tracking-widest text-[#0c6780] font-semibold">
            Artisan Chronicles
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1d1b19] leading-tight">
          Crochet Stories & Fiber Journal
        </h1>
        <p className="text-base sm:text-lg text-[#49454d] font-light leading-relaxed">
          Behind-the-scenes reflections on slow craft, fiber care guides, and the meditative mathematics of petal shaping.
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {stories.map((story) => (
          <article
            key={story.id}
            className="flex flex-col rounded-3xl bg-[#ffffff] overflow-hidden shadow-[0_6px_24px_rgba(200,182,226,0.14)] hover:shadow-[0_16px_36px_rgba(200,182,226,0.25)] hover:-translate-y-1 transition-all"
          >
            <div className="w-full h-64 bg-[#f3ede9] overflow-hidden">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => handleOpen(story)}
              />
            </div>
            <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#49454d]">
                  <span className={`text-xs uppercase tracking-wider font-semibold ${story.categoryColor}`}>
                    {story.category}
                  </span>
                  <span>•</span>
                  <span className="text-xs uppercase tracking-wider">{story.readTime}</span>
                </div>
                <h3
                  onClick={() => handleOpen(story)}
                  className="font-serif text-xl font-medium text-[#1d1b19] cursor-pointer hover:text-[#66587e] transition-colors leading-snug"
                >
                  {story.title}
                </h3>
                <p className="text-sm text-[#49454d] leading-relaxed line-clamp-3">
                  {story.excerpt}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#cbc4ce]/30">
                <span className="text-xs text-[#7a757e]">{story.date}</span>
                <button
                  onClick={() => handleOpen(story)}
                  className="inline-flex items-center gap-1 text-xs text-[#66587e] uppercase font-semibold tracking-wider hover:gap-2 transition-all"
                >
                  <span>Read Article</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Story Reader Modal */}
      {selectedStoryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#32302e]/50 backdrop-blur-md animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedStoryModal(null);
          }}
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#ffffff] rounded-3xl p-6 sm:p-10 shadow-2xl">
            <button
              onClick={() => setSelectedStoryModal(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#f3ede9] flex items-center justify-center text-[#49454d] hover:bg-[#ede7e3]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#795465] mb-2">
              <span>{selectedStoryModal.category}</span>
              <span>•</span>
              <span>{selectedStoryModal.readTime}</span>
              <span>•</span>
              <span>{selectedStoryModal.date}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-[#1d1b19] mb-6 leading-tight">
              {selectedStoryModal.title}
            </h2>

            <div className="w-full h-72 rounded-2xl overflow-hidden mb-6 bg-[#f3ede9]">
              <img
                src={selectedStoryModal.image}
                alt={selectedStoryModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-stone text-sm sm:text-base text-[#49454d] leading-relaxed space-y-4">
              <p className="font-medium text-[#1d1b19] text-lg">
                {selectedStoryModal.excerpt}
              </p>
              <p>{selectedStoryModal.content}</p>
              <p>
                Every stitch crafted at Pastelhook adheres to rigorous tension balance standards. When creating layered flower petals or amigurumi sculpted limbs, the thread is inspected under natural daylight lamps to ensure zero slubs or irregular diameter variations.
              </p>
              <p>
                For custom inquiries regarding specific yarn weights or hypoallergenic fiber pairings for milestone gifts, our atelier salon remains at your disposal.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#cbc4ce]/30 flex justify-end">
              <button
                onClick={() => setSelectedStoryModal(null)}
                className="px-6 py-2.5 rounded-full bg-[#66587e] text-white text-xs uppercase font-semibold tracking-wider hover:opacity-95"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

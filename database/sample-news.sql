-- Sample News Articles for Pop Culture Website
-- Run this in Supabase SQL Editor to add initial content

-- Hollywood News
INSERT INTO articles (title, slug, description, content, category, image_url, source_name, source_url, is_auto_imported)
VALUES 
(
    'Major Studio Announces Blockbuster Sequel',
    'major-studio-announces-blockbuster-sequel-' || extract(epoch from now())::bigint,
    'A major Hollywood studio has greenlit a highly anticipated sequel to one of last year''s biggest hits. Production is set to begin next spring with the original cast returning.',
    'A major Hollywood studio has greenlit a highly anticipated sequel to one of last year''s biggest hits. Production is set to begin next spring with the original cast returning. The announcement came during a press conference where executives expressed their excitement about continuing the beloved franchise.',
    'Hollywood',
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
    'Sample News',
    'https://peopleofculture.netlify.app',
    false
),
(
    'Award-Winning Director Signs Multi-Picture Deal',
    'award-winning-director-signs-multi-picture-deal-' || extract(epoch from now())::bigint,
    'An Oscar-winning director has signed an exclusive multi-picture deal with a streaming giant, promising innovative storytelling for the next three years.',
    'An Oscar-winning director has signed an exclusive multi-picture deal with a streaming giant, promising innovative storytelling for the next three years. Industry insiders are calling this one of the biggest deals of the decade.',
    'Hollywood',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800',
    'Sample News',
    'https://peopleofculture.netlify.app',
    false
);

-- Bollywood News
INSERT INTO articles (title, slug, description, content, category, image_url, source_name, source_url, is_auto_imported)
VALUES 
(
    'Bollywood Superstar Announces New Action Thriller',
    'bollywood-superstar-announces-new-action-thriller-' || extract(epoch from now())::bigint,
    'One of Bollywood''s biggest stars has announced their next project - a high-octane action thriller set to release next year. The film promises spectacular stunts and international locations.',
    'One of Bollywood''s biggest stars has announced their next project - a high-octane action thriller set to release next year. The film promises spectacular stunts and international locations. Fans are already buzzing with excitement on social media.',
    'Bollywood',
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    'Sample News',
    'https://peopleofculture.netlify.app',
    false
),
(
    'Classic Bollywood Film Gets Modern Remake',
    'classic-bollywood-film-gets-modern-remake-' || extract(epoch from now())::bigint,
    'A beloved classic from the 90s is getting a contemporary remake with a fresh cast and updated storyline while maintaining the essence of the original.',
    'A beloved classic from the 90s is getting a contemporary remake with a fresh cast and updated storyline while maintaining the essence of the original. The director promises to honor the legacy while bringing new perspectives.',
    'Bollywood',
    'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800',
    'Sample News',
    'https://peopleofculture.netlify.app',
    false
);

-- Music News
INSERT INTO articles (title, slug, description, content, category, image_url, source_name, source_url, is_auto_imported)
VALUES 
(
    'Chart-Topping Artist Drops Surprise Album',
    'chart-topping-artist-drops-surprise-album-' || extract(epoch from now())::bigint,
    'A Grammy-winning artist has surprised fans with an unexpected album release at midnight. The 15-track collection is already breaking streaming records.',
    'A Grammy-winning artist has surprised fans with an unexpected album release at midnight. The 15-track collection is already breaking streaming records. Critics are calling it their best work yet.',
    'Music',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
    'Sample News',
    'https://peopleofculture.netlify.app',
    false
),
(
    'Music Festival Announces Star-Studded Lineup',
    'music-festival-announces-star-studded-lineup-' || extract(epoch from now())::bigint,
    'The world''s biggest music festival has revealed its lineup for next summer, featuring headliners from multiple genres and surprise collaborations.',
    'The world''s biggest music festival has revealed its lineup for next summer, featuring headliners from multiple genres and surprise collaborations. Tickets are expected to sell out within hours.',
    'Music',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    'Sample News',
    'https://peopleofculture.netlify.app',
    false
);

-- Web Series News
INSERT INTO articles (title, slug, description, content, category, image_url, source_name, source_url, is_auto_imported)
VALUES 
(
    'Hit Series Renewed for Three More Seasons',
    'hit-series-renewed-for-three-more-seasons-' || extract(epoch from now())::bigint,
    'A critically acclaimed streaming series has been renewed for three additional seasons, ensuring fans will get to see the complete story arc the creators envisioned.',
    'A critically acclaimed streaming series has been renewed for three additional seasons, ensuring fans will get to see the complete story arc the creators envisioned. The showrunners expressed gratitude for the overwhelming fan support.',
    'Web Series',
    'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800',
    'Sample News',
    'https://peopleofculture.netlify.app',
    false
),
(
    'New Sci-Fi Series Breaks Viewership Records',
    'new-sci-fi-series-breaks-viewership-records-' || extract(epoch from now())::bigint,
    'A new science fiction series has shattered streaming records in its first week, becoming the platform''s most-watched premiere of all time.',
    'A new science fiction series has shattered streaming records in its first week, becoming the platform''s most-watched premiere of all time. The show combines stunning visuals with compelling storytelling.',
    'Web Series',
    'https://images.unsplash.com/photo-1574267432644-f610a4ab5f6c?w=800',
    'Sample News',
    'https://peopleofculture.netlify.app',
    false
);

-- Reviews
INSERT INTO articles (title, slug, description, content, category, image_url, source_name, source_url, is_auto_imported)
VALUES 
(
    'Review: Latest Superhero Film Delivers Epic Action',
    'review-latest-superhero-film-delivers-epic-action-' || extract(epoch from now())::bigint,
    'The newest entry in the superhero franchise delivers spectacular action sequences and emotional depth. Our verdict: 4.5/5 stars.',
    'The newest entry in the superhero franchise delivers spectacular action sequences and emotional depth. The cast brings their A-game, and the visual effects are stunning. A must-watch for fans of the genre. Our verdict: 4.5/5 stars.',
    'Reviews',
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800',
    'Sample News',
    'https://peopleofculture.netlify.app',
    false
),
(
    'Review: Indie Drama Earns Critical Acclaim',
    'review-indie-drama-earns-critical-acclaim-' || extract(epoch from now())::bigint,
    'A small-budget indie drama has captured hearts at film festivals worldwide. This intimate character study showcases brilliant performances. Rating: 5/5 stars.',
    'A small-budget indie drama has captured hearts at film festivals worldwide. This intimate character study showcases brilliant performances and masterful direction. It''s a reminder that great storytelling doesn''t need a massive budget. Rating: 5/5 stars.',
    'Reviews',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
    'Sample News',
    'https://peopleofculture.netlify.app',
    false
);

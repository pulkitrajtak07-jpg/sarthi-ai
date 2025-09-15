-- Clear existing templates and add new futuristic ones
DELETE FROM resume_templates;

-- Insert new futuristic resume templates with HTML-based designs
INSERT INTO resume_templates (name, description, thumbnail_url, category, is_premium)
VALUES 
-- Neon Cyber Templates
('Neon Cyber Blue', 'Futuristic template with neon blue accents and cyber grid background', '/api/template-preview/neon-cyber-blue', 'creative', false),
('Neon Cyber Purple', 'Futuristic template with neon purple accents and cyber grid background', '/api/template-preview/neon-cyber-purple', 'creative', false),
('Neon Cyber Pink', 'Futuristic template with neon pink accents and cyber grid background', '/api/template-preview/neon-cyber-pink', 'creative', false),
('Neon Cyber Cyan', 'Futuristic template with neon cyan accents and cyber grid background', '/api/template-preview/neon-cyber-cyan', 'creative', false),

-- Minimal Dark Templates
('Minimal Dark Blue', 'Clean, minimal dark template with blue accents', '/api/template-preview/minimal-dark-blue', 'minimal', false),
('Minimal Dark Purple', 'Clean, minimal dark template with purple accents', '/api/template-preview/minimal-dark-purple', 'minimal', false),
('Minimal Dark Pink', 'Clean, minimal dark template with pink accents', '/api/template-preview/minimal-dark-pink', 'minimal', false),
('Minimal Dark Cyan', 'Clean, minimal dark template with cyan accents', '/api/template-preview/minimal-dark-cyan', 'minimal', false),

-- Futuristic Templates
('Futuristic Blue', 'Modern two-column template with blue glowing elements', '/api/template-preview/futuristic-blue', 'creative', false),
('Futuristic Purple', 'Modern two-column template with purple glowing elements', '/api/template-preview/futuristic-purple', 'creative', false),
('Futuristic Pink', 'Modern two-column template with pink glowing elements', '/api/template-preview/futuristic-pink', 'creative', false),
('Futuristic Cyan', 'Modern two-column template with cyan glowing elements', '/api/template-preview/futuristic-cyan', 'creative', true),

-- Tech Grid Templates
('Tech Grid Blue', 'Technical template with grid layout and blue accents', '/api/template-preview/tech-grid-blue', 'technical', false),
('Tech Grid Purple', 'Technical template with grid layout and purple accents', '/api/template-preview/tech-grid-purple', 'technical', false),
('Tech Grid Pink', 'Technical template with grid layout and pink accents', '/api/template-preview/tech-grid-pink', 'technical', false),
('Tech Grid Cyan', 'Technical template with grid layout and cyan accents', '/api/template-preview/tech-grid-cyan', 'technical', true),

-- Premium Templates
('Digital Wave Cyan', 'Modern template with digital wave patterns and cyan accents', '/api/template-preview/digital-wave-cyan', 'creative', true),
('Quantum Purple', 'Elegant design with quantum-inspired elements and purple accents', '/api/template-preview/quantum-purple', 'creative', true),
('Dark Matter Blue', 'Sleek dark template with blue glowing accents', '/api/template-preview/dark-matter-blue', 'minimal', false),
('Circuit Cyan', 'Technical template with circuit board patterns and cyan accents', '/api/template-preview/circuit-cyan', 'technical', true);

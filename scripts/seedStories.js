const fs = require('fs');
const path = require('path');

// Paths
const exportPath = path.join(__dirname, '..', 'public', 'fidalgoruben_blog_export.json');
const outPath = path.join(__dirname, '..', 'data', 'stories.json');

// Read export JSON (must exist in public folder)
if (!fs.existsSync(exportPath)) {
  console.error('❌ Export file not found:', exportPath);
  process.exit(1);
}

const raw = fs.readFileSync(exportPath, 'utf8');
const { posts } = JSON.parse(raw);

const stories = posts.map(post => ({
  id: post.id,
  title: post.title,
  pages: [
    {
      background: post.featured_image
        ? { type: 'image', value: post.featured_image }
        : { type: 'color', value: '#333' },
      elements: [
        {
          id: `h-${post.id}`,
          type: 'heading',
          content: post.title,
          style: {
            left: '50%',
            top: '20%',
            width: '80%',
            transform: 'translate(-50%,-50%)',
            fontSize: '2rem',
            color: '#fff',
            textAlign: 'center',
          },
        },
        {
          id: `t-${post.id}`,
          type: 'text',
          content: post.content.slice(0, 200) + (post.content.length > 200 ? '…' : ''),
          style: {
            left: '50%',
            top: '45%',
            width: '80%',
            transform: 'translate(-50%,-50%)',
            fontSize: '1rem',
            color: '#fff',
            textAlign: 'center',
          },
        },
        {
          id: `b-${post.id}`,
          type: 'button',
          content: 'Leer más',
          link: post.url,
          style: {
            left: '50%',
            top: '75%',
            transform: 'translate(-50%,-50%)',
            background: '#667eea',
            color: '#fff',
            borderRadius: '4px',
            padding: '0.4rem 0.8rem',
          },
        },
      ],
    },
  ],
}));

// Ensure data folder exists
fs.mkdirSync(path.join(__dirname, '..', 'data'), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(stories, null, 2));
console.log('✅ Stories seeded to', outPath);

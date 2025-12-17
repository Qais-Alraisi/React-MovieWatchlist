// Image proxy endpoint to fetch images server-side and avoid CORS issues
export async function setupImageProxy(app) {
  app.get('/api/proxy-image', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ message: 'URL required' });

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });
      
      if (!response.ok) {
        console.warn(`Failed to fetch image: ${url} - ${response.status}`);
        return res.status(response.status).json({ message: 'Image not found' });
      }

      const buffer = await response.arrayBuffer();
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      
      res.set('Content-Type', contentType);
      res.set('Cache-Control', 'public, max-age=86400'); // Cache for 1 day
      res.send(Buffer.from(buffer));
    } catch (err) {
      console.error('Image proxy error:', err.message);
      res.status(500).json({ message: 'Failed to fetch image' });
    }
  });
}

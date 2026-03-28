import jwt from 'jsonwebtoken';

// Basic authentication middleware
export const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ success: false, message: 'कृपया लॉगिन करें (Please login)' });
    }

    // Support both Basic and Bearer token auth
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoded;
      next();
    } else if (authHeader.startsWith('Basic ')) {
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [username, password] = credentials.split(':');

      if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        req.admin = { username };
        next();
      } else {
        return res.status(401).json({ success: false, message: 'गलत क्रेडेंशियल्स (Invalid credentials)' });
      }
    } else {
      return res.status(401).json({ success: false, message: 'अमान्य प्रमाणीकरण (Invalid authentication)' });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: 'अमान्य टोकन (Invalid token)' });
  }
};

// Login route handler
export const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ success: true, token, username });
  } else {
    res.status(401).json({ success: false, message: 'गलत यूजरनेम या पासवर्ड (Invalid username or password)' });
  }
};

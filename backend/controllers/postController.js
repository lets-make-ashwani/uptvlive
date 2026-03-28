import Post from '../models/Post.js';

// @desc    Get all posts
// @route   GET /api/posts
export const getPosts = async (req, res) => {
  try {
    const { category, city, type, limit, page, search, trending, featured, breaking } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (city) filter.city = city;
    if (type) filter.type = type;
    if (trending === 'true') filter.isTrending = true;
    if (featured === 'true') filter.isFeatured = true;
    if (breaking === 'true') filter.isBreaking = true;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 50;
    const skip = (pageNum - 1) * limitNum;

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .select('-content'); // Exclude full content from list view

    res.json({
      success: true,
      count: posts.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: posts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ success: false, message: 'पोस्ट नहीं मिली (Post not found)' });
    }
    // Increment views
    post.views += 1;
    await post.save();

    // Get related posts
    const relatedPosts = await Post.find({
      _id: { $ne: post._id },
      $or: [
        { category: post.category },
        { city: post.city }
      ]
    })
      .sort({ createdAt: -1 })
      .limit(6)
      .select('-content');

    res.json({ success: true, data: post, related: relatedPosts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new post
// @route   POST /api/posts
export const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'पोस्ट नहीं मिली (Post not found)' });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      post[key] = req.body[key];
    });

    await post.save();
    res.json({ success: true, data: post });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'पोस्ट नहीं मिली (Post not found)' });
    }
    res.json({ success: true, message: 'पोस्ट सफलतापूर्वक हटा दी गई (Post deleted successfully)' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get post by ID (for admin editing)
// @route   GET /api/posts/id/:id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'पोस्ट नहीं मिली (Post not found)' });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import mongoose from 'mongoose';
import slugify from 'slugify';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'शीर्षक आवश्यक है (Title is required)'],
    trim: true,
    maxlength: [300, 'शीर्षक 300 अक्षरों से अधिक नहीं हो सकता']
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  image: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: [true, 'सामग्री आवश्यक है (Content is required)']
  },
  excerpt: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: 'लखनऊ',
    trim: true
  },
  category: {
    type: String,
    default: 'सामान्य',
    enum: ['राजनीति', 'खेल', 'मनोरंजन', 'व्यापार', 'टेक्नोलॉजी', 'शिक्षा', 'स्वास्थ्य', 'अपराध', 'सामान्य', 'अंतरराष्ट्रीय', 'राष्ट्रीय', 'उत्तर प्रदेश'],
    trim: true
  },
  views: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    enum: ['news', 'video'],
    default: 'news'
  },
  videoUrl: {
    type: String,
    default: ''
  },
  isBreaking: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: String,
    default: 'UP TV Live'
  }
}, {
  timestamps: true
});

// Auto-generate slug from title before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      locale: 'hi'
    }) + '-' + Date.now().toString(36);
  }
  // Auto-generate excerpt from content
  if (this.isModified('content') && !this.excerpt) {
    this.excerpt = this.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
  }
  next();
});

// Virtual for YouTube thumbnail
postSchema.virtual('videoThumbnail').get(function() {
  if (this.type === 'video' && this.videoUrl) {
    const videoId = extractYouTubeId(this.videoUrl);
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  }
  return this.image;
});

// Include virtuals in JSON output
postSchema.set('toJSON', { virtuals: true });
postSchema.set('toObject', { virtuals: true });

function extractYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

const Post = mongoose.model('Post', postSchema);
export default Post;

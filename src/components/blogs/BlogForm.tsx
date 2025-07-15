import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  Box, Button, TextField, Typography, Paper, IconButton, Chip,
  InputAdornment, CircularProgress, Divider, Tooltip, FormControl,
  InputLabel, Select, MenuItem, FormHelperText, FormGroup, FormControlLabel,
  Switch, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
  Snackbar, Alert
} from '@mui/material';
import {
  Save as SaveIcon, Image as ImageIcon, Cancel as CancelIcon, Add as AddIcon,
  Delete as DeleteIcon, Close as CloseIcon, ArrowBack as ArrowBackIcon,
  Visibility as VisibilityIcon, Edit as EditIcon, Tag as TagIcon,
  Category as CategoryIcon, Description as DescriptionIcon, Title as TitleIcon,
  Code as CodeIcon, Link as LinkIcon, Person as PersonIcon
} from '@mui/icons-material';

// Dynamically import the markdown editor with no SSR
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

// Types
interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  featuredImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  slug?: string;
}

interface BlogFormProps {
  initialData?: Partial<BlogFormData>;
  onSubmit: (data: BlogFormData) => Promise<void>;
  isSubmitting?: boolean;
  isEdit?: boolean;
  onCancel?: () => void;
}

const defaultValues: BlogFormData = {
  title: '',
  excerpt: '',
  content: '',
  category: '',
  tags: [],
  isPublished: false,
  featuredImage: '',
  metaTitle: '',
  metaDescription: '',
  slug: '',
};

// Available categories and tags
const categories = ['Technology', 'Web Development', 'Mobile Development', 'Design', 'Business'];
const commonTags = ['JavaScript', 'React', 'Node.js', 'TypeScript', 'CSS', 'HTML'];

const BlogForm: React.FC<BlogFormProps> = ({
  initialData = {},
  onSubmit,
  isSubmitting = false,
  isEdit = false,
  onCancel,
}) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<BlogFormData>({ ...defaultValues, ...initialData });
  const [tagInput, setTagInput] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BlogFormData, string>>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.featuredImage || null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  // Form handlers
  const handleChange = (field: keyof BlogFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleContentChange = (value: string = '') => {
    setFormData(prev => ({ ...prev, content: value }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/,/g, '');
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImagePreview(imageUrl);
        setFormData(prev => ({ ...prev, featuredImage: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, featuredImage: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BlogFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error',
      });
      return;
    }
    
    try {
      await onSubmit(formData);
      setSnackbar({
        open: true,
        message: isEdit ? 'Blog post updated!' : 'Blog post created!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'An error occurred. Please try again.',
        severity: 'error',
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {/* Form Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={onCancel || (() => router.back())}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1">
            {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<VisibilityIcon />}
            onClick={() => setPreviewMode(!previewMode)}
            disabled={isSubmitting}
          >
            {previewMode ? 'Back to Editor' : 'Preview'}
          </Button>
          
          {isEdit && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setShowDeleteDialog(true)}
              disabled={isSubmitting}
            >
              Delete
            </Button>
          )}
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            disabled={isSubmitting}
          >
            {isEdit ? 'Update' : 'Publish'}
          </Button>
        </Box>
      </Box>
      
      {previewMode ? (
        // Preview Mode (simplified)
        <Paper sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          {imagePreview && (
            <Box sx={{ width: '100%', height: '300px', mb: 3, borderRadius: 2, overflow: 'hidden' }}>
              <Box component="img" src={imagePreview} alt="Preview" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          )}
          <Typography variant="h3" component="h1" gutterBottom>
            {formData.title || 'Untitled Post'}
          </Typography>
          <Typography color="text.secondary" paragraph>
            {formData.excerpt || 'No excerpt provided.'}
          </Typography>
          <Box sx={{ mt: 2 }}>
            {formData.content ? (
              <div dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, '<br />') }} />
            ) : (
              <Typography color="text.secondary">No content to display.</Typography>
            )}
          </Box>
        </Paper>
      ) : (
        // Editor Mode
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Featured Image */}
          <Paper sx={{ p: 3, border: '1px dashed', borderColor: 'divider', borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Featured Image
            </Typography>
            
            {imagePreview ? (
              <Box sx={{ position: 'relative', width: '100%', maxWidth: '500px', height: '250px', borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                <Box component="img" src={imagePreview} alt="Preview" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                  <Tooltip title="Change image">
                    <IconButton size="small" onClick={() => fileInputRef.current?.click()} sx={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remove image">
                    <IconButton size="small" onClick={handleRemoveImage} sx={{ backgroundColor: 'rgba(211, 47, 47, 0.8)', color: 'white' }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main', backgroundColor: 'action.hover' },
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                <Typography>Click to upload a featured image</Typography>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
              </Box>
            )}
          </Paper>
          
          {/* Title */}
          <TextField
            fullWidth
            label="Post Title"
            variant="outlined"
            value={formData.title}
            onChange={handleChange('title')}
            error={!!errors.title}
            helperText={errors.title || 'A catchy title for your blog post'}
            InputProps={{
              startAdornment: <InputAdornment position="start"><TitleIcon color={errors.title ? 'error' : 'action'} /></InputAdornment>,
              style: { fontSize: '1.5rem', fontWeight: 700 },
            }}
          />
          
          {/* Excerpt */}
          <TextField
            fullWidth
            label="Excerpt"
            variant="outlined"
            multiline
            rows={3}
            value={formData.excerpt}
            onChange={handleChange('excerpt')}
            error={!!errors.excerpt}
            helperText={errors.excerpt || 'A short summary of your post'}
            InputProps={{
              startAdornment: <InputAdornment position="start"><DescriptionIcon color={errors.excerpt ? 'error' : 'action'} /></InputAdornment>,
            }}
          />
          
          {/* Content Editor */}
          <Paper sx={{ p: 0, border: '1px solid', borderColor: errors.content ? 'error.main' : 'divider', borderRadius: 2, mb: 2 }}>
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper' }}>
              <Typography variant="subtitle2">Content</Typography>
            </Box>
            <Box sx={{ minHeight: '400px' }}>
              <MDEditor
                value={formData.content}
                onChange={(value) => handleContentChange(value || '')}
                height={400}
                style={{ border: 'none', fontFamily: 'inherit' }}
                textareaProps={{ placeholder: 'Start writing your blog post here...' }}
              />
            </Box>
          </Paper>
          {errors.content && (
            <Typography color="error" variant="caption" sx={{ ml: 1.5, display: 'block', mt: -2, mb: 2 }}>
              {errors.content}
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            {/* Left Column - Main Form */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Categories */}
              <Paper sx={{ p: 3, border: '1px solid', borderColor: errors.category ? 'error.main' : 'divider', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Category
                </Typography>
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel>Select a category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    label="Select a category"
                    startAdornment={
                      <InputAdornment position="start">
                        <CategoryIcon color={errors.category ? 'error' : 'action'} />
                      </InputAdornment>
                    }
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                  {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                </FormControl>
              </Paper>
              
              {/* Tags */}
              <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Tags
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Add tags..."
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleAddTag}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><TagIcon /></InputAdornment>,
                  }}
                  helperText="Press Enter or comma to add a tag"
                />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  {formData.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                      size="small"
                      sx={{ borderRadius: 1 }}
                    />
                  ))}
                </Box>
              </Paper>
            </Box>
            
            {/* Right Column - Publish Options */}
            <Box sx={{ width: { xs: '100%', md: '300px' } }}>
              <Paper sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, position: 'sticky', top: 20 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Publish
                </Typography>
                
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                  sx={{ mb: 2 }}
                >
                  {isEdit ? 'Update' : 'Publish'}
                </Button>
                
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={formData.isPublished}
                        onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                        color="primary"
                      />
                    }
                    label={formData.isPublished ? 'Published' : 'Draft'}
                  />
                </FormGroup>
                
                {isEdit && (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                  >
                    Delete Post
                  </Button>
                )}
              </Paper>
            </Box>
          </Box>
        </Box>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Delete Blog Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BlogForm;

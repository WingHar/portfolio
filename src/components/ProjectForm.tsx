
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X } from 'lucide-react';

interface ProjectFormProps {
  project?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProjectForm = ({ project, onSuccess, onCancel }: ProjectFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    category: project?.category || '',
    description: project?.description || '',
    body: project?.body || '',
    technologies: project?.technologies?.join(', ') || '',
    live_url: project?.live_url || '',
    github_url: project?.github_url || '',
    featured: project?.featured || false,
  });
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [generalImageFiles, setGeneralImageFiles] = useState<File[]>([]);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string>(project?.featured_image_url || '');
  const [generalImagesPreview, setGeneralImagesPreview] = useState<string[]>(project?.general_images || []);

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFeaturedImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGeneralImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGeneralImageFiles(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGeneralImagesPreview(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGeneralImage = (index: number) => {
    const isNewFile = index >= (project?.general_images?.length || 0);
    if (isNewFile) {
      const newFileIndex = index - (project?.general_images?.length || 0);
      setGeneralImageFiles(prev => prev.filter((_, i) => i !== newFileIndex));
    }
    setGeneralImagesPreview(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('project-images')
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(data.path);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let featuredImageUrl = project?.featured_image_url || '';
      let generalImageUrls = project?.general_images || [];
      
      if (featuredImageFile) {
        featuredImageUrl = await uploadImage(featuredImageFile);
      }

      for (const file of generalImageFiles) {
        const url = await uploadImage(file);
        generalImageUrls.push(url);
      }

      const projectData = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        body: formData.body,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
        live_url: formData.live_url || null,
        github_url: formData.github_url || null,
        featured: formData.featured,
        featured_image_url: featuredImageUrl || null,
        general_images: generalImageUrls,
        updated_at: new Date().toISOString()
      };

      let error;
      if (project) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', project.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('projects')
          .insert([projectData]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: `Project ${project ? 'updated' : 'created'} successfully!`,
      });

      onSuccess();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: `Failed to ${project ? 'update' : 'create'} project. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="bg-portfolio-primary-dark border-portfolio-secondary text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="e.g., Full Stack Development, Digital Marketing"
          className="bg-portfolio-primary-dark border-portfolio-secondary text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description for project cards"
          className="bg-portfolio-primary-dark border-portfolio-secondary text-white min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Detailed Description</Label>
        <Textarea
          id="body"
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          placeholder="Detailed project description"
          className="bg-portfolio-primary-dark border-portfolio-secondary text-white min-h-[120px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="technologies">Technologies (comma-separated)</Label>
        <Input
          id="technologies"
          value={formData.technologies}
          onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          placeholder="React, Node.js, PostgreSQL, etc."
          className="bg-portfolio-primary-dark border-portfolio-secondary text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="live_url">Live Demo URL (optional)</Label>
          <Input
            id="live_url"
            type="url"
            value={formData.live_url}
            onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
            placeholder="https://example.com"
            className="bg-portfolio-primary-dark border-portfolio-secondary text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github_url">GitHub URL (optional)</Label>
          <Input
            id="github_url"
            type="url"
            value={formData.github_url}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            placeholder="https://github.com/username/repo"
            className="bg-portfolio-primary-dark border-portfolio-secondary text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Featured Image (for homepage display)</Label>
        <div className="space-y-4">
          {featuredImagePreview && (
            <div className="relative">
              <img 
                src={featuredImagePreview} 
                alt="Featured preview" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
                  setFeaturedImagePreview('');
                  setFeaturedImageFile(null);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFeaturedImageChange}
              className="bg-portfolio-primary-dark border-portfolio-secondary text-white file:text-white"
            />
            <Upload className="w-5 h-5 text-portfolio-tertiary" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>General Images (for detail page gallery)</Label>
        <div className="space-y-4">
          {generalImagesPreview.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {generalImagesPreview.map((preview, index) => (
                <div key={index} className="relative">
                  <img 
                    src={preview} 
                    alt={`General preview ${index + 1}`} 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1"
                    onClick={() => removeGeneralImage(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGeneralImagesChange}
              className="bg-portfolio-primary-dark border-portfolio-secondary text-white file:text-white"
            />
            <Upload className="w-5 h-5 text-portfolio-tertiary" />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
        />
        <Label htmlFor="featured" className="text-sm">Featured Project</Label>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-portfolio-tertiary hover:bg-portfolio-tertiary/90 text-white"
        >
          {isSubmitting ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-portfolio-secondary text-portfolio-primary-light hover:bg-portfolio-secondary hover:text-white"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
